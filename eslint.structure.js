const ALIAS = '~app';

/**
 * @template T
 * @typedef {Object} FolderStructure
 * @property {T} components
 * @property {T} containers
 * @property {T} contexts
 * @property {T} hooks
 * @property {T} icons
 * @property {T} layouts
 * @property {T} pages
 * @property {T} styles
 */

/**
 * @typedef {Object} StructureLint
 * @property {string[]} [disableReactImports]
 * @property {(keyof FolderStructure<any>)[]} [disableFolderImports]
 * @property {Object<string, any>} [overrideRules]
 */

/** @type {FolderStructure<StructureLint>} */
const FOLDER = {
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
    disableFolderImports: ['components', 'containers', 'hooks', 'layouts', 'pages'],
  },
  hooks: {
    disableReactImports: ['createContext'],
    disableFolderImports: ['components', 'containers', 'icons', 'layouts', 'pages'],
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
    disableFolderImports: ['containers', 'contexts', 'hooks', 'pages'],
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

export default function getStructureLint() {
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
