import type { RulesConfig } from '@eslint/core';

export type FlowchartConfig<F extends string> = [
  F,
  F,
  {
    label?: string;
    selfOnly?: boolean;
  }?,
];

interface PackageImportRule<F extends string> {
  name: string;
  importNames?: string[];
  allowedInFolders: F[];
}

export interface CreateOptions<F extends string> {
  appAlias: string;
  dependencyFlowchart: FlowchartConfig<F>[];
  overrideRules?: Partial<Record<F, Partial<RulesConfig>>>;
  packageImportRules?: PackageImportRule<F>[];
  getLintFiles: (folder: F) => string[];
}
