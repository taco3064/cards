import type { FlowchartConfig } from './eslint.structure.types';

export function extractAllFolders<F extends string>(
  dependencyFlowchart: FlowchartConfig<F>[],
): F[] {
  return Array.from(new Set<F>(dependencyFlowchart.flatMap(([from, to]) => [from, to])));
}

export function getDisableFolderImports<F extends string>(
  config: FlowchartConfig<F>[],
  folders: Readonly<F[]>,
  folder: F,
): F[] {
  const allowedFolders = getAllowedFolders(config, folder, true);

  return folders.filter((f) => !allowedFolders.includes(f) && f !== folder);
}

function getAllowedFolders<F extends string>(
  config: FlowchartConfig<F>[],
  folder: F,
  root: boolean,
): F[] {
  return config.reduce<F[]>((acc, [from, to, options]) => {
    if (from === folder) {
      if (!options?.selfOnly) {
        acc.push(to, ...getAllowedFolders(config, to, false));
      } else if (root) {
        acc.push(to);
      }
    }

    return acc;
  }, []);
}
