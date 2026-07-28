"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useDotGrid } from "@/hooks/useDotGrid";
import { useReveal } from "@/hooks/useReveal";
import { revealStatement } from "@/lib/content";
import { FONT } from "@/lib/theme";

const diagram: CSSProperties = { width: 160, height: 60, marginBottom: 26 };
const svgProps = {
  viewBox: "0 0 160 60",
  fill: "none",
  stroke: "#1f1f1f",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Card = {
  title: string;
  accent: string;
  body: string;
  art: ReactNode;
  col: number;
  row: number;
};

const cards: Card[] = [
  {
    title: "Vetted & Sealed",
    accent: "Every unit, checked.",
    body: "Each device is rigorously tested, sealed and warrantied before it ships — whether brand new or certified refurbished.",
    col: 1,
    row: 3,
    art: (
      <svg style={diagram} {...svgProps}>
        <line x1="6" y1="30" x2="70" y2="30" />
        <polyline points="58 21 70 30 58 39" />
        <rect x="88" y="16" width="28" height="28" transform="rotate(45 102 30)" />
      </svg>
    ),
  },
  {
    title: "Intelligent Trade-In",
    accent: "Instant valuation.",
    body: "AI-driven diagnostics calculate your device's exact upgrade value in seconds, so trading up is effortless.",
    col: 2,
    row: 3,
    art: (
      <svg style={diagram} {...svgProps}>
        <line x1="10" y1="16" x2="10" y2="30" />
        <line x1="26" y1="16" x2="26" y2="30" />
        <line x1="42" y1="16" x2="42" y2="30" />
        <line x1="6" y1="42" x2="150" y2="42" />
        <polyline points="138 34 150 42 138 50" />
      </svg>
    ),
  },
  {
    title: "Powered by Seven",
    accent: "RAG AI, always on.",
    body: "Our assistant Seven helps you navigate, shop and evaluate devices anytime, anywhere across the ecosystem.",
    col: 2,
    row: 4,
    art: (
      <svg style={diagram} {...svgProps}>
        <line x1="6" y1="30" x2="60" y2="30" />
        <polyline points="50 22 60 30 50 38" />
        <circle cx="94" cy="22" r="9" />
        <circle cx="110" cy="34" r="9" />
        <circle cx="92" cy="42" r="9" />
      </svg>
    ),
  },
  {
    title: "Home & Energy",
    accent: "Beyond the pocket.",
    body: "Smart-home automation and solar energy, designed and installed by certified engineers to power your whole home.",
    col: 3,
    row: 4,
    art: (
      <svg style={diagram} {...svgProps}>
        <line x1="6" y1="16" x2="80" y2="30" />
        <line x1="6" y1="44" x2="80" y2="30" />
        <line x1="80" y1="30" x2="150" y2="30" />
        <polyline points="138 22 150 30 138 38" />
      </svg>
    ),
  },
];

/**
 * "Why Mode 7" — a staggered S-flow grid: overline, then one big statement
 * spanning all three columns, then the top card pair pushed LEFT (cols 1–2) and
 * the bottom pair pushed RIGHT (cols 2–3).
 *
 * Behind it sits the proximity dot-grid canvas (shared with the Team section).
 * The statement is rendered as per-character spans that go grey → black as you
 * scroll — the signature reveal effect.
 */
export function WhyModeSeven() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useDotGrid(sectionRef, canvasRef);
  useReveal(revealRef);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", overflow: "hidden", padding: "104px 0" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        className="m7-grid-3"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1320,
          margin: "0 auto",
          paddingInline: "var(--m7-pad)",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          columnGap: 24,
          rowGap: 30,
          alignItems: "start",
        }}
      >
        <div
          style={{
            gridColumn: "1 / -1",
            gridRow: 1,
            fontFamily: FONT.head,
            fontSize: 12,
            letterSpacing: 2,
            color: "#9a9a9a",
            textTransform: "uppercase",
          }}
        >
          {"// Why Mode 7"}
        </div>

        <div
          ref={revealRef}
          style={{
            gridColumn: "1 / -1",
            gridRow: 2,
            fontFamily: FONT.head,
            fontWeight: 500,
            fontSize: "clamp(24px, 3.3vw, 38px)",
            lineHeight: 1.3,
            letterSpacing: "-1px",
            textAlign: "left",
            margin: 0,
            textWrap: "balance",
          }}
        >
          {revealStatement.split("").map((ch, i) => (
            <span key={i} style={{ color: "#cfcfcf" }}>
              {ch}
            </span>
          ))}
        </div>

        {cards.map((c) => (
          <div
            key={c.title}
            /* The S-flow placement below is a three-column composition. Once
               the grid collapses those column numbers would create implicit
               columns and push the page sideways, so m7-why-card drops them. */
            className="m7-why-card"
            style={{
              gridColumn: c.col,
              gridRow: c.row,
              border: "1px solid #ececec",
              borderRadius: 4,
              padding: "clamp(24px, 3vw, 34px)",
              display: "flex",
              flexDirection: "column",
              minHeight: "clamp(300px, 34vw, 470px)",
              background: "#fcfcfc",
              boxShadow: "0 8px 26px rgba(18,18,18,0.06)",
            }}
          >
            {c.art}
            <div
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: 23,
                letterSpacing: "-0.3px",
                marginTop: "auto",
                marginBottom: 12,
              }}
            >
              {c.title}
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
              {c.accent}
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#5a5a5a", margin: 0 }}>
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
