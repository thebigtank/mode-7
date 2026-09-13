import Link from "next/link";
import type { CSSProperties } from "react";

export function BtnFill({
  label,
  href,
  ground = "var(--color-v2-accent)",
  color = "var(--color-v2-accent-on)",
  className,
  style,
}: {
  label: string;
  href: string;
  ground?: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      href={href}
      className={[
        "ui-btn-fill inline-flex items-center justify-center gap-[10px] min-h-[48px] rounded-[4px] whitespace-nowrap no-underline py-[13px] px-[24px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--ui-btn-fill-ground": ground, "--ui-btn-fill-color": color, ...style } as CSSProperties}
    >
      {label}
    </Link>
  );
}
