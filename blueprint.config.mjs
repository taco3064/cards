import { defineBlueprint, reactPreset } from '@kekkai/blueprint';

const recommended = reactPreset();
// Keep the official thresholds, with every React quality rule enforced as an error.
const strictRules = Object.fromEntries(
  Object.entries(recommended.rules).map(([id, setting]) => [
    id,
    typeof setting === 'string' ? 'error' : { ...setting, tier: 'error' },
  ]),
);

export default defineBlueprint({
  name: 'cards',
  framework: 'react',
  architecture: {
    alias: '~app',
    layers: [
      {
        name: 'pages',
        layout: 'folder',
        does: 'Route-level scenes plus the route table — composes a layout and containers into one screen.',
        owns: ['react-router'],
      },
      {
        name: 'layouts',
        layout: 'folder',
        does: 'Persistent page frame — chrome and outlet placement shared across routes.',
        owns: ['react-router'],
      },
      {
        name: 'containers',
        layout: 'folder',
        does: 'Interaction stages — owns card state and orchestrates one animation scene.',
        owns: ['react-router'],
      },
      {
        name: 'components',
        layout: 'folder',
        does: 'Presentational card and UI units driven entirely by props.',
        mustNot: [{
          id: 'presentation-only',
          description: 'Presenters report intent through callbacks; no routing or network IO.',
          checks: [{ capability: 'routing' }, { capability: 'network-io' }],
        }],
      },
      {
        name: 'hooks',
        layout: 'folder',
        does: 'Reusable behaviour and state — shuffling, spreading, drawing, breakpoints, fingerprinting.',
        owns: [
          { package: 'react', imports: ['useContext'] },
          'react-router',
          'zustand',
        ],
      },
      {
        name: 'styles',
        layout: 'folder',
        does: 'styled-components primitives, the icon set and the global stylesheet.',
        mustNot: [{
          id: 'styles-no-state-or-io',
          description: 'Style primitives do not own React state, lifecycle work, or network IO.',
          checks: [
            { capability: 'react-state' },
            { capability: 'react-lifecycle' },
            { capability: 'network-io' },
          ],
        }],
        owns: ['react-router'],
      },
      {
        name: 'contexts',
        layout: 'folder',
        does: 'React context definitions shared across the tree.',
        mustNot: [{
          id: 'context-definitions-only',
          description: 'Context definitions do not perform routing or network IO.',
          checks: [{ capability: 'routing' }, { capability: 'network-io' }],
        }],
        // pages is listed because it is the layer that actually provides the
        // context — it owns the toolbar element the ref points at. containers
        // is kept as declared runway: a stage could own a portal target too,
        // though none does today.
        allowedImporters: [
          { layer: 'pages', description: 'Only Provider' },
          { layer: 'containers', description: 'Only Provider' },
          { layer: 'hooks', selfOnly: true, description: 'Only Context' },
        ],
        owns: [{ package: 'react', imports: ['createContext'] }, 'react-router'],
      },
    ],
    layerFiles: ['src/{layer}/**/*.ts', 'src/{layer}/**/*.tsx'],
    naming: {
      module: 'PascalCase folder with an index entry, e.g. contexts/PortalMount/index.ts',
      component: recommended.architecture.naming.component,
      hook: 'useX.ts for genuine reactive hooks; implementation and tests share the hook name',
      context: recommended.architecture.naming.context,
      page: 'PascalCase Page suffix, e.g. WelcomePage.tsx',
      styles: 'Unit.styles.ts, e.g. Card.styles.ts (project convention)',
      types: 'Unit.types.ts, e.g. Card.types.ts; omit use from hook type filenames (project convention)',
      factory: 'createX for ordinary function factories; do not use a hook prefix',
      test: 'Same-named source sibling, e.g. useShuffleCards.test.ts',
    },
  },
  rules: {
    ...strictRules,
    codeStyle: { tier: 'error', indent: 2, quotes: 'single', semi: true, maxLen: 90 },
  },
  componentShape: recommended.componentShape,
  playbook: recommended.playbook,
  principles: [
    ...recommended.principles,
    {
      id: 'one-way-dependency-flow',
      say: 'A folder may only import modules that lie downstream along the flow; upstream and reverse imports are not allowed.',
      why: 'The layer order is the architecture. Once imports may point either way, every folder is reachable from every other and the boundaries stop meaning anything.',
      land: 'lint',
    },
  ],
  emit: {
    agents: ['claude'],
    lint: { severity: 'error' },
  },
});
