"use client";

import { useRef } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { Annotation, Overline, SectionHeading } from "@/components/wireframe/Primitives";
import { useStatCounter } from "@/hooks/useStatCounter";
import { FONT, stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

/**
 * Mission / About. Copy on the left, image on the RIGHT.
 *
 * The perfect-square black dot-matrix counter card deliberately overhangs the
 * image's bottom-left corner (`left:-72px; bottom:-36px`) so it sits OUTSIDE the
 * image frame. It counts 00K+ → 50K+ on scroll-in, then blinks.
 */
export function Mission() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useStatCounter(canvasRef);

  return (
    <section
      className="m7-grid-2"
      style={{
        maxWidth: 1320,
        margin: "0 auto",
        padding: "clamp(57px, 7.4vw, 104px) var(--m7-pad)",
        display: "grid",
        gridTemplateColumns: "1.05fr 1fr",
        gap: 72,
        alignItems: "center",
      }}
    >
      <div>
        <Overline style={{ marginBottom: 18 }}>Our Mission</Overline>
        <SectionHeading size={40} style={{ marginBottom: 24 }}>
          Elevating the standard for premium tech and sustainable energy.
        </SectionHeading>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: "#5a5a5a",
            margin: "0 0 32px",
            maxWidth: 520,
          }}
        >
          Mode Seven is a comprehensive technology hub designed to power your home
          and your everyday life. Our offerings span premium smart-home automation,
          solar energy solutions, elite gadgets, and certified refurbished devices.
          We pair this with a premium repair division, where our expert engineers
          provide precision diagnostics and restoration. From purchase to repair,
          every unit is rigorously vetted, sealed, and guaranteed.
        </p>
        <ArrowButton label="Learn More" variant="fill" href="/about" />
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "relative",
            height: 480,
            borderRadius: 4,
            overflow: "hidden",
            background: stripe(),
            border: "1px solid #e2e2e2",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 22,
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: 1,
              color: "#9a9a9a",
            }}
          >
            ▣ TEAM / WORKSHOP IMAGE
          </div>
          {WIREFRAME.showAnnotations && (
            <Annotation
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                fontSize: 10,
                padding: "6px 13px",
              }}
            >
              IMAGE SCROLLS UP
            </Annotation>
          )}
        </div>

        {/* dot-matrix stat card, overhanging the image's bottom-left corner */}
        <div
          className="m7-mission-chip"
          style={{
            position: "absolute",
            /* hangs 72px past the image on desktop; pulled inside the frame on
               narrow screens by .m7-mission-chip, where it would go off-screen */
            left: -72,
            bottom: -36,
            width: 208,
            height: 146,
            display: "flex",
            flexDirection: "column",
            background: "rgba(18,18,18,0.95)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 22px 50px rgba(0,0,0,0.34)",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ display: "block", width: "100%", flex: 1, minHeight: 0 }}
          />
          <div
            style={{
              flex: "0 0 auto",
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: 1,
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
              textAlign: "center",
              padding: "10px 8px 12px",
              background: "rgba(18,18,18,0.95)",
            }}
          >
            Devices vetted &amp; sealed
          </div>
        </div>
      </div>
    </section>
  );
}
