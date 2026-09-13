import type { CSSProperties, ReactNode } from "react";
import { COLOR, FONT, stripe, stripeDark } from "@/lib/theme";
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
      style={{
        position: "relative",
        height,
        borderRadius: radius,
        overflow: "hidden",
        background: dark ? stripeDark() : stripe(),
        border: `1px solid ${dark ? COLOR.espressoBorder : COLOR.lineStrong}`,
        ...style,
      }}
    >
      {label ? (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: labelPosition === "top-left" ? 22 : undefined,
            right: labelPosition === "top-right" ? 22 : undefined,
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: 1,
            color: dark ? COLOR.onEspressoFaint : COLOR.muted,
          }}
        >
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
    <div
      className="m7-annot"
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: `1px dashed ${dark ? COLOR.onEspressoFaint : COLOR.hair}`,
        borderRadius: 99,
        padding: "7px 15px",
        fontFamily: FONT.mono,
        fontSize: 11,
        letterSpacing: 1,
        color: dark ? COLOR.onEspressoMuted : COLOR.body,
        background: dark ? "transparent" : "rgba(247,239,221,0.92)",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
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
    <div style={{ maxWidth: 1320, margin: "0 auto 20px", padding: "0 var(--m7-pad)" }}>
      <div
        style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            border: `1px dashed ${COLOR.hair}`,
            borderRadius: 99,
            padding: "5px 12px",
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: COLOR.ink,
            background: COLOR.card,
          }}
        >
          {tag}
        </span>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: 0.5,
            color: COLOR.muted,
            textTransform: "uppercase",
          }}
        >
          {note}
        </span>
      </div>
    </div>
  );
}

export function Overline({
  children,
  color = COLOR.muted,
  style,
}: {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: FONT.head,
        fontSize: 12,
        letterSpacing: 2,
        color,
        textTransform: "uppercase",
        marginBottom: 16,
        ...style,
      }}
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
      style={{
        fontFamily: FONT.head,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-3px",
        margin: 0,
        ...style,
      }}
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
    <p
      style={{
        fontSize: "var(--m7-lede-size)",
        lineHeight: 1.6,
        color: COLOR.body,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
