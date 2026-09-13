import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

export function P({
  children,
  color = "var(--color-v2-muted)",
  size = 16,
  className,
  style,
  ...rest
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<"p">, "children" | "style" | "color" | "className">) {
  return (
    <p
      {...rest}
      className={["ui-p m-0 text-pretty", className].filter(Boolean).join(" ")}
      style={
        {
          "--ui-p-color": color,
          "--ui-p-size": `${size}px`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </p>
  );
}
