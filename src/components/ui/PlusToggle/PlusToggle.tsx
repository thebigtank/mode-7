import type { CSSProperties } from "react";

export function PlusToggle({
  open,
  size = 30,
  color = "var(--color-v2-ink)",
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
      data-open={open || undefined}
      style={
        {
          "--ui-plus-toggle-size": `${size}px`,
          "--ui-plus-toggle-border": border ?? "var(--v2-hair)",
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
