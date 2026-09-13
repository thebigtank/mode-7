import type { ReactNode } from "react";

const TONES = {
  muted: "muted",
  faint: "faint",
  white: "white",
  ink: "ink",
  "accent-text": "accent-text",
  "accent-on": "accent-on",
} as const;

export type MonoTone = keyof typeof TONES;

export function Mono({
  children,
  tone = "muted",
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: MonoTone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <div
      className={["ui-mono flex items-center gap-3 uppercase", className]
        .filter(Boolean)
        .join(" ")}
      data-tone={TONES[tone] ?? "muted"}
    >
      {dot ? (
        <span
          aria-hidden
          className="ui-mono__dot h-[7px] w-[7px] shrink-0 rounded-[50%]"
        />
      ) : null}
      <span>{children}</span>
    </div>
  );
}
