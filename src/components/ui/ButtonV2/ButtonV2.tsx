import Link from "next/link";
import { useId, type CSSProperties, type ReactNode } from "react";

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
  borderStrong?: boolean;
  className?: string;
  style?: CSSProperties;
};

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

export function ButtonV2({
  label,
  variant = "fill",
  direction = "right",
  href,
  onClick,
  icon,
  onDark = false,
  borderStrong = false,
  className,
  style,
}: ButtonV2Props) {
  const uid = useId();

  const isUp = direction === "up";
  const patternId = `v2agrid-${variant}-${uid}`;
  const dots = isUp ? upDots : rightDots;
  const offset = isUp ? "translate(0,40)" : "translate(-40,0)";
  const onDarkOutline = variant === "outline" && onDark;

  const cls = [
    "ui-buttonv2 inline-flex items-center gap-[10px] rounded-[4px] py-[5px] pr-[5px] pl-[18px] cursor-pointer no-underline whitespace-nowrap",
    className,
  ]
    .filter(Boolean)
    .join(" ");

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
              <circle className="ui-buttonv2__dot" cx="0" cy="0" r="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="40" height="40" fill={`url(#${patternId})`} />
          <g className="ui-buttonv2__arrow-group">
            <g className="ui-buttonv2__arrow">{dots}</g>
            <g className="ui-buttonv2__arrow" transform={offset}>
              {dots}
            </g>
          </g>
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        style={style}
        data-variant={variant}
        data-direction={direction}
        data-ondark={onDarkOutline || undefined}
        data-border={borderStrong ? "strong" : undefined}
      >
        {inner}
      </Link>
    );
  }

  return (
    <span
      className={cls}
      style={style}
      onClick={onClick}
      data-variant={variant}
      data-direction={direction}
      data-ondark={onDarkOutline || undefined}
      data-border={borderStrong ? "strong" : undefined}
    >
      {inner}
    </span>
  );
}
