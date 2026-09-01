# Mode 7

Next.js 15 / React 19 marketing site. Two parallel homepages:

- **`/`** — the Mode 7 homepage. Warm palette, tokens in `src/lib/theme.ts`.
- **`/homepage-v2`** — a parallel homepage on a separate, colder palette. Tokens in
  `src/lib/theme-v2.ts`. This file mostly documents v2, because it carries the most
  non-obvious constraints.

Dev server: `npm run dev`. **`npm run build` currently fails** on a pre-existing
`react/no-unescaped-entities` error in `src/app/green-energy/page.tsx` (lines 291, 394).
It is unrelated to anything in v2. It also clobbers `.next` underneath a running dev
server, taking the site down — prefer `npx tsc --noEmit` plus `npx eslint` while iterating.

---

## homepage-v2

A parallel homepage whose **section structure and layout** reference bynd.com, built with
**Mode 7's own content and images throughout**. Nine content sections plus header and footer.

### Files

```
src/app/homepage-v2/page.tsx        route
src/lib/theme-v2.ts                 V2 palette + V2_FONT + V2_TYPE
src/components/home-v2/
  Ui.tsx                            Band, Mono, H2 and other shared primitives
  V2Styles.tsx                      ALL v2 CSS (see the template-literal warning)
  ButtonV2.tsx                      the site button, v2-painted
  HeaderV2.tsx  FooterV2.tsx
  HeroV2.tsx  HeroHeadlineV2.tsx
  StatsV2.tsx  LifecycleV2.tsx  CapabilityGridV2.tsx
  WhyV2.tsx  QuoteV2.tsx  WorkV2.tsx  CtaBandV2.tsx  InsightsV2.tsx
```

`SiteShell` suppresses the v1 header/footer on this route only (`isV2` early return, placed
after every hook so hook order stays stable). v2 supplies its own chrome. Lenis smooth
scroll still applies.

**v2 must not import `COLOR` from `@/lib/theme`.** The two palettes are deliberately
separate; only fonts are shared.

---

## The gold rule — load-bearing, read before touching colour

The v2 accent is Mode 7's gold `#F0C044`. Measured:

| gold on | ratio |
|---|---|
| `wash` `#E6EAE6` | **1.40:1** |
| `white` `#FFFFFF` | **1.70:1** |
| `ink` `#171D1D` | **10.02:1** |

**Gold is a ground, not a text colour** — it fails even the 3:1 large-text floor on every
light surface. Therefore:

- Gold as a **fill**, with `accentOn` `#1C150F` on top (10.60:1). Buttons, the CTA tile,
  the lifecycle hover fill, the hero marker.
- Gold as **text** only on `ink` (10.02:1) — the stats figures, dark-band labels.
- Small accent text on light grounds uses `accentText` `#79662F` (4.60:1 on wash).
- **Never white on gold** (1.70:1). Filled gold buttons take an ink label.

The hero's flipping word was once gold text at 1.40:1. It is now dark text under a
half-height gold marker: **14.85:1** above the band, **10.60:1** over it.

---

## Typography

| role | face | notes |
|---|---|---|
| display | **Alegreya** | `--font-alegreya` |
| body / UI | **Outfit** | `--font-outfit`, shared with v1 |
| mono labels | **JetBrains Mono** | `--font-jetbrains-mono` |

Registered in `src/app/layout.tsx` **alongside, never instead of** v1's Space Grotesk /
Outfit / Space Mono. v1 typography must stay untouched.

Explored and rejected, with reasons worth keeping:

- **Josefin Sans** — x-height 24% smaller than Inter at the same nominal size while cap
  height matches, so 16px body read closer to 12px.
- **Space Grotesk** — 40% wider than a condensed serif; pushed the hero to four lines.
- **Instrument Serif** / **Noto Serif** — both fine; Alegreya was chosen for warmth.

Alegreya metrics per 100px: ascent 74.2, descent 24.2, x-height 45.6. The deeper descender
is why hero leading sits at 1.04 rather than tighter.

---

## Traps that have already cost time

These are all real, all found the hard way. None produce an error.

**1. Removing a font invalidates every rule that references it.**
A `font-family` whose `var()` no longer resolves is dropped **entirely** — it does *not*
fall through to the fallbacks written beside it. Deleting Instrument Serif silently sent
`.v2-life-title` to the body sans; four rows of 48px type stopped being a serif with no
console error. **Grep every `--font-*` reference and move them together.**

**2. Inline styles out-specify the stylesheet.** Hit three times.
A resting `opacity`, `display` or `background` set inline means the `:hover`, media-query
or state rule never fires. Set resting state in CSS. Where an inline value must stay, the
override needs `!important` (see `.v2-life-row.is-active .v2-life-num`).

**3. `display: none` removes an element from grid flow.**
The nav's links hide below 980px; with auto-placement the actions block slid into column 2
and stopped sitting flush right. Every grid child carries an explicit `gridColumn`.

**4. `V2Styles.tsx` is one JS template literal.** A backtick inside a comment breaks the
whole file.

**5. `:hover` and `:focus-within` are independent conditions.**
Focusing one lifecycle row while hovering another lit both. Resolved in React state
(`hover ?? focus`) with no `:hover` styling left that could stack.

**6. Lenis owns scrolling.** `useLenis` exposes `scrollPageToTop()`; the module-level
instance is otherwise private. Measured: native `scrollTo` also reaches 0 because Lenis
adopts an external scroll position rather than fighting it — but routing through Lenis
keeps one animation and one source of truth.

---

## Content rules

Everything comes from `src/lib/content.ts`. Where bynd.com had content Mode 7 lacks, the
section shape was **repurposed with real content, never filled with invented facts**:

- Case-study rows carry the three `capabilities` and **no money metrics** — Mode 7 has none.
- The insights row carries testimonials, not articles. No dates.
- The stats band renders `logos.length` and `pillars.length`, never hardcoded numbers.
  (A brief once asserted 14 brand partners; the array has 13. Derive, don't assert.)
- The hero's rotating word set must keep the sentence tail true for every entry.
  **And no pool word may contain a descender.** The rolling slot's mask clips at the
  line box (1.04em), not the font box, because clipping at the font box let a slice of
  the outgoing word float above the headline and cut a bar through line 2. Every current
  word (Pocket, Home, Office, Studio, Commute, Future) clears a 1.04em box by >=8px top
  and >=12px bottom. Adding a word with a `g`, `y`, `p`, `q` or `j` — "Workshop", say —
  requires re-deriving the mask height first.

**Imagery:** 25 CC0 files in `public/hero/`, provenance in `public/hero/CREDITS.md`.
The team and testimonial faces are **stock models beside invented names and quotes** — fine
for a prototype, **must be replaced with real people before launch**, because a real face
attached to a fabricated endorsement reads as a real endorsement.

---

## Working practice

Verify by **measuring the rendered page**, not by reading the diff. Nearly every defect in
this codebase — the dual-lit rows, the dead hover rule, the off-screen nav button, the
non-serif titles — typechecked, linted and returned 200. A screenshot plus computed styles
catches them; static checks do not.

For contrast over photography, sample actual pixels rather than assuming the scrim value.
