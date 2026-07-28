"use client";

import { useRef } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { useDotGrid } from "@/hooks/useDotGrid";
import { FONT, stripe } from "@/lib/theme";

const tile = {
  borderRadius: 4,
  background: stripe("#e6e6e6", "#f2f2f2"),
  border: "1px solid #e2e2e2",
} as const;

/**
 * Team grid. Left-aligned heading under the `// Our Team` overline, then a 3×3
 * of 240px-row rectangles with a text card in the centre cell.
 *
 * Uses the same proximity dot-grid canvas as "Why Mode 7" — one shared hook runs
 * on both sections, with the canvas at full viewport width and the content held
 * inside the 1320px container.
 */
export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDotGrid(sectionRef, canvasRef);

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
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 var(--m7-pad)",
        }}
      >
        <div
          style={{
            fontFamily: FONT.head,
            fontSize: 12,
            letterSpacing: 2,
            color: "#9a9a9a",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          {"// Our Team"}
        </div>
        <h2
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: "clamp(24px, 3.3vw, 38px)",
            lineHeight: 1.04,
            letterSpacing: "-3px",
            margin: "0 0 40px",
            maxWidth: 640,
            textAlign: "left",
          }}
        >
          The people powering homes, pockets and the future of tech.
        </h2>

        <div
          /* grid from 621px up; a swipeable carousel below that, where a
             stacked 3x3 of placeholder tiles is just a long scroll */
          className="m7-team-grid m7-scroll"
          style={{ display: "grid", gap: "clamp(12px, 1.8vw, 18px)" }}
        >
          {/* r1c1 carries the name label */}
          <div style={{ position: "relative", overflow: "hidden", ...tile }}>
            <div
              style={{
                position: "absolute",
                left: 16,
                bottom: 16,
                background: "#fff",
                border: "1px solid #ececec",
                borderRadius: 4,
                padding: "10px 14px",
                boxShadow: "0 10px 26px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 15 }}>
                Team Member
              </div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: 1,
                  color: "#9a9a9a",
                  marginTop: 3,
                }}
              >
                HARDWARE SPECIALIST
              </div>
            </div>
          </div>

          <div style={tile} />
          <div style={tile} />
          <div style={tile} />

          {/* centre text card */}
          <div
            style={{
              borderRadius: 4,
              border: "1px solid #ececec",
              background: "#fafafa",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: 24,
            }}
          >
            <h3
              style={{
                fontFamily: FONT.head,
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.18,
                letterSpacing: "-0.5px",
                margin: "0 0 18px",
              }}
            >
              The team bringing premium technology and service right to your door.
            </h3>
            <ArrowButton label="Explore What We Do" variant="fill" href="/services" />
          </div>

          <div style={tile} />
          <div style={tile} />
          <div style={tile} />
          <div style={tile} />
        </div>
      </div>
    </section>
  );
}
