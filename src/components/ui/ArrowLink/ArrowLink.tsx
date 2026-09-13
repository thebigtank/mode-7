import Link from "next/link";
import type { CSSProperties } from "react";
import { V2 } from "@/lib/theme-v2";
import { RingArrow } from "@/components/ui/RingArrow";

export function ArrowLink({
  label,
  href,
  color = V2.ink,
  size = 16,
  weight = 500,
  className,
  style,
}: {
  label: string;
  href?: string;
  color?: string;
  size?: number;
  weight?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const cls = [
    "ui-arrow-link inline-flex items-center gap-[9px] no-underline",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const cssVars = {
    "--ui-arrow-link-color": color,
    "--ui-arrow-link-size": `${size}px`,
    "--ui-arrow-link-weight": weight,
    ...style,
  } as CSSProperties;

  if (!href) {
    return (
      <span aria-hidden className={cls} style={cssVars}>
        {label}
        <RingArrow color={color} />
      </span>
    );
  }

  return (
    <Link href={href} className={cls} style={cssVars}>
      {label}
      <RingArrow color={color} />
    </Link>
  );
}
