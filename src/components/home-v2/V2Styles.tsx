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
 *   hero     left 558 / gap 80  / right 642   -> 1fr 1.15fr
 *   stats    left 560 / gap 160 / right 560   -> 1fr 1fr, gap 160
 *   why      left 544 / gap 58  / right 678   -> 1fr 1.25fr
 *   quote    left 560 / gap 204 / right 516   -> 1fr 0.92fr, gap 204
 *
 * Two breakpoints throughout: ~980px collapses multi-column layouts to one (or
 * three to two), ~640px collapses whatever is left.
 */
const CSS = `
.v2-hero-cols  { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.15fr); gap:clamp(32px,5.5vw,80px); align-items:center; }
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

/* section 3 — label / marker / statement, inset from the container */
.v2-life-row { display:grid; grid-template-columns:minmax(0,1fr) 44px minmax(0,1.55fr); gap:clamp(16px,2.2vw,32px); align-items:center; }

/* section 5 — numeral / body */
.v2-reason { display:grid; grid-template-columns:44px minmax(0,1fr); gap:clamp(10px,1.1vw,16px); align-items:start; }

/* section 7 — case-study row: text half, image half, image flush to the edge */
.v2-caserow { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,0.675fr); align-items:stretch; }

.v2-footcols { display:grid; grid-template-columns:minmax(0,1.4fr) repeat(2,minmax(0,1fr)); gap:clamp(28px,4vw,56px); }
.v2-legal { display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; }
.v2-headrow { display:flex; justify-content:space-between; align-items:flex-end; gap:32px; flex-wrap:wrap; }

/* h1: the measured 64/64/-1.28px at 1440, scaling down below it */
.v2-hero-h1 { font-size:clamp(38px,4.45vw,64px); line-height:1.14; letter-spacing:-0.02em; }

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
  /* the quote portrait sits under the words rather than beside them */
  .v2-quote-portrait { max-width:420px; }
}

@media (max-width: 640px) {
  .v2-services, .v2-articles, .v2-figures, .v2-footcols { grid-template-columns:minmax(0,1fr); }
  .v2-life-row { grid-template-columns:36px minmax(0,1fr); gap:14px; }
  .v2-life-label { grid-column:2; text-align:left !important; order:-1; }
  .v2-reason { grid-template-columns:minmax(0,1fr); gap:8px; }
  .v2-headrow { align-items:flex-start; }
  .v2-logos { justify-content:flex-start; }
}
`;

export function V2Styles() {
  return <style>{CSS}</style>;
}
