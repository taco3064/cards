import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

import { extractAllFolders, getDisableFolderImports } from './eslint.structure.parse';
import type { CreateOptions } from './eslint.structure.types';

export default {
  createConfig<F extends string>({
    appAlias,
    dependencyFlowchart,
    overrideRules,
    packageImportRules,
    getLintFiles,
  }: CreateOptions<F>): ConfigWithExtendsArray {
    const folders = extractAllFolders(dependencyFlowchart);

    return folders.map((folder) => {
      const disableFolderImports = getDisableFolderImports(
        dependencyFlowchart,
        folders,
        folder,
      );

      const disablePackageImports = packageImportRules?.filter(
        ({ allowedInFolders }) => !allowedInFolders.includes(folder),
      );

      return {
        files: getLintFiles(folder),
        rules: {
          ...overrideRules?.[folder],
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
  },
};
