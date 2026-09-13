import type { CSSProperties, ReactNode } from "react";

export function H2({
  children,
  color = "var(--color-v2-ink)",
  size,
  lineHeight = 1.2,
  className,
  style,
  as = "h2",
}: {
  children: ReactNode;
  color?: string;
  size?: string;
  lineHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  as?: "h2" | "h3" | "p";
}) {
  const Tag = as;
  return (
    <Tag
      className={["ui-h2 m-0 text-pretty", className].filter(Boolean).join(" ")}
      style={
        {
          "--ui-h2-color": color,
          ...(size ? { "--ui-h2-size": size } : {}),
          "--ui-h2-line-height": lineHeight,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
