# Mode 7

Next.js 16 / React 19 / Tailwind 4 / sass-embedded / TypeScript 6 / PayloadCMS 3 on
Postgres. A marketing site running **two design systems side by side**:

- **v2** (colder palette) — the **homepage at `/`**, plus `/about`, `/services`, `/trade-in`.
- **v1** (warm palette) — `/shop`, `/cart`, `/checkout`, `/product`, `/contact`,
  `/green-energy`, `/smart-home`.

Only fonts are shared between them. **There is no v1 homepage**; `/homepage-v2`
307-redirects to `/` (`next.config.mjs`). Restore the old one from git if ever needed:
`git show 54bf880:src/app/page.tsx`.

`npm run dev` · `npm run build` · `npx tsc --noEmit` · `npx eslint`.
A bare `next build` clobbers `.next` underneath a running dev server, so set
`NEXT_DIST_DIR` when one is up.

---

## How a component is built

**One component, one colocated SCSS file, variants by data-attribute. Nothing is
styled by an inline `style` object.** The full rulebook is
`.claude/skills/section-components/SKILL.md` — read it before creating or porting
anything. The five rules in brief:

```
src/components/<group>/<Name>/
  <Name>.tsx
  <Name>.scss        @use 'utils' as *;  +  @layer components { … }
  index.ts           export * from "./<Name>";
```

1. **Tailwind for what does not move. SCSS for what does.** A property that changes
   at any breakpoint must NOT carry an unprefixed utility — utilities live in
   `@layer utilities` and beat component CSS at every width. The same element
   normally carries both: `className="grid items-center"` plus a
   `.thing { grid-template-columns: … }` rule.
2. **Everything a block does lives inside that block** — its breakpoints, its
   reduced-motion override, its `[data-*]` variants. Never a media query grouped at
   the end of a file. `@keyframes` is the only exception, since it cannot nest.
3. **Ramps use `fluid()`, fixed values use `rem-calc()`**, both through `#{}`.
4. **Content in JSON**, one file per route in `src/content/`. Never class names —
   Tailwind's scanner reads source text and never evaluates data.
5. **No comments, anywhere.** Reasoning goes in the commit message or here.

A component gets a folder only if it owns a stylesheet. A sheet shared by several
components lives one directory up (`components/green-energy/green-energy.scss`).
Register every sheet in its aggregator: `components/_baseComponents.scss` for
components, `templates/_baseTemplates.scss` for chrome, `blocks/_baseBlocks.scss`
for page sections. **`main.scss` never needs editing.**

`node scripts/conformance.mjs --dir src` audits all of the above. It exits non-zero
on findings and prints file:line plus the fix.

---

## Things that are true and cost time to learn

**Cascade order is arranged, never declared.** Tailwind's PostCSS plugin strips a
bare `@layer a, b, c;`. The order comes from the import order in each route-group
layout: `base.scss, legacy.css, main.scss, globals.css` => base, legacy, components,
theme, utilities. Reverse two and every component class silently loses to a utility,
or a ported rule silently loses to the legacy rule it was meant to replace.

**A `fluid()` or `rem-calc()` without `#{}` emits literal text and the whole
declaration is dropped** — no error, anywhere. This is the single most expensive
silent failure in the codebase.

**An unregistered stylesheet never loads.** Sass never sees it, the build is green,
and the page renders with whatever the components happen to declare inline. Two
sheets shipped this way before the audit started checking for it.

**A rule moving between layers changes who wins.** Moving
`.m7-ss__input:focus-visible { outline: none }` out of `legacy.css` into a component
sheet flipped it from losing to the global `:focus-visible { outline: 2px solid }` to
beating it, and the keyboard focus ring silently disappeared. Where a page scope
re-asserts something site-wide (`.tradein-page :focus-visible`), a component rule of
equal specificity in the same layer is settled by aggregator order.

**Inline styles out-specify the stylesheet.** A resting `opacity`, `display` or
`background` set inline means the `:hover`, media-query or state rule never fires.
Removing one either activates dead CSS or drops a live rule — check which before
deleting. An `!important` that outranks an inline style goes in the **same commit**
as that inline style, never a later one.

**Tailwind's `items-start` emits `align-items: flex-start`**, which is not
`align-items: start`. Where the original said `start`, it stays in SCSS.

**`display: none` removes an element from grid flow**, so every grid child carries an
explicit `gridColumn`.

**`:hover` and `:focus-within` are independent and will stack.** Resolve in React
state (`hover ?? focus`), not by leaving both live.

**Lenis owns scrolling.** No `scroll-behavior: smooth`. `useLenis` exposes
`scrollPageToTop()`; the instance is otherwise private.

**`overflow-x: clip`, never `hidden`** — `hidden` makes the element a scroll
container and every `position: sticky` inside it resolves against that.

**Chrome is chosen by route group, not by matching the pathname.**
`src/app/(v2)/layout.tsx` renders `V2Chrome`, `(v1)/layout.tsx` renders `V1Chrome`.
Route groups add no URL segment, so moving a route between design systems is moving
its folder. This replaced a pair of `startsWith()` pathname lists in which `"/"` could
never appear, because every pathname starts with it.

---

## The gold rule — load-bearing, read before touching colour

The v2 accent is Mode 7's gold `#F0C044`. Measured: on `wash` **1.40:1**, on `white`
**1.70:1**, on `ink` **10.02:1**.

**Gold is a ground, not a text colour** — it fails even the 3:1 large-text floor on
every light surface.

- Gold as a **fill**, with `accentOn` `#1C150F` on top (10.60:1).
- Gold as **text** only on `ink` (10.02:1) — the stats figures, dark-band labels.
- Small accent text on light grounds uses `accentText` `#79662F` (4.60:1 on wash).
- **Never white on gold** (1.70:1). Filled gold buttons take an ink label.

The hero's rotating word sits as dark text (`V2.ink`) under a permanent half-height
gold marker: **10.02:1** on the marker, **17.07:1** above it on the white section
ground.

---

## Typography

| role | face | token |
|---|---|---|
| display | **Alegreya** | `--font-v2-display` |
| body / UI / labels | **Outfit** | `--font-v2-body`, `--font-v2-label` |
| v1 headings | **Space Grotesk** | `--font-m7-head` |
| v1 body / mono | **Outfit** / **Space Mono** | `--font-m7-body`, `--font-m7-mono` |

Registered in `src/app/layout.tsx` **alongside, never instead of** v1's faces.

**Removing a font variable invalidates every rule that references it.** A
`font-family` whose `var()` no longer resolves is dropped entirely — it does not fall
through to the fallbacks written beside it. Grep every `--font-*` before touching
`layout.tsx`.

Alegreya metrics per 100px: ascent 74.2, descent 24.2, x-height 45.6. The deeper
descender is why hero leading sits at 1.04.

Explored and rejected: **Josefin Sans** (x-height 24% smaller than Inter at the same
nominal size), **Space Grotesk** for v2 display (40% wider; pushed the hero to four
lines), **Instrument Serif** / **Noto Serif** (both fine; Alegreya chosen for warmth),
**JetBrains Mono** (retired in favour of Outfit so v2 loads one fewer webfont; the
`mono` keys remain as their own tokens because every label call site still reads a
tracking value distinct from running body copy).

---

## Content rules

Everything comes from `src/content/<route>.json`. Where the reference design had
content Mode 7 lacks, the shape was **repurposed with real content, never filled with
invented facts**.

- Case-study rows carry capabilities and **no money metrics** — Mode 7 has none.
- The stats band renders `logos.length` and `pillars.length`, **never a hardcoded
  number**. Derive, don't assert.
- **The hero's rotating word pool must stay descender-free** while
  `HeroHeadlineV2Scramble` is live — its mask clips at the 1.04em line box, not the
  font box, and the constraint binds the random flicker-glyph set too. Every current
  word (Pocket, Home, Office, Studio, Commute, Future) clears it. Adding one with a
  `g`, `y`, `p`, `q` or `j` requires re-deriving the mask height first. The rule is
  **dead** for the parked `HeroHeadlineV2Wipe`, which has no clipping element at all.

**Imagery:** CC0 files in `public/hero/`, provenance in `public/hero/CREDITS.md`. Two
exceptions recorded there: `about-hero*.webp` are **AI-generated, not CC0**, and the
four `lifecycle-*.webp` have **no traced provenance**. Neither group is cleared for
commercial use on the strength of that folder alone.

**The team and testimonial faces are stock models beside invented names and quotes.**
Fine for a prototype, **must be replaced before launch** — a real face attached to a
fabricated endorsement reads as a real endorsement.

---

## Parked and orphaned

Built, verified, mounted on no route: `LifecycleV2`, `WhyV2`, `InsightsV2`,
`CtaBandV2`, `HeroHeadlineV2Wipe` (each parked at the owner's request), and
`page/DarkPanel`, `page/DarkStat`, `page/IconCard`, `page/StatBar` (built for sections
never mounted). All kept deliberately. `InsightsV2` reads `testimonials[1..3]`; with
it parked, `QuoteV2`'s `testimonials[0]` is the only testimonial displayed anywhere.
`green-energy/EnergyScrolly` is likewise parked on `/green-energy` (owner's request);
its stylesheet stays registered and `green-energy.json`'s `scrolly` key stays intact.
`smart-home/MediaBanner` is parked on `/smart-home` the same way.

---

## What remains

`src/app/legacy.css` is down to ~459 lines and is no longer route CSS. It holds the
box-sizing reset, the `:root` colour roles and `--m7-pad`/`--m7-max`, the document
defaults (`html`, `body`, `p`), Lenis's classes, scrollbars, `::selection`,
`:focus-visible`, ~20 keyframes, and four helpers still in use (`.m7-wrap`,
`.m7-top-*`, `.m7-annot`, `.m7-modal`). Emptying it means finding those a home in the
SCSS infrastructure **without changing which layer they land in** — see the
focus-visible note above.

**Tailwind Preflight is OFF, deliberately.** Tailwind is composed from `theme.css` +
`utilities.css` by hand in `globals.css`. Turning it on moves the whole site, because
the design leans on UA defaults for headings, lists and inherited line-height.
Deleting `legacy.css` does not change that on its own.

## Verifying

There is no automated visual gate; a parity harness existed and was removed at the
owner's request (restore from the parent of the commit that deleted it if wanted).
Verify with `npx tsc --noEmit`, a production build, `node scripts/conformance.mjs`,
and `node scripts/shot.mjs --url <base> --routes /,/shop --widths 390,1440` for
screenshots.

**Measure the rendered page, not the diff.** Nearly every defect this codebase has
had typechecked, linted and returned 200 — the dual-lit rows, the dead hover rule, the
off-screen nav button, the non-serif titles, the vanished focus ring, the stylesheet
that was never loaded.
