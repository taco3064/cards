const ALIAS = '~app';

const FOLDER = {
  components: {
    disableFolderImports: ['containers', 'contexts'],
    disableReacttImports: ['createContext', 'useContext'],
  },
  containers: {
    disableFolderImports: [],
    disableReacttImports: ['createContext', 'useContext'],
  },
  contexts: {
    disableFolderImports: ['components', 'containers', 'hooks'],
  },
  hooks: {
    disableFolderImports: ['components', 'containers', 'styles'],
    disableReacttImports: ['createContext'],
  },
  styles: {
    disableFolderImports: ['components', 'containers', 'contexts', 'hooks'],
    disableReacttImports: ['createContext', 'useContext'],
  },
};

export default function getStructureLint() {
  return Object.entries(FOLDER).map(
    ([folder, { disableReacttImports, disableFolderImports }]) => ({
      files: [`src/${folder}/**/*.ts`, `src/${folder}/**/*.tsx`],
      rules: {
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
            ...(disableReacttImports && {
              paths: [
                {
                  name: 'react',
                  importNames: disableReacttImports,
                },
              ],
            }),
          },
        ],
      },
    }),
  );
}

console.log(JSON.stringify(getStructureLint(), null, 2));
