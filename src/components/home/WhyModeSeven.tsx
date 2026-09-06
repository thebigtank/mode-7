"use client";

import { useRef } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { useDotGrid } from "@/hooks/useDotGrid";
import { COLOR, FONT } from "@/lib/theme";

type Reason = {
  num: string;
  title: string;
  accent: string;
  body: string;
};

const reasons: Reason[] = [
  {
    num: "01",
    title: "Vetted & Sealed",
    accent: "EVERY UNIT, CHECKED.",
    body: "Each device is rigorously tested, sealed and warrantied before it ships — whether brand new or certified refurbished.",
  },
  {
    num: "02",
    title: "Intelligent Trade-In",
    accent: "INSTANT VALUATION.",
    body: "AI-driven diagnostics calculate your device’s exact upgrade value in seconds, so trading up is effortless.",
  },
  {
    num: "03",
    title: "Powered by Seven",
    accent: "RAG AI, ALWAYS ON.",
    body: "Our assistant Seven helps you navigate, shop and evaluate devices anytime, anywhere across the ecosystem.",
  },
  {
    num: "04",
    title: "Home & Energy",
    accent: "BEYOND THE POCKET.",
    body: "Smart-home automation and solar energy, designed and installed by certified engineers to power your whole home.",
  },
];

/**
 * "Why Mode 7" — an editorial band on cream: a mono header row, one large static
 * statement, a hairline + intro row, then a four-column ruled grid of reasons
 * numbered 01–04, closing on the site's ArrowButton.
 *
 * Behind it sits the proximity dot-grid canvas (shared with the Team section),
 * tinted with the same stone `163,154,126` the Team band uses — this section is
 * cream, not gold, so the darker gold tint no longer applies.
 *
 * Colour notes (measured on cream #EFE6D1, do not "restore" the design's own
 * values): the 12px mono label and the 11px accent lines are COLOR.rust
 * (4.84:1) rather than the design's #AC512D / ember #B75A24, both of which fall
 * under the 4.5:1 floor at those sizes. The big numbers are COLOR.faint
 * (3.70:1) rather than stone #A39A7E (2.26:1, failing even the large-text 3:1
 * floor) — still clearly recessive. The header meta line runs at alpha .65
 * (5.13:1); the design's .45 is 2.83:1 at 12px. Body copy stays at .68 (5.65:1).
 * Column hover and the responsive collapse live in globals.css.
 */
export function WhyModeSeven() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useDotGrid(sectionRef, canvasRef, "163,154,126"); // stone, as on the Team band

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: COLOR.cream,
        color: COLOR.ink,
        fontFamily: FONT.head,
      }}
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
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 var(--m7-pad)",
        }}
      >
        {/* header row */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 24,
            padding: "clamp(48px,6vw,88px) 0 clamp(36px,4vw,56px)",
            borderBottom: "1px solid rgba(28,21,15,.18)",
          }}
        >
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".16em",
              color: COLOR.rust,
            }}
          >
            {"// WHY MODE 7"}
          </span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: ".16em",
              color: "rgba(28,21,15,0.65)",
            }}
          >
            FOUR REASONS&nbsp;/&nbsp;01—04
          </span>
        </div>

        {/* statement */}
        <p
          style={{
            margin: "clamp(44px,5vw,72px) 0 clamp(52px,6vw,88px)",
            fontSize: "clamp(30px,4.6vw,76px)",
            lineHeight: 1.08,
            fontWeight: 500,
            letterSpacing: "-.03em",
            textWrap: "pretty",
            maxInlineSize: "min(100%,20ch)",
          }}
        >
          We do far more than supply the latest devices — we redefine how you
          live with technology, energy and devices.
        </p>

        {/* rule + intro */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr minmax(0,52ch)",
            gap: "clamp(24px,5vw,80px)",
            alignItems: "start",
            paddingBottom: "clamp(56px,6vw,96px)",
          }}
        >
          <div
            style={{
              height: 1,
              background: "rgba(28,21,15,.18)",
              marginTop: 14,
            }}
          />
          <p
            style={{
              margin: 0,
              fontSize: "clamp(16px,1.35vw,21px)",
              lineHeight: 1.62,
              color: "rgba(28,21,15,0.68)",
              textWrap: "pretty",
            }}
          >
            Mode 7 powers homes and pockets, curating premium hardware,
            sustainable energy and effortless upgrades under one trusted roof.
            Every unit is vetted, sealed and guaranteed —{" "}
            <span style={{ color: COLOR.rust }}>
              this isn’t retail, it’s a complete technology lifecycle engineered
              around you.
            </span>
          </p>
        </div>

        {/* four reasons */}
        <div
          className="m7-why-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 0,
            borderTop: "1px solid rgba(28,21,15,.3)",
            borderBottom: "1px solid rgba(28,21,15,.3)",
          }}
        >
          {reasons.map((r, i) => (
            <div
              key={r.num}
              className="m7-why-col"
              style={{
                padding:
                  "clamp(28px,2.6vw,44px) clamp(20px,1.8vw,32px) clamp(40px,4vw,64px)",
                display: "flex",
                flexDirection: "column",
                borderRight:
                  i < reasons.length - 1
                    ? "1px solid rgba(28,21,15,.16)"
                    : undefined,
              }}
            >
              <div
                className="m7-why-num"
                style={{
                  fontSize: "clamp(52px,5vw,86px)",
                  lineHeight: 0.9,
                  fontWeight: 500,
                  letterSpacing: "-.04em",
                  color: COLOR.faint,
                  marginBottom: "clamp(40px,5vw,80px)",
                }}
              >
                {r.num}
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "clamp(19px,1.5vw,25px)",
                  fontWeight: 600,
                  letterSpacing: "-.015em",
                }}
              >
                {r.title}
              </h3>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".09em",
                  color: COLOR.rust,
                  marginBottom: 16,
                }}
              >
                {r.accent}
              </div>
              {/* No fontSize/lineHeight here: 15.5px/1.6 was just restating
                  the site default within half a pixel. The global <p> rule
                  (--m7-p-size/--m7-p-line, 15px/1.6) governs instead. */}
              <p
                style={{
                  margin: 0,
                  color: "rgba(28,21,15,0.68)",
                  textWrap: "pretty",
                }}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding: "clamp(28px,3vw,44px) 0 clamp(56px,6vw,96px)" }}>
          <ArrowButton
            label="Explore the Mode 7 lifecycle"
            variant="fill"
            href="/services"
          />
        </div>
      </div>
    </section>
  );
}
