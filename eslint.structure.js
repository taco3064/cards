const ALIAS = '~app';

/** @type {Record<string, { disableFolderImports: string[], disableReactImports: string[] }>} */
const FOLDER = {
  components: {
    disableFolderImports: ['containers', 'contexts'],
    disableReactImports: ['createContext', 'useContext'],
  },
  containers: {
    disableFolderImports: [],
    disableReactImports: ['createContext', 'useContext'],
  },
  contexts: {
    disableFolderImports: ['components', 'containers', 'hooks'],
    overrideRules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  hooks: {
    disableFolderImports: ['components', 'containers', 'styles'],
    disableReactImports: ['createContext'],
  },
  pages: {
    disableFolderImports: [],
    disableReactImports: ['createContext', 'useContext'],
  },
  styles: {
    disableFolderImports: ['components', 'containers', 'contexts', 'hooks'],
    disableReactImports: ['createContext', 'useContext'],
  },
};

export default function getStructureLint() {
  return Object.entries(FOLDER).map(
    ([folder, { disableReactImports, disableFolderImports, overrideRules }]) => ({
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
