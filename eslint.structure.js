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
 * @property {Partial<FolderStructure<boolean>>} [disableFolderImports]
 * @property {Object<string, any>} [overrideRules]
 */

/** @type {FolderStructure<StructureLint>} */
const FOLDER = {
  components: {
    disableReactImports: ['createContext', 'useContext'],
    disableFolderImports: {
      containers: true,
      contexts: true,
      layouts: true,
      pages: true,
    },
  },
  containers: {
    disableReactImports: ['createContext', 'useContext'],
    disableFolderImports: {
      layouts: true,
      pages: true,
    },
  },
  contexts: {
    overrideRules: {
      'react-refresh/only-export-components': 'off',
    },
    disableFolderImports: {
      components: true,
      containers: true,
      hooks: true,
      layouts: true,
      pages: true,
    },
  },
  hooks: {
    disableReactImports: ['createContext'],
    disableFolderImports: {
      components: true,
      containers: true,
      icons: true,
      layouts: true,
      pages: true,
    },
  },
  icons: {
    disableReactImports: ['createContext', 'useContext'],
    disableFolderImports: {
      components: true,
      containers: true,
      contexts: true,
      hooks: true,
      layouts: true,
      pages: true,
    },
  },
  layouts: {
    disableReactImports: ['createContext', 'useContext'],
    disableFolderImports: {
      components: true,
      containers: true,
      contexts: true,
      hooks: true,
      pages: true,
    },
  },
  pages: {
    disableReactImports: ['createContext', 'useContext'],
  },
  styles: {
    disableReactImports: ['createContext', 'useContext'],
    disableFolderImports: {
      components: true,
      containers: true,
      contexts: true,
      hooks: true,
      icons: true,
      layouts: true,
      pages: true,
    },
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
                  ...Object.entries(disableFolderImports || {}).reduce(
                    (acc, [banFolder, disabled]) => {
                      if (!disabled) {
                        acc.push(`${ALIAS}/${banFolder}*`);
                      }
                      return acc;
                    },
                    [],
                  ),
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
