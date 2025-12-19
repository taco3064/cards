import type { RulesConfig } from '@eslint/core';

export interface DependencyConfig<F extends string> {
  disableFolderImports: F[];
  overrideRules?: Partial<RulesConfig>;
}

type DependencyRule<F extends string> = F[] | DependencyConfig<F>;

interface PackageImportRule<F extends string> {
  name: string;
  importNames?: string[];
  disableFolderImports: F[];
}

export interface CreateOptions<F extends string> {
  appAlias: string;
  files: (folder: F) => string[];
  folders: F[];
  dependencyRules: Partial<Record<F, DependencyRule<F>>>;
  packageImportRules?: PackageImportRule<F>[];
}
