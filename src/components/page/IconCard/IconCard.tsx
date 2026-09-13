import type { CSSProperties } from "react";

export function IconCard({
  title,
  accent,
  body,
  minHeight = 300,
}: {
  title: string;
  accent: string;
  body: string;
  minHeight?: number;
}) {
  return (
    <div
      className="pg-iconcard flex flex-col"
      style={{ "--pg-iconcard-min-h": `${minHeight}px` } as CSSProperties}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pg-iconcard__icon"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
      <div className="pg-iconcard__title">{title}</div>
      <div className="pg-iconcard__accent uppercase">{accent}</div>
      <p className="pg-iconcard__body">{body}</p>
    </div>
  );
}
