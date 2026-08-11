"use client";

import Link from "next/link";
import { useId, useState, type CSSProperties } from "react";
import { FONT } from "@/lib/theme";

type Variant = "fill" | "outline";
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
  const isFill = variant !== "outline";
  const kf = isUp ? "m7arrowLoopUp" : "m7arrowLoop";
  const arrowAnim = hovered ? `${kf} 0.75s linear infinite` : "none";
  const uid = useId();
  const patternId = isFill ? `m7agrid-fill-${uid}` : `m7agrid-outline-${uid}`;
  const dotFill = isFill ? "rgba(18,18,18,0.16)" : "rgba(255,255,255,0.18)";
  const arrowFill = isFill ? "#121212" : "#ffffff";

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

  const body: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: isFill ? "#121212" : "#fff",
    color: isFill ? "#fff" : "#121212",
    border: isFill ? "none" : "1px solid #d6d6d6",
    borderRadius: 4,
    padding: "5px 5px 5px 18px",
    cursor: "pointer",
    textDecoration: "none",
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
          background: isFill ? "#fff" : "#121212",
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

  // data-cursor="grow" is the opt-in for the invert cursor dot — this is the
  // site's real CTA, so it is exactly the kind of thing that should grow it.
  if (href) {
    return (
      <Link href={href} style={body} data-cursor="grow" {...handlers}>
        {inner}
      </Link>
    );
  }

  return (
    <span style={body} onClick={onClick} data-cursor="grow" {...handlers}>
      {inner}
    </span>
  );
}
