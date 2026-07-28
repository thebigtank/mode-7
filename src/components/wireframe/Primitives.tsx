import type { CSSProperties, ReactNode } from "react";
import { FONT, stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

/**
 * Wireframe primitives — the low-fidelity vocabulary the whole site is drawn in.
 * Images are diagonal light-grey striped placeholders with a monospace `▣ LABEL`;
 * annotations are dashed-border Space Mono pills.
 */

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
        background: dark ? stripe("#1c1c1c", "#262626") : stripe(),
        border: `1px solid ${dark ? "#2a2a2a" : "#e2e2e2"}`,
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
            color: dark ? "#6f6f6f" : "#9a9a9a",
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
        border: `1px dashed ${dark ? "#555" : "#b4b4b4"}`,
        borderRadius: 99,
        padding: "7px 15px",
        fontFamily: FONT.mono,
        fontSize: 11,
        letterSpacing: 1,
        color: dark ? "#aaa" : "#6a6a6a",
        background: dark ? "transparent" : "rgba(255,255,255,0.92)",
        /* nowrap keeps the pill on one line where there is room; .m7-annot
           lets it wrap on narrow screens instead of running off the edge */
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Design-exploration marker: a dashed variant pill plus a one-line description of
 * what the variant is doing. Used when two or more directions for the same
 * section are kept side by side so they can be compared in place, then culled.
 *
 * Tied to `showAnnotations`, so switching annotations off gives a clean look at
 * the variants themselves.
 */
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
            border: "1px dashed #b4b4b4",
            borderRadius: 99,
            padding: "5px 12px",
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: "#121212",
            background: "#fff",
          }}
        >
          {tag}
        </span>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: 0.5,
            color: "#9a9a9a",
            textTransform: "uppercase",
          }}
        >
          {note}
        </span>
      </div>
    </div>
  );
}

/** Section overline in the `// Label` form. */
export function Overline({
  children,
  color = "#9a9a9a",
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

/** Section heading: Space Grotesk 600 / -3px. */
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

/** Standard body paragraph: Outfit 18px. */
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
        fontSize: 18,
        lineHeight: 1.6,
        color: "#5a5a5a",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
