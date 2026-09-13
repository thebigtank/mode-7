import type { CSSProperties, ReactNode } from "react";
import { V2 } from "@/lib/theme-v2";

export function Mono({
  children,
  color = V2.muted,
  dot = false,
  dotColor,
  className,
  style,
}: {
  children: ReactNode;
  color?: string;
  dot?: boolean;
  dotColor?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={["ui-mono flex items-center gap-3 uppercase", className].filter(Boolean).join(" ")}
      style={{ "--ui-mono-color": color, ...style } as CSSProperties}
    >
      {dot ? (
        <span
          aria-hidden
          className="ui-mono__dot h-[7px] w-[7px] shrink-0 rounded-[50%]"
          style={{ "--ui-mono-dot-color": dotColor ?? V2.accent } as CSSProperties}
        />
      ) : null}
      <span>{children}</span>
    </div>
  );
}
