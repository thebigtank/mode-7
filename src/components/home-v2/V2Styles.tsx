/**
 * Media queries and grid rules for `/homepage-v2`.
 *
 * Inline styles cannot express breakpoints, and `globals.css` is a v1 file this
 * exploration must not touch — so every v2 responsive rule lives here, in a
 * scoped <style> rendered once by the v2 page. All selectors are namespaced
 * `.v2-` and appear nowhere in v1.
 *
 * The column ratios are measured off the reference at 1440px, where the
 * container is 1280px wide (80px page margins):
 *   hero     left 710 / gap  80 / right 490   -> 1.45fr 1fr, gap 80
 *   stats    left 560 / gap 160 / right 560   -> 1fr 1fr, gap 160
 *   why      left 544 / gap 58  / right 678   -> 1fr 1.25fr
 *   quote    left 560 / gap 204 / right 516   -> 1fr 0.92fr, gap 204
 *
 * The HERO is the one row that no longer matches the reference's own split, and
 * deliberately so. The reference gave the TEXT the narrow column (558) and the
 * still the wide one (642); at display scale that set the h1 on FOUR lines. The
 * two columns are swapped — text 1.45fr, still 1fr — and the gutter set to 80px,
 * so the text column gets 710px and the still a 490x276 16:9 frame at 1440. The
 * headline is three lines, and 710px is what sets the size they can be: line 1
 * at its RESERVED slot width is the widest of the three. See `.v2-hero-h1`
 * below for the measured fit.
 *
 * Two breakpoints throughout: ~980px collapses multi-column layouts to one (or
 * three to two), ~640px collapses whatever is left. The hero headline resizes
 * at the 980px one, where its column stops being 49vw and becomes ~90vw.
 */
const CSS = `
.v2-hero-cols  { display:grid; grid-template-columns:minmax(0,1.45fr) minmax(0,1fr); gap:clamp(32px,5.6vw,80px); align-items:center; }
.v2-stats-cols { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:clamp(32px,11vw,160px); align-items:start; }
/* PARKED — WhyV2.tsx is currently unmounted in page.tsx (hidden, not deleted;
   see the note there). This rule is unused while it stays parked, kept intact
   so restoring the import needs no CSS work. */
.v2-why-cols   { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.25fr); gap:clamp(32px,4vw,58px); align-items:start; }
.v2-quote-cols { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,0.92fr); gap:clamp(32px,14vw,204px); align-items:center; }
/* PARKED — CtaBandV2.tsx is currently unmounted in page.tsx (hidden, not
   deleted; see the note there). This rule is unused while it stays parked,
   kept intact so restoring the import needs no CSS work. */
.v2-cta-cols   { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:clamp(32px,8vw,116px); align-items:start; }

/* section 4 — 3x2 service grid, 20px gutters */
.v2-services { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }

/* section 9 — 3-up article row, 32px gutters.
   PARKED — InsightsV2.tsx is currently unmounted in page.tsx (hidden, not
   deleted; see the note there). This rule is unused while it stays parked,
   kept intact so restoring the import needs no CSS work. */
.v2-articles { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(20px,2.4vw,32px); align-items:start; }

/* section 2 — the three figures under the rule: equal thirds of the right
   column, ~180px each, which the 15px labels fit on one line. */
.v2-figures { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }

/* ── section 3 — the service index ────────────────────────────────────────
   PARKED — LifecycleV2.tsx is currently unmounted in page.tsx (hidden, not
   deleted; see the note there). Every .v2-life-* rule below is EXCLUSIVE to
   LifecycleV2 — grepped, nothing else references them — so the whole block
   is unused while it stays parked, kept intact so restoring the import needs
   no CSS work. Left unpruned deliberately: the two traps documented inline
   below (the dead-hover-rule fix, the dual-lit-rows fix) are cited by name in
   the v2 CLAUDE.md and are worth keeping even while the section is off.

   Each row is a link with two OVERLAYS inside it: a gold fill and a floating
   photographic preview. Both are absolutely positioned, so the row's
   border-box height is identical at rest and on hover — nothing is reserved
   and nothing shifts.

   Everything about the resting state lives HERE and nowhere inline. An inline
   opacity, background or transform on .v2-life-fill / .v2-life-shot
   would out-specify the :hover rule below and the reveal would silently never
   fire, so the only inline value the row carries is the custom property
   --v2-life-shot naming its own picture.

   THE ACTIVE ROW IS A CLASS, NOT :hover. :hover and :focus-within are
   independent conditions, so a row focused by the keyboard and a DIFFERENT row
   under the pointer both matched and both lit. LifecycleV2 resolves the two
   inputs to a single index in React and hands the winner .is-active; there is
   deliberately no :hover / :focus-within styling left here to stack with it.
   Only the focus RING is still a CSS pseudo-class, because a ring cannot
   double up. */
.v2-life-list { margin-top:clamp(40px,4.4vw,64px); border-top:1px solid rgba(23,29,29,0.14); }
/* CLEARANCE FOR THE FIRST ROW'S PREVIEW. .v2-life-shot is 307px tall and
   centred on its row, so it overhangs each edge by (307 - rowH) / 2. On row 1
   that upward overhang lands in the section's supporting copy. Measured
   overhang: 102.5px at 981px, 99.7 at 1100, 93.3 at 1280, 89.3 at 1440, 88.1
   at 1920 — it SHRINKS as the viewport grows, because the row's vw padding
   grows the row. Below 981px .v2-life-shot is display:none and the tighter
   clamp above stands, so 981 is the narrowest width that needs clearing.

   A single flat value has to cover the 981px worst case, which then way
   overshoots at wide viewports where the overhang has shrunk: one flat
   116px measured out to a 14px gap at 981 (tight) opening up to 28.4px at
   1920 (loose enough to read as a second, disconnected gap above the list —
   noticeably more than the ~63px this replaced). Four breakpoints instead
   track the measured overhang and hold clearance in a narrow ~20-27px band
   at every width the picture is shown at, each value the overhang at that
   bucket's lower (worst-case) edge plus ~20px of daylight:
     981-1099   overhang 102.5 -> 99.7   margin 123px   clearance ~20-23px
     1100-1279  overhang  99.7 -> 93.3   margin 120px   clearance ~20-27px
     1280-1439  overhang  93.3 -> 89.3   margin 113px   clearance ~20-24px
     1440+      overhang  89.3 -> 88.1   margin 110px   clearance ~21-22px
   (overhang plateaus ~88px above ~1530px, where the row's vw-based padding
   and the row-title clamp both hit their ceilings, so 110px holds beyond
   1920 too.) Re-measure all four if the shot's height, the row's padding or
   the row's type sizes change. */
@media (min-width: 981px)  { .v2-life-list { margin-top:123px; } }
@media (min-width: 1100px) { .v2-life-list { margin-top:120px; } }
@media (min-width: 1280px) { .v2-life-list { margin-top:113px; } }
@media (min-width: 1440px) { .v2-life-list { margin-top:110px; } }

.v2-life-row {
  position:relative;
  display:grid;
  grid-template-columns:minmax(0,1fr) auto;
  gap:clamp(16px,2.2vw,32px);
  align-items:center;
  padding:clamp(20px,2.2vw,30px) clamp(14px,1.7vw,24px);
  border-bottom:1px solid rgba(23,29,29,0.14);
  border-radius:4px;
  text-decoration:none;
  color:#171D1D;                      /* ink */
  transition:color .22s ease;
}
/* the fill covers the bottom hairline too, hence the -1px */
.v2-life-fill {
  position:absolute; inset:0 0 -1px 0; z-index:0;
  border-radius:4px;
  background:#F0C044;                 /* accent — a GROUND, never text */
  opacity:0;
  transition:opacity .22s ease;
}
.v2-life-shot {
  position:absolute; z-index:2;
  left:52%; top:50%;
  /* 3:2, matching the sources. They are 640x427, so 460 never upscales. */
  width:460px; height:307px;
  border-radius:4px;
  background-image:var(--v2-life-shot);
  background-size:cover;
  background-position:center;
  pointer-events:none;                /* never blocks the row's own hover */
  opacity:0;
  transform:translateY(-50%) scale(0.97);
  transition:opacity .24s ease, transform .24s ease;
}
.v2-life-text { position:relative; z-index:1; display:block; }
/* The two stacks below MUST stay in step with V2_FONT in theme-v2.ts; a
   stylesheet cannot import it, so they are restated. They were left behind by
   the Instrument Serif -> Noto Serif swap: this rule still named
   --font-instrument-serif, a variable layout.tsx no longer sets, and an
   unresolvable var() invalidates the whole declaration at computed-value time
   rather than falling through to the 'Times New Roman' after it — so the row
   titles INHERITED the body sans and the section's largest type, 48px, was
   silently not a serif at all. Measured before the fix: Outfit. */
.v2-life-title {
  display:block;
  font-family:var(--font-alegreya), Georgia, 'Times New Roman', serif;
  /* SIZE. Was clamp(30px,3.34vw,50px) = 48.1px at 1440, which made every row
     title LARGER than the 40px h2 above them: four listings competing with
     the heading that governs them, and no hierarchy left in the section. The
     h2 has gone up to CapabilityGridV2's clamp(34px,3.9vw,56px) and these
     have come down to 32px at 1440 — a 1.75:1 heading-to-listing ratio, the
     right way round. The clamp SHAPE is unchanged, only rescaled by 0.665:
     3.34vw -> 2.22vw lands on 31.97px at 1440, the 50px ceiling becomes 34px
     (still just above the 1440 value, so 1440 is on the vw ramp exactly as
     before) and the 30px floor becomes 24px, taking effect below 1081px.

     LINE HEIGHT. 1.2 is KEPT, and the reason is now Alegreya, not Noto Serif
     — the old comment here was left behind by the face swap. Alegreya's ink
     runs 0.984em (0.742 max ascent + 0.242 max descent per 100px, measured
     off canvas TextMetrics), so two consecutive lines clear each other at any
     line-height at or above 0.984. Alegreya's descender is DEEPER than Noto
     Serif's (24.2 vs 21.9 per 100px) but its ascender is shallower (74.2 vs
     77), so the total ink is very slightly SHORTER and 1.2 has marginally
     more room than it had before, not less: 0.216em of clearance against the
     old 0.19em. At the new 32px that is 6.9px of gap — and in practice these
     titles are one line each ("Smart Home Automation" is the longest and
     fits in 1174px of row at 32px with room to spare), so the leading is
     protecting a wrap case rather than a real one. 1.2 stays.
     -0.02em likewise: Alegreya sets at normal width and the tightening is
     smaller in absolute terms at 32px (-0.64px) than it was at 48px. */
  font-weight:400; font-size:clamp(24px,2.22vw,34px); line-height:1.2;
  letter-spacing:-0.02em;
}
.v2-life-sub {
  display:block; margin-top:8px;
  font-family:var(--font-outfit), var(--font-inter), system-ui, sans-serif;
  font-weight:300; font-size:14px; line-height:1.5;
  color:#5A6160;                      /* muted — 5.21:1 on wash */
  transition:color .22s ease;
}
.v2-life-arrow { position:relative; z-index:1; display:inline-flex; }

/* the filled state. Ink on gold is 10.02:1 — the type stays DARK. The row
   lifts above its neighbours so the preview can overhang them. */
.v2-life-row.is-active { z-index:3; color:#1C150F; border-bottom-color:transparent; }
.v2-life-row.is-active .v2-life-fill { opacity:1; }
.v2-life-row.is-active .v2-life-shot { opacity:1; transform:translateY(-50%) scale(1); }
.v2-life-row.is-active .v2-life-sub { color:#1C150F; }
.v2-life-row:focus-visible { outline:2px solid #171D1D; outline-offset:-2px; }

/* section 5 — numeral / body.
   PARKED — WhyV2.tsx is currently unmounted in page.tsx (hidden, not deleted;
   see the note there). Unused while it stays parked, kept intact so restoring
   the import needs no CSS work. */
.v2-reason { display:grid; grid-template-columns:44px minmax(0,1fr); gap:clamp(10px,1.1vw,16px); align-items:start; }

/* section 4 — the "Explore" reveal, hidden until the card is hovered (or
   focused). THREE things are load-bearing here:
     1. it keeps its box (opacity + transform, never display or visibility), so the
        card's height is identical in both states and the grid never jumps;
     2. :focus-within sits alongside :hover. The gold cell's real link drives
        it directly; the four cards with hover imagery (below) now carry
        tabIndex on the card itself for THAT reveal, and :focus-within also
        matches an element that IS the focused element, so those four get
        this reveal too as a side effect — nothing under it became
        clickable, "Explore" is still the same inert aria-hidden span (see
        CapabilityGridV2.tsx). Only cell 5 ("Accessories") has no focusable
        target at all, so :hover alone drives it;
     3. the resting state is declared HERE and nowhere inline: an inline
        opacity or transform on the wrapper would out-specify these rules. */
.v2-explore { opacity:0; transform:translateY(6px); transition:opacity .22s ease, transform .22s ease; }
.v2-capcard:hover .v2-explore,
.v2-capcard:focus-within .v2-explore { opacity:1; transform:translateY(0); }

/* section 4 — capability-card hover imagery (user request). A faint
   photographic wash behind the card's OWN light ground — never a dark
   scrim + white label, which was the other option offered. Chosen and
   measured on the rendered page (a photo is not uniform, and CLAUDE.md
   requires sampling actual pixels over photography, not assuming the scrim
   value): each card was screenshotted at 0.16 hover opacity with its own
   title/body glyphs and icon made visibility:hidden (layout untouched) so
   the sample reads the true composited pixel BEHIND each letter/icon
   stroke, not the ink itself, then the single darkest pixel found within
   the title's and body's own box was checked against ink (#171D1D):

     card                   rest (flat white)   hover, worst pixel behind:
                                                  title (24px)   body (16px)
     Premium Devices           17.07:1             11.75:1        11.75:1
     Certified Refurbished     17.07:1             11.85:1        11.77:1
     Smart Home Automation     17.07:1             11.94:1        12.22:1
     Solar & Green Energy      17.07:1             11.75:1        11.75:1

   The "Explore" reveal (below) measured the same worst-case 11.75:1 on all
   four — its ring-arrow SVG has no anti-aliasing haze the way serif glyphs
   do, so it never found a darker pixel than the card's flattest patch.

   Floor held: 4.5:1 (body, 16px/300, below large-text size) and 3:1 (the
   24px serif title, which clears the large-text threshold). Both floors
   pass with roughly 2.5x plus headroom at the worst point in the photo, not
   an average — see CapabilityGridV2.tsx's header comment for why cell 5
   ("Accessories") and the gold CTA tile get no image at all.

   .v2-capcard gets its OWN stacking context (position + a real z-index, not
   auto) so the shot — given a NEGATIVE z-index — paints between the card's
   own background and its in-flow text content without disturbing the flex
   layout: no wrapper needed, nothing reserved, nothing shifts.

   THE ACTIVE CARD IS A CLASS, NOT :hover/:focus-within STACKED
   INDEPENDENTLY — the same LifecycleV2 problem: a card focused by keyboard
   and a DIFFERENT card under the pointer would otherwise both light.
   CapabilityGridV2 resolves hover and focus to one index in React
   (hover ?? focus) and hands the winner .is-active; there is no
   :hover rule left here to stack with it.

   THE RESTING STATE IS HERE, NOT INLINE: opacity is the only state this
   layer has, and it lives in this stylesheet so .is-active can raise it.
   The only inline value the card carries is the custom property
   --v2-card-shot naming its own picture (and only on the four cards that
   have one) — same pattern as --v2-life-shot above. */
.v2-capcard { position:relative; z-index:0; }
.v2-capcard-shot {
  position:absolute; inset:0; z-index:-1;
  border-radius:2px;
  background-image:var(--v2-card-shot);
  background-size:cover;
  background-position:center;
  opacity:0;
  pointer-events:none;
  transition:opacity .3s ease;
}
.v2-capcard.is-active .v2-capcard-shot { opacity:0.16; }
.v2-capcard:focus-visible { outline:2px solid #171D1D; outline-offset:-2px; }

/* section 7 — sticky stacked cards. The stack itself is pure CSS: each card
   sits in a normal-flow wrapper that is position:sticky at an increasing
   offset, so a card's own height is exactly the travel it gets before the next
   pins over it. Only the footer and the text column need breakpoints. */
.v2-stack__body { max-width:min(560px,52%); }

/* section 7 — case-study row: text half, image half, image flush to the edge */
.v2-caserow { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,0.675fr); align-items:stretch; }

/* v1's footer ratio, 1.7fr 1fr 1fr: the brand block is wider than a link
   column because it carries the wordmark, a paragraph and the social row. */
.v2-footcols { display:grid; grid-template-columns:minmax(0,1.7fr) repeat(2,minmax(0,1fr)); gap:clamp(28px,4vw,56px); }
/* footer social marks. 42px clears the 40px touch-target floor; the hover is a
   faint white wash + a brighter ring, the only lift available on ink. */
.v2-social {
  display:inline-flex; align-items:center; justify-content:center;
  width:42px; height:42px; border-radius:50%;
  border:1px solid rgba(255,255,255,0.2);
  color:#FFFFFF; cursor:pointer;
  transition:background .2s ease, border-color .2s ease;
}
.v2-social:hover { background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.45); }
.v2-legal { display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; }
.v2-headrow { display:flex; justify-content:space-between; align-items:flex-end; gap:32px; flex-wrap:wrap; }

/* ── the hero headline ────────────────────────────────────────────────────
   ONE sentence, three lines, every line the SAME size and weight. Exactly one
   word moves — the noun on line 1.

       Powering your Pocket        <- the slot
       with tech that's vetted,
       sealed and guaranteed.

   TWO IMPLEMENTATIONS OF THAT ONE WORD SHARE THIS SLOT AND THIS FILE. Which
   one is live has flipped once already (wipe -> scramble) and both are meant
   to stay switchable, so read the CURRENT state below rather than assuming:

     LIVE   — HeroHeadlineV2Scramble.tsx. The word resolves left to right
              through a wash of random glyphs, decode-style, behind a
              permanent gold marker. Its CSS is everything from
              .v2-hero-mask through .v2-hero-bandsize below.

     PARKED — HeroHeadlineV2Wipe.tsx. Not imported anywhere right now; kept
              intact because the word may come back. A solid gold block
              WIPES over the word, swaps it, and wipes off again, with no
              persistent marker at rest. Its own CSS (.v2-hero-word,
              .v2-hero-wipe) sits further down this section, after the rules
              below — still here, still correct, just unused while the
              scramble is live. Restoring it: see the note at the top of
              HeroHeadlineV2Wipe.tsx.

   Both share the reserved-width slot immediately below (.v2-hero-slot /
   .v2-hero-sizer) and the size/leading rules on .v2-hero-h1. The markup,
   the pool and the timing for whichever variant is live are in that
   component's own file; everything geometric is here.

   FONT SIZE: clamp(38px,5vw,72px). The display treatment this headline had
   before any rotator existed was clamp(38px,5.28vw,76px); 76px does not fit
   the new copy and the number had to come down. Measured advance widths for
   Alegreya 400 at letter-spacing -0.02em, per 100px of font size:

       "Powering your "            580.70   (the trailing space counts)
       Pocket   256.31    Studio    259.81
       Home     243.20    Commute   394.70   <- widest; the slot reserves it
       Office   237.11    Future    262.50

       line 1, at its reserved width  580.70 + 394.70 = 975.40   <- WIDEST LINE
       line 2, "with tech that's vetted,"            875.50
       line 3, "sealed and guaranteed."              901.50

   Line 1 is the binding one at 9.754em, and it is that wide PERMANENTLY, not
   only while "Commute" is showing, because the slot reserves the widest word
   at all times. The text column is 710px at 1440, so the ceiling is
   710 / 9.754 = 72.79px. 72px is that with 7.7px of slack. The vw ramp is
   5vw because the text column is 49.32% of the viewport across the whole
   multi-column range, and 710 / 9.754 / 1440 = 5.056vw; 5vw lands exactly on
   the 72px cap at 1440 rather than fighting it.

   Checked down the multi-column range, always at the reserved width:
       1440  72.0px  ->  702px line 1 in a 710px column
       1280  64.0px  ->  624px in a 631px column
       1024  51.2px  ->  499px in a 505px column
        981  49.1px  ->  479px in a 484px column   (last multi-column width)
   Below 980 the hero grid collapses, the text column jumps to the full
   container, and the size steps up again — see the 980px block further down.

   LINE HEIGHT 1.04 is the display leading, and it governs all three lines
   because all three are ordinary blocks. The live scramble's 1.37, its gold
   band's geometry is measured in (see .v2-hero-band below), is Alegreya's
   font box, not a line-height anything on the page actually uses — it is only
   the coordinate system that comment does its math in. Both the live
   mask and the parked wipe block (.v2-hero-wipe, further down) are absolutely
   positioned, so neither adds height and line 1 measures the same 1.04em as
   lines 2 and 3 regardless of which is active.

   letter-spacing -0.02em is unchanged and still correct: it scales with the
   font, so -1.44px at 72px is the same relative tightening measured clean at
   64 and 76px, and no pair collides. */
.v2-hero-h1 { font-size:clamp(38px,5vw,72px); line-height:1.04; letter-spacing:-0.02em; }

/* Each line is its own block, so "three lines" is a fact of the markup rather
   than a hope about where the text happens to break. */
.v2-hero-line { display:block; }

/* ── the rolling slot ─────────────────────────────────────────────────────
   THE RESERVED WIDTH. Every pool word is rendered once as an in-flow grid item
   at grid-area 1/1 with visibility:hidden. A grid column sizes to its widest
   item and hidden-visibility boxes still take part in layout, so the column is
   always exactly as wide as "Commute" — at every viewport, before fonts load,
   with no JS and no measurement. Deriving the reserve from the pool rather
   than from a hard-coded longest word means adding a longer word later cannot
   silently break it.

   visibility:hidden, NOT opacity:0, and this is the load-bearing half of the
   rule: a hidden-visibility box is never painted and never hit-tested, so the
   sizers cannot superimpose on the visible word. An earlier build stacked
   painted words at opacity 0 in one cell and a screenshot caught two of them
   on the same pixels. Do not go back to opacity here. */
.v2-hero-slot  { position:relative; display:inline-grid; justify-items:start; }
.v2-hero-sizer { grid-area:1 / 1; visibility:hidden; }

/* ══ EVERYTHING FROM HERE TO .v2-hero-bandsize BELONGS TO THE LIVE SCRAMBLE
   VARIANT (HeroHeadlineV2Scramble.tsx) — currently imported by HeroV2.tsx and
   what's on the page now. Skip to "the parked wipe" below for the GSAP
   alternative, kept intact but not imported. ══ */

/* THE MASK. Absolutely positioned over the sizers, so it contributes no height
   and cannot loosen line 1. overflow:hidden is a safety net now rather than
   the thing doing daily work: there is no vertical motion left to clip since
   the word decodes in place instead of sliding through this box. Kept anyway
   — see the component-level comment in HeroHeadlineV2 for why.

   ITS HEIGHT IS 1.04em — THE LINE BOX, NOT THE FONT BOX — and that is still
   load-bearing. Alegreya's font box is 1.37em, so a font-box-tall mask would
   hang 0.165em past the line box top and bottom, into the leading of line 1's
   neighbours. Measured, and it reads as a glitch, so the mask clips at the
   line box.

   The pool is what makes that safe: at 72px, and proportionally at every
   size, the ink of the widest-reaching entry clears a 1.04em box by 8.02px at
   the top (Pocket / Office / Studio, whose t / ffi / d reach highest) and
   12.43px at the bottom. NO POOL WORD HAS A DESCENDER, which is where the
   bottom clearance comes from — an entry with a g, y or p would be clipped
   here and would need this height re-derived. The same clearance now also
   governs the flicker glyph sets in HeroHeadlineV2: the random glyphs shown
   on unresolved character positions have to clear this box too.

   left:0 right:0, so the mask is the full reserved width. HORIZONTALLY this
   is not just a safety net: an early build's flicker set was all capitals,
   which run wider than the pool words' capital-plus-lowercase shape, and a
   6-7 position all-caps flicker actually did overrun this box and got
   clipped mid-letter — a visible bug, not a glitch effect. The flicker sets
   were fixed to match the pool words' own case shape instead (see note 2 in
   HeroHeadlineV2); the mask's overflow:hidden stays as the backstop should
   that ever regress. Centred on the slot at 50% - 0.52em, which puts it
   exactly on line 1's own line box. */
.v2-hero-mask {
  position:absolute; left:0; right:0; top:50%; z-index:1;
  height:1.04em; margin-top:-0.52em;
  overflow:hidden;
}

/* The character row sits at the mask's own baseline; line-height matches the
   h1's 1.04 rather than the mask's 1.37-unit band geometry, since nothing
   here needs the taller box any more. */
.v2-hero-scramble { display:block; line-height:1.04; white-space:nowrap; }

/* One span per character position. display:inline-block so its opacity
   transition (below) cannot be blamed on layout — nothing here ever animates
   anything that could jostle a neighbour. RESTING opacity is declared HERE,
   not inline, so .is-flicker can override it reliably (CLAUDE.md trap #2:
   an inline value would out-specify this). */
.v2-hero-char { display:inline-block; opacity:1; transition:opacity 90ms linear; }
/* An unresolved position, mid-flicker: dimmed, never recoloured — still
   V2.ink, so it can never end up gold (see the gold rule in CLAUDE.md).
   Measured: ink at this opacity over the section's white ground is ~8.3:1
   (was ~6.1:1 back when the section sat on wash), comfortably past AA,
   and it is only ever on screen for a few hundred ms per character. */
.v2-hero-char.is-flicker { opacity:.78; }

/* ── THE GOLD BAND ────────────────────────────────────────────────────────
   ONE element, always on screen, and it never moves. It is a sibling of the
   character row, not a child of any word, so the words decode THROUGH the
   marker instead of each dragging its own copy of it out of frame.

   GEOMETRY, unchanged from the two-stop gradient it replaces. That gradient
   ran over the word's font box — 1.37em tall, Alegreya's fontBoundingBox of
   102 up / 35 down per 100px — with hard stops at 42% (band top) and 18%
   (band bottom) measured up from the bottom of that box. 42% is the middle of
   the lowercase x-height, so the upper half of every letterform stays on the
   page ground; 18% is just under the baseline, where a real marker stroke
   ends, rather than running down past the descenders.

   The band is positioned against the SLOT rather than against the mask, so
   the mask's own height is free to be whatever the clipping needs (it is
   1.04em; see above) without moving the marker. That 1.37em font box is
   centred on the slot, so measuring down from the slot's centre line the band
   starts at

       -0.685em + 0.58 x 1.37em = 0.1096em      (top, i.e. 42% up from bottom)

   and is 0.24 x 1.37em = 0.3288em tall (42% - 18%). Pixel-scanned against the
   gradient it replaces, the top edge lands 0.25px lower and the bottom 0.75px
   lower — the difference is Chrome rounding Alegreya's font box to a whole
   98px at 72px rather than 98.64.

   A FLAT FILL, not a gradient: with the band off the type it no longer needs
   transparent stops to let the letters show through above it, and a solid
   block is what can be resized without the fill sliding.

   WIDTH TRACKS THE WORD, AND TRANSITIONS. The slot is reserved at the widest
   word, so a slot-wide band would hang a tail of bare gold off the end of
   "Home". The component sets width in px from the measured sizers and
   retargets it to the INCOMING word the instant a scramble starts, so the
   marker stretches into the new word across roughly the same window the
   letters take to decode, rather than snapping late. Only width is animated
   and the band is absolutely positioned, so the layout outside this box
   cannot move. 480ms is tuned to the decode's own pacing (stagger + flicker +
   jitter — see HeroHeadlineV2) rather than an exact match to any one
   character's timeline; there is no single instant "the scramble" finishes
   at, only the latest of several independently-timed positions.

   Before that measurement lands — the server HTML, the pre-hydration paint,
   a fonts-not-yet-loaded frame — the width comes from .v2-hero-bandsize, a
   visibility:hidden copy of the target word inside the band. Shrink-to-fit
   makes that exactly the right width with no JS. overflow:hidden keeps that
   copy inside the 0.3288em block once an explicit width is in force.

   Contrast, measured: ink #171D1D on this gold #F0C044 is 10.02:1 for the
   lower half of the letterforms, and above the band the same ink on the
   section's white ground #FFFFFF is 17.07:1 (was 14.05:1 when the section
   sat on wash). Both pass WCAG AAA for body text, let alone display. */
.v2-hero-band {
  position:absolute; left:0; top:50%; z-index:0;
  margin-top:0.1096em;
  height:0.3288em;
  background:#F0C044;
  overflow:hidden;
  transition:width 480ms cubic-bezier(.22,.61,.36,1);
}
.v2-hero-bandsize { visibility:hidden; white-space:nowrap; }

/* ── the parked wipe (HeroHeadlineV2Wipe.tsx) ───────────────────────────
   Not currently imported by HeroV2.tsx; kept intact because the wipe may
   come back. The word itself is just another grid item sharing
   .v2-hero-slot's reserved cell (see above) — plain ink text, no marker
   behind it at rest. grid-area 1/1 is what keeps it aligned with the hidden
   sizers instead of flowing as ordinary inline content next to them. */
.v2-hero-word { grid-area: 1 / 1; }

/* THE WIPE BLOCK. Invisible at rest — transform:scaleX(0) declared HERE, not
   inline, so a pre-hydration or no-JS paint never shows a stray gold box
   (CLAUDE.md trap #2: an inline resting value would out-specify a later
   state rule). GSAP (in HeroHeadlineV2) sets an explicit pixel width before
   each tween and only ever animates scaleX, toggling transform-origin
   between "left center" (growing — covers the outgoing word) and "right
   center" (collapsing — uncovers the incoming one). See the component-level
   comment for why that one pair of values is the whole mechanism.

   SAME GEOMETRY THE LIVE MASK USES: height 1.04em, centred via
   top:50%/margin-top:-0.52em. That box is already proven, by the mask's own
   measurements above, to clear every pool word's ink with 8-12px to spare —
   "roughly the height of the text" the brief asks for, reusing a proven
   number rather than re-deriving one. left:0 matches the word's own
   justify-items:start alignment, so the block's untransformed edge lines up
   with the word's own left edge with no extra offset math. */
.v2-hero-wipe {
  position:absolute; left:0; top:50%;
  height:1.04em; margin-top:-0.52em;
  width:0;
  background:#F0C044;
  transform:scaleX(0);
  transform-origin:left center;
  z-index:1;
  pointer-events:none;
}

/* Header nav links. The display value MUST live here, not inline on the
   element: the 980px rule below hides them, and an inline display:flex would
   out-specify it and leave the links (and the Shop action) overflowing the
   panel on mobile. */
.v2-navlinks { display:flex; }

/* ── header — nav link focus dimming + page scrim ──────────────────────────
   Hovering (or keyboard-focusing) a nav link dims its siblings and drops a
   translucent scrim behind the header so the hovered link reads as the
   deliberate focus. Which link is active is REACT STATE in HeaderV2 (hover
   and focus held separately, active = hover ?? focus — the same pattern
   LifecycleV2 uses and for the same reason: :hover and :focus-within are
   independent conditions and would otherwise both light up at once). The
   resting opacity for both lives HERE, not inline — an inline opacity would
   out-specify .is-dimmed / .is-active and the dim would silently never fire.

   0.45 and 0.32 (below) were picked by eye: light enough that a dimmed link
   or the page behind the scrim both stay clearly legible, strong enough that
   the hovered link / undimmed page reads as a deliberate focus rather than a
   flicker. */
.v2-nav-link { opacity:1; transition:opacity 220ms ease; }
.v2-nav-link.is-dimmed { opacity:0.45; }
.v2-nav-link.is-active { opacity:1; }

/* The scrim is a SIBLING of <header> in HeaderV2, not a descendant: <header>
   carries a permanent inline transform (for the hide/show slide), and a
   transformed ancestor becomes the containing block for a position:fixed
   descendant — nested inside, the scrim would be pinned to the header's own
   96px-tall box instead of the viewport. As a sibling this is genuinely
   viewport-fixed. z-index 1000 sits above ordinary page content and below
   the header's 1001 panel; the announcement strip is separately lifted to
   1002 in HeaderV2 so it stays fully lit as header chrome rather than
   dimming as page content. pointer-events:none always, hovered or not, so a
   click reaches the page underneath exactly as before. */
.v2-nav-scrim {
  position:fixed;
  inset:0;
  z-index:1000;
  background:rgba(23,29,29,0.32);
  opacity:0;
  pointer-events:none;
  transition:opacity 220ms ease;
}
.v2-nav-scrim.is-active { opacity:1; }

/* ── the "trusted by" marquee — a full-bleed gold band of brand names ──────
   .v2-marquee-wrap breaks out of the 1280px container with the standard
   width:100vw + margin:calc(50%-50vw) trick. That formula only centres
   correctly because the wrap's containing-block chain up to the viewport is
   a plain, symmetrically-centred flow (no positioned ancestor narrows it) —
   true here, see the comment in HeroV2.tsx. The wrap's OWN overflow:hidden
   is what crops the sliding track; the couple of sub-pixel scrollbar-width
   cases 100vw is known for are additionally caught by the page root's and
   body's overflow-x:clip, so nothing here fights the page for control of
   horizontal scroll. */
.v2-marquee-wrap {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
  background: #F0C044; /* V2.accent — a literal here because this file cannot import the TS token, see the file banner */
}
.v2-marquee-track {
  display: flex;
  width: max-content;
  /* -50% lands the SECOND (duplicate) row exactly where the first started,
     which is what makes the loop seamless — see the two .v2-marquee-row
     children below.

     100s is DERIVED, not guessed: at 1440px (measured live, one
     .v2-marquee-row of all 20 names in Alegreya 700) the row is ~3670px
     wide, which is also the exact distance one -50% loop travels. The name's font-size
     clamp(17px,1.85vw,22px) and the row's gap clamp(28px,3.4vw,48px) are
     both already sitting on their vw ramp's UPPER bound at 1440 (they cap
     out at ~1189px and ~1412px respectively), so that is the row's PLATEAU
     width — every viewport from ~1412px up travels the same distance per
     loop, and narrower ones travel less (smaller type, smaller gaps), never
     more. The duration is derived from that measured width to hold the drift
     near 36px/s, inside the 25-45px/s calm-drift range at the plateau width
     and only ever slower below it. Re-derive it whenever the gap, the type
     size or the number of names changes: a wider row at a fixed duration
     runs FASTER, a tighter one runs slower. */
  animation: v2marquee 100s linear infinite;
}
/* the star-to-name gap. .v2-marquee-row's gap (between ITEMS, i.e.
   star-to-next-name) and .v2-marquee-item's gap (name-to-its-own-star) MUST
   stay the SAME value — that symmetry is what keeps every star optically
   centred between its two flanking names rather than drifting toward one
   side. The row's trailing padding-right matches too: it is the same gap,
   just at the seam where the row hands off to its duplicate. */
.v2-marquee-row {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: clamp(28px,3.4vw,48px);
  padding: 15px clamp(28px,3.4vw,48px) 15px 0;
}
.v2-marquee-item { display: flex; align-items: center; gap: clamp(28px,3.4vw,48px); flex: 0 0 auto; white-space: nowrap; }
.v2-marquee-name {
  /* the v2 DISPLAY face, Alegreya, same stack as V2_FONT.display in
     theme-v2.ts and .v2-hero-h1 below — matches the headings rather than
     the body/UI face. --font-alegreya is registered in layout.tsx alongside
     the v1 faces, so this resolves; if it is ever removed, this whole
     declaration goes invalid and drops to the inherited body sans rather
     than sliding to the Georgia fallback (see the font trap in CLAUDE.md). */
  font-family: var(--font-alegreya), Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(17px,1.85vw,22px);
  letter-spacing: 0.01em;
  line-height: 1;
  /* accentOn — ink-on-gold, 10.60:1. Never white-on-gold (1.70:1). */
  color: #1C150F;
}
/* pause on hover, pure CSS — resume is simply the hover state ending, no JS
   and no separate rule needed for mouseleave */
.v2-marquee-wrap:hover .v2-marquee-track { animation-play-state: paused; }

@keyframes v2marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@media (max-width: 980px) {
  /* .v2-why-cols and .v2-cta-cols below are PARKED with WhyV2.tsx /
     CtaBandV2.tsx (both unmounted, see page.tsx) — left in this shared
     selector rather than split out, since they simply match nothing while
     parked. .v2-articles, in the next rule down, is PARKED the same way
     with InsightsV2.tsx. */
  .v2-hero-cols, .v2-stats-cols, .v2-why-cols, .v2-quote-cols, .v2-cta-cols, .v2-caserow { grid-template-columns:minmax(0,1fr); }
  .v2-stats-cols, .v2-quote-cols, .v2-cta-cols { gap:40px; }
  .v2-services, .v2-articles { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .v2-footcols { grid-template-columns:minmax(0,1fr) minmax(0,1fr); }
  .v2-navlinks { display:none; }
  /* .v2-navlinks going display:none removes the links from the tab order and
     from pointer reach, so active can never leave null below 980px — this
     is belt-and-braces so the scrim cannot render even if that ever changes. */
  .v2-nav-scrim { display:none !important; }
  /* PARKED with LifecycleV2.tsx (see the section-3 banner above). The
     floating preview needs ~460px sitting past the 52% mark; below this
     it either overflows the container or lands on top of the row's own words.
     The fill and the link still work — only the picture is dropped. */
  .v2-life-shot { display:none; }
  /* the quote portrait sits under the words rather than beside them */
  .v2-quote-portrait { max-width:420px; }
}

/* Below 980px the hero grid has collapsed and the text column jumps from
   ~484px to the FULL container, so the headline gets its size back: the
   980px-and-up ramp is sized for a 49.32vw column and would leave the
   headline absurdly small in a 90vw one.

   clamp(26px,8.9vw,60px), checked at the reserved width (line 1 = 9.754em)
   against the container, which is the viewport less clamp(20px,4vw,48px) of
   padding on each side:
        980  60.0px  ->  585px line 1 in a 902px column
        810  60.0px  ->  585px in a 745px column
        640  57.0px  ->  556px in a 589px column
        500  44.5px  ->  434px in a 460px column
        390  34.7px  ->  339px in a 350px column
        320  28.5px  ->  278px in a 280px column
   8.9vw rather than 9vw is what buys the last two rows: at 9vw the 320px
   case overruns its column by 0.9px. The 26px floor is below the 8.9vw ramp
   everywhere down to 292px and exists only so a pathological viewport cannot
   drive the type to nothing.

   All three lines stay three lines throughout: line 1 at its reserved width
   is the widest of them at every size, so if it fits, they all fit. */
@media (max-width: 980px) {
  .v2-hero-h1 { font-size:clamp(26px,8.9vw,60px); }
}

@media (max-width: 760px) {
  /* three columns of mono bullets do not fit a phone: stack them, and give the
     copy the full card width rather than 52% of a 350px card */
  .v2-stack__foot { grid-template-columns:minmax(0,1fr) !important; }
  .v2-stack__body { max-width:100%; }
}

@media (prefers-reduced-motion: reduce) {
  /* the scrub and the stagger are never CREATED under reduced motion (see
     WorkV2), so this is belt-and-braces for a card left mid-tween by a motion
     preference flipped during a scroll */
  .v2-stack__card { transform:none !important; filter:none !important; }
  /* a hover-only reveal with no motion cue is worse than no reveal: the button
     is permanently visible instead, and the transition is dropped */
  .v2-explore { opacity:1 !important; transform:none !important; transition:none !important; }

  /* section 4 — capability-card hover imagery. The wash is a STATE CHANGE
     (is-active toggles it), not motion, so it stays; only the fade-in
     transition goes — the photo appears at its full hover opacity instantly
     instead of fading in. */
  .v2-capcard-shot { transition:none !important; }

  /* section 3 — PARKED with LifecycleV2.tsx (see the section-3 banner above).
     The gold fill is a STATE CHANGE, not motion, so it stays. What goes is
     every transition, and the preview's scale-in: the picture appears
     instantly at full size on hover/focus rather than being animated in. */
  .v2-life-row, .v2-life-fill, .v2-life-shot, .v2-life-sub { transition:none !important; }
  .v2-life-shot { transform:translateY(-50%) !important; }

  /* section 1 — the headline, LIVE SCRAMBLE VARIANT
     (HeroHeadlineV2Scramble.tsx, currently imported by HeroV2.tsx — see the
     note at the top of the hero headline CSS section above). No scramble, no
     cycling at all: the component never arms its dwell timer under this
     preference, so the slot rests on POOL[0], "Pocket" — which is also the
     SSR state, so there is nothing to undo. The rule below is
     belt-and-braces for a scramble caught mid-flicker by a motion preference
     flipped while it was already running: the component's own animation loop
     reads the live preference every frame and snaps straight to the resolved
     word itself, so this exists only to guarantee the same outcome even if a
     frame is somehow missed — opacity:1 kills any lingering dim on an
     unresolved character and the transition goes with it. The gold band is a
     SURFACE, not motion, so it stays exactly where it is. */
  .v2-hero-char { opacity:1 !important; transition:none !important; }
  /* The band is a SURFACE, not motion: it stays exactly where and as wide as
     it is, resting on POOL[0]. Only its width transition goes. */
  .v2-hero-band { transition:none !important; }

  /* section 1 — the headline, PARKED WIPE (HeroHeadlineV2Wipe.tsx, not
     currently imported). Unlike the live scramble above, the word KEEPS
     CYCLING under reduced motion — the dwell/advance timer is gated on
     visibility and tab focus only, not on this preference. What changes is
     the transition itself: the component's own effect detects the live
     preference, kills any in-flight GSAP timeline and forces the block back
     to resting, and every subsequent cycle is a plain, un-animated text swap
     with no timeline ever built. The rule below is belt-and-braces for the
     same missed-frame case as above — and scaleX(0), NOT plain "none", is
     what "resting" actually is here: this block's rest state is INVISIBLE,
     not un-transformed. transform:none would resolve to an identity matrix —
     scaleX 1, i.e. fully expanded to whatever width GSAP last set — which is
     the one state this rule exists to prevent, not reproduce. Caught this by
     measuring: harmless in the case actually tested (width had never been
     set, so 0 x anything is still 0) but wrong in general, so fixed before it
     could bite. Kept live in the stylesheet even while the component is
     parked, so the rule is ready the instant the import swaps back. */
  .v2-hero-wipe { transform:scaleX(0) !important; }

  /* the trusted-by marquee — drastically slowed rather than fully stopped,
     so it still reads as "this scrolls" without the vestibular-trigger
     continuous motion a 68s (36.3px/s) loop is: ~6x slower again, well
     under 4px/s at the plateau width. Hover-pause above still applies on
     top of this. */
  .v2-marquee-track { animation-duration:600s; }

  /* header nav — the dim and the scrim are STATE, so they stay; only the
     animated fade goes, the same treatment as section 3's gold fill. */
  .v2-nav-link, .v2-nav-scrim { transition:none !important; }
}

@media (max-width: 640px) {
  /* .v2-articles here is PARKED with InsightsV2.tsx (see section 9 above);
     left in this shared selector for the same reason .v2-why-cols /
     .v2-cta-cols stay in their shared 980px selector above. */
  .v2-services, .v2-articles, .v2-figures, .v2-footcols { grid-template-columns:minmax(0,1fr); }
  /* PARKED with LifecycleV2.tsx (see the section-3 banner above). */
  .v2-life-row { gap:16px; padding-left:0; padding-right:0; }
  .v2-life-fill { inset:0 -14px -1px; }
  .v2-reason { grid-template-columns:minmax(0,1fr); gap:8px; }
  .v2-headrow { align-items:flex-start; }
}
`;

export function V2Styles() {
  return <style>{"@layer legacy {" + CSS + "}"}</style>;
}
