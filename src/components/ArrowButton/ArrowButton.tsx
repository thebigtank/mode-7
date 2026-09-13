"use client";

import Link from "next/link";
import { useId } from "react";

const VARIANTS = { fill: "fill", outline: "outline", ink: "ink" } as const;
const DIRECTIONS = { right: "right", up: "up" } as const;

export type ArrowButtonProps = {
  label: string;
  variant?: keyof typeof VARIANTS;
  direction?: keyof typeof DIRECTIONS;
  href?: string;
  onClick?: () => void;
};

const UP_DOTS = [
  [20, 10], [20, 14], [20, 18], [20, 22], [20, 26], [20, 30],
  [16, 14], [12, 18], [24, 14], [28, 18],
];

const RIGHT_DOTS = [
  [8, 20], [12, 20], [16, 20], [20, 20], [24, 20], [28, 20],
  [20, 12], [24, 16], [20, 28], [24, 24],
];

export function ArrowButton({
  label,
  variant = "fill",
  direction = "right",
  href,
  onClick,
}: ArrowButtonProps) {
  const uid = useId();
  const dir = DIRECTIONS[direction] ?? "right";
  const isUp = dir === "up";
  const patternId = `m7agrid-${variant}-${uid}`;
  const dots = isUp ? UP_DOTS : RIGHT_DOTS;
  const offset = isUp ? "translate(0,40)" : "translate(-40,0)";

  const glyph = (transform?: string) => (
    <g className="m7-arrowbtn__glyph" transform={transform}>
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.45" />
      ))}
    </g>
  );

  const inner = (
    <>
      <span className="m7-arrowbtn__label">{label}</span>
      <span className="m7-arrowbtn__tile relative shrink-0 overflow-hidden">
        <svg className="block" width="32" height="32" viewBox="0 0 40 40">
          <defs>
            <pattern
              id={patternId}
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
              x="4"
              y="4"
            >
              <circle className="m7-arrowbtn__dot" cx="0" cy="0" r="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="40" height="40" fill={`url(#${patternId})`} />
          <g className="m7-arrowbtn__arrow">
            {glyph()}
            {glyph(offset)}
          </g>
        </svg>
      </span>
    </>
  );

  const className = "m7-arrowbtn inline-flex items-center";
  const data = {
    "data-variant": VARIANTS[variant] ?? "fill",
    "data-direction": dir,
  };

  if (href) {
    return (
      <Link href={href} className={className} {...data}>
        {inner}
      </Link>
    );
  }

  return (
    <span className={className} onClick={onClick} {...data}>
      {inner}
    </span>
  );
}
