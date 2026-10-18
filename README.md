# Sixty ways to delete a file

A while ago I built a silly little delete button: you click it, the trash can slides to the middle, a document emoji drops into it, and the whole thing politely fades out to a green "Deleted". It used emoji, hard-coded pixel offsets and a cascade of `setTimeout`s, and its README conceded that my web development days were long gone (it lives on in [`design/delete-button-animation-main/`](design/delete-button-animation-main/), done rather than perfect). Then I described it to Claude Design, and things escalated: what came back was a lab page with forty more of them, each a different way of making a file go away, plus a forty-first that deletes the page itself (it comes back, don't worry). I asked for more anyway, and the third volume is twenty deliberately idiotic ones: a button that dodges the cursor, a cookie banner in the way, a progress bar that stalls at 99% and a paywall in front of the bin.

This repository turns that prototype into a real thing: a prerendered SvelteKit page, a Storybook with the components laid out by atomic design, and an animation engine in plain TypeScript with one module per effect. Five of the buttons are honestly good UX (hold to confirm, an undo window, slide to delete, an inline "are you sure?" and type to confirm); the other fifty-six are a shredder, a black hole, a paper plane, a one-tonne weight, a robot vacuum, a hydra that grows two heads for every one you delete, and friends. They all run on the Web Animations API and nothing but boxes, gradients and `clip-path`: no images, no SVGs, no emoji this time.

## Setup

You need Node 26 (see `.nvmrc`), Yarn 4 through Corepack, and [Task](https://taskfile.dev):

```sh
nvm use
corepack enable
task install
task dev
```

`task` with no arguments lists everything. The ports are fixed and chosen so this runs next to defx and web-again:

| task             | does                                                         |
| ---------------- | ------------------------------------------------------------ |
| `task dev`       | dev server with hot reload on :5193                          |
| `task build`     | prerender the page into `build/`                             |
| `task preview`   | serve `build/` like a static host on :4193 (real 404s, 301s) |
| `task storybook` | the component library on :6026                               |
| `task check`     | Prettier, ESLint, svelte-check                               |
| `task test`      | unit tests, and the browser tests in headless Chromium       |
| `task e2e`       | Playwright against the built page, including reduced motion  |
| `task ci`        | everything CI runs: check, test, build, e2e, Storybook build |

## Layout

```
src/lib/fx/            the effect engine: lifecycle (engine.ts), shared parts and helpers,
                       one module per effect in effects/, the registry and the Lab
src/lib/fx/fx.css      global dx- classes for the parts the engine builds at runtime
src/lib/components/    atoms / molecules / organisms / templates, stories beside them
src/lib/content/       the page copy and the card catalog, verbatim from the handoff
src/lib/design/        tokens.ts is the single source; tokens.css is generated and gitignored
src/routes/            the one page: binds the catalog to the lab template
scripts/serve.ts       a static server that behaves like the host, BASE_PATH included
e2e/                   Playwright: the page, keyboard paths, axe, layout, reduced motion
design/                the Claude Design handoff this was built from
```

There is no `svelte.config.js`; the SvelteKit configuration lives inline in `vite.config.ts`.

## The engine

An effect is an object with a badge and a `setup(ctx)` function. `setup` builds its controls into the stage element and arms them; most effects use `simple()`, which supplies the standard delete button and runs an async timeline when it is clicked. The context carries the stage, `A()` (an `Element.animate` with the lab's speed and the default easing applied), `wait()`, and `finish()`, which shows the badge, waits, fades the stage, and rebuilds it. Every cycle has its own abort signal: when a stage resets or unmounts, whatever was still pending from the old cycle stops instead of finishing on top of the new one.

A `Lab` holds the shared config (`speed`, `autoReset`), mounts stages, announces each deletion for a live region, and plays everything with `playAll()`. Driving it from a plain script, with no component in sight, looks like this:

```ts
import { Lab } from '$lib/fx';
import '$lib/fx/fx.css';

const lab = new Lab({ speed: 1 });
lab.mount(document.querySelector('#stage')!, 'shredder');
```

The button, trash icon, document and badge are global `dx-` classes. The engine builds them at runtime and the Svelte atoms render the same markup, so the button the page prerenders and the one the engine swaps in look identical. The trash icon draws in `currentColor`.

## Components

Atoms use no other components (`TrashIcon`, `DocIcon`, `CheckMark`, `MonoLabel`, `Button`, `CardCaption`). Molecules compose atoms (`DeleteButton`, `Badge`, `CardMeta`, `SectionHeading`). Organisms own their layout (`FxStage`, `FxCard`, `FxGrid`, `LabHeader`). `LabTemplate` is the page, and `LabScope` provides the shared `Lab` to every stage inside it. Storybook has a story per component, the design tokens, and one story per effect under _Effects_ with speed and auto-reset as controls.

## Deviations from the handoff

- Reduced motion skips a simple effect's timeline: a 150ms fade, then the badge. The five interactive ones keep their interaction.
- Each deletion is announced through a polite live region; decorative particles and cloned halves are hidden from assistive technology; focus returns to the stage after a reset; the undo countdown pauses while the pointer or focus is on the toast.
- Breakpoints, which the handoff does not have: below 760px the page gets a 16px gutter, tighter spacing and a full-width "Delete everything"; below 1024px the lede spans the full width. The grid column is `min(290px, 100%)`, so a phone narrower than 330px does not scroll sideways.
- Touch: buttons use `touch-action: manipulation`, so the page scrolls when a finger lands on one; only hold to confirm and the slide knob take the pointer for themselves. The hover wash only applies where hovering exists.
- #52 Wrong one animates its card's caption, which sits outside the stage; an aborted cycle puts it back.
- Volume I has a visually hidden heading, so the card headings do not jump from `h1` to `h3`.
- Contrast: the handoff's mono labels (`#8a8478`, 3.3:1), the red tags (3.9:1) and the green badge (3.5:1) fall short of WCAG AA at their size. Mono is now `#716c62` and green `#367b4d`, the same hues darkened; red text and red grounds holding text use `redText` (`#c53f29`), while shapes keep the original red. That includes Volume III's red captions, the APPROVED stamp and the Upgrade button. axe runs with every rule.
- #59 Screensaver corner changes the button's text colour on every bounce. Its red step uses `redText`; the teal one lasts a few hundred milliseconds mid-flight and stays as designed, below AA.

## Deploying

`.github/workflows/ci.yml` runs `task ci` with `BASE_PATH=/<repo>` on every push and pull request, so the end-to-end tests run against the build as it ships. On `main` (a push, or a manual run from the Actions tab) a second job publishes that same `build/` to GitHub Pages; pull requests never deploy. Pages has to be enabled with "GitHub Actions" as the source. All URLs in the build are relative, so the same output also works at a domain root or copied into another site.

## License

Copyright © 2026 Markus Mayer. Licensed under the [European Union Public Licence v. 1.2](LICENSE) (EUPL-1.2). The bundled fonts, Instrument Sans and IBM Plex Mono, keep their own SIL Open Font License.
