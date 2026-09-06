"use client";

import { type CSSProperties, type FocusEvent, useCallback, useState } from "react";
import { heroFeatures } from "@/lib/content";
import { V2, V2_FONT, V2_TYPE } from "@/lib/theme-v2";
import { ArrowLink, Band, H2 } from "./Ui";

/**
 * Section 4 — the reference's service grid: a left-aligned two-line display
 * heading over a 3x2 block of cards. Five cards carry a line icon, a serif
 * title, a paragraph and a trailing "explore" link; the fifth sits on the dark
 * ground and the sixth is the accent CTA tile.
 *
 * Measured against `04-services.png` at 1440: cards 412x300 on a 20px gutter
 * (3 x 412 + 2 x 20 = 1276 ≈ the 1280 container), 40px card padding, a 24px
 * icon at the top, the title 24px serif, the body 16px, and the link pinned to
 * the card's bottom edge; the heading sits 92px above the first row.
 *
 * Mode 7 content: cells 1–5 are the five `heroFeatures` strings, each with the
 * one-line description already paired with it in `pillars` where one exists.
 * Cell 6 points at the existing /shop route. No description is written for
 * this section that Mode 7 does not already publish.
 *
 * "Explore" is now the SAME `ArrowLink` treatment as the gold cell's CTA —
 * label + ringed arrow, no box — hidden at rest and revealed on the card's
 * `:hover` OR `:focus-within`. It keeps its box in layout while hidden
 * (opacity, not display), so the card cannot change height and the grid
 * cannot jump. Under `prefers-reduced-motion: reduce` the transition is
 * dropped AND the button is made permanently visible: a reveal with no motion
 * cue is worse than none. All of that lives in `.v2-explore` / `.v2-capcard`
 * in `V2Styles` — unchanged by this file.
 *
 * These five cards have no destination yet, so their "Explore" is rendered
 * WITHOUT an `href`: `ArrowLink` then renders a plain, `aria-hidden`,
 * non-focusable `<span>` rather than a `<a href="#">` or a no-op `onClick` —
 * see the comment on `ArrowLink` in `Ui.tsx`. A dead anchor still reads as
 * "link" to assistive tech and still eats a Tab stop for nothing; this reads
 * as nothing, which is the honest state.
 *
 * `ArrowLink` itself holds no focusable element on these five cards, so
 * `:focus-within` cannot come FROM it. Cell 5 ("Accessories") has nothing
 * else focusable either, so `:focus-within` genuinely never fires there —
 * correct: a control with no action has no business being a keyboard stop.
 * The other four now carry `tabIndex={0}` on the card itself for the hover
 * imagery below, and `:focus-within` matches an element that IS the focused
 * element as well as one containing it — so focusing one of those four also
 * reveals its (still inert, still `aria-hidden`) "Explore" span, the same as
 * hovering it does. That is a side effect of the tab stop, not a new
 * affordance: nothing under it became clickable. The gold cell's real link
 * keeps `:focus-within` working exactly as it always has.
 *
 * Colour: `ArrowLink`'s label AND ring-arrow share one `color`, so each card
 * needs its own that clears its ground — ink (`V2.ink`) on the four white
 * cards, white (`V2.white`) on the dark fifth. Both are the SAME tokens the
 * outline button used here before (17.07:1 either way — see `V2.ink`'s
 * doc-comment in `theme-v2.ts`), so the swap changes the button's shape, not
 * its contrast. The CTA tile is the gold GROUND with `V2.accentOn` type
 * (10.02:1); its link is ink, because white on gold would be 1.70:1. That
 * cell's action is now "Explore Our Online Shop" -> `/shop`, and it stays
 * always visible.
 *
 * ── hover imagery (user request) ────────────────────────────────────────────
 *
 * On hover/focus, the four cards with a mapped photo (`CARD_IMAGE` below) show
 * a faint photographic wash behind the card's own ground — never a dark
 * scrim. The user offered two options: (a) a heavy dark scrim + white label,
 * or (b) keep the light ground and let the photo sit very faintly behind it
 * so the text stays crisp. (b) was chosen and measured on the rendered page —
 * see the ratios recorded where `.v2-capcard-shot` is defined in `V2Styles`.
 * Sampling was against the DARKEST pixel behind each card's title/body text
 * at full hover opacity, not an average — a photo is not uniform, and CLAUDE.md
 * is explicit that contrast-over-photography has to be measured, not assumed.
 *
 * Two cards get NO hover image, deliberately:
 *   - Cell 5, "Accessories" (dark ground): no existing asset fits. The only
 *     accessories photo in the repo, `access.webp`, is a 160x160 crop (see
 *     `public/hero/CREDITS.md`) — already far smaller than this card's
 *     ~412x300 box, and CREDITS.md's own note says not to upscale these, it
 *     says to re-export from source instead. There is no source to re-export
 *     from here, and inventing/downloading a new image is exactly what this
 *     task was told not to do. The card stays on its solid `ink` ground.
 *   - Cell 6, the gold CTA tile: no image at all, by choice, not by missing
 *     asset. First, there is no existing photo for a generic "shop" CTA the
 *     way there is for four specific product categories. Second, and more
 *     load-bearing: the gold rule's ratios (10.60:1 `accentOn`-on-`accent`,
 *     `#F0C044` flat) are measured against a FLAT gold fill. Laying a photo
 *     wash under it — even a faint one — would make the effective ground a
 *     per-pixel gold/photo blend with no single measurable ratio, which is
 *     precisely the kind of "assuming the scrim value instead of measuring
 *     pixels" CLAUDE.md warns against. The safer, honest choice is to leave
 *     the one cell whose contrast guarantee depends on staying flat, flat.
 *
 * Keyboard parity (Trap #5): the four image cards are the only ones made
 * focusable here (`tabIndex={0}`) — revealing the photo is a real, visible
 * effect of focusing them, unlike `ArrowLink`'s href-less span above, which
 * stays a non-focusable `aria-hidden` decoration because activating it would
 * do nothing. Cell 5 and the gold tile are unchanged: cell 5 has no image to
 * reveal, and the gold tile's real link already drives `:focus-within` as
 * before. `:hover` and `:focus-within` are independent conditions and would
 * light two cards at once if left as CSS pseudo-classes (the exact bug
 * documented for `LifecycleV2` and `HeaderV2`); resolved the same way here —
 * `hover` and `focus` tracked separately in React state, the active card is
 * `hover ?? focus`, and `.v2-capcard-shot` keys off the resulting `.is-active`
 * class only.
 */

/**
 * One line of Mode 7's own copy per card. The first four are the `sub` strings
 * already paired with these names in `pillars`; Accessories has no published
 * line, so it carries none rather than an invented one.
 */
const BLURB: Record<string, string> = {
  "Premium Devices": "Laptops, tablets and phones, fully vetted.",
  "Certified Refurbished": "Renewed, sealed and guaranteed like new.",
  "Smart Home Automation": "One app to run your entire connected home.",
  "Solar & Green Energy": "Clean-energy systems, installed and managed.",
};

/**
 * Hover/focus imagery, one per card, keyed by `heroFeatures` title rather
 * than index — same reasoning as `PILLAR_IMAGE` in the now-parked
 * `LifecycleV2`: reordering `heroFeatures` cannot silently mismatch a photo.
 * These are the SAME four files `LifecycleV2` used for these same four
 * titles, shot at 640x427 — free to reuse now that section is parked (see
 * the v2 CLAUDE.md). "Accessories" has no entry: there is no existing asset
 * at a usable size for it (see the header comment above), so it carries none
 * rather than a mismatched or invented one.
 */
const CARD_IMAGE: Record<string, string> = {
  "Premium Devices": "/hero/lifecycle-devices.webp",
  "Certified Refurbished": "/hero/lifecycle-refurb.webp",
  "Smart Home Automation": "/hero/lifecycle-smarthome.webp",
  "Solar & Green Energy": "/hero/lifecycle-solar.webp",
};

/** 24px line marks, one per card — drawn here, nothing downloaded. */
function Icon({ name, color }: { name: string; color: string }) {
  const s = { stroke: color, strokeWidth: 1.2, fill: "none" } as const;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      {name === "Premium Devices" ? (
        <>
          <rect x="3" y="4" width="14" height="11" rx="1" {...s} />
          <path d="M1 18h18" {...s} strokeLinecap="round" />
          <rect x="18" y="9" width="5" height="11" rx="1" {...s} />
        </>
      ) : name === "Certified Refurbished" ? (
        <>
          <path d="M20 12a8 8 0 1 1-2.4-5.7" {...s} strokeLinecap="round" />
          <path d="M20 3v4h-4" {...s} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 12.2 11 14.7l4.6-4.8" {...s} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : name === "Smart Home Automation" ? (
        <>
          <path d="M3.5 10.5 12 3.5l8.5 7" {...s} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 9.8V20h13V9.8" {...s} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="14.5" r="2.2" {...s} />
        </>
      ) : name === "Solar & Green Energy" ? (
        <>
          <circle cx="12" cy="12" r="4" {...s} />
          <path
            d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19"
            {...s}
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path d="M6 9V6.5a6 6 0 0 1 12 0V9" {...s} strokeLinecap="round" />
          <rect x="3.5" y="9" width="17" height="11" rx="2" {...s} />
        </>
      )}
    </svg>
  );
}

export function CapabilityGridV2() {
  /**
   * One active-card index shared across all four image cards, exactly the
   * `LifecycleV2` / `HeaderV2` pattern: `hover` and `focus` tracked
   * separately so a pointer on one card always wins over a focus sitting on
   * another, a keyboard user still gets the reveal with no pointer in play,
   * and losing the pointer falls back to whichever card is still focused
   * rather than to nothing.
   */
  const [hover, setHover] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const active = hover ?? focus;

  /** Degrade to "any focus counts" where `:focus-visible` isn't supported,
   *  rather than throwing and losing the keyboard path — same helper as
   *  `LifecycleV2`. */
  const isFocusVisible = useCallback((el: Element) => {
    try {
      return el.matches(":focus-visible");
    } catch {
      return true;
    }
  }, []);

  return (
    <Band ground={V2.wash} pad="clamp(64px,8.7vw,126px)" padBottom="clamp(64px,6.3vw,90px)">
      {/* 56px, up from 40px, on a 1.06 line-height. The tracking scales with
          it: the reference sets its 64px h1 at -1.28px, i.e. -0.02em, so 56px
          takes -1.12px — rounded to the -1.1px quoted in the brief. The margin
          below drops from 92px to 46px: the heading now carries enough weight
          to own the grid beneath it, and 92px read as two unrelated blocks. */}
      <H2
        size="clamp(34px,3.9vw,56px)"
        lineHeight={1.06}
        style={{ maxWidth: 680, letterSpacing: "-1.1px", marginBottom: "clamp(24px,3.2vw,46px)" }}
      >
        Built around you, from first tap to upgrade.
      </H2>

      <div className="v2-services">
        {heroFeatures.map((f, i) => {
          /* the fifth card takes the dark ground, as the reference's does */
          const dark = i === 4;
          const ground = dark ? V2.ink : V2.white;
          const title = dark ? V2.white : V2.ink;
          const body = dark ? V2.faint : V2.muted;
          const shot = CARD_IMAGE[f];

          return (
            <article
              key={f}
              className={`v2-capcard${active === i ? " is-active" : ""}`}
              style={{
                background: ground,
                borderRadius: 2,
                minHeight: 300,
                padding: 40,
                display: "flex",
                flexDirection: "column",
                ...(shot ? ({ "--v2-card-shot": `url(${shot})` } as CSSProperties) : null),
              }}
              /* only the four image cards get pointer/focus tracking and a
                 tab stop — cell 5 (no image) is left exactly as before */
              {...(shot
                ? {
                    tabIndex: 0,
                    onPointerEnter: () => setHover(i),
                    onPointerLeave: () => setHover((h) => (h === i ? null : h)),
                    onFocus: (e: FocusEvent<HTMLElement>) => {
                      if (isFocusVisible(e.currentTarget)) setFocus(i);
                    },
                    onBlur: () => setFocus((fo) => (fo === i ? null : fo)),
                  }
                : {})}
            >
              {/* the photographic wash — overlay, adds no height, never a hit
                  target. Rendered only for the four cards with a mapped
                  photo; absent for cell 5, which stays exactly as before. */}
              {shot ? <span className="v2-capcard-shot" aria-hidden /> : null}

              <Icon name={f} color={title} />
              <h3
                style={{
                  margin: "22px 0 0",
                  fontFamily: V2_FONT.display,
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: 1.25,
                  letterSpacing: "-0.24px",
                  color: title,
                }}
              >
                {f}
              </h3>
              {BLURB[f] ? (
                <p
                  style={{
                    margin: "16px 0 0",
                    fontFamily: V2_FONT.body,
                    fontWeight: 300,
                    fontSize: 16,
                    lineHeight: "26px",
                    color: body,
                  }}
                >
                  {BLURB[f]}
                </p>
              ) : null}
              {/* Same `ArrowLink` treatment as the CTA tile's "Explore Our
                  Online Shop" below — label + ringed arrow, no box. No `href`:
                  these five cards have no destination yet, so `ArrowLink`
                  renders a non-interactive, `aria-hidden` span rather than a
                  dead anchor (see `ArrowLink` in `Ui.tsx`). Colour flips ink /
                  white per card ground — both 17.07:1, so the swap from the
                  old outline button changes shape, not contrast.

                  The resting state (opacity 0 + a 6px nudge) is set by
                  `.v2-explore` in V2Styles, NOT inline: an inline `opacity` or
                  `transform` would out-specify the stylesheet's hover rule and
                  the button would never appear. */}
              <div className="v2-explore" style={{ marginTop: "auto", paddingTop: 24 }}>
                <ArrowLink label="Explore" color={dark ? V2.white : V2.ink} />
              </div>
            </article>
          );
        })}

        {/* cell 6: the accent CTA tile */}
        <article
          style={{
            background: V2.accent,
            borderRadius: 2,
            minHeight: 300,
            padding: 40,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: V2_FONT.display,
              fontWeight: 400,
              fontSize: 40,
              lineHeight: 1.12,
              letterSpacing: V2_TYPE.h2.letterSpacing,
              /* ink on gold, 10.02:1 */
              color: V2.accentOn,
            }}
          >
            Not sure where to start?
          </h3>
          <ArrowLink
            label="Explore Our Online Shop"
            href="/shop"
            color={V2.accentOn}
            style={{ marginTop: "auto", paddingTop: 24 }}
          />
        </article>
      </div>
    </Band>
  );
}
