import type { ReactNode } from "react";

const GROUNDS = {
  ink: "ink",
  wash: "wash",
  "wash-soft": "wash-soft",
  white: "white",
} as const;

export type BandGround = keyof typeof GROUNDS;

export function Band({
  ground = "white",
  children,
  className,
}: {
  ground?: BandGround;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={["ui-band", className].filter(Boolean).join(" ")}
      data-ground={GROUNDS[ground] ?? "white"}
    >
      <div className="ui-band__inner box-content mx-auto">{children}</div>
    </section>
  );
}
