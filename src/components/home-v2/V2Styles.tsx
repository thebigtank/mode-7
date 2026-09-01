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
.v2-why-cols   { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.25fr); gap:clamp(32px,4vw,58px); align-items:start; }
.v2-quote-cols { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,0.92fr); gap:clamp(32px,14vw,204px); align-items:center; }
.v2-cta-cols   { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:clamp(32px,8vw,116px); align-items:start; }

/* section 4 — 3x2 service grid, 20px gutters */
.v2-services { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }

/* section 9 — 3-up article row, 32px gutters */
.v2-articles { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(20px,2.4vw,32px); align-items:start; }

/* section 2 — the three figures under the rule: equal thirds of the right
   column, ~180px each, which the 15px labels fit on one line. */
.v2-figures { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }

/* ── section 3 — the service index ────────────────────────────────────────
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

/* section 5 — numeral / body */
.v2-reason { display:grid; grid-template-columns:44px minmax(0,1fr); gap:clamp(10px,1.1vw,16px); align-items:start; }

/* section 4 — the "Explore" button, hidden until the card is hovered OR
   focused. THREE things are load-bearing here:
     1. it keeps its box (opacity + transform, never display or visibility), so the
        card's height is identical in both states and the grid never jumps;
     2. :focus-within sits alongside :hover, so tabbing to the button
        reveals it — a hover-only control is unreachable by keyboard;
     3. the resting state is declared HERE and nowhere inline: an inline
        opacity or transform on the wrapper would out-specify these rules. */
.v2-explore { opacity:0; transform:translateY(6px); transition:opacity .22s ease, transform .22s ease; }
.v2-capcard:hover .v2-explore,
.v2-capcard:focus-within .v2-explore { opacity:1; transform:translateY(0); }

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
   word moves — the noun on line 1, which rolls vertically through a pool.

       Powering your Pocket        <- the rolling slot
       with tech that's vetted,
       sealed and guaranteed.

   The markup, the pool and the timing are in HeroHeadlineV2; everything
   geometric is here.

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

   LINE HEIGHT 1.04 is the display leading, and it now governs all three lines
   because all three are ordinary blocks. The 1.37 that the gold band needs
   lives on the roll cell alone (see .v2-hero-cell), where it cannot loosen the
   headline: the mask is absolutely positioned, so it adds no height and line 1
   measures the same 1.04em as lines 2 and 3.

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

/* THE MASK. Absolutely positioned over the sizers, so it contributes no height
   and cannot loosen line 1. overflow:hidden is the only thing keeping the
   parked word off the screen.

   ITS HEIGHT IS 1.04em — THE LINE BOX, NOT THE FONT BOX — and that is
   load-bearing. Alegreya's font box is 1.37em, so a font-box-tall mask would
   hang 0.165em past the line box top and bottom, into the leading of line 1's
   neighbours. At rest nothing shows there, but mid-roll a fragment of the
   outgoing word appears above the headline and the ascenders of the incoming
   word cut a bar straight through "with tech that's vetted," one line down.
   Measured, and it reads as a glitch, so the mask clips at the line box.

   The pool is what makes that safe: at 72px, and proportionally at every
   size, the ink of the widest-reaching entry clears a 1.04em box by 8.02px at
   the top (Pocket / Office / Studio, whose t / ffi / d reach highest) and
   12.43px at the bottom. NO POOL WORD HAS A DESCENDER, which is where the
   bottom clearance comes from — an entry with a g, y or p would be clipped
   here and would need this height re-derived.

   left:0 right:0, so the mask is the full reserved width and a long incoming
   word is never clipped horizontally. Centred on the slot at 50% - 0.52em,
   which puts it exactly on line 1's own line box. */
.v2-hero-mask {
  position:absolute; left:0; right:0; top:50%; z-index:1;
  height:1.04em; margin-top:-0.52em;
  overflow:hidden;
}

.v2-hero-strip { display:block; transform:translateY(0); will-change:transform; }
.v2-hero-strip.is-rolling {
  transform:translateY(-50%);
  transition:transform 340ms cubic-bezier(.22,.61,.36,1);
}

/* One cell is one line box: height 1.04em AND line-height 1.04, matching the
   mask, so the two cells tile it exactly and the strip's 50% step lands the
   incoming word on the outgoing one's baseline to the pixel. */
.v2-hero-cell { display:block; height:1.04em; line-height:1.04; }

/* ── THE GOLD BAND ────────────────────────────────────────────────────────
   ONE element, always on screen, and it never moves. It is a sibling of the
   strip, not a child of any word, so the words roll THROUGH the marker instead
   of each dragging its own copy of it up and out of frame.

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
   retargets it to the INCOMING word the instant the roll starts, so the
   marker stretches into the new word over the same 340ms and the same easing
   as the roll rather than snapping a beat late. Only width is animated and the
   band is absolutely positioned, so the layout outside this box cannot move.

   Before that measurement lands — the server HTML, the pre-hydration paint,
   a fonts-not-yet-loaded frame — the width comes from .v2-hero-bandsize, a
   visibility:hidden copy of the target word inside the band. Shrink-to-fit
   makes that exactly the right width with no JS. overflow:hidden keeps that
   copy inside the 0.3288em block once an explicit width is in force.

   Contrast, measured: ink #171D1D on this gold #F0C044 is 10.02:1 for the
   lower half of the letterforms, and above the band the same ink on wash
   #E6EAE6 is 14.05:1. Both pass WCAG AAA for body text, let alone display. */
.v2-hero-band {
  position:absolute; left:0; top:50%; z-index:0;
  margin-top:0.1096em;
  height:0.3288em;
  background:#F0C044;
  overflow:hidden;
  transition:width 340ms cubic-bezier(.22,.61,.36,1);
}
.v2-hero-bandsize { visibility:hidden; white-space:nowrap; }

/* The words paint OVER the band (the mask carries z-index:1 above) and carry
   no background of their own. */
.v2-hero-word { position:relative; }

/* Header nav links. The display value MUST live here, not inline on the
   element: the 980px rule below hides them, and an inline display:flex would
   out-specify it and leave the links (and the Shop action) overflowing the
   panel on mobile. */
.v2-navlinks { display:flex; }

/* the logo strip: one row at 1440, wrapping only when it must */
.v2-logos { display:flex; align-items:center; justify-content:space-between; gap:clamp(14px,2vw,28px); flex-wrap:wrap; }

@media (max-width: 980px) {
  .v2-hero-cols, .v2-stats-cols, .v2-why-cols, .v2-quote-cols, .v2-cta-cols, .v2-caserow { grid-template-columns:minmax(0,1fr); }
  .v2-stats-cols, .v2-quote-cols, .v2-cta-cols { gap:40px; }
  .v2-services, .v2-articles { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .v2-footcols { grid-template-columns:minmax(0,1fr) minmax(0,1fr); }
  .v2-navlinks { display:none; }
  /* the floating preview needs ~460px sitting past the 52% mark; below this
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

  /* section 3 — the gold fill is a STATE CHANGE, not motion, so it stays. What
     goes is every transition, and the preview's scale-in: the picture appears
     instantly at full size on hover/focus rather than being animated in. */
  .v2-life-row, .v2-life-fill, .v2-life-shot, .v2-life-sub { transition:none !important; }
  .v2-life-shot { transform:translateY(-50%) !important; }

  /* section 1 — the headline. No roll, no rotation. The component never arms
     its dwell timer under this preference, so the slot rests on POOL[0],
     "Pocket" — which is also the SSR state, so there is nothing to undo. The
     rules below are belt-and-braces for a strip left mid-roll by a motion
     preference flipped while the transition was in flight: transform:none
     puts it back on the resting word, and the transition goes with it. The
     gold band is a SURFACE, not motion, so it stays exactly where it is. */
  .v2-hero-strip { transform:none !important; transition:none !important; }
  /* The band is a SURFACE, not motion: it stays exactly where and as wide as
     it is, resting on POOL[0]. Only its width transition goes. */
  .v2-hero-band { transition:none !important; }
}

@media (max-width: 640px) {
  .v2-services, .v2-articles, .v2-figures, .v2-footcols { grid-template-columns:minmax(0,1fr); }
  .v2-life-row { gap:16px; padding-left:0; padding-right:0; }
  .v2-life-fill { inset:0 -14px -1px; }
  .v2-reason { grid-template-columns:minmax(0,1fr); gap:8px; }
  .v2-headrow { align-items:flex-start; }
  .v2-logos { justify-content:flex-start; }
}
`;

export function V2Styles() {
  return <style>{CSS}</style>;
}
