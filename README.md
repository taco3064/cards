# About Cards

**cards** is a React-based project focused on building **3D interactive card experiences** using native HTML elements.
The animation system is powered by **`motion/react`**, forming the foundation of a fully custom, modular, and extensible **card animation engine**.

Unlike typical card projects that rely on simplified logic or random shuffling, Cards is designed to simulate **real-world card behaviors**, including:

- Authentic **Overhand Shuffle** / **Riffle Shuffle** animations
- 3D card stacking using **`rotate3d`** / **`translateZ`** transforms
- Responsive **multi-row fan-out layouts** that dynamically adapt to any screen size
- Fully **data-driven behaviors**, not pre-rendered animations or static randomness

The entire project is structured around clear module boundaries: shuffling, spreading, drawing, revealing, card-state management, and animation sequencing are all abstracted into dedicated hooks and containers.

Each "Stage" represents a specific interaction scene, and multiple stages can be composed to form a complete card-drawing flow.

**Cards is a side project that blends deep UI interaction design with clean, scalable frontend architecture—exploring how far true-to-life card animations can go in the browser.**

<!-- About Cards End -->

## Getting Started

This project uses **Node.js v24.12.0**, defined in **`.nvmrc`**.

1. Install dependencies
   Use `npm ci` to install packages strictly based on the existing lockfile:
   ```zsh
   npm ci
   ```
2. Start the development server
   Run:
   ```
   npm run dev
   ```
   The Vite development server will start and automatically open in your browser.

## Architecture

The layer flow, module shape and package ownership are declared once in
**`blueprint.config.mjs`** and compiled by [**@kekkai/blueprint**](https://taco3064.github.io/blueprint/)
into the ESLint rules, the handbook and the agent contract — so they cannot disagree.

- **[docs/architecture-handbook.md](./docs/architecture-handbook.md)** — the layer table, the
  dependency diagram and the import discipline (generated; edit the blueprint, not the doc)
- **[CLAUDE.md](./CLAUDE.md)** — the same contract, for coding agents

```zsh
npm run quality             # lint, types, tests, architecture, doctor, dead code
npm run architecture        # current findings, without grandfathering a baseline
npm run architecture-doctor # verify live ESLint integration and alias consumers
npm run knip                # unused files, exports, and dependencies
npm run architecture-docs   # regenerate the handbook and the agent contract
```

The project keeps **layer-first (LF)** topology. Quality rules come from Blueprint
4.2's official React preset, with every rule promoted to `error` and the official
metric thresholds retained: 400 lines per file, 100 per function, 3 parameters,
15 statements, and complexity 12. Blueprint has no separate `strict` preset.
Lint also rejects warnings. `deadCode` is documentation-only in Blueprint, so
Knip runs as a separate blocking check. The same quality command runs before a
commit, on pull requests, and before the deployment build.

Structural import rules and executable `mustNot` declarations remain errors.
Private helpers and animation factories live inside the Hook implementation that
owns them. The existing seven layers are retained, without an extra utility layer.
Hook behavior is tested through its public
interface, including card preservation, animation targets, and spread geometry.

Implementation files use meaningful names: `Card.tsx`, `DeckDrawStage.tsx`,
`WelcomePage.tsx`, and `useShuffleCards.ts`. Public folder entries remain `index.ts`.
The project uses `Unit.styles.ts` and `Unit.types.ts` for supporting files, and tests
share their source filename. These conventions are recorded in the Blueprint config.

`useBreakpoint.ts` uses Zustand's `create`, which returns a reactive Hook. Blueprint
4.2's fixed list of direct React/Vue calls does not recognize it. That file has one
documented exception for `use-prefix-needs-reactivity`; structural rules and the
other quality gates stay enabled.

Passing gates does not establish semantic ownership. Review layer responsibility,
presentation placement, and root bootstrap code separately. `src/main.tsx` and
`src/vite-env.d.ts` remain outside the layer architecture globs. `typedefOnlyFile`
targets JavaScript JSDoc files, so it has no current TypeScript carrier. Vue-only
`deepWatch` and module-first `moduleDependencySync` do not apply to this React LF app.
