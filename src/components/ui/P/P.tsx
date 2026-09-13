import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { V2, V2_TYPE } from "@/lib/theme-v2";

export function P({
  children,
  color = V2.muted,
  size = V2_TYPE.body.fontSize,
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
