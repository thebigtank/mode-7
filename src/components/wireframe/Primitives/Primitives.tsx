import type { CSSProperties, ReactNode } from "react";
import { WIREFRAME } from "@/lib/wireframe-config";

export function Placeholder({
  label,
  height,
  dark = false,
  radius = 4,
  labelPosition = "top-left",
  children,
  style,
}: {
  label?: string;
  height?: number | string;
  dark?: boolean;
  radius?: number;
  labelPosition?: "top-left" | "top-right";
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className="wf-placeholder"
      data-dark={dark || undefined}
      style={
        {
          "--wf-placeholder-height": typeof height === "number" ? `${height}px` : height,
          "--wf-placeholder-radius": `${radius}px`,
          ...style,
        } as CSSProperties
      }
    >
      {label ? (
        <div className="wf-placeholder__label" data-position={labelPosition}>
          ▣ {label}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function Annotation({
  children,
  dark = false,
  style,
}: {
  children: ReactNode;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div className="wf-annot m7-annot" data-dark={dark || undefined} style={style}>
      {children}
    </div>
  );
}

export function VariantLabel({
  tag,
  note,
}: {
  tag: string;
  note: string;
}) {
  if (!WIREFRAME.showAnnotations) return null;
  return (
    <div className="wf-variant-label">
      <div className="wf-variant-label__row">
        <span className="wf-variant-label__tag">{tag}</span>
        <span className="wf-variant-label__note">{note}</span>
      </div>
    </div>
  );
}

export function Overline({
  children,
  color,
  style,
}: {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className="wf-overline"
      style={
        {
          ...(color ? { "--wf-overline-color": color } : {}),
          ...style,
        } as CSSProperties
      }
    >
      {`// ${children}`}
    </div>
  );
}

export function SectionHeading({
  children,
  size = 38,
  style,
}: {
  children: ReactNode;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <h2
      className="wf-heading"
      style={{ "--wf-heading-size": `${size}px`, ...style } as CSSProperties}
    >
      {children}
    </h2>
  );
}

export function Body({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <p className="wf-body" style={style}>
      {children}
    </p>
  );
}
