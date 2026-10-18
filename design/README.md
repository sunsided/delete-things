# Handoff: Delete Lab — Forty-One Deletion Button Animations

## Overview
A single-page "lab" showcase on a personal website. It shows 41 interactive delete buttons in two card grids: Volume I (01–20) and Volume II (21–40), plus the bonus #41 "Delete the page". Each one plays its own deletion animation when triggered, shows a confirmation, and resets itself automatically. Five are deliberately good, production-grade UX patterns: 02 Hold to confirm, 06 Undo window, 21 Slide to delete, 22 Are you sure?, and 36 Type to confirm. The rest are playful.

## About the Design Files
The files in this bundle are **design references created in HTML**: working prototypes that show the intended look, timing and behaviour. They are not production code to ship as-is. Recreate them in the target codebase using its existing patterns. That could be React or Vue components, plain web components, or whatever the site already uses. If there is no environment yet, a sensible choice is one framework-agnostic `DeleteButton` module per effect (vanilla JS + the Web Animations API), plus a thin page shell.

The prototype's animation engine (`delete-fx.js` and `delete-fx-2.js`) is a reasonable starting point. It is already vanilla JS with no dependencies, built on the Web Animations API (`element.animate`). Refactor it into separate modules rather than copying it wholesale.

## Fidelity
**High-fidelity.** Colours, type, spacing, durations and easings are final. Recreate them exactly.

---

## Page layout (`Delete Lab.dc.html`)
- `main`: min-height 100vh, background `#f4f1ea`, padding `56px clamp(20px,4vw,56px) 72px`.
- **Header** (max-width 1320px, centred, margin-bottom 40px): a wrapping flex row with `justify-content: space-between`, `align-items: flex-end`, gap 24px.
  - Eyebrow: "Lab / Interaction study 017". IBM Plex Mono 500, 12px, uppercase, letter-spacing .08em, `#8a8478`.
  - H1: "Forty ways to delete a file." Instrument Sans 600, `clamp(36px,5vw,64px)`, line-height 1, letter-spacing −.03em, `text-wrap: balance`.
  - Lede (max-width 720px): Instrument Sans 400, 17px/1.5, `#5f5a51`.
  - **"Delete everything"** button: 48px tall, padding 0 22px, radius 10px, background `#1d1b18`, text `#fbf9f4`, 15px/500. On hover, background and border turn `#d4462f`. It triggers every card's animation, staggered by 90ms per card.
- **Grid**: `grid-template-columns: repeat(auto-fill, minmax(290px, 1fr))`, gap 16px, max-width 1320px.
- **Card**: background `#fbf9f4`, 1px border `#e3ddd1`, radius 14px, overflow hidden, column flex.
  - Meta row (padding 14px 16px 0): the number on the left and a tag on the right. IBM Plex Mono 500, 11px, uppercase, letter-spacing .06em, `#8a8478`. The two "Actually good UX" tags use `#d4462f`.
  - **Stage**: height 210px, `position: relative`, `display: grid; place-items: center`, **overflow hidden**. Dot-grid background: `radial-gradient(#e2dccf 1px, transparent 1px)` at 14px × 14px.
  - Text block (padding 0 16px 16px, gap 4px): title in Instrument Sans 600 16px/1.2; description in Instrument Sans 400 13px/1.45 `#6b665d`, `text-wrap: pretty`.
- Footer: IBM Plex Mono 12px `#8a8478`, "Inspired by a silly little delete button. It was right."

## The base delete button (shared by every effect)
- Height 48px, padding 0 22px, inline-flex, centred, gap 10px.
- Border 1.5px `#1d1b18`, radius 10px, background `#fbf9f4`, text `#1d1b18`.
- Instrument Sans 500 15px, `box-sizing: border-box`.
- Hover background: `#f6e9e4`.
- Content is a trash icon followed by the label "Delete".
- **Trash icon**: a 14×17 box built from CSS (no image or emoji).
  - Body: 12×12 at (1, 5). Border 1.5px on the left, right and bottom; bottom corners rounded 3px.
  - Lid: a 16×2 bar at (−1, 2) with `transform-origin: 0 100%`, so it can rotate open.
  - Handle: a 6×3 box sitting on the lid with a 1.5px top/side border.
- **Document icon** (used by 01 and 03): 22×28, white, 1.5px ink border, radius 3px. It holds three 1.5px lines at 60% opacity; the last line is 60% width.

## Shared lifecycle
1. **Idle**: the button is clickable.
2. **Trigger** (click, or hold for #02): set `busy`, set the cursor to default, and play the timeline. Ignore further triggers while busy.
3. **Finish**: show a confirmation badge centred on the stage, unless the effect returns `null` because the effect *is* the message (#09 and #10).
   - Badge: an 18px green `#3f8f5a` circle with a white CSS check mark, followed by the label in Instrument Sans 600 14px `#3f8f5a`.
   - Entrance: from translateY(+20%) and scale .9 to rest, 380ms, `cubic-bezier(.3,1.5,.5,1)`.
4. **Reset**: if `autoReset` is on, wait 1600ms. Otherwise wait for a click on the stage. Then fade the stage out (220ms), cancel all animations, rebuild the button, and fade back in (300ms).

**Global config**
- `speed` (0.25–2, default 1): divides every duration and delay.
- `autoReset` (boolean, default true).

**Default easing** is `cubic-bezier(.2,.7,.2,1)`. All animations use `fill: forwards` unless stated otherwise.

**Shared helpers to port**
- `burst(cx, cy, n, colors, [minDist, maxDist])`: rectangular confetti, 4–10 × 3–8px. Pieces fly out radially with a +24px downward bias, spin ±400°, and fade over 600–950ms with `cubic-bezier(.1,.8,.3,1)`.
- `ring(cx, cy, color, size)`: a 2px circular outline that grows from scale .2 to 1 while fading to 0, 520ms.
- `jitter(n, amp)`: keyframes with random ±amp px translations; the first and last frames are zeroed.

---

## The 20 effects
Times are in ms at speed 1. "Card" is `#fbf9f4` and "ink" is `#1d1b18`.

| # | Key | Title / tag | Timeline | Badge |
|---|---|---|---|---|
| 01 | classic | Into the bin / The original | Border and background fade to transparent (300). Label fades out (250). The icon moves to the button centre and scales to 1.9 (420, overshoot `(.3,1.4,.5,1)`). Lid opens −40° (200). A document drops in from 112px above, rotating −10°→6° and shrinking to .4 (650, `(.5,0,.8,.6)`). Lid snaps shut (200, `(.3,1.8,.5,1)`). The icon pulls back 14px, then slides 130px right and fades (560, `(.6,0,.8,.4)`). | Deleted |
| 02 | hold | Hold to confirm / **Actually good UX** | Label: "Hold to delete". On pointerdown or Space/Enter: a fill `#f2d0c6` grows `scaleX` 0→1 from the left over 1200ms (`(.4,0,.8,1)`). The label changes to "Keep holding…" and the button jitters ±1.2px every 110ms. On release before the end, the fill reverses at 3× speed and the label resets. When the fill completes: scale 1→1.07→0 (420), then a red ring and a 12-piece burst. Use pointer events with `touch-action: none` and suppress the context menu. | Deleted |
| 03 | shredder | Shredder / Mechanical | Icon and label fade (200). The button collapses to a 10px-tall ink slot with radius 5 (350). A document slides down into the slot over 1200ms linear, clipped by `clip-path: inset(0 0 Xpx 0)`; the button jitters ±1px throughout. Five 3.6px strips grow out below the slot in sync (`scaleY` from the top, starting at 45%). The strips then fall about 85px with random rotation, staggered 60ms (700). The slot fades out. | Shredded |
| 04 | dust | Turn to dust / Cosmic | The button area is sampled on a 5px grid, keeping about 65% of cells (~200 particles, 2.5–4.5px). Edge cells and 16% of the others are ink; the rest are `#cfc7b8`. The button is wiped away by `clip-path: inset(... 0→100% left)` over 1020ms linear. Each particle starts when the wipe reaches its column (plus up to 120ms random), drifts +30–120px x and −80 to +10px y, and fades (700–1150). | Dusted |
| 05 | crumple | Crumple & toss / Physics | Content fades (150). A bin (the trash icon at scale 2.6) appears 92px to the right. The button morphs into a 48px irregular ball (radii 48/52/42/58%), rotating 220° and scaling to .55, with background `#e2dccf` (620, `(.6,0,.3,1)`). The bin lid opens. The ball follows a parabolic arc (peak about −75px) into the bin and fades (650). Lid closes, the bin wobbles ±8°, then fades. | Binned |
| 06 | undo | Undo window / **Actually good UX** | The button fades out (180). An ink toast (48px tall, radius 10px) slides in, reading "File deleted · 4s · Undo". Undo is `#f39a83`, underlined. A 3px `#f39a83` bar along the bottom drains `scaleX` 1→0 over 4000ms linear while the seconds count down. **Undo** restores the button with a spring (420) and shows a mono line "restored — nothing was lost" for 2.2s; there is no reset. **Timeout** squashes the toast to scale(.5, .1) and fades it (360). Production note: commit the real delete only when the timer expires. | Gone for good |
| 07 | blackhole | Event horizon / Cosmic | The label is split into per-character spans. A 64px hole (a radial gradient from ink through red `#d4462f` to transparent) scales in behind the button (420, overshoot) and pulses 1↔1.08. The frame fades away. Each piece (icon, then each letter) spirals to the centre — via a point offset 90° and 0.6× — rotating 480° and scaling to 0 (760, staggered 55ms, `(.5,0,.9,.5)`). The hole flares to 1.3, collapses to 0, and leaves a red ring. | Consumed |
| 08 | slice | Clean cut / Physics | A 2px red blade (with glow) sweeps across at −14° (320). The button is replaced by two clones clipped along that line. The halves separate along the cut by 8px, then fall about 125px, rotating ∓28–32° and fading (950–1000, `(.5,0,.9,.6)`). | Sliced |
| 09 | backspace | Backspace / Meta | A blinking 1.5px red caret appears after the label. After 500ms, letters are deleted from the end, one every 75ms. The icon scales out. Then "gone." is typed in IBM Plex Mono `#8a8478`, one letter every 110ms. The border fades to `#d9d2c4`. | none |
| 10 | stamp | Rubber stamp / Bureaucratic | A "DELETED" stamp — IBM Plex Mono 700 22px, letter-spacing .14em, 3px red border, radius 6px, `mix-blend-mode: multiply` — slams from scale 2.8 down to 1, settling at −12° (300, `(.6,0,.9,.6)`). The stage shakes ±3px (260). The label is struck through and the button fades to 35% opacity at scale .96. Seven red ink specks appear around it. | none |
| 11 | gravity | Gravity / Physics | The frame fades to 12% ink. Each piece (icon and letters) falls to the floor (18px above the stage bottom) and bounces: floor → −24 → floor → −7 → floor. Falling segments use `(.55,0,1,.45)` and rising segments use `(0,.55,.45,1)`. Each piece gets random rotation ±35° (growing to 1.6×) and ±14px x drift. 950ms each, staggered 80ms. | Dropped |
| 12 | fuse | Short fuse / Chaos | A 2px ink cord (up to 70px) extends out from the left edge (220). A gold spark `#ffd27a` with an orange glow runs along it over 1000ms linear while the cord burns away behind it and throws off sparks. The button jitters ±3px (380), then flashes `#fff3c4` (80). It is hidden and replaced by an orange flash puff, a 150px orange ring, a ±4px stage shake, and a 26-piece burst (ink, red, orange, line colour). | Detonated |
| 13 | eraser | Eraser / Material | A 40×22 eraser (pink `#e9a596`, a 15px sleeve in `#efe9dc`, 1.5px ink outline, rotated −18°) enters from the upper left. It zig-zags across the button in 11 strokes over 1300ms linear while `clip-path` wipes the button from the left. Eighteen crumbs (`#d98b7b` and ink, 2–3.5px) fall 30–60px. The eraser exits to the upper right. | Erased |
| 14 | melt | Meltdown / Material | The icon fades. The background and text fill with ink (350). Seven drips (6–12px wide, rounded bottoms) grow down from the bottom edge (900–1300). The button sags from its bottom edge: scale(1.03, .8) and then scale(1.18, .1) into a puddle (1500). The drips drop off and fade, and the puddle fades. | Melted |
| 15 | glitch | Glitch & CRT off / Chaos | Red and teal (`#2a9fb0`) clones sit on top with `multiply` blending. For 700ms they use `steps(14)` easing with random ±7px offsets and horizontal-band `clip-path`, while the original skews ±10°. Then all three do a CRT power-off: scale(1.1, .04) with brightness 2, then scale(0, .04) (380, `(.7,0,.3,1)`). A white dot glows and fades (380). | Signal lost |
| 16 | plane | Paper plane / Cosmic | The button folds back with `perspective(500px) rotateX(78deg)` (280), then collapses and fades. A 40×26 paper plane — two `clip-path` triangles, ink and `#6b655b` — appears and flies a loop: a dip back, a climb, a dive, then out to the upper right (+240, −140). 1400ms, `(.4,0,.7,1)`. | Flown off |
| 17 | burn | Burn after reading / Material | A glowing edge (a 4px gradient of orange, red and gold with a glow, flickering in brightness) rises from bottom to top over 1500ms linear. Below the edge, the button is removed with `clip-path: inset(... bottom 0→100%)`. A charred gradient overlay (`#2b1a10` fading to transparent) rides just above the edge. 28 embers rise 25–65px and six blurred smoke puffs drift up. | Burned |
| 18 | balloon | Overinflated / Chaos | The button inflates in stages: 1.12/1.18 → 1.07/1.1 → 1.26/1.33 → 1.2/1.26 → 1.42/1.5. The radius grows from 10 to 30px and the background warms to `#eebcae` (1150). It trembles ±1.6px (320) and is hidden. A red ring, a 28-piece burst, and "POP" (Instrument Sans 700 28px, red, −6°) appear. | Popped |
| 19 | trapdoor | Trapdoor / Physics | At rest there is a floor line (3px `#d9d2c4`) 6px below the button, with two ink trapdoors directly beneath it, each half the button width + 8px. On trigger the button hops up 6px (260). The doors swing ±82° open (240). The button falls with quadratic acceleration over 520ms and is clipped as it passes below the floor. The doors swing shut with a bounce: −10 → 4 → 0° (420). | Down the hatch |
| 20 | launch | Launch into the sun / Chaos | A 22×36 teardrop flame (gradient `#fff3c4` → orange → red, flickering at 70ms) appears under the button at scaleY .45. The button rumbles ±1.4px while the label counts down "3", "2", "1" (320ms each). On "Bye", ten smoke puffs (`#d6cfc2`) spread sideways, the flame grows to 1.5, and the button shoots up 340px (900, `(.6,0,.9,.4)`). | Launched |

---

## Volume II (21–41)
**Section header**: a 1px top border `#e3ddd1` with 28px padding above it and 56px top margin. Eyebrow "Volume II" uses the same style as the page eyebrow. The H2 reads "Twenty more, because twenty wasn’t enough." in Instrument Sans 600 `clamp(26px,3vw,36px)`/1.1, letter-spacing −.02em. The grid and cards are identical to Volume I.

Effects 21, 22 and 36 build their own controls instead of using the base button; everything else uses the base button.

| # | Key | Title / tag | Timeline | Badge |
|---|---|---|---|---|
| 21 | swipe | Slide to delete / **Actually good UX** | A 230×48 pill track (1.5px ink border, radius 24) with the muted label "Slide to delete". The 40px ink knob holds a card-coloured trash icon. Dragging uses pointer capture. A `#f2d0c6` fill follows the knob, and the label fades as you drag. Releasing past 90% completes it; anything less springs back (350, `(.3,1.5,.5,1)`). On completion the track turns red (200), then collapses to a 48px circle, scales to .4 and fades (450). It's keyboard-operable with Enter or →. | Deleted |
| 22 | twostep | Are you sure? / **Actually good UX** | Clicking fades the button out (140). In its place: the mono caption "Delete this file?" with [Cancel] [Yes, delete] below it. Cancel is a ghost button with a `#d9d2c4` border; Yes, delete is solid red with white text. The two buttons slide in from the centre (320, overshoot). Cancel puts the original button back with a spring. Yes, delete makes it pulse to .92 and then scale to 0 (380). | Deleted |
| 23 | vacuum | Robot vacuum / Mechanical | A top-down 46px robot vacuum: body `#e9e3d6` with a 2px ink outline, a 5px `#6b655b` bumper arc on the front (left) edge only, an ink pill button and a pulsing green LED toward the back. Two 14px cross-shaped side brushes on the front edge spin at 300ms per turn. It drives across the whole stage from right to left (1600 linear) with a slight wobble. The button is erased in sync with `clip-path: inset(... right ...)`. Debris particles get pulled into the robot's path. | Vacuumed |
| 24 | hourglass | Sands of time / Material | Button becomes sand: background `#e2cfa3`, border `#b89c62`, text `#8a6f3d`. A 2px stream drops to the floor and a triangular pile grows (`clip-path` triangle, scale .2/0 → 1). The button drains from the top with `clip-path` (1700). Falling grains run along the stream. Finally the pile is blown away to the right. | Time’s up |
| 25 | tiles | Tile flip / Mechanical | The button is split into a 7×2 grid of clipped clones. Each tile flips `perspective(260px) rotateY(0→180deg)`, drops 30px and fades (600). Tiles are staggered by (column + row) × 70ms, giving a diagonal wave. | Flipped out |
| 26 | freeze | Freeze & shatter / Material | Frost (600): background `#e4f0f4`, border and text in ice blues `#8fb8c8` / `#4f8599`, plus an inset white glow. It then breaks into 10 polygon shards made from 5 jittered vertical slices × 2 halves. The shards first crack apart by 1–2px (`steps(1)`), hold for 260ms, then fall 90–140px with rotation (650–900). | Shattered |
| 27 | peel | Peel off / Material | Origin at the top-left corner. It lifts with `rotate3d(1,-1,0,-14deg)` and a growing drop shadow, then peels to −60/−70° and flies off up and to the right (800). | Peeled off |
| 28 | rain | Washed away / Material | About 46 raindrops (1.5px wide, `#7da7c4`) fall across the stage, with ripple ellipses at the floor. Each letter blurs, stretches vertically to scaleY 2.6, slides about 60px down and fades (1100). The frame washes out. | Washed away |
| 29 | teleport | Teleport / Cosmic | A 90px vertical beam (a teal `#2a9fb0` horizontal gradient) grows up from the floor behind the button, with rising sparkles. The button flickers in brightness and squeezes to scaleX .02 with a teal glow (700). It then shoots upward as a stretched line (240), and the beam fades. | Teleported |
| 30 | curtain | Magic trick / Theatrical | An ink valance (curtain rail) drops in above. Two striped red curtain halves close from the sides (`scaleX`, 500). The button is hidden behind them, and they open again (550). A ring of eight gold diamond sparkles bursts out. | Ta-da |
| 31 | ghost | Ghosted / Cosmic | Content fades. The button becomes a 70px ghost: radius 26/26/8/8, a translucent card colour, two ink eyes, and a mono "boo". It floats 150px up along a sine wobble and fades (1500). | Ghosted |
| 32 | domino | Domino / Physics | The frame fades. Each piece pivots on its bottom-right corner and rotates to 90° with a small settle (90 → 80 → 90), staggered 95ms per piece (520 each). The pieces then fade. | Toppled |
| 33 | flip | The other side / Meta | `rotateY` 0→90° (240, ease-in). At the midpoint the content switches to a green check and "Deleted": green border and text on a `#eef5ef` background. It finishes −90→0° with overshoot (420). | none |
| 34 | quicksand | Quicksand / Physics | A sand band (`#e2cfa3`, dotted texture, `#c9ad74` top edge) rises in at button-centre + 10px. The button sinks with ease-in-out and a decaying ±4° wobble, clipped at the surface line (1800). Bubbles pop at the surface. | Swallowed |
| 35 | zap | Struck by lightning / Chaos | A double white screen flash, and a gold `clip-path` bolt from the top of the stage to the button, with a glow. The stage shakes. The button instantly chars: background and border `#2b2620`, text and icon `#6b655b`. Smoke rises. It then crumbles bottom-up into ash particles that fall to the floor. | Fried |
| 36 | typeconfirm | Type to confirm / **Actually good UX** | Caption: Type `delete` to confirm. Below it, a 190×40 mono input and a 190px-wide button that stays disabled (35% opacity) until the input matches "delete" (case-insensitive, trimmed). When it matches, the button turns red with white text and the input border turns red. Clicking it or pressing Enter makes the caption and input fade; the button pulses and scales to 0. | Deleted |
| 37 | weight | One-tonne weight / Physics | An ink trapezoid weight (72×62) with a handle and the label "1T" falls from above (ease-in). On impact the button squashes from its bottom edge to scale(1.18, .16). The stage shakes, dust puffs out to both sides, and the weight bounces 6px before both fade. | Flattened |
| 38 | fullstop | Full stop / Meta | Content fades. The button shrinks to a 6px ink dot (480), hops (500), and becomes the full stop for "Deleted". The word (Instrument Sans 600 22px) is revealed right-to-left by `clip-path`, ending at the dot. | none |
| 39 | redact | Redacted / Bureaucratic | A marker bar sweeps over the label and a block covers the icon (`steps(3)`). Then a full ink block replaces the button and squashes to a scaleY .34 redaction bar. A red mono caption "[ REDACTED ]" appears below. | none |
| 40 | hook | Reeled in / Mechanical | A 1.5px rope, a small crimp, and a U-hook whose right arm sits directly under the rope. It drops from the top with a swing (700). The button tilts on its top centre (400), then the hook and button are yanked off the top together (620, ease-in). | Reeled in |
| 41 | page | Delete the page / Bonus · nuclear | Button label: "Delete page". The whole `<main>` shakes (400). Every top-level block and every card falls off the bottom of the viewport with random ±28° rotation, staggered by screen position. A fixed overlay then reads "This page has been deleted." with a mono line "0 items remaining" (1400). That swaps to "Just kidding." in red with a pop, and the line becomes "restoring everything…". Everything springs back (720, `(.3,1.25,.5,1)`, staggered 28ms), and all animations are cleared. The trigger button fades out before the badge. This card is included in "Delete everything". | Nothing was harmed |

**Additional colours (Volume II)**

| Token | Value |
|---|---|
| Sand | `#e2cfa3` |
| Sand dark | `#b89c62` / `#c9ad74` |
| Ice | `#8fb8c8` / `#e4f0f4` |
| Teal | `#2a9fb0` |
| Rain | `#7da7c4` |
| Char | `#2b2620` |
| Robot vacuum body | `#e9e3d6` |
| Curtain stripe | `#b8392a` |
| Confirm-state green background | `#eef5ef` |


## State management (per button)
- `busy: boolean`: blocks re-triggering while an animation plays.
- Hold (#02): `holding: boolean` plus the fill animation's `currentTime` and `playbackRate`.
- Undo (#06): seconds `remaining` and the countdown timer, resolved by either the timeout or an Undo click. In production, delay the actual API delete until the timeout, or call a restore endpoint when Undo is clicked.
- Page level: `speed` and `autoReset`, plus a `playAll()` helper.

## Accessibility (to add in the real build)
These are recommended; the prototype does not fully implement them.
- Respect `prefers-reduced-motion`: skip straight to the badge, or use a short 150ms fade.
- Announce the confirmation through an `aria-live="polite"` region.
- Mark decorative particles and icons `aria-hidden`.
- Keep focus on a sensible element after the button resets.
- #02 already supports keyboard hold. Make sure the toast's Undo in #06 is reachable by keyboard and stays open long enough; pause the countdown on hover or focus.

## Design tokens
**Colours**

| Token | Value | Used for |
|---|---|---|
| Page | `#f4f1ea` | Page background |
| Card | `#fbf9f4` | Cards and buttons |
| Card border | `#e3ddd1` | Card outlines |
| Dot grid | `#e2dccf` | Stage background |
| Line | `#d9d2c4` | Floor line, muted borders |
| Ink | `#1d1b18` | Text, outlines, icons |
| Body text | `#5f5a51` | Header lede |
| Muted text | `#6b665d` | Card descriptions |
| Mono labels | `#8a8478` | Eyebrow, card meta, footer |
| Red | `#d4462f` | Primary accent |
| Red, on dark | `#f39a83` | Undo toast |
| Green | `#3f8f5a` | Success badge |
| Orange | `#f0a43a` | Fire and sparks |
| Gold | `#ffd27a` | Spark core |
| Hover wash | `#f6e9e4` | Button hover |

**Type**
- Instrument Sans 400/500/600/700 for UI and headings.
- IBM Plex Mono 400/500/700 for labels, the stamp, and the typed text.
- Both load from Google Fonts.

**Radii**: 10px for buttons and toast, 14px for cards, 6px for the stamp, 3–5px for small parts.

**Spacing**: 16px grid gap, 14–16px card padding, 10px button gap.

**Shadows**: none on the UI. Only the glows: the spark `0 0 10px 3px rgba(240,150,40,.85)` and the burn edge `0 0 10px 3px rgba(240,140,40,.7)`.

## Assets
None. Every icon and effect is built from CSS boxes, gradients and `clip-path`, with no images, SVGs or emoji.

## Changelog
- **v3**:
  - Added Volume II (21–40) and bonus #41.
  - Header copy changed to "Forty ways" and "Five of them are actually good UX".
  - #23 was redrawn as a top-down robot vacuum after earlier versions read badly.
  - #40 hook geometry was fixed so the hook lines up with the rope.
  - #41 now hides its button before the badge appears.
  - `delete-fx.js` exposes `DeleteFX.register(map)` and `DeleteFX.kit` (shared helpers) so `delete-fx-2.js` can add effects.
- **06 Undo window**: when the button comes back after Undo, its `display` is set back to `inline-flex`. Before, clearing it reset the button to the browser default and broke the icon/label layout.
- **19 Trapdoor**: the floor and doors are now re-laid out whenever the stage or button resizes (`ResizeObserver`) and once web fonts finish loading. Before, they were measured only once, so they ended up in the wrong place after a window resize. Layout is skipped while the animation is playing.

## Files
- `Delete Lab.dc.html`: the page shell (layout, copy, cards). Open it in a browser to see everything working. It loads `delete-fx.js`, and needs `support.js` next to it to run.
- `delete-fx-2.js`: Volume II effects 21–41. It waits for `window.DeleteFX`, then registers its effects through `DeleteFX.register({...})` using the shared helpers in `DeleteFX.kit`.
- `delete-fx.js`: the core animation engine plus Volume I effects.
  - Helpers: `btn`, `trash`, `doc`, `burst`, `ring`, `jit`, `badge`, `simple`.
  - The `FX` map holds one setup function per effect key; card stages declare theirs with a `data-fx="<key>"` attribute.
  - `mount()` handles the lifecycle and reset.
  - It exposes `window.DeleteFX.setConfig({speed, autoReset})` and `window.DeleteFX.playAll()`.
- Original inspiration: `delete-button-animation-main/` (the user's first version, kept for reference).
