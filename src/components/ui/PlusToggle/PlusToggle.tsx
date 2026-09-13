import type { CSSProperties } from "react";
import { V2, V2_HAIR } from "@/lib/theme-v2";

export function PlusToggle({
  open,
  size = 30,
  color = V2.ink,
  border,
  className,
  style,
}: {
  open: boolean;
  size?: number;
  color?: string;
  border?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={[
        "v2-plus-toggle ui-plus-toggle inline-flex shrink-0 items-center justify-center rounded-[99px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--ui-plus-toggle-size": `${size}px`,
          "--ui-plus-toggle-border": border ?? V2_HAIR,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          ...style,
        } as CSSProperties
      }
    >
      <svg
        width={Math.round(size * 0.5)}
        height={Math.round(size * 0.5)}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </span>
  );
}
