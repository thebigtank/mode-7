import type { CSSProperties, ReactNode } from "react";

export function Band({
  ground,
  children,
  className,
  style,
  pad = "clamp(64px,7vw,104px)",
  padBottom,
}: {
  ground: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  pad?: string;
  padBottom?: string;
}) {
  return (
    <section
      className={["ui-band", className].filter(Boolean).join(" ")}
      style={{ "--ui-band-ground": ground, ...style } as CSSProperties}
    >
      <div
        className="ui-band__inner box-content mx-auto"
        style={
          {
            "--ui-band-pad": pad,
            "--ui-band-pad-bottom": padBottom ?? pad,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </section>
  );
}
