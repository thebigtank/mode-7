---
name: section-components
description: How to build or port a component or page section in Mode 7 — Tailwind for what does not move, SCSS for what does, breakpoints inside the block, content in JSON, no comments. Load before creating or porting any component, and before writing any component stylesheet.
---

# Building or porting a component

Every styled component is the same shape: **one component, one colocated SCSS
file, laid out by classes in that file, with variants selected by
data-attributes.** Nothing is styled by an inline `style` object.

```
src/components/<group>/<Name>/
  <Name>.tsx
  <Name>.scss
  index.ts     export * from "./<Name>";
```

The barrel exists so that moving a component into a folder costs zero call-site
edits: `@/components/trade-in/ValuationWorkspace` keeps resolving. Components
here use named exports, so one re-export line is the whole file; add
`export { default } from "./<Name>";` only for one that actually has a default.

Register the stylesheet in the matching aggregator — `src/app/scss/blocks/
_baseBlocks.scss` for page sections, `components/_baseComponents.scss` for
shared primitives, `templates/_baseTemplates.scss` for chrome. `main.scss`
never needs editing.

**A component gets a folder if and only if it owns a stylesheet.** One with no
styles of its own stays a flat `.tsx` — a folder would add nothing. A
stylesheet genuinely shared by several components lives one directory up
rather than being filed arbitrarily under one of them.

## The five rules

### 1. Tailwind for what does not move. SCSS for what does.

This is not taste, it is the cascade. Component stylesheets sit in
`@layer components`; Tailwind utilities sit in `@layer utilities`, which is
registered last and therefore **always wins, regardless of specificity**.

So a property that changes at any breakpoint must not carry an unprefixed
utility on that element. `className="p-4"` plus
`@media (min-width: 64rem) { .x { padding: 2rem } }` yields 1rem at every
width, silently.

| `className` | the `.scss` |
|---|---|
| display, position, flex/grid direction and alignment | every width, height, padding, margin, gap, grid track |
| `overflow`, `z-*`, `pointer-events`, `object-cover` | every font-size, line-height, letter-spacing |
| `font-*` family and weight, theme colours | every background, gradient, `::before` / `::after` |
| `uppercase`, `text-center` | every `@media` block and every `[data-*]` variant |
| spacing and type that is genuinely **constant** | |

Read a CSS variable from Tailwind with the v4 shorthand: `w-(--foo)`,
`mt-(--foo)`, `text-(length:--foo)`. **`w-[--foo]` compiles to nothing.**

### 2. Breakpoints live inside the block.

Every component stylesheet opens with one line:

```scss
@use 'utils' as *;
```

which brings `fluid()`, `rem-calc()`, `mq()` and the breakpoint map. Then:

```scss
@layer components {
  .thing {
    --thing-pad: #{fluid(24, 48)};
    padding-block: var(--thing-pad);

    @include mq(tablet) {
      --thing-pad: #{fluid(48, 96)};
    }
  }
}
```

Mobile-first `min-width` for anything new. **Never flip a ported `max-width`
rule to `min-width`** — that inverts which side is the default and is the
easiest way to lose pixel parity without noticing. `mq(name, max)` emits an
exclusive upper bound so a max block and its min partner tile without leaving
a width served by neither.

Named breakpoints are `phone-small phone-medium phone tablet desktop-small
desktop-medium desktop-large`. **Do not use `sm:` / `md:` / `lg:` / `xl:`** —
they still exist and they do not match these.

A value a ported rule already used and nothing else shares — 620, 939, 1080 —
stays a raw literal in that one stylesheet. Do not name it, do not tokenise
it, do not invite reuse.

### 3. Ramps go in a custom property, through `#{}`.

```scss
--thing-gap: #{fluid(16, 32)};   /* correct */
--thing-gap: fluid(16, 32);      /* emits the literal text, silently dropped */
```

Sass treats a custom property value as opaque text, so a missing `#{}` ships
`fluid(16, 32)` to the browser, `var()` substitutes that into a length, and
the declaration resolves to its initial value with no error anywhere. This is
the same failure that left the boilerplate's own `.wrapper` with no padding.

### 4. Content in JSON. Never class names in JSON.

One file per route in `src/content/`. Copy, image `src`/`alt`/`width`/`height`,
booleans, and semantic variant values (`"cream"`, `"left"`) only.

Tailwind's scanner reads source text and never evaluates data, so a class name
stored in a content file is never generated — no error, no style. The same is
true of a constructed class: `` `text-${tone}` `` generates nothing. Use a
lookup table, or key the CSS off a data-attribute.

JSON imports widen to `string`, so normalise at the boundary:

```ts
const GROUND = { cream: "cream", dark: "dark" } as const;
const ground = GROUND[content.ground as keyof typeof GROUND] ?? "cream";
```

Two derivations must survive any content move: the stats band renders
`logos.length` and `pillars.length`, never a hardcoded number; and the hero's
rotating word pool must stay descender-free while `HeroHeadlineV2Scramble` is
live, because its mask clips at the 1.04em line box, not the font box.

### 5. No comments. Anywhere.

No docblocks, no `/* */`, no `//` — in components or in stylesheets. Reasoning
belongs in the commit message, in `CLAUDE.md`, or here. Prose survives only in
`next.config.mjs`, `src/lib/*` (the domain layer) and this file.

Never write prose inside a `className` string: every word ships as a class
token and Tailwind generates a utility for any that collide (`hidden`, `block`,
`flex`).

## Porting an existing component

1. Read the rules that currently style it — its slice of `legacy.css`, its
   inline `style` objects, and any `.v2-*` rule in `V2Styles.tsx`.
2. Move the rules into `<Name>.scss` **verbatim first**, then convert what
   Tailwind should own. Two steps, not one.
3. Delete the inline styles and the legacy rules **in the same commit**. An
   inline resting `opacity`, `display` or `background` is what has been
   suppressing a `:hover`, media-query or state rule; removing one without the
   other either activates dead CSS or drops a live rule.
4. **An `!important` in legacy.css that outranks an inline style must not be
   removed before that inline style is gone.** Same commit, never a later one.
   `legacy.css` line ~1274 and the three grid helpers around lines 894-910 are
   both this shape; the grid helpers span ~33 grids, so they can only go with
   the last route that uses them.
5. Colours come from a token. No hex, no `rgb()`, in any stylesheet — `var()`
   an existing `--color-m7-*` / `--color-v2-*`, and mint a new token rather
   than guessing a near-match into an existing one.
6. Gate before claiming it works: `scripts/parity/README.md`.

## Traps that have already cost time here

- **Cascade order cannot be declared, only arranged.** Tailwind's PostCSS
  plugin strips a bare `@layer a, b, c;` statement out of the file it
  processes, so the order is set by the import order in each route group
  layout, and nothing errors if you get it wrong:

  ```
  base.scss    @layer base        resets and document defaults
  legacy.css   @layer legacy      the original stylesheet, shrinking
  main.scss    @layer components  everything ported so far
  globals.css  @layer theme, utilities
  ```

  A ported rule beats a rule still in legacy.css; a utility beats both.
- **`_utils.scss` must emit zero CSS.** It is `@use`d from every component
  stylesheet; anything emitting would emit once, from whichever of them Sass
  loaded first, and land wherever that fell in the cascade.
- **A ported rule must beat the legacy rule it replaces, and only layering
  makes that true.** While legacy.css was unlayered it outranked every layered
  rule regardless of specificity, so porting /trade-in dropped its lede from
  18px to 15px (a bare `p { font-size }` in legacy beating
  `.tradein-page .t-lede`) and its input's radius from 4px to 3px (a global
  `:focus-visible { border-radius: 3px }` beating `.t-input`). Neither errored;
  the second was visible only to tier 3. legacy.css is now `@layer legacy`,
  which settles the whole class of them.

- **Overrides of a not-yet-ported shared component stay in legacy.css.** The
  `.tradein-page .m7-ss*` SearchSelect reskin overrides base `.m7-ss*` rules
  defined in the same file, and they settle by specificity only while both sit
  in the same layer. Port the override with the component, not before.
- **Preflight is currently OFF.** Tailwind is composed from `theme.css` and
  `utilities.css` by hand. Do not restore `@import "tailwindcss"` until
  `legacy.css` is gone — it moved all 561 parity captures when tried.
- **A removed font variable takes the whole stack with it.** A `font-family`
  whose `var()` no longer resolves is dropped **entirely** and does not fall
  through to the fallbacks written beside it. Grep every `--font-*` before
  touching `layout.tsx`.
- **`display: none` removes an element from grid flow.** Every grid child
  carries an explicit `gridColumn` for this reason.
- **`:hover` and `:focus-within` are independent conditions** and will stack.
  Resolve in React state (`hover ?? focus`) rather than leaving both live.
- **Lenis owns scrolling.** No `scroll-behavior: smooth`. `useLenis` exposes
  `scrollPageToTop()`; the instance is otherwise private.
- **`overflow-x: clip`, never `hidden`.** `hidden` makes the element a scroll
  container and every `position: sticky` inside it resolves against that
  instead of the viewport.
