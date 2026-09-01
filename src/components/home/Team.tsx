"use client";

import { useRef } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { useDotGrid } from "@/hooks/useDotGrid";
import { COLOR, FONT } from "@/lib/theme";

/** Shared box for a team tile: the per-cell picture is added by `tileWith`. */
const tile = {
  borderRadius: 4,
  border: `1px solid ${COLOR.lineStrong}`,
} as const;

/**
 * A team tile carrying one of the eight portraits. All CC0 — see
 * public/hero/CREDITS.md. Decorative: the grid is a mood shot of the team, and
 * only the first cell names a person, in its own label.
 */
const tileWith = (src: string) =>
  ({
    ...tile,
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }) as const;

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
  useDotGrid(sectionRef, canvasRef, "163,154,126"); // stone, on the cream ground

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
            color: COLOR.muted,
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
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              ...tileWith("/hero/team-1.webp"),
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 16,
                bottom: 16,
                background: COLOR.card,
                border: `1px solid ${COLOR.line}`,
                borderRadius: 4,
                padding: "10px 14px",
                boxShadow: "0 10px 26px rgba(28,21,15,0.10)",
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
                  color: COLOR.muted,
                  marginTop: 3,
                }}
              >
                HARDWARE SPECIALIST
              </div>
            </div>
          </div>

          <div style={tileWith("/hero/team-2.webp")} />
          <div style={tileWith("/hero/team-3.webp")} />
          <div style={tileWith("/hero/team-4.webp")} />

          {/* centre text card */}
          <div
            style={{
              borderRadius: 4,
              border: `1px solid ${COLOR.line}`,
              background: COLOR.card,
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

          <div style={tileWith("/hero/team-5.webp")} />
          <div style={tileWith("/hero/team-6.webp")} />
          <div style={tileWith("/hero/team-7.webp")} />
          <div style={tileWith("/hero/team-8.webp")} />
        </div>
      </div>
    </section>
  );
}
