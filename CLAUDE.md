# Working in this repo

A single prerendered SvelteKit page that showcases 41 delete-button animations, plus a
Storybook. The values in the Claude Design handoff (`design/README.md`) are final: colours,
type, spacing, durations and easings are reproduced exactly. `design/` is reference only;
never edit it.

## The effect engine (`src/lib/fx/`)

- Framework-free TypeScript. No Svelte imports in `src/lib/fx/`, and relative imports only
  (no `$lib`), so it can be lifted into another site (the defx.de lab is a candidate).
- One module per effect in `effects/<key>.ts`, default-exporting
  `{ badge, setup } satisfies Effect`. Register new ones in `registry.ts`, add the card to
  `src/lib/content/effects.ts` and its story line to `organisms/Effects.stories.svelte`.
  `effects.test.ts` fails if catalog and registry disagree.
- Timing goes through `ctx.A` and `ctx.wait`, never raw `setTimeout`/`animate` for timeline
  steps: they apply the speed and stop when the cycle's `ctx.signal` aborts. Loops,
  intervals and observers must stop on `ctx.signal` too. Anything an effect touches outside
  its stage (only #41 does) must be restored on abort.
- Custom setups check `ctx.busy`, set it with `setBusy(b, true)`, and set `ctx.play` so
  "Delete everything" can trigger them.
- `<i>` is the decorative-particle tag; `h('i')` marks it `aria-hidden`. Clones of the
  button get `inert` or `aria-hidden` plus `tabIndex = -1`.
- Shared parts (`dx-btn`, `dx-trash`, `dx-doc`, `dx-check`, `dx-badge`) are global classes in
  `fx.css`; the Svelte atoms render the same markup. Keep the two in step. The trash icon
  draws in `currentColor`; recolour by setting `color`.
- Colours come from `src/lib/design/tokens.ts` (`color.*`, or the short names in
  `particles.ts`); one-off hexes from the prototype stay literal.

## Responsive and accessible

- Breakpoints as in defx, written literally: `@media (width < 760px)` (sm) and
  `(width < 1024px)` (md); `tokens.ts` records them as `breakpoints`. `e2e/layout.spec.ts`
  checks both sides of each, and that nothing scrolls sideways from 320px up.
- Hover styles go inside `@media (hover: hover)`. Buttons keep `touch-action: manipulation`;
  only a control that reads the pointer itself (hold, the slide knob) sets `none`.
- Text colours must pass WCAG AA; axe runs with every rule at 375 and 1280px. Red text, and
  red grounds holding text, use `redText`; `red` is for shapes.

## Components

`src/lib/components/{atoms,molecules,organisms,templates}`. Atoms use no other components;
molecules compose atoms; organisms own their layout; templates are layouts with snippets.
`LabScope` provides the shared `Lab` via context; a stage outside one gets a private Lab.
Stories sit beside each component and may use the catalog in `$lib/content`.

#41 "Delete the page" drops every child of `<main>` and every card of each `<section>`, as
in the prototype's DOM. Keep volume headings and grids as siblings directly under `<main>`.

## Conventions

- Node 26 via nvm, Yarn 4 via Corepack. Never `npm`.
- Run things through `task`; `task` lists them. `task ci` is what CI runs.
- Ports: dev 5193, preview 4193, Storybook 6026 (distinct from defx and web-again).
- No `svelte.config.js`: SvelteKit config is inline in `vite.config.ts`. `BASE_PATH` sets the
  base; all paths are relative.
- Prettier: tabs, single quotes, no trailing commas, 100 columns.
- Commits: plain imperative subjects, no Conventional Commits. Explain _why_ in the body.
- Branching: GitHub flow, `feature/*` branches and PRs for every change, bug fixes included.
  The initial build went straight to `main`.
- Tests: unit tests beside the code as `*.test.ts`; browser tests as `*.svelte.test.ts` or
  `*.browser.test.ts`; end-to-end tests in `e2e/` (preview server on :4193).
- Prose that speaks for the owner (README intro, page copy) follows the `write-like-me`
  skill. Reference docs stay neutral.
