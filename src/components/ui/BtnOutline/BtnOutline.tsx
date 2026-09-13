import Link from "next/link";
import type { CSSProperties } from "react";

export function BtnOutline({
  label,
  href,
  color = "var(--color-v2-ink)",
  border,
  className,
  style,
}: {
  label: string;
  href: string;
  color?: string;
  border?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      href={href}
      className={[
        "ui-btn-outline inline-flex items-center justify-center gap-[10px] min-h-[48px] rounded-[4px] whitespace-nowrap no-underline bg-transparent py-[13px] px-[24px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--ui-btn-outline-color": color,
          "--ui-btn-outline-border": border ?? color,
          ...style,
        } as CSSProperties
      }
    >
      {label}
    </Link>
  );
}
