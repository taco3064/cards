# cards — Architecture Handbook

> Generated from `blueprint.config` by `@kekkai/blueprint` — edit the blueprint, not this file.

## Architecture

Code flows one way: each layer may import only from the layers below it. Upstream and same-layer imports are barred.

```mermaid
flowchart TD
  pages -.-> layouts
  layouts -.-> containers
  containers -.-> components
  components -.-> hooks
  hooks -.-> styles
  pages -->|Only Provider| contexts
  containers -->|Only Provider| contexts
  hooks -->|Only Context · selfOnly| contexts
```

> **How to read the diagram**: a **solid** edge is a declared importer relation (its label carries the description and/or `selfOnly` — depend on it, never re-export it). A **dotted** edge only records declaration order: adjacent layers are not necessarily related. Reachability is transitive — a layer may import **any** layer below it in the flow, whether or not an edge is drawn, unless the target narrows its importers (`allowedImporters`).

### Layers

| Layer | Responsibility | Must not | Owns |
| --- | --- | --- | --- |
| `pages` | Route-level scenes plus the route table — composes a layout and containers into one screen. | — | `react-router` |
| `layouts` | Persistent page frame — chrome and outlet placement shared across routes. | — | `react-router` |
| `containers` | Interaction stages — owns card state and orchestrates one animation scene. | — | `react-router` |
| `components` | Presentational card and UI units driven entirely by props. | — | — |
| `hooks` | Reusable behaviour and state — shuffling, spreading, drawing, breakpoints, fingerprinting. | — | `react` → `useContext`, `react-router`, `zustand` |
| `styles` | styled-components primitives, the icon set and the global stylesheet. | — | `react-router` |
| `contexts` | React context definitions shared across the tree. | — | `react` → `createContext`, `react-router` |

## Module shape

One module = one folder. Only `index` is public; everything else stays private to the module.

```
pages/
└─ Example/
   ├─ index   # public entry — the only importable file
   └─ Example # implementation (named after the module)
```

## Import discipline

These boundaries are enforced by the generated ESLint config — one blueprint drives both:

- **One-way only** — a layer imports only from the layers below it; upstream imports are errors.
- **No same-layer imports** — extract shared logic down to a lower layer instead.
- **Entry-only** — import a module through its `index`, never its internals.
- **No redundant relative segments** (`./../`, `././`) that bypass the rules.
- **Ownership** — packages and globals are restricted to their owning layer (see the *Owns* column above).
- **selfOnly** — a dashed edge may be depended on but never re-exported onward.

## Principles

### Enforced by tooling

- **A folder may only import modules that lie downstream along the flow; upstream and reverse imports are not allowed.** — The layer order is the architecture. Once imports may point either way, every folder is reachable from every other and the boundaries stop meaning anything.

## Rules

| Rule | Tier | Option | Enforced by |
| --- | --- | --- | --- |
| `cycles` | `error` | — | `blueprint inspect` |
| `unusedVars` | `error` | — | lint |
| `explicitAny` | `error` | — | lint |
| `importBlock` | `error` | — | lint |
| `statementPadding` | `error` | — | lint |
| `codeStyle` | `error` | — | lint |

The tier is what the enforcing machine does with a violation: `error` fails, `warn` is advisory, `off` is disabled. Which machine differs — `lint` rows fail `npm run lint`, `blueprint inspect` rows fail that command and never appear in a lint run, and documentation-only rows are recorded intent with no gate behind them at any tier.

## Naming

| Concept | Convention |
| --- | --- |
| `module` | PascalCase folder with an index entry, e.g. contexts/PortalMount/index.ts |
| `hook` | useX folder under hooks/, e.g. hooks/useShuffleCards |
