# Mode 7

Next.js 15 / React 19 marketing site running **two design systems side by side**:

- **v2** (colder palette, tokens in `src/lib/theme-v2.ts`) — the **homepage at `/`**,
  plus `/about`, `/services` and `/trade-in`. This file mostly documents v2, because
  it carries the most non-obvious constraints.
- **v1** (warm palette, tokens in `src/lib/theme.ts`) — `/shop`, `/cart`, `/checkout`,
  `/product`, `/contact`, `/green-energy`, `/smart-home`. Still fully live; only the
  v1 *homepage* is gone.

**There is no longer a v1 homepage.** The v2 exploration that lived at `/homepage-v2`
was promoted to `/`; the old v1 homepage route and its nine sections in
`src/components/home/` were deleted, and `/homepage-v2` now 307-redirects to `/`
(`next.config.mjs`). Restore any of it from git: `git show 54bf880:src/app/page.tsx`,
or the same ref for anything under `src/components/home/`.

Two things that deletion orphaned and that were deliberately NOT pruned, because
neither is v1-only and both may well be wanted on a v2 section later:
- the `team` array in `src/lib/content.ts` (`Team.tsx` was its only reader) and the
  `team-1..8.webp` images it named;
- the v1 homepage's CSS still sitting in `globals.css` (`.m7-team-grid` and
  neighbours). Not swept, because v1 class names are shared with the seven live v1
  routes and an untargeted sweep would be a guess.

Dev server: `npm run dev`. **`npm run build` currently fails** on a pre-existing
`react/no-unescaped-entities` error in `src/app/green-energy/page.tsx` (lines 291, 394).
It is unrelated to anything in v2. It also clobbers `.next` underneath a running dev
server, taking the site down — prefer `npx tsc --noEmit` plus `npx eslint` while iterating.

---

## The homepage (`/`)

Lived at `/homepage-v2` while it was an exploration; the section notes below were
written then and still describe it, just at its new address. Its route file is
`src/app/page.tsx`.

A homepage whose **section structure and layout** reference bynd.com, built with
**Mode 7's own content and images throughout**. Five content sections plus header and footer
are live, in order: `HeroV2` -> `StatsV2` -> `CapabilityGridV2` -> `WorkV2` -> `QuoteV2`. Four
more — "Why Mode 7", "What are you looking to power?", "The ecosystem" and "What our
customers say" — are built and PARKED (hidden, not deleted; see the note in `page.tsx`), each
at the user's request, so the reference's nine-section count is still accounted for, just not
all on screen.

`InsightsV2` ("What our customers say") is parked. It reads `testimonials[1..3]`; with it
off screen, `QuoteV2`'s `testimonials[0]` is the only testimonial displayed anywhere on this
page.

`CtaBandV2` ("What are you looking to power?") was parked at the user's request. `QuoteV2`
was later moved to sit directly below `WorkV2`, making it — not `WorkV2` — the last section
before the footer. `QuoteV2` (ink ground) sitting directly above `FooterV2` (also ink ground)
reproduces the same kind of seam parking `CtaBandV2` was meant to fix. Measured on the
rendered page: from the bottom of `QuoteV2`'s portrait image to the top of `FooterV2`'s
closing-statement text, there is **~155px of unbroken ink at 1440 and ~112px at 390** —
solid colour, no hairline, no logo mark, no heading, nothing to break it. Smaller than the
300-530px `CtaBandV2` produced there, but the same zero-cue pattern. **NOT fixed** — none of
the candidate fixes (a hairline at the seam, tightening `QuoteV2`'s bottom padding, or
giving `QuoteV2` a different ground) is already used at this exact position on the page, so
this is left open for the user's decision rather than silently shipped or silently patched.

`LifecycleV2` ("The ecosystem") was likewise parked at the user's request. One observed
consequence: `StatsV2` (ink ground) now sits directly against `CapabilityGridV2` (wash ground)
with no section between them, where `LifecycleV2`'s own wash ground previously supplied a
buffer. That seam was not the reason for parking it either, and it still reads cleanly.

With `InsightsV2` parked, `CapabilityGridV2` (wash) now sits directly against `WorkV2` (wash)
with no section between them. Checked on the rendered page at 1440 and 390 — the combined
whitespace and the following stacked-card heading read as a clear section start on their own,
the same call already made for the `StatsV2` -> `CapabilityGridV2` gap above. It did not need
fixing.

### Files

```
src/app/page.tsx                    route (the homepage; was /homepage-v2)
src/lib/theme-v2.ts                 V2 palette + V2_FONT + V2_TYPE
src/components/home-v2/
  Ui.tsx                            Band, Mono, H2 and other shared primitives
  V2Styles.tsx                      ALL v2 CSS (see the template-literal warning)
  ButtonV2.tsx                      the site button, v2-painted
  HeaderV2.tsx  FooterV2.tsx
  HeroV2.tsx  HeroHeadlineV2Scramble.tsx (live)  HeroHeadlineV2Wipe.tsx (parked, see its own header)
  StatsV2.tsx  LifecycleV2.tsx (parked, not imported)  CapabilityGridV2.tsx
  WhyV2.tsx (parked, not imported)  QuoteV2.tsx  WorkV2.tsx
  CtaBandV2.tsx (parked, not imported)  InsightsV2.tsx (parked, not imported)
```

`SiteShell` is where the route decision lives: an `isV2` early return (placed after every
hook so hook order stays stable) swaps the v1 header/footer for `V2Styles` + `HeaderV2` +
`FooterV2`. It matches against **two lists, and they must stay separate**: `V2_EXACT`
(`/`) and `V2_PREFIX` (`/about`, `/trade-in`, `/services`). **`"/"` can never go in a
`startsWith()` list** — every pathname on the site starts with `/`, so one entry there
hands v2 chrome to all seven v1 routes at once. `WHITE_GROUND_ROUTES` is split the same
way and for the same reason.
Neither v2 page renders its own chrome — `src/app/page.tsx` and
`src/app/about/page.tsx` render only their own sections. Lenis smooth scroll still applies
either branch. `SearchOverlay` is likewise mounted once by `SiteShell` for both branches —
same component for v1 and v2, painted per-surface via its `variant` prop rather than forked;
see the note at the top of `SearchOverlay.tsx`.

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
  the lifecycle hover fill (parked with `LifecycleV2`, see the homepage section above — the rule
  stays true of its CSS, just not currently on screen). The hero marker is also a gold
  fill, but the word sitting over it is `V2.ink` `#171D1D`, not `accentOn` — a different,
  slightly lower figure (10.02:1); see the paragraph below.
- Gold as **text** only on `ink` (10.02:1) — the stats figures, dark-band labels.
- Small accent text on light grounds uses `accentText` `#79662F` (4.60:1 on wash,
  5.59:1 on white).
- **Never white on gold** (1.70:1). Filled gold buttons take an ink label.

The hero's rotating word was once gold text at 1.40:1. The live design
(`HeroHeadlineV2Scramble.tsx`) sets it as dark text (`V2.ink`, not `accentOn`) under a
permanent half-height gold marker that sits behind the word at all times and never moves —
the letters decode through it, left to right, rather than any part of the marker itself
appearing or disappearing. Measured: ink on the gold marker is **10.02:1**, unaffected by
what the page sits on. Above the marker the same ink sits directly on the section's own
ground, which is `white` as of the ground-colour pass that made `HeroV2`'s section (and the
first sections of `/services` and `/about`) white instead of `wash` — **17.07:1** there (it
was **14.05:1** back when the section sat on `wash`; both these page-ground figures move
together whenever that ground does, while the gold-band figure never does). Earlier
revisions of this file recorded this pair as 14.85:1 / 10.60:1 — both were stale even before
the ground changed (10.60:1 is `accentOn`-on-gold, the button/marquee figure, not this
ink-on-gold pair); the numbers above are re-derived from the rendered page. A parked wipe
alternative
(`HeroHeadlineV2Wipe.tsx`, not currently imported) has no marker at rest at all: the word is
plain ink text on the page ground, and gold appears only as a transient block that fully
covers the word while it swaps, never as a partial overlay — so there is no partially-gold
contrast case to reason about there, only "covered" (opaque gold, no text shown) and "not
covered" (plain ink text). See the note at the top of `HeroHeadlineV2Wipe.tsx` to restore it.

---

## Typography

| role | face | notes |
|---|---|---|
| display | **Alegreya** | `--font-alegreya` |
| body / UI / labels | **Outfit** | `--font-outfit`, shared with v1 |

Registered in `src/app/layout.tsx` **alongside, never instead of** v1's Space Grotesk /
Outfit / Space Mono. v1 typography must stay untouched.

Explored and rejected, with reasons worth keeping:

- **Josefin Sans** — x-height 24% smaller than Inter at the same nominal size while cap
  height matches, so 16px body read closer to 12px.
- **Space Grotesk** — 40% wider than a condensed serif; pushed the hero to four lines.
- **Instrument Serif** / **Noto Serif** — both fine; Alegreya was chosen for warmth.
- **JetBrains Mono** — was the label/eyebrow face (`V2_FONT.mono`, `--font-jetbrains-mono`),
  registered alongside the other v2 faces. Retired in favour of Outfit (the body face) so
  v2 loads one fewer webfont; `V2_FONT.mono` and `V2_TYPE.mono` are kept as their own keys
  (pointing at the Outfit stack) because every label call site still reads
  `V2_TYPE.mono.letterSpacing` for a tracking value distinct from running body copy — moving
  a monospace face's tracking onto a proportional one straight across reads loose and
  uneven, so every `mono`-labelled rule across `theme-v2.ts`, `Ui.tsx`, `HeaderV2.tsx`,
  `CtaBandV2.tsx`, `LifecycleV2.tsx`, `WhyV2.tsx`, `WorkV2.tsx`, `FooterV2.tsx` and the
  `.about-page` rules in `globals.css` had its letter-spacing roughly halved (e.g. the
  shared `V2_TYPE.mono.letterSpacing` 0.08em -> 0.04em; per-rule values scaled the same way).
  Case was left alone — the announcement strip and other uppercase labels stay uppercase;
  only the tracking was retuned. This is the same reasoning, applied more conservatively,
  as the earlier pass that de-uppercased the About page's eyebrows and pulled their tracking
  from 0.17em to 0.02em — that one dropped the case too, this one keeps it, so it stops at
  loosening the tracking rather than removing it.

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

**7. The wash behind `HeaderV2` isn't the header's — it's `SiteShell`'s.**
`HeaderV2`'s sticky rail is deliberately transparent (its inset `washSoft` panel is what
should read as floating), so whatever colour shows through it is whatever `SiteShell`
painted on the v2 root wrapper for that route — not anything the page itself controls.
When `/`, `/about` and `/services`'s first sections went white, their own
`background:white` only covered their own box; the header's gap above it, and any
inter-section gap with nothing painted of its own (the `marginTop:84` spacer before
`/services`'s second hero image, in particular), kept showing the OLD root colour
(`wash`) straight through. The fix lives in `SiteShell.tsx`: the v2 root's background is
now `V2.white` for those three routes and `V2.wash` for `/trade-in`, chosen per-`pathname`
right next to the v2 route lists. That's safe ONLY because every section on all three white
routes already declares its own background explicitly (every `id="sec-*"` block in
`services/page.tsx`, every `Band` on `/`) — except `/about`'s undecorated
`.a-band` (no `--wash`/`--ink` modifier), which used to rely on this same root default for
"Why We Exist" and "Who We Serve". That rule now sets `background: var(--wash)` itself, so
it doesn't silently go white too. **Any new v2 section that paints nothing of its own is
making a bet on whatever `SiteShell`'s root happens to be for its route — make it explicit
instead of relying on that root, the way `.a-band` now does.**

---

## Content rules

Everything comes from `src/lib/content.ts`. Where bynd.com had content Mode 7 lacks, the
section shape was **repurposed with real content, never filled with invented facts**:

- Case-study rows carry the three `capabilities` and **no money metrics** — Mode 7 has none.
- The insights row (`InsightsV2.tsx`) carries testimonials, not articles. No dates. It is
  currently PARKED (see the homepage section above) and reads `testimonials[1..3]` when restored;
  with it off screen, `QuoteV2.tsx`'s `testimonials[0]` is the only testimonial displayed
  anywhere on this page.
- The stats band renders `logos.length` and `pillars.length`, never hardcoded numbers.
  (A brief once asserted 14 brand partners; the array has 13. Derive, don't assert.)
- The hero's rotating word set must keep the sentence tail true for every entry.
  **The no-descender rule is ACTIVE again for the live component** — derived, not
  assumed, so recorded here rather than left stale. It exists because the live design
  (`HeroHeadlineV2Scramble.tsx`) keeps a slot mask that clips at the line box (1.04em),
  not the font box: clipping at the font box let a slice of the word float above the
  headline and cut a bar through line 2. It now ALSO binds the scramble's random
  flicker-glyph set, not just the word pool — the unresolved characters shown mid-decode
  have to clear the same 1.04em box the real words do. Every current pool word (Pocket,
  Home, Office, Studio, Commute, Future) is descender-free. Adding a word with a `g`,
  `y`, `p`, `q` or `j` — "Workshop", say — requires re-deriving the mask height first;
  see the note at the top of `HeroHeadlineV2Scramble.tsx`.
  **The rule is DEAD for the PARKED wipe variant** (`HeroHeadlineV2Wipe.tsx`, not
  currently imported), which has **no clipping element at all** — the word is ordinary
  inline text at the h1's own 1.04 line-height, and the gold block is a plain covering
  rectangle, not a mask — so there is nothing left for a descender to be clipped by. It
  was also never a strict necessity of the LEADING itself, only of the mask's narrower
  box: Alegreya's actual painted ink (ascent 74.2 + descent 24.2 = 98.4% of the em)
  already clears the 104% the hero's own 1.04 line-height provides, which is on record
  as chosen for that depth (see Typography below). A real descender was always going to
  clear the line below; only the mask's own box was ever at risk. This reasoning is kept
  here as the record for the parked wipe, in case it is ever brought back live: adding a
  descending word would be fine for it even though it is not fine for the scramble
  currently on the page.

**Imagery:** CC0 files in `public/hero/`, provenance in `public/hero/CREDITS.md`.
Two exceptions, both recorded there: `about-hero.webp` / `about-hero-portrait.webp`
are **AI-generated, not CC0** (supplied by the site owner), and the four
`lifecycle-*.webp` files have **no traced provenance at all**. Neither group is
cleared for commercial use on the strength of this folder alone.
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
