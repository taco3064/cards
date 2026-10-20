# cards — Architecture Handbook

> Generated from `blueprint.config` by `@kekkai/blueprint` — edit the blueprint, not this file.
Run `blueprint doctor --json` for the current-config adoption assessment; `blueprint inspect --json` supplies the architecture subset. Report executable gates, structural evidence (including baselined debt and non-blocking violations), reach, and semantic review separately. Green checks do not prove module ownership, layer placement, root responsibility, presentation responsibility, or topology correctness. Read `assessment`; `gateVerdict` is gate-only and `verdict` is its deprecated 4.2 alias. `ok` retains exit compatibility, so exit 0 does not mean all evidence was verified. Review module/layer/root responsibility explicitly; consumer counts are review signals, not proof of neutral ownership. A deliberate empty-module runway is declaratory. Current-config gates cannot discharge historical transformation or lifecycle obligations. These generated instructions contain no live assessment; rerun the commands against current source.

## Architecture

Code flows one way: each layer may import only from the layers below it. Upstream imports and same-layer imports through the alias are barred.

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
| `components` | Presentational card and UI units driven entirely by props. | presentation-only: Presenters report intent through callbacks; no routing or network IO. [lint backed; available detectors; effective lint wiring must be verified separately; severity error] — {"capability":"routing"}: available; limits: Proven package-family references including subpaths and type-only references; runtime-dependent sources remain unverified.; No delegated wrappers, dependency injection, application abstractions, runtime execution, or cross-file value flow are inferred. — {"capability":"network-io"}: available; limits: Unshadowed direct globals and navigator.sendBeacon only; local bindings do not match.; No delegated wrappers, dependency injection, application abstractions, runtime execution, or cross-file value flow are inferred. — entry exemptions: (none) — checks use OR semantics; a passing detector is not proof of indirect semantic purity. Governed files: src/components/**/*.ts, src/components/**/*.tsx; ignores: **/*.test.{js,jsx,ts,tsx,vue}, **/*.spec.{js,jsx,ts,tsx,vue}. Reach: unmeasured; empty positions are not behavioral protection; Inspect measures current reach. | — |
| `hooks` | Reusable behaviour and state — shuffling, spreading, drawing, breakpoints, fingerprinting. | — | `react` → `useContext`, `react-router`, `zustand` |
| `styles` | styled-components primitives, the icon set and the global stylesheet. | styles-no-state-or-io: Style primitives do not own React state, lifecycle work, or network IO. [lint backed; available detectors; effective lint wiring must be verified separately; severity error] — {"capability":"react-state"}: available; limits: Framework calls require proven imported bindings, including aliases and namespace members; unrelated names do not match.; Class state ownership and setState use require a proven React Component/PureComponent subclass.; No delegated wrappers, dependency injection, application abstractions, runtime execution, or cross-file value flow are inferred. — {"capability":"react-lifecycle"}: available; limits: Framework calls require proven imported bindings, including aliases and namespace members; unrelated names do not match.; Lifecycle method declarations require a proven React Component/PureComponent subclass.; No delegated wrappers, dependency injection, application abstractions, runtime execution, or cross-file value flow are inferred. — {"capability":"network-io"}: available; limits: Unshadowed direct globals and navigator.sendBeacon only; local bindings do not match.; No delegated wrappers, dependency injection, application abstractions, runtime execution, or cross-file value flow are inferred. — entry exemptions: (none) — checks use OR semantics; a passing detector is not proof of indirect semantic purity. Governed files: src/styles/**/*.ts, src/styles/**/*.tsx; ignores: **/*.test.{js,jsx,ts,tsx,vue}, **/*.spec.{js,jsx,ts,tsx,vue}. Reach: unmeasured; empty positions are not behavioral protection; Inspect measures current reach. | `react-router` |
| `contexts` | React context definitions shared across the tree. | context-definitions-only: Context definitions do not perform routing or network IO. [lint backed; available detectors; effective lint wiring must be verified separately; severity error] — {"capability":"routing"}: available; limits: Proven package-family references including subpaths and type-only references; runtime-dependent sources remain unverified.; No delegated wrappers, dependency injection, application abstractions, runtime execution, or cross-file value flow are inferred. — {"capability":"network-io"}: available; limits: Unshadowed direct globals and navigator.sendBeacon only; local bindings do not match.; No delegated wrappers, dependency injection, application abstractions, runtime execution, or cross-file value flow are inferred. — entry exemptions: (none) — checks use OR semantics; a passing detector is not proof of indirect semantic purity. Governed files: src/contexts/**/*.ts, src/contexts/**/*.tsx; ignores: **/*.test.{js,jsx,ts,tsx,vue}, **/*.spec.{js,jsx,ts,tsx,vue}. Reach: unmeasured; empty positions are not behavioral protection; Inspect measures current reach. | `react` → `createContext`, `react-router` |

Error-severity executable matches are proven blocking violations (failed gate, affectsExit: true in the enforcing lint run). Warn-severity matches are visible non-blocking conformance observations (affectsExit: false), not failed gates. Partial or unavailable detectors yield unverified evidence and block adoption completion without inventing a violation or a new CLI exit policy. A proven missing, disabled, replaced, or mismatched required carrier is failed even at warn severity. Review-only prose remains the reviewer’s responsibility.

## Unit shape

A unit is the code item inside a layer. Folder units expose only their entry; file units are one file each.

| Layer | Unit layout | Entry |
| --- | --- | --- |
| `pages` | `folder` | `index` |
| `layouts` | `folder` | `index` |
| `containers` | `folder` | `index` |
| `components` | `folder` | `index` |
| `hooks` | `folder` | `index` |
| `styles` | `folder` | `index` |
| `contexts` | `folder` | `index` |

## Import discipline

These boundaries are verified alive in the project ESLint run — one blueprint drives both:

- **One-way only** — a layer imports only from the layers below it; upstream imports are errors.
- **Canonical boundary spelling** — use `~app`, the source-root alias, whenever an import crosses a declared layer or module boundary. Additional aliases are resolved for diagnosis, but rejected as alternate boundary spellings.
- **No same-layer imports via the alias** — use a relative path. File units may reach sibling files; folder units may reach a sibling only through its entry. Extract shared logic down to a lower layer when neither unit owns it.
- **Entry-only** — import a folder unit through its `index`, never its internals.
- **Dynamic parity** — a dynamic import whose target reduces to a proven string follows the same alias, flow, and unit-entry rules. Runtime-dependent targets remain explicitly unverified; they are never invented as legal graph dependencies.
- **No redundant relative segments** (`./../`, `././`) that bypass the rules.
- **Ownership** — packages and globals are restricted to their owning layer (see the *Owns* column above).
- **selfOnly** — where a layer narrows its importers with `selfOnly`, that importer may depend on it but must never re-export it onward.

## Component shape — 7 orthogonal axes

A set, not a pipeline: each axis is an independent yes/no design decision — never infer
that one axis holds because another does. Numbering is identity, not order, and trivial
changes need not force the full pass. Lint is an entry point here, never a verdict.

### 1. Ownership Inversion — The unit that needs derived state owns the derivation.

Do not precompute in the parent and drill the result down — the child imports the hook and derives it itself. Field-tested: 17 props down to 7.

### 2. IO Shrinkage — Narrow the inputs, shrink the outputs.

Three moves: split a multi-concern unit; collapse parallel raw states carrying an invariant into one modeled state; merge symmetric twins into one object of the same shape. Count and size are weak signals — whether the state is modeled is the review call.

> Triage: `max-params` is the review entry point — the verdict stays with review.

### 3. SRP Decomposition — Split on responsibility boundaries, not on size.

Naming test: if you cannot name it without "and", it wants splitting; dissolving code into an existing home is also a split. Exception: writable state that must stay in sync — force-splitting it manufactures sync bugs.

> Triage: `max-statements` is the review entry point — the verdict stays with review.

### 4. Orchestration Shell — A page only orchestrates.

Route/id resolution, the loading shell, shared sources, cross-child lifecycle — never deriving values on behalf of each child. Field-tested: a 6666-line detail page down to 552.

> Triage: `max-lines` is the review entry point — the verdict stays with review.

### 5. Scoped Writable State — Writable state lives at the lowest common owner of its writers and readers.

Hoist only what is genuinely shared across a boundary; state that must survive a route change goes to the URL or a store. "Might be shared later" is YAGNI — hoist when the sharing arrives.

### 6. Lifecycle Internalization — If lifecycle is part of the responsibility, build it in.

The caller receives a unit that is already running and cleans itself up — not a kit of handlers to wire into mount/effect hooks. Field-tested: 19 exports down to a one-line call.

### 7. Pure Helpers ≠ Composables — Keep pure functions out of reactive/lifecycle units.

One exported function does not demand one file: responsibility splits at the function level; the file splits only when max-lines approaches. Expose the decision a unit makes, not its raw ingredients.

## Principles

### Enforced by tooling

- **A folder may only import modules that lie downstream along the flow; upstream and reverse imports are not allowed.** — The layer order is the architecture. Once imports may point either way, every folder is reachable from every other and the boundaries stop meaning anything.

### Behavioral (held in review / CLAUDE.md)

- **Split by responsibility, not by size** — The signal to split is how many things a unit does — line count is only a backstop.
- **One source of truth** — Derive computed values; never store duplicate mutable state that can desync.
- **Keep interfaces narrow** — Narrow inputs and outputs so illegal states cannot be expressed.
- **Keep knowledge where it is used** — Push derivation to the child and state to its lowest common owner; do not hoist.
- **Dead code: delete it or mark it** — An abstraction with no consumer is dead; sweep orphans, mark retained-dead as deprecated.
- **Lint is an entry point, not a verdict** — Mechanical checks only triage; cohesion and invariants need review.
- **Acceptance criteria are a start, not scripture** — Fixing a ticket that violates an abstraction's responsibility is upholding the design.
- **YAGNI — do not over-engineer** — "Might need it later" is not a reason to abstract now.
- **Cost is the third dimension** — Cost = work per event × event frequency; price any logic wired to a data source.

## Working playbook

Judgment rules no tool enforces — they hold in review and in the agent contract.

### Runtime load discipline

- **Price every handler attached to a data source.** — Before wiring anything to WS / polling / scroll / input, answer: events per second, data per event, per-event cost. If you cannot answer, it does not merge — and copying an existing pattern is no exemption, because frequency is not in the code.
- **High-frequency updates write in place.** — Patch the changed entry and keep container identity; whole-replace is for baseline rebuilds only. A prop whose identity changed while its value did not is the disease. Write shapes do not port across frameworks.
- **Diagnose re-renders in four steps, never by guessing.** — Who renders (profiler) → what triggered it (render tracing) → who produced the identity (grep the assignment sites) → was it worth it (compare against the event payload).
- **Performance claims must be acceptance-testable.** — "Fewer re-renders" is not a claim; "one event re-renders at most N components" is. Pin it with a render-count or identity-stability test — an unmeasured performance claim did not happen.

### Refactor discipline

- **Safety net first, then split, then tidy the tests.** — Three stages, one commit each, non-overlapping review scopes. Writing the net first forces the observable contract into the open.
- **One refactor arc = one PR, one commit per phase.** — The PR body maps each commit to its phase; ask before splitting the arc into separate tickets.
- **Extract by copying from source, never by rewriting from memory.** — After extraction, diff the target against git history — a passing suite alone does not prove the extraction faithful.
- **Scan every identifier before extracting.** — Not just reactive refs — imports, local definitions, parameters. A missed dependency surfaces later as a broken extraction.
- **Do not pin what the refactor itself will change.** — A safety net asserting values the arc is about to change fails the moment the sibling refactor lands.
- **AC-named payload fields deserve a contract test.** — Asserting that the mocked service receives field X is not a tautology — a dropped field or an unbound handler breaks it while the source constant stays green.
- **Wrap an arc with cross-cutting themes and verified numbers.** — Name the forces (ownership inversion, IO shrinkage, SRP) and attach before/after numbers verified against git history.

### Design collaboration

- **Frame architectural corrections as guarding the design.** — State the principle being protected, show how the literal ticket reading violates it, and present the choice as that principle's natural consequence.
- **Do not reopen settled designs.** — When the shape has been specified, implement it as spec. Raise genuine concerns once, with reasons — not as a menu of alternatives.
- **"The user can work around it" does not park a bug.** — Judge by diff size, scope, and standalone impact; a normal-path bug that violates expectations deserves its ticket.

## Rules

| Rule | Tier | Option | Enforced by |
| --- | --- | --- | --- |
| `maxLines` | `error` | `400` | lint |
| `maxLinesPerFunction` | `error` | `100` | lint |
| `maxParams` | `error` | `3` | lint |
| `maxStatements` | `error` | `15` | lint |
| `complexity` | `error` | `12` | lint |
| `unusedVars` | `error` | — | lint |
| `explicitAny` | `error` | — | lint |
| `codeStyle` | `error` | — | lint |
| `statementsPerLine` | `error` | — | lint |
| `statementPadding` | `error` | — | lint |
| `importBlock` | `error` | — | lint |
| `fixtureImports` | `error` | — | lint |
| `cycles` | `error` | — | `blueprint inspect` |
| `deadCode` | `error` | — | documentation only |
| `usePrefix` | `error` | — | lint |
| `testFilename` | `error` | — | lint |
| `usePrefixReactivity` | `error` | — | lint |
| `typedefOnlyFile` | `error` | — | lint |

The tier is what the enforcing machine does with a violation: `error` fails, `warn` is advisory, `off` is disabled. Which machine differs — `lint` rows fail the project's lint run, `blueprint inspect` rows fail `blueprint inspect` and never appear in a lint run, documentation-only rows are recorded intent with no gate behind them at any tier, and a row reading `nothing` is lint-gated in general but cannot emit on THIS blueprint — the cell says which fact rules it out. Every row reaches only the files the architecture globs match: a declared position holding no code has nothing that can fail, which is runway rather than protection — `blueprint doctor` reports which of the two this repo has today.

## Naming

| Concept | Convention |
| --- | --- |
| `module` | PascalCase folder with an index entry, e.g. contexts/PortalMount/index.ts |
| `component` | PascalCase; the implementation file is named after the unit |
| `hook` | useX.ts for genuine reactive hooks; implementation and tests share the hook name |
| `context` | XxxProvider / XxxContext |
| `page` | PascalCase Page suffix, e.g. WelcomePage.tsx |
| `styles` | Unit.styles.ts, e.g. Card.styles.ts (project convention) |
| `types` | Unit.types.ts, e.g. Card.types.ts; omit use from hook type filenames (project convention) |
| `factory` | createX for ordinary function factories; do not use a hook prefix |
| `test` | Same-named source sibling, e.g. useShuffleCards.test.ts |
