import type { ConfigWithExtendsArray } from '@eslint/config-helpers';
import type { CreateOptions, DependencyConfig } from './eslint.structure.types';

function getDependencyRule<F extends string>(
  rules: CreateOptions<F>['dependencyRules'],
  folder: F,
): Partial<DependencyConfig<F>> {
  return !rules[folder]
    ? {}
    : Array.isArray(rules[folder])
      ? { disableFolderImports: rules[folder] }
      : rules[folder];
}

export default {
  createConfig<F extends string>({
    appAlias,
    files,
    folders,
    dependencyRules,
    packageImportRules,
  }: CreateOptions<F>): ConfigWithExtendsArray {
    return folders.map((folder) => {
      const { disableFolderImports, overrideRules } = getDependencyRule(
        dependencyRules,
        folder,
      );

      const disablePackageImports = packageImportRules?.filter(
        ({ disableFolderImports }) => disableFolderImports.includes(folder),
      );

      return {
        files: files(folder),
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
                ...(!disableFolderImports?.length
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
