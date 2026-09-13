"use client";

import Link from "next/link";
import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { V2 } from "@/lib/theme-v2";

type Variant = "fill" | "ink" | "outline";
type Direction = "right" | "up";

export type ButtonV2Props = {
  label: string;
  variant?: Variant;
  direction?: Direction;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  onDark?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function ButtonV2({
  label,
  variant = "fill",
  direction = "right",
  href,
  onClick,
  icon,
  onDark = false,
  className,
  style,
}: ButtonV2Props) {
  const [hovered, setHovered] = useState(false);
  const uid = useId();

  const isUp = direction === "up";
  const kf = isUp ? "m7arrowLoopUp" : "m7arrowLoop";
  const arrowAnim = hovered ? `${kf} 0.75s linear infinite` : "none";
  const patternId = `v2agrid-${variant}-${uid}`;

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

  const cls = [
    "ui-buttonv2 inline-flex items-center gap-[10px] rounded-[4px] py-[5px] pr-[5px] pl-[18px] cursor-pointer no-underline whitespace-nowrap",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const cssVars = {
    "--ui-buttonv2-bg": bg,
    "--ui-buttonv2-color": labelColor,
    "--ui-buttonv2-border": border,
    "--ui-buttonv2-tile-bg": tileBg,
    ...style,
  } as CSSProperties;

  const inner = (
    <>
      {icon ? (
        <span aria-hidden className="inline-flex shrink-0 items-center -mr-[2px]">
          {icon}
        </span>
      ) : null}
      <span className="ui-buttonv2__label">{label}</span>
      <span className="ui-buttonv2__tile relative shrink-0 w-[32px] h-[32px] rounded-[3px] overflow-hidden">
        <svg width="32" height="32" viewBox="0 0 40 40" className="block">
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
      <Link href={href} className={cls} style={cssVars} {...handlers}>
        {inner}
      </Link>
    );
  }

  return (
    <span className={cls} style={cssVars} onClick={onClick} {...handlers}>
      {inner}
    </span>
  );
}
