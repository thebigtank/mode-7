"use client";

import Link from "next/link";
import { type CSSProperties, useCallback, useState } from "react";
import { pillars } from "@/lib/content";
import { V2, V2_FONT, V2_TYPE } from "@/lib/theme-v2";
import { Band } from "@/components/ui/Band";

/**
 * Section 3 — the service index.
 *
 * A centred header block (pill label, display heading, one supporting line)
 * over a hairline-separated list of rows. Each row is a LINK: a large serif
 * title with a small description beneath it on the left, an ↗ at the far
 * right. On hover / focus the whole row fills gold and a photographic preview
 * floats over it, right-of-centre, overhanging the row's top and bottom edges
 * so it overlaps its neighbours.
 *
 * ── What is load-bearing here ───────────────────────────────────────────────
 *
 *  1. NOTHING IS RESERVED AND NOTHING SHIFTS. Both the gold fill and the
 *     preview are absolutely-positioned overlays inside the row, so the row's
 *     border-box height is byte-identical at rest and on hover and the text
 *     never moves.
 *
 *  2. THE RESTING STATE IS DECLARED IN `V2Styles`, NOT INLINE. `opacity`,
 *     `background`/`background-image` and `transform` for the fill and the
 *     preview all live in the stylesheet. An inline value out-specifies the
 *     `:hover` rule and the reveal silently never fires — the per-row image is
 *     therefore passed as the custom property `--v2-life-shot`, which the
 *     stylesheet consumes, rather than as an inline `backgroundImage`.
 *
 *  3. THE ACTIVE ROW IS REACT STATE, NOT `:hover` / `:focus-within`. Those two
 *     are independent CSS conditions, so a keyboard user who tabs to row 1 and
 *     then moves the mouse over row 2 lights BOTH — two gold fills, two
 *     overlapping previews. CSS cannot express "the pointer wins over a focus
 *     that is sitting somewhere else", so the row index is tracked here:
 *     `hover` and `focus` are held separately and the active row is
 *     `hover ?? focus`. That single expression gives all three required
 *     behaviours for free — the pointer beats a focus on another row, the
 *     keyboard still activates a row with no pointer in play, and losing the
 *     pointer falls back to the focused row rather than to nothing. The
 *     stylesheet keys off `.is-active` ONLY; there is no `:hover` rule left to
 *     stack with it.
 *
 *     Focus is admitted only when it is `:focus-visible`, so a mouse press on
 *     a row does not leave it stuck lit after the pointer has gone; the hover
 *     half already covers the pointer case.
 *
 *  4. GOLD IS A GROUND. The filled row keeps DARK type — `accentOn` on
 *     `accent` is 10.02:1. There is no gold text on a light surface anywhere.
 *
 * Mode 7 content: the heading is `Ecosystem.tsx`'s "A fully integrated
 * technology lifecycle." and the supporting line is that same section's intro
 * paragraph; the four rows are the `pillars` array — `title` as the heading,
 * `sub` as the description. No copy is invented here.
 */

/**
 * The hover preview for each pillar, keyed by `title` rather than by index so
 * reordering `pillars` cannot mismatch a picture. Same pattern as
 * `CAPABILITY_IMAGE` in `WorkV2` and `HREF` in `CapabilityGridV2`.
 */
const PILLAR_IMAGE: Record<string, string> = {
  "Premium Devices": "/hero/lifecycle-devices.webp",
  "Certified Refurbished": "/hero/lifecycle-refurb.webp",
  "Smart Home Automation": "/hero/lifecycle-smarthome.webp",
  "Solar & Green Energy": "/hero/lifecycle-solar.webp",
};

/** Each row's destination, from the routes that already exist under `src/app`. */
const PILLAR_HREF: Record<string, string> = {
  "Premium Devices": "/shop",
  "Certified Refurbished": "/shop",
  "Smart Home Automation": "/smart-home",
  "Solar & Green Energy": "/green-energy",
};

export function LifecycleV2() {
  /**
   * Two independent inputs, resolved to one active row. Keeping them apart is
   * what makes the precedence expressible: a hover always outranks a focus,
   * and dropping the hover reveals the focus underneath it again.
   */
  const [hover, setHover] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const active = hover ?? focus;

  /** `:focus-visible` is not supported everywhere `matches` is — degrade to
   *  "any focus counts" rather than throwing and losing the keyboard path. */
  const isFocusVisible = useCallback((el: Element) => {
    try {
      return el.matches(":focus-visible");
    } catch {
      return true;
    }
  }, []);

  return (
    <Band ground={V2.wash} pad="clamp(64px,6.7vw,96px)" padBottom="clamp(64px,6.3vw,90px)">
      {/* ── header block ───────────────────────────────────────────────── */}
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            padding: "7px 16px",
            borderRadius: 99,
            border: `1px solid ${V2.ink}`,
            background: "transparent",
            fontFamily: V2_FONT.mono,
            fontSize: 11,
            letterSpacing: V2_TYPE.mono.letterSpacing,
            lineHeight: 1.2,
            textTransform: "uppercase",
            color: V2.ink,
          }}
        >
          The ecosystem
        </span>

        {/* 56px at 1440, matching CapabilityGridV2's heading exactly — the two
            section headings are peers and were reading at two different
            sizes. It was clamp(30px,3.1vw,40px), which put it BELOW the row
            titles beneath it (48.1px): the four listings read as four
            competing headlines and the heading that governs them read as a
            caption. The row titles have come down to 32px in `V2Styles`, so
            the section now runs 56 / 32 / 16 instead of 40 / 48 / 14.
            maxWidth goes 760 -> 900 because the sentence measures 848.4px on
            one line at 56px: the old 760 would have forced it to wrap, and
            it was a single line at 40px. 900 keeps it one line, centred. */}
        <h2
          style={{
            margin: "clamp(20px,2.1vw,30px) auto 0",
            maxWidth: 900,
            fontFamily: V2_FONT.display,
            fontWeight: 400,
            fontSize: "clamp(34px,3.9vw,56px)",
            lineHeight: 1.2,
            letterSpacing: V2_TYPE.h2.letterSpacing,
            color: V2.ink,
            textWrap: "balance",
          }}
        >
          A fully integrated technology lifecycle.
        </h2>

        <p
          style={{
            margin: "clamp(14px,1.4vw,20px) auto 0",
            maxWidth: 560,
            fontFamily: V2_FONT.body,
            fontWeight: 300,
            fontSize: V2_TYPE.body.fontSize,
            lineHeight: 1.55,
            color: V2.muted,
            textWrap: "pretty",
          }}
        >
          From the moment you buy to the day you upgrade, every part of the Mode 7
          ecosystem works together.
        </p>
      </div>

      {/* ── the ruled list ─────────────────────────────────────────────── */}
      <div className="v2-life-list">
        {pillars.map((p, i) => (
          <Link
            key={p.title}
            href={PILLAR_HREF[p.title] ?? "/services"}
            className={`v2-life-row${active === i ? " is-active" : ""}`}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover((h) => (h === i ? null : h))}
            onFocus={(e) => {
              if (isFocusVisible(e.currentTarget)) setFocus(i);
            }}
            onBlur={() => setFocus((f) => (f === i ? null : f))}
            style={
              {
                "--v2-life-shot": `url(${PILLAR_IMAGE[p.title] ?? ""})`,
              } as CSSProperties
            }
          >
            {/* the gold ground — an overlay, so it adds no height */}
            <span className="v2-life-fill" aria-hidden />

            {/* the floating preview — overlay, never a hit target */}
            <span className="v2-life-shot" aria-hidden />

            <span className="v2-life-text">
              <span className="v2-life-title">{p.title}</span>
              <span className="v2-life-sub">{p.sub}</span>
            </span>

            <span className="v2-life-arrow" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M7.5 18.5 18.5 7.5M9.6 7.5h8.9v8.9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </Band>
  );
}
