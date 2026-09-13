"use client";

import { type CSSProperties, useCallback, useState } from "react";

/**
 * The interactive four-row list in "The Conditions We Build For" (below the
 * thick rule in `about/page.tsx`). Pulled into its own client component
 * because `about/page.tsx` is a server component (it exports `metadata`) and
 * the per-row hover/focus state has to live in React — see the load-bearing
 * notes below, which are the same three rules `LifecycleV2.tsx` documents,
 * applied to a non-link row list instead of a link list.
 *
 * ── What is load-bearing here ────────────────────────────────────────────
 *
 *  1. NOTHING IS RESERVED AND NOTHING SHIFTS. The gold fill and the floating
 *     image stack are both absolutely-positioned overlays inside the row (see
 *     the `.a-cond*` rules in globals.css), so the row's border-box height is
 *     byte-identical at rest and active — confirmed by measuring the
 *     rendered page, not by reading this diff (CLAUDE.md's working
 *     practice). The row's THIRD grid column is nonetheless a real, reserved
 *     224px track: the stack floats inside it rather than being laid out by
 *     it, but reserving the track is what keeps the paragraph from running
 *     under the photo on hover. That was the actual defect in the previous
 *     layout — the card sat between the title and body columns and landed on
 *     top of the running copy.
 *
 *  2. THE RESTING STATE LIVES IN globals.css, NEVER INLINE. The only inline
 *     value a row carries is the custom property `--a-cond-shot`, naming its
 *     own picture — an inline `backgroundImage` would out-specify the
 *     `.is-active` rule and the reveal would silently never fire
 *     (CLAUDE.md trap #2).
 *
 *  3. THE ACTIVE ROW IS REACT STATE, NOT `:hover` / `:focus-within`. Those
 *     are independent CSS conditions and would stack (CLAUDE.md trap #5): a
 *     row focused by keyboard and a different row under the pointer would
 *     both light. `hover ?? focus` resolves the two inputs to one winner —
 *     the pointer beats a focus elsewhere, the keyboard still activates a
 *     row with no pointer in play, and losing the pointer falls back to the
 *     focused row. The stylesheet keys off `.is-active` only; there is no
 *     `:hover` rule left to stack with it. Focus is admitted only when
 *     `:focus-visible` matches, so a mouse press doesn't leave a row stuck
 *     lit — the hover half already covers the pointer case.
 *
 * Each row is an `<article>`, not a link — there is nothing to navigate to —
 * so it takes an explicit `tabIndex` to be reachable by keyboard at all
 * (a `<Link>`, as in LifecycleV2, is focusable for free).
 *
 * NO ICONS. The 64px leading icon column (lucide `Zap`/`ShieldCheck`/
 * `Wallet`/`Briefcase`, which had themselves replaced 01–04 numerals) was
 * removed at the user's request; the row now reads title -> paragraph ->
 * image, left to right, with nothing before the title. `lucide-react` went
 * with it — this file no longer imports it. Do not reintroduce a leading
 * column here without re-deriving `.a-cond`'s grid, which is written against
 * three tracks, and the stack's own clearance maths in globals.css.
 *
 * THE FLOATING IMAGE is keyed by title, exactly like `PILLAR_IMAGE` in
 * LifecycleV2, so reordering `conditions` can't mismatch a picture. All four
 * rows now have one. Matched by what is actually IN the photo, not by
 * filename:
 *   - lifecycle-solar.webp is solar panels in scrubland -> "Unreliable grid
 *     power" (the row is literally about off-grid power).
 *   - lifecycle-devices.webp is a laptop and a spread of phones/tablets on a
 *     desk -> "Hardware outpaces income" (the row is about the cost of that
 *     exact hardware).
 *   - lifecycle-refurb.webp is a man checking a phone in his hand -> "Devices
 *     are livelihoods" (the row's own line is "the phone in your hand").
 *   - workshop.webp is a CPU seated in a motherboard socket, shot close -> 
 *     "Trust is scarce". This row used to render with NO card at all, because
 *     the only unused lifecycle-* file (smarthome: a couch with cushions) had
 *     no honest connection to it and forcing it on would have misrepresented
 *     the row's claim (CLAUDE.md's content rules). Once the image moved into
 *     its own reserved column an empty slot became visible rather than
 *     invisible, so a real match was sourced instead: bench-level hardware
 *     inspection is precisely what "we made verification a documented process
 *     with a paper trail" describes. It also carries recorded CC0 provenance
 *     (StockSnap PUWNNLCU1C, see public/hero/CREDITS.md) — which the four
 *     lifecycle-* files, per that same file, do NOT.
 */

type Condition = { t: string; b: string };

const SHOT: Record<string, string> = {
  "Unreliable grid power": "/hero/lifecycle-solar.webp",
  "Trust is scarce": "/hero/workshop.webp",
  "Hardware outpaces income": "/hero/lifecycle-devices.webp",
  "Devices are livelihoods": "/hero/lifecycle-refurb.webp",
};

/**
 * The card is now a 176px SQUARE (it was portrait, 170x255). Three of the
 * four sources are 640x427 landscape, so `background-size:cover` into a
 * square box is height-bound (scale = 176/427 = 0.412, scaled width = 264px)
 * and ~66.7% of the image's width survives — a much gentler crop than the
 * portrait box's ~44.7%, so the old per-image `background-position` values
 * were re-derived against the wider slice rather than carried over. A plain
 * `data-shot` attribute (not a style, so `--a-cond-shot` stays the only
 * inline value) selects the per-image rule in globals.css:
 *   - solar: the panel rows run right across the frame; the wider slice now
 *     keeps the full cluster from a centred crop, so the old 44% nudge is no
 *     longer needed and would only push toward the sky-heavy right edge.
 *   - devices: the laptop occupies the left ~45% (0-288px of 640). A 427px
 *     slice at 12% spans 26-453px, which keeps the laptop whole plus the
 *     first phone — the same framing intent as before, still correct at the
 *     new width, so this one is kept.
 *   - refurb: hands and phone sit in the horizontal middle with head and leg
 *     either side; centred keeps all three. Unchanged.
 *   - workshop: 900x720, the only non-640x427 source. Height-bound the same
 *     way (scale = 176/720 = 0.244, scaled width = 220px), so ~80% of the
 *     width survives and the socketed CPU — dead centre in the frame — is
 *     never near an edge. Centred, no override.
 * None needed a vertical adjustment (a height-bound cover crops only
 * horizontally) and none are upscaled — every source is larger than 176px in
 * both axes.
 */
const SHOT_KEY: Record<string, string> = {
  "Unreliable grid power": "solar",
  "Trust is scarce": "workshop",
  "Hardware outpaces income": "devices",
  "Devices are livelihoods": "refurb",
};

export function ConditionsLedger({ conditions }: { conditions: Condition[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const active = hover ?? focus;

  /** Degrade to "any focus counts" rather than throwing — same guard as
   *  LifecycleV2's, `:focus-visible` support in `matches()` isn't universal. */
  const isFocusVisible = useCallback((el: Element) => {
    try {
      return el.matches(":focus-visible");
    } catch {
      return true;
    }
  }, []);

  return (
    <div className="a-ledger">
      {conditions.map((c, i) => {
        const shot = SHOT[c.t];
        const shotKey = SHOT_KEY[c.t];
        return (
          // `data-rv` lives on this WRAPPER, never on the `.a-cond` article
          // itself. RevealController adds "in" to whatever carries `data-rv`
          // via a direct, imperative `classList.add` — outside React's
          // knowledge. `.a-cond`'s own className is recomputed from React
          // state on every hover, and React's reconciler sets the whole
          // `class` attribute to exactly what that template produces; the
          // first render after ANY row's hover state changed was clobbering
          // the externally-added "in" back off the article, snapping every
          // row back to `[data-rv]`'s un-revealed resting style
          // (`opacity:0; transform:translateY(18px)`) — measured as an
          // 18px phantom vertical jump that had nothing to do with the gold
          // fill or the shot. Splitting the two elements gives each system
          // its own attribute to own.
          <div data-rv key={c.t}>
            <article
              tabIndex={0}
              className={`a-cond${active === i ? " is-active" : ""}`}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover((h) => (h === i ? null : h))}
              onFocus={(e) => {
                if (isFocusVisible(e.currentTarget)) setFocus(i);
              }}
              onBlur={() => setFocus((f) => (f === i ? null : f))}
              style={
                shot
                  ? ({ "--a-cond-shot": `url(${shot})` } as CSSProperties)
                  : undefined
              }
            >
              {/* the gold ground — an overlay, so it adds no height */}
              <span className="a-cond__fill" aria-hidden />

              <h3 className="a-cond__t">{c.t}</h3>
              <p className="a-cond__b">{c.b}</p>

              {/* The floating preview: ONE span, two squares. `::before` is
                  the solid white square behind, `::after` the photo in front
                  — both pseudo-elements, so the stack costs no extra markup
                  and neither half can ever become a hit target. Overlay
                  only, absent entirely for a row with no SHOT entry. Lives
                  in the row's reserved third column; see globals.css. */}
              {shot && (
                <span className="a-cond__shot" data-shot={shotKey} aria-hidden />
              )}
            </article>
          </div>
        );
      })}
    </div>
  );
}
