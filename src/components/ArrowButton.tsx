"use client";

import Link from "next/link";
import { useId, useState, type CSSProperties } from "react";
import { COLOR, FONT } from "@/lib/theme";

type Variant = "fill" | "outline" | "ink";
type Direction = "right" | "up";

export type ArrowButtonProps = {
  label: string;
  variant?: Variant;
  direction?: Direction;
  href?: string;
  onClick?: () => void;
  style?: CSSProperties;
};

/**
 * The reusable Mode 7 CTA. Ported from `ArrowButton.dc.html`.
 *
 * Text on the LEFT, icon-tile on the RIGHT. The tile is a faint radial dot grid
 * holding a single dotted arrow; on hover the arrow scrolls in its direction and
 * loops (a second copy is offset so exactly one arrow shows at idle).
 * Near-pointy corners: 4px on the button, 3px on the tile.
 *
 * TWO treatments, not three:
 *  - DARK    `dark` ground, cream label, no border, cream icon tile. Every
 *            primary action on the site, on any ground. `dark` is the site's
 *            single dark surface — it matches the footer, so every dark thing
 *            on the page is one colour. Reachable as either `fill` or `ink`:
 *            `ink` is a HISTORICAL ALIAS kept only so the ~30 existing call
 *            sites did not have to be churned. The two are identical; prefer
 *            `fill` in new code. `fill` used to be rust and no longer is.
 *  - LIGHT   `outline`: card ground, ink label, hairline border, dark icon
 *            tile. The secondary action on any ground.
 */
export function ArrowButton({
  label,
  variant = "fill",
  direction = "right",
  href,
  onClick,
  style,
}: ArrowButtonProps) {
  const [hovered, setHovered] = useState(false);

  const isUp = direction === "up";
  // `fill` and `ink` are the same dark button; only `outline` differs.
  const isDark = variant !== "outline";
  const kf = isUp ? "m7arrowLoopUp" : "m7arrowLoop";
  const arrowAnim = hovered ? `${kf} 0.75s linear infinite` : "none";
  const uid = useId();
  const patternId = `m7agrid-${variant}-${uid}`;

  // The tile inverts against the button, and the dot grid is drawn in whatever
  // sits on the tile at low alpha so it stays a texture, not a second mark.
  // cream is rgb(239,230,209); espresso is rgb(28,21,15).
  //
  // Note which ground each triple is drawn ON: the dark button's tile is CREAM,
  // so its arrow and dots are espresso — that is text on a light tile, not a
  // mark on the dark surface, and it does not follow `dark`. (A `dark` tile on
  // a `dark` button would be invisible.) The outline button is the inverse: its
  // tile IS the dark surface, and its arrow/dots are cream.
  const tileBg = isDark ? COLOR.cream : COLOR.dark;
  const arrowFill = isDark ? COLOR.espresso : COLOR.cream;
  const dotFill = isDark ? "rgba(28,21,15,0.18)" : "rgba(239,230,209,0.18)";

  // The vertical arrow, dotted 5×7-ish: shaft plus a chevron head.
  const upDots = (
    <>
      <circle cx="20" cy="10" r="1.45" />
      <circle cx="20" cy="14" r="1.45" />
      <circle cx="20" cy="18" r="1.45" />
      <circle cx="20" cy="22" r="1.45" />
      <circle cx="20" cy="26" r="1.45" />
      <circle cx="20" cy="30" r="1.45" />
      <circle cx="16" cy="14" r="1.45" />
      <circle cx="12" cy="18" r="1.45" />
      <circle cx="24" cy="14" r="1.45" />
      <circle cx="28" cy="18" r="1.45" />
    </>
  );
  const rightDots = (
    <>
      <circle cx="8" cy="20" r="1.45" />
      <circle cx="12" cy="20" r="1.45" />
      <circle cx="16" cy="20" r="1.45" />
      <circle cx="20" cy="20" r="1.45" />
      <circle cx="24" cy="20" r="1.45" />
      <circle cx="28" cy="20" r="1.45" />
      <circle cx="20" cy="12" r="1.45" />
      <circle cx="24" cy="16" r="1.45" />
      <circle cx="20" cy="28" r="1.45" />
      <circle cx="24" cy="24" r="1.45" />
    </>
  );

  const dots = isUp ? upDots : rightDots;
  const offset = isUp ? "translate(0,40)" : "translate(-40,0)";

  // espressoRaise #2D261E is darker than #3C3521 and would read as a press-in
  // rather than a lift, so `dark` gets its own raise.
  const bg = isDark
    ? hovered
      ? COLOR.darkRaise
      : COLOR.dark
    : hovered
      ? COLOR.cream
      : COLOR.card;

  const body: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: bg,
    color: isDark ? COLOR.cream : COLOR.ink,
    border: isDark ? "none" : `1px solid ${COLOR.lineStrong}`,
    borderRadius: 4,
    padding: "5px 5px 5px 18px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background .18s ease, border-color .18s ease",
    ...style,
  };

  const inner = (
    <>
      <span style={{ fontFamily: FONT.body, fontSize: 16, fontWeight: 500 }}>
        {label}
      </span>
      <span
        style={{
          position: "relative",
          flex: "0 0 auto",
          width: 32,
          height: 32,
          borderRadius: 3,
          overflow: "hidden",
          background: tileBg,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 40 40" style={{ display: "block" }}>
          <defs>
            <pattern
              id={patternId}
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
              x="4"
              y="4"
            >
              <circle cx="0" cy="0" r="1" fill={dotFill} />
            </pattern>
          </defs>
          <rect x="0" y="0" width="40" height="40" fill={`url(#${patternId})`} />
          <g style={{ animation: arrowAnim }}>
            <g fill={arrowFill}>{dots}</g>
            <g fill={arrowFill} transform={offset}>
              {dots}
            </g>
          </g>
        </svg>
      </span>
    </>
  );

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (href) {
    return (
      <Link href={href} style={body} {...handlers}>
        {inner}
      </Link>
    );
  }

  return (
    <span style={body} onClick={onClick} {...handlers}>
      {inner}
    </span>
  );
}
