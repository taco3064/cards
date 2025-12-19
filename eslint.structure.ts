import fs from 'node:fs';
import path from 'node:path';
import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

import type {
  FolderNames,
  OverrideRules,
  StructureLintOptions,
} from './eslint.structure.types';

const FOLDERS = fs.readdirSync('./src').filter((name) => {
  const fullPath = path.join('./src', name);

  return fs.statSync(fullPath).isDirectory() && name !== 'assets';
}) as FolderNames[];

const LINT_OPTIONS: StructureLintOptions<FolderNames> = {
  appAlias: '~app',
  dependencyhRules: {
    components: ['containers', 'contexts', 'layouts', 'pages'],
    containers: ['layouts', 'pages'],
    hooks: ['components', 'containers', 'icons', 'layouts', 'pages', 'styles'],
    icons: ['components', 'containers', 'contexts', 'hooks', 'layouts', 'pages'],
    layouts: ['pages'],

    contexts: [
      'components',
      'containers',
      'hooks',
      'icons',
      'layouts',
      'pages',
      'styles',
      { 'react-refresh/only-export-components': 'off' },
    ],
    styles: [
      'components',
      'containers',
      'contexts',
      'hooks',
      'icons',
      'layouts',
      'pages',
    ],
  },
  packageImportRules: [
    {
      name: 'react',
      importNames: ['createContext'],
      disableFolderImports: [
        'components',
        'containers',
        'hooks',
        'icons',
        'layouts',
        'pages',
        'styles',
      ],
    },
    {
      name: 'react',
      importNames: ['useContext'],
      disableFolderImports: [
        'components',
        'containers',
        'contexts',
        'icons',
        'layouts',
        'pages',
        'styles',
      ],
    },
    {
      name: 'react-router-dom',
      disableFolderImports: ['components', 'icons'],
    },
    {
      name: 'zustand',
      disableFolderImports: [
        'components',
        'containers',
        'contexts',
        'icons',
        'layouts',
        'pages',
        'styles',
      ],
    },
  ],
};

export default function getStructureLint(): ConfigWithExtendsArray {
  const { appAlias, dependencyhRules, packageImportRules } = LINT_OPTIONS;

  return FOLDERS.map((folder) => {
    const options = dependencyhRules[folder] ?? [];

    const disableFolderImports = options.filter(
      (option) => typeof option === 'string',
    ) as string[];

    const overrideRules =
      typeof options[options.length - 1] === 'string'
        ? undefined
        : (options[options.length - 1] as OverrideRules);

    const disablePackageImports = packageImportRules?.filter(({ disableFolderImports }) =>
      disableFolderImports.includes(folder),
    );

    return {
      files: [`src/${folder}/**/*.ts`, `src/${folder}/**/*.tsx`],
      rules: {
        ...overrideRules,
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['../*/**'],
                message:
                  '\n🚫 Do not import from upper-level directories. Use the project alias (e.g. "~app/*") to follow the dependency flow.',
              },
              {
                group: [`${appAlias}/${folder}/**`],
                message:
                  '\n🚫 Do not import modules from the same layer. Extract shared logic into a lower-level folder if needed.',
              },
              ...(!disableFolderImports.length
                ? []
                : [
                    {
                      group: disableFolderImports.map(
                        (banFolder) => `${appAlias}/${banFolder}/**`,
                      ),
                      message:
                        '\n🚫 This import violates the folder dependency rule. Only import from allowed lower-level folders.',
                    },
                  ]),
            ],
            ...(disablePackageImports?.length && {
              paths: disablePackageImports.map(({ name, importNames }) => ({
                name,
                importNames,
                message: importNames?.length
                  ? `\n🚫 Do not import ${importNames.join(
                      ', ',
                    )} from "${name}" in this layer.`
                  : `\n🚫 Do not import "${name}" in this layer.`,
              })),
            }),
          },
        ],
      },
    };
  });
}
