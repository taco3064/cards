type Folders =
  | 'components'
  | 'containers'
  | 'contexts'
  | 'hooks'
  | 'icons'
  | 'layouts'
  | 'pages'
  | 'styles';

export type FolderStructure<T> = Record<Folders, T>;

export interface StructureLint {
  disableReactImports?: string[];
  disableFolderImports?: Folders[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overrideRules?: Record<string, any>;
}
