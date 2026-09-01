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
 * headline is now two lines rather than three, but the ratio is UNCHANGED: its
 * second line is a single long line of three display words and 710px is what
 * sets the size that line can be. See `.v2-hero-h1` below for the measured fit.
 *
 * Two breakpoints throughout: ~980px collapses multi-column layouts to one (or
 * three to two), ~640px collapses whatever is left.
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
   Two lines. Line 1 "Powering your" at 0.4em; line 2 three display words with
   a gold stroke travelling between them. The markup and the motion are in
   HeroHeadlineV2; everything geometric is here.

   FONT SIZE: clamp(34px,4.58vw,66px), i.e. 66px at 1440. Was
   clamp(38px,5.28vw,76px) = 76px, sized for the old THREE-LINE static
   headline in a 710px column. 76px no longer fits, because line 2 is now one
   long line that must hold its widest state. Measured advance widths for
   Alegreya 400 at letter-spacing -0.02em, per 100px of font size:

       Home.      268.70        Future.     288.00   (the pool default)
       Pocket.    284.81        Office.     262.61
                                Studio.     284.31
                                Workshop.   428.20   <- the widest, and the
                                                        width the slot holds

   Widest line = 268.70 + 284.81 + 428.20 + two 26 gaps = 1033.71 per 100px,
   i.e. 10.337em. The text column is 710px at 1440, so the ceiling is
   710 / 10.337 = 68.7px. 66px is that with 28px of slack, and 4.58vw lands on
   65.95 at 1440 so the clamp is on its vw ramp there rather than pinned.
   The column ratio, the gutter and the gap are all inputs to that division —
   change any of them and re-run it.

   Checked down the range, always against the WIDEST state (Workshop.):
       1440  66.0px  ->  682px line in a 710px column
       1280  58.6px  ->  606px in a 629px column
       1024  46.9px  ->  485px in a 524px column
        981  44.9px  ->  464px in a 502px column   (last multi-column width)
        980  44.9px  ->  464px in a 901px column   (grid has collapsed)
   Below 900 the line STACKS — see the 900px block further down.

   LINE HEIGHT 1.37 ON THE WORDS is not a leading choice, it is the marker's
   coordinate system. Alegreya's fontBoundingBox is 102 up / 35 down per
   100px = 137 tall, and at line-height 1.37 the half-leading is zero, so a
   word's line box IS that content box and the marker's 18%/42% stops land
   exactly where they landed on the old inline background-image. The h1's own
   1.04 governs nothing now that both lines set their own leading; it is kept
   only so an unstyled fragment still looks like a headline.

   letter-spacing -0.02em is unchanged and still correct: it scales with the
   font, so -1.32px at 66px is the same relative tightening measured clean at
   64 and 76px, and no pair collides. */
.v2-hero-h1 { font-size:clamp(34px,4.58vw,66px); line-height:1.04; letter-spacing:-0.02em; }

/* line 1 — 0.4em of the display size, so ONE clamp drives both lines. 26.4px
   at 1440. -0.01em: at a quarter of the display size the -0.02em tracking of
   the big line reads as a defect rather than as tightening. */
.v2-hero-l1 { display:block; font-size:0.4em; line-height:1.2; letter-spacing:-0.01em; }

/* line 2 — the three words, and the stroke's positioning context.
   white-space:nowrap is what makes the "one line" claim true rather than
   hopeful: if the fit calculation above is ever invalidated the line will
   OVERFLOW visibly instead of silently wrapping and breaking the marker's
   single-row assumption. The <=900px block turns it off along with the flex.
   0.26em gap = 17.2px at 1440; it is part of the width sum above. */
.v2-hero-l2 {
  position:relative;
  display:flex; align-items:flex-start; gap:0.26em;
  white-space:nowrap;
  margin-top:0.02em;
}

/* a word. line-height 1.37 — see the note above; it is load-bearing.
   THE RESTING OPACITY IS 0.55 and it is a documented compromise. Ink #171D1D
   at 55% over wash #E6EAE6 composites to #747977, measured 3.64:1. That is
   short of the 4.5:1 body floor and above the 3:1 large-text floor, which is
   the one that applies: these words are 66px, far past WCAG's 18.66px
   large-text threshold, and each word is also announced in the h1's
   aria-label regardless of what the marker is doing. 0.625 is the lowest
   opacity that reaches the body floor (4.53:1) if the 3:1 floor is ever
   judged not good enough here; it costs the contrast BETWEEN the lit and
   unlit words, which is the whole point of the effect. */
.v2-hero-word {
  position:relative; z-index:1;
  display:block; line-height:1.37;
  opacity:0.55;
  transition:opacity .5s ease;
}
.v2-hero-word.is-lit { opacity:1; }

/* the rotating slot. All four pool words occupy the SAME grid cell, so the
   column sizes to the widest of them and a swap can never change the line's
   width. justify-items:start keeps each word its own width rather than
   stretching it to the column, which is what the marker measures. */
.v2-hero-slot { display:grid; justify-items:start; }
/* The swap is a fade OUT then a fade IN, never a cross-fade. Both words share
   one grid cell, so overlapping them at partial opacity superimposes two
   different words on the same pixels — measured on the Future. -> Office.
   tick, and unreadable. The outgoing word has no delay and takes 0.22s; the
   incoming one waits 0.24s, so the cell is empty between them. The delay is
   declared on .is-shown ONLY, so removing the class drops it and the outgoing
   fade starts immediately. 0.46s total, inside the 2.4s the marker spends two
   slots away. */
.v2-hero-pool { grid-area:1 / 1; opacity:0; transition:opacity .22s ease; }
.v2-hero-pool.is-shown { opacity:1; transition-delay:.24s; }

/* THE TRAVELLING STROKE. Same two-stop hard-edged gradient as the static
   headline used, over a box 1.37em tall — see HeroV2 for how 18% and 42%
   were derived from Alegreya's metrics. 100px wide at rest so the component
   can scale it by measuredWidth/100; the gradient runs vertically, so a
   horizontal scale cannot distort the band. transform (not left/width) so
   the travel composites and reflows nothing.
   It stays invisible until the component has measured a word, so it can
   never paint at an unmeasured position on the first frame. */
.v2-hero-mark {
  position:absolute; left:0; top:0; z-index:0;
  width:100px; height:1.37em;
  transform-origin:0 0;
  background-image:linear-gradient(to top, transparent 18%, #F0C044 18%, #F0C044 42%, transparent 42%);
  opacity:0;
  transition:transform .62s cubic-bezier(.66,0,.34,1), opacity .3s ease;
}
.v2-hero-mark.is-ready { opacity:1; }

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

/* Three display words do not fit one line on a tablet, let alone a phone, so
   below 900px the line STACKS — one word per line, and the marker travels
   DOWN the stack instead of across it (the component's transform carries a Y
   for exactly this). Nothing is dropped, nothing overflows and no word is
   orphaned: each word IS its own line by construction.

   The size steps UP at the breakpoint, clamp(38px,8.6vw,62px) against the
   one-line 44.9px at 900px, because a stacked headline has the vertical room
   the single line did not and 45px words would read as body copy. Widest
   state, always "Workshop." at 4.282em:
        900  62.0px -> 265px in an ~828px column
        768  62.0px -> 265px in an ~700px column
        390  38.0px -> 163px in a  ~350px column
   nowrap is removed with the flex so a pathological narrow case can still
   break inside a word rather than push the page sideways. */
@media (max-width: 900px) {
  .v2-hero-h1 { font-size:clamp(38px,8.6vw,62px); }
  .v2-hero-l2 { display:block; white-space:normal; }
  .v2-hero-l1 { margin-bottom:0.06em; }
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

  /* section 1 — the headline. No travel, no rotation, no fade. The component
     never starts its interval under this preference, so the marker stays
     where it was rendered (the third word, which is also the SSR state) and
     the slot keeps showing the pool's first word. All three words go to full
     opacity: a resting 55% is a motion cue with the motion taken away, and
     it would leave two thirds of the headline at 3.66:1 for no reason. */
  .v2-hero-word { opacity:1 !important; }
  .v2-hero-word, .v2-hero-pool, .v2-hero-mark { transition:none !important; }
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
