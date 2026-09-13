import type { CSSProperties, ReactNode } from "react";
import { Annotation } from "@/components/wireframe/Primitives";
import { FONT, stripe, stripeDark } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

export const PAGE_SECTION: CSSProperties = {
  maxWidth: 1320,
  margin: "0 auto",
  padding: "clamp(55px, 7.1vw, 100px) var(--m7-pad) 0",
};

export function PageHero({
  overline,
  title,
  intro,
  actions,
  centered = false,
  titleFontSize = "clamp(41px, 5.7vw, 66px)",
  titleLineHeight = "1",
  titleFontWeight = "600",
}: {
  overline: string;
  title: ReactNode;
  intro: ReactNode;
  actions?: ReactNode;
  centered?: boolean;
  titleFontSize?: string;
  titleLineHeight?: string;
  titleFontWeight?: string;
}) {
  const overlineStyle: CSSProperties = {
    fontFamily: FONT.head,
    fontSize: 12,
    letterSpacing: 2,
    color: "#9a9a9a",
    textTransform: "uppercase",
    marginBottom: 16,
  };
  const titleStyle: CSSProperties = {
    fontFamily: FONT.head,
    fontWeight: titleFontWeight,
    fontSize: titleFontSize,
    lineHeight: titleLineHeight,
    letterSpacing: "-3px",
    margin: 0,
  };
  const introStyle: CSSProperties = {
    fontSize: "var(--m7-lede-size)",
    lineHeight: 1.65,
    color: "#5a5a5a",
    margin: "0 0 24px",
  };

  return (
    <section
      style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(35px, 4.6vw, 64px) var(--m7-pad) 0" }}
    >
      {centered ? (
        <div style={{ textAlign: "center" }}>
          <div style={overlineStyle}>{`// ${overline}`}</div>
          <h1 className="m7-hero-h1" style={{ ...titleStyle, textAlign: "center" }}>
            {title}
          </h1>
          <p style={{ ...introStyle, maxWidth: 640, margin: "24px auto 24px" }}>
            {intro}
          </p>
          {actions && (
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {actions}
            </div>
          )}
        </div>
      ) : (
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 48,
            alignItems: "end",
          }}
        >
          <div>
            <div style={overlineStyle}>{`// ${overline}`}</div>
            <h1 className="m7-hero-h1" style={titleStyle}>
              {title}
            </h1>
          </div>
          <div>
            <p style={introStyle}>{intro}</p>
            {actions && (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>{actions}</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export function StatBar({ stats }: { stats: { n: string; label: string }[] }) {
  return (
    <section className="m7-wrap m7-top-sm">
      <div
        className="m7-statstrip"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
          borderTop: "1px solid #ececec",
          borderBottom: "1px solid #ececec",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "26px 28px",
              borderRight: i === stats.length - 1 ? undefined : "1px solid #ececec",
            }}
          >
            <div
              style={{
                fontFamily: FONT.head,
                fontWeight: 700,
                fontSize: "clamp(27px, 3.8vw, 44px)",
                lineHeight: 1,
                letterSpacing: "-2px",
              }}
            >
              {s.n}
            </div>
            <div style={{ fontSize: 14, color: "#8a8a8a", marginTop: 8 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PageSection({
  overline,
  title,
  children,
  style,
}: {
  overline?: string;
  title?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section style={{ ...PAGE_SECTION, ...style }}>
      {overline && (
        <div
          style={{
            fontFamily: FONT.head,
            fontSize: 12,
            letterSpacing: 2,
            color: "#9a9a9a",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {`// ${overline}`}
        </div>
      )}
      {title && (
        <h2
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: "clamp(24px, 3.3vw, 38px)",
            lineHeight: 1.02,
            letterSpacing: "-3px",
            margin: "0 0 22px",
            textWrap: "balance",
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

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
      style={{
        background: "#fcfcfc",
        border: "1px solid #ececec",
        borderRadius: 4,
        padding: "32px 30px 34px",
        display: "flex",
        flexDirection: "column",
        minHeight,
        boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
      }}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#121212"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: "auto" }}
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
      <div
        style={{
          fontFamily: FONT.head,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: "-0.3px",
          margin: "26px 0 10px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 11,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#121212",
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        {accent}
      </div>
      <p style={{ fontSize: "var(--m7-lede-size)", lineHeight: 1.65, color: "#5a5a5a", margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

export function MediaPanel({
  label,
  height = 440,
  annotation,
  style,
}: {
  label: string;
  height?: number | string;
  annotation?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        background: stripe(),
        border: "1px solid #e2e2e2",
        height,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 20,
          fontFamily: FONT.mono,
          fontSize: 11,
          letterSpacing: 1,
          color: "#9a9a9a",
        }}
      >
        ▣ {label}
      </div>
      {annotation && WIREFRAME.showAnnotations && (
        <Annotation
          style={{
            position: "absolute",
            bottom: 18,
            left: 20,
            fontSize: 10,
            padding: "6px 13px",
          }}
        >
          {annotation}
        </Annotation>
      )}
    </div>
  );
}

export function DarkPanel({
  overline,
  title,
  body,
  action,
  aside,
  annotation,
}: {
  overline: string;
  title: ReactNode;
  body: ReactNode;
  action?: ReactNode;
  aside: ReactNode;
  annotation?: string;
}) {
  return (
    <div
      className="m7-grid-2"
      style={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        background: stripeDark(),
        border: "1px solid #2a2a2a",
        padding: "clamp(28px, 4.4vw, 64px)",
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: "clamp(26px, 3.6vw, 48px)",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: FONT.head,
            fontSize: 12,
            letterSpacing: 2,
            color: "#7f7f7f",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {`// ${overline}`}
        </div>
        <h2
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: "clamp(24px, 3.3vw, 38px)",
            lineHeight: 1.02,
            letterSpacing: "-3px",
            margin: "0 0 20px",
            color: "#fff",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "var(--m7-lede-size)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.62)",
            margin: "0 0 28px",
            maxWidth: 520,
          }}
        >
          {body}
        </p>
        {action}
      </div>
      <div style={{ position: "relative" }}>
        {aside}
        {annotation && WIREFRAME.showAnnotations && (
          <Annotation
            dark
            style={{
              position: "absolute",
              bottom: -14,
              left: 0,
              fontSize: 10,
              padding: "6px 13px",
              background: "rgba(18,18,18,0.6)",
            }}
          >
            {annotation}
          </Annotation>
        )}
      </div>
    </div>
  );
}

export function DarkStat({ n, label }: { n: string; label: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 4,
        padding: "24px 26px",
      }}
    >
      <div
        style={{
          fontFamily: FONT.head,
          fontWeight: 700,
          fontSize: "clamp(27px, 3.8vw, 44px)",
          lineHeight: 1,
          color: "#fff",
        }}
      >
        {n}
      </div>
      <div
        style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 8 }}
      >
        {label}
      </div>
    </div>
  );
}
