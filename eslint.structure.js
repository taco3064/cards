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
    disableFolderImports: ['components', 'containers'],
    disableReacttImports: ['createContext'],
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
