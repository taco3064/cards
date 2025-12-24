import cacache from 'cacache';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

import type { DocsGeneratorOptions, FlowchartConfig } from './eslint.structure.types';

const CACHE_PATH = path.resolve(process.cwd(), 'node_modules/.cache/kekkai');
const CACHE_KEY = 'dependency-flowchart-hash';

const DEFAULT_CONTENT = `
This project follows a **One-way Dependency Flow** principle:

- Each folder may only import modules that lie downstream along the arrow direction
- Upstream or reverse imports are not allowed

> This rule is also enforced via **ESLint**.
`;

export async function generateDocs<F extends string>(
  flowchart: FlowchartConfig<F>[],
  options?: DocsGeneratorOptions,
) {
  const marker = getMarker(options?.markerTag || 'ESLINT-DENPENDENCY-RULE');

  if (!options || !isDocsValid(options, marker.regex)) {
    return;
  }

  const { content = DEFAULT_CONTENT } = options;
  const docs = fs.readFileSync(path.resolve(process.cwd(), options.file), 'utf-8');

  fs.writeFileSync(
    path.resolve(process.cwd(), options.file),
    [
      docs.slice(0, docs.indexOf(marker.tag[0]) + marker.tag[0].length),
      '```mermaid',
      'flowchart TD',
      ...flowchart.map(
        ([from, to, options]) =>
          `  ${from} ${!options?.label ? '' : `-- ${options.label} `}--> ${to}`,
      ),
      '```',
      content,
      docs.slice(docs.indexOf(marker.tag[1])),
    ].join('\n'),
  );

  await makeCache(flowchart);
}

async function makeCache<F extends string>(flowchart: FlowchartConfig<F>[]) {
  const hash = createHash('sha256')
    .update(
      JSON.stringify(
        flowchart
          .slice()
          .sort(([f1, t1], [f2, t2]) => f1.localeCompare(f2) || t1.localeCompare(t2)),
      ),
    )
    .digest('hex');

  const cachedHash = await cacache
    .get(CACHE_PATH, CACHE_KEY)
    .then(({ data }) => data.toString('utf-8'))
    .catch(() => null);

  if (cachedHash === hash) {
    return;
  }

  await cacache.put(CACHE_PATH, CACHE_KEY, hash);
}

function getMarker(markerTag: string) {
  return {
    tag: [`<!-- ${markerTag}:START -->`, `<!-- ${markerTag}:END -->`] as const,
    regex: [
      new RegExp(`<!--\\s*${markerTag}:START\\s*-->`),
      new RegExp(`<!--\\s*${markerTag}:END\\s*-->`),
    ] as const,
  };
}

function isDocsValid(
  { file, markerTag }: DocsGeneratorOptions,
  [startRegex, endRegex]: Readonly<[RegExp, RegExp]>,
) {
  let docs: string;

  try {
    docs = fs.readFileSync(path.resolve(process.cwd(), file), 'utf-8');
  } catch {
    console.warn(
      `ESLint Structure Docs: The specified documentation file "${file}" does not exist.`,
    );

    return false;
  }

  if (!startRegex.test(docs)) {
    console.warn(
      `ESLint Structure Docs: The start marker must be "<!-- ${markerTag}:START -->" in the documentation file.`,
    );

    return false;
  } else if (!endRegex.test(docs)) {
    console.warn(
      `ESLint Structure Docs: The end marker must be "<!-- ${markerTag}:END -->" in the documentation file.`,
    );

    return false;
  }

  return true;
}
