"use client";

import { type CSSProperties, useCallback, useState } from "react";
import { Briefcase, ShieldCheck, Wallet, Zap, type LucideIcon } from "lucide-react";

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
 *     image are both absolutely-positioned overlays inside the row (see the
 *     `.a-cond*` rules in globals.css), so the row's border-box height is
 *     byte-identical at rest and active — confirmed by measuring the
 *     rendered page, not by reading this diff (CLAUDE.md's working
 *     practice).
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
 * ICONS replace the 01–04 numerals, one per condition, picked to fit its
 * subject: `Zap` (an unreliable grid — the row is literally about power),
 * `ShieldCheck` (scarce trust — verification, warranties, a paper trail),
 * `Wallet` (hardware priced against income), `Briefcase` (a device that
 * doubles as somebody's livelihood).
 *
 * THE FLOATING IMAGE is keyed by title, exactly like `PILLAR_IMAGE` in
 * LifecycleV2, so reordering `conditions` can't mismatch a picture. Only
 * three of the four rows get one. `public/hero/lifecycle-*.webp` has four
 * candidates (devices, refurb, smarthome, solar) and they were matched by
 * what is actually IN the photo, not by filename:
 *   - lifecycle-solar.webp is solar panels in scrubland -> "Unreliable grid
 *     power" (the row is literally about off-grid power).
 *   - lifecycle-devices.webp is a laptop and a spread of phones/tablets on a
 *     desk -> "Hardware outpaces income" (the row is about the cost of that
 *     exact hardware).
 *   - lifecycle-refurb.webp is a man checking a phone in his hand -> "Devices
 *     are livelihoods" (the row's own line is "the phone in your hand").
 *   - lifecycle-smarthome.webp is a couch with cushions — a cozy-interior
 *     shot with no connection to any of the four conditions, "Trust is
 *     scarce" included. Forcing it onto a row would misrepresent that row's
 *     claim (CLAUDE.md's content rules), so it is not used here, and "Trust
 *     is scarce" renders with no card at any width.
 */

type Condition = { t: string; b: string };

const ICON: Record<string, LucideIcon> = {
  "Unreliable grid power": Zap,
  "Trust is scarce": ShieldCheck,
  "Hardware outpaces income": Wallet,
  "Devices are livelihoods": Briefcase,
};

const SHOT: Record<string, string> = {
  "Unreliable grid power": "/hero/lifecycle-solar.webp",
  "Hardware outpaces income": "/hero/lifecycle-devices.webp",
  "Devices are livelihoods": "/hero/lifecycle-refurb.webp",
  // "Trust is scarce" intentionally has no entry — see the note above.
};

/**
 * The card is now portrait (170x255, 2:3) while every source photo is
 * 640x427 landscape (3:2) — `background-size:cover` into a portrait box is
 * height-bound (scale = boxHeight / imgHeight = 255/427 = 0.597), so the
 * FULL height shows but only ~44.7% of the image's WIDTH survives (270px of
 * 640px); vertical position never crops anything here, only horizontal does,
 * and it does so hard. A plain `data-shot` attribute (not a style, so
 * `--a-cond-shot` stays the only inline value) selects a per-image
 * `background-position` rule in globals.css, chosen by opening each photo
 * and checking what a 270px-wide vertical slice keeps:
 *   - solar: panels run in three diagonal rows across nearly the whole
 *     frame, so a near-centre slice keeps two-plus full panel rows and the
 *     hillside above them, without drifting into the sky-heavy right edge
 *     or the out-of-focus foreground twigs that get worse at the far left
 *     and right. 44% keeps that densest cluster.
 *   - devices: the laptop is the frame's one unambiguous subject and sits
 *     entirely in the left ~45% (0-288px of 640) — almost exactly the
 *     270px-wide slice this crop keeps if anchored left. 12% nudges just
 *     enough right to also catch the first phone's edge, so the crop reads
 *     as "a laptop and a phone," not "a laptop" cropped tight.
 *   - refurb: the hands and the phone he is checking sit in the frame's
 *     horizontal middle, with his head to their left and his leg to their
 *     right providing context either side — a centred slice keeps the
 *     phone whole with both, so no override is needed beyond the default.
 * None of the three needed a vertical adjustment (see above), and none are
 * upscaled — the box is smaller than the source in both axes.
 */
const SHOT_KEY: Record<string, string> = {
  "Unreliable grid power": "solar",
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
        const Icon = ICON[c.t];
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

              {/* the floating preview — overlay, never a hit target, and
                  absent entirely for rows with no SHOT entry above */}
              {shot && (
                <span className="a-cond__shot" data-shot={shotKey} aria-hidden />
              )}

              {Icon && (
                <span className="a-cond__icon" aria-hidden>
                  <Icon size={26} strokeWidth={1.75} />
                </span>
              )}
              <h3 className="a-cond__t">{c.t}</h3>
              <p className="a-cond__b">{c.b}</p>
            </article>
          </div>
        );
      })}
    </div>
  );
}
