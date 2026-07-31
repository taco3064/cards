import { defineBlueprint } from '@kekkai/blueprint';

export default defineBlueprint({
  name: 'cards',
  framework: 'react',
  architecture: {
    alias: '~app',
    layers: [
      {
        name: 'pages',
        does: 'Route-level scenes plus the route table — composes a layout and containers into one screen.',
        owns: ['react-router'],
      },
      {
        name: 'layouts',
        does: 'Persistent page frame — chrome and outlet placement shared across routes.',
        owns: ['react-router'],
      },
      {
        name: 'containers',
        does: 'Interaction stages — owns card state and orchestrates one animation scene.',
        owns: ['react-router'],
      },
      {
        name: 'components',
        does: 'Presentational card and UI units driven entirely by props.',
      },
      {
        name: 'hooks',
        does: 'Reusable behaviour and state — shuffling, spreading, drawing, breakpoints, fingerprinting.',
        owns: [
          { package: 'react', imports: ['useContext'] },
          'react-router',
          'zustand',
        ],
      },
      {
        name: 'icons',
        does: 'Standalone SVG icon components.',
      },
      {
        name: 'styles',
        does: 'styled-components primitives and the global stylesheet.',
        owns: ['react-router'],
      },
      {
        name: 'contexts',
        does: 'React context definitions shared across the tree.',
        allowedImporters: [
          { layer: 'containers', description: 'Only Provider' },
          { layer: 'hooks', selfOnly: true, description: 'Only Context' },
        ],
        owns: [{ package: 'react', imports: ['createContext'] }, 'react-router'],
        // A context module exports its context and its provider together, which
        // react-refresh reads as a mixed-export file. The module shape wins.
        lintOverrides: { 'react-refresh/only-export-components': 'off' },
      },
    ],
    module: { layout: 'folder', entry: 'index' },
    layerFiles: ['src/{layer}/**/*.ts', 'src/{layer}/**/*.tsx'],
    naming: {
      module: 'PascalCase folder with an index entry, e.g. contexts/PortalMount/index.ts',
      hook: 'useX folder under hooks/, e.g. hooks/useShuffleCards',
    },
  },
  rules: {
    cycles: 'error',
    unusedVars: 'error',
    explicitAny: 'error',
    importBlock: 'error',
    statementPadding: 'error',
    codeStyle: { tier: 'error', indent: 2, quotes: 'single', semi: true, maxLen: 90 },
  },
  principles: [
    {
      id: 'one-way-dependency-flow',
      say: 'A folder may only import modules that lie downstream along the flow; upstream and reverse imports are not allowed.',
      why: 'The layer order is the architecture. Once imports may point either way, every folder is reachable from every other and the boundaries stop meaning anything.',
      land: 'lint',
    },
  ],
  emit: {
    agents: ['claude'],
  },
});
