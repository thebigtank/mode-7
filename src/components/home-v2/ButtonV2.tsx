"use client";

import Link from "next/link";
import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { V2, V2_FONT } from "@/lib/theme-v2";

type Variant = "fill" | "ink" | "outline";
type Direction = "right" | "up";

export type ButtonV2Props = {
  label: string;
  variant?: Variant;
  direction?: Direction;
  href?: string;
  onClick?: () => void;
  /** Optional mark rendered to the LEFT of the label, inside the button. */
  icon?: ReactNode;
  /**
   * `outline` only. The outline button is drawn for a LIGHT ground by default
   * (ink label, ink hairline, ink tile). On an `ink` band all three would
   * vanish, so this flips them to white — the footer's secondary action is the
   * only place it is needed. Ignored by `fill` and `ink`.
   */
  onDark?: boolean;
  style?: CSSProperties;
};

/**
 * The v2 CTA. Same ANATOMY as `@/components/ArrowButton` — label on the left, a
 * 32px icon tile on the right, 4px radius on the button and 3px on the tile,
 * the tile carrying a faint radial dot grid plus a dotted arrow that scrolls
 * and loops on hover — but painted entirely from the `V2` palette.
 *
 * It is a REPRODUCTION, not a wrapper: `ArrowButton` paints from the Mode 7
 * `COLOR` tokens (warm brown, cream), and importing it here would drag the v1
 * palette onto `/homepage-v2`. Nothing in this file imports `@/lib/theme`.
 *
 * The loop is the existing `m7arrowLoop` / `m7arrowLoopUp` keyframes in
 * globals.css — palette-free pure transforms, so they are shared, not
 * duplicated. A second copy of the arrow sits 40 units along the travel axis so
 * exactly one arrow is visible at rest and the loop reads as continuous.
 *
 * THREE treatments, chosen to preserve each call site's weight:
 *  - `fill`     gold ground, INK label (10.02:1 — white on gold is 1.70:1 and
 *               is never used), ink tile carrying a GOLD arrow. The primary.
 *  - `ink`      ink ground, white label (17.07:1), gold tile carrying an INK
 *               arrow. The primary on a light band where gold would over-shout.
 *  - `outline`  transparent ground, ink label, 1px ink hairline, ink tile with
 *               a gold arrow. The secondary.
 *
 * Note which ground each arrow is drawn ON: the tile always inverts against the
 * button, so the arrow follows the TILE, not the button. The dot grid is the
 * same colour as the arrow at ~0.20 alpha so it stays a texture, not a mark.
 */
export function ButtonV2({
  label,
  variant = "fill",
  direction = "right",
  href,
  onClick,
  icon,
  onDark = false,
  style,
}: ButtonV2Props) {
  const [hovered, setHovered] = useState(false);
  const uid = useId();

  const isUp = direction === "up";
  const kf = isUp ? "m7arrowLoopUp" : "m7arrowLoop";
  const arrowAnim = hovered ? `${kf} 0.75s linear infinite` : "none";
  const patternId = `v2agrid-${variant}-${uid}`;

  // Ground / label / border / tile, per variant. `hoverBg` is a lift, never a
  // press-in: each hover ground is a step LIGHTER than its rest ground.
  let bg: string;
  let labelColor: string;
  let border: string;
  let tileBg: string;
  let arrowFill: string;
  let dotFill: string;

  if (variant === "fill") {
    bg = hovered ? "#F5CE65" : V2.accent;
    labelColor = V2.accentOn;
    border = "none";
    tileBg = V2.ink;
    arrowFill = V2.accent;
    dotFill = "rgba(240,192,68,0.20)";
  } else if (variant === "ink") {
    bg = hovered ? "#222A2A" : V2.ink;
    labelColor = V2.white;
    border = "none";
    tileBg = V2.accent;
    arrowFill = V2.ink;
    dotFill = "rgba(23,29,29,0.20)";
  } else if (onDark) {
    bg = hovered ? "rgba(255,255,255,0.08)" : "transparent";
    labelColor = V2.white;
    border = "1px solid rgba(255,255,255,0.28)";
    tileBg = V2.white;
    arrowFill = V2.ink;
    dotFill = "rgba(23,29,29,0.20)";
  } else {
    bg = hovered ? "rgba(23,29,29,0.06)" : "transparent";
    labelColor = V2.ink;
    border = `1px solid ${V2.ink}`;
    tileBg = V2.ink;
    arrowFill = V2.accent;
    dotFill = "rgba(240,192,68,0.20)";
  }

  // The vertical arrow, dotted: a six-dot shaft plus a four-dot chevron head.
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

  const body: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: bg,
    color: labelColor,
    border,
    borderRadius: 4,
    padding: "5px 5px 5px 18px",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background .18s ease, border-color .18s ease",
    ...style,
  };

  const inner = (
    <>
      {icon ? (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            flex: "0 0 auto",
            /* the icon is currentColor, so it takes the label colour */
            marginRight: -2,
          }}
        >
          {icon}
        </span>
      ) : null}
      <span style={{ fontFamily: V2_FONT.body, fontSize: 16, fontWeight: 500 }}>
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
