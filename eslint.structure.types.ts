import type { RulesConfig } from '@eslint/core';

export type OverrideRules = Partial<RulesConfig>;

type DependencyRule<FolderNames extends string> =
  | FolderNames[]
  | [...FolderNames[], OverrideRules];

interface PackageImportRule<FolderNames extends string> {
  name: string;
  importNames?: string[];
  disableFolderImports: FolderNames[];
}

export interface StructureLintOptions<FolderNames extends string> {
  appAlias: string;
  dependencyhRules: Partial<Record<FolderNames, DependencyRule<FolderNames>>>;
  packageImportRules?: PackageImportRule<FolderNames>[];
}
