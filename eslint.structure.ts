import type { ConfigWithExtendsArray } from '@eslint/config-helpers';
import type { FolderStructure, StructureLint } from './eslint.structure.types';

const ALIAS = '~app';

const FOLDER: FolderStructure<StructureLint> = {
  components: {
    disableReactImports: ['createContext', 'useContext'],
    disableFolderImports: ['containers', 'contexts', 'layouts', 'pages'],
  },
  containers: {
    disableReactImports: ['createContext', 'useContext'],
    disableFolderImports: ['layouts', 'pages'],
  },
  contexts: {
    overrideRules: {
      'react-refresh/only-export-components': 'off',
    },
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
  hooks: {
    disableReactImports: ['createContext'],
    disableFolderImports: [
      'components',
      'containers',
      'icons',
      'layouts',
      'pages',
      'styles',
    ],
  },
  icons: {
    disableReactImports: ['createContext', 'useContext'],
    disableFolderImports: [
      'components',
      'containers',
      'contexts',
      'hooks',
      'layouts',
      'pages',
    ],
  },
  layouts: {
    disableReactImports: ['createContext', 'useContext'],
    disableFolderImports: ['pages'],
  },
  pages: {
    disableReactImports: ['createContext', 'useContext'],
  },
  styles: {
    disableReactImports: ['createContext', 'useContext'],
    disableFolderImports: [
      'components',
      'containers',
      'contexts',
      'hooks',
      'icons',
      'layouts',
      'pages',
    ],
  },
};

export default function getStructureLint(): ConfigWithExtendsArray {
  return Object.entries(FOLDER).map(
    ([folder, { disableReactImports, disableFolderImports = [], overrideRules }]) => ({
      files: [`src/${folder}/**/*.ts`, `src/${folder}/**/*.tsx`],
      rules: {
        ...overrideRules,
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: [
                  '../../*',
                  `${ALIAS}/${folder}*`,
                  ...disableFolderImports.map((banFolder) => `${ALIAS}/${banFolder}*`),
                ],
              },
            ],
            ...(disableReactImports && {
              paths: [
                {
                  name: 'react',
                  importNames: disableReactImports,
                },
              ],
            }),
          },
        ],
      },
    }),
  );
}
