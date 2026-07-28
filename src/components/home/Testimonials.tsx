"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";
import { Overline, SectionHeading } from "@/components/wireframe/Primitives";
import { useCarouselLoop } from "@/hooks/useCarouselLoop";
import { testimonials } from "@/lib/content";
import { FONT, stripe } from "@/lib/theme";

const navBtn = {
  display: "inline-flex",
  width: 46,
  height: 46,
  alignItems: "center",
  justifyContent: "center",
  background: "#fff",
  color: "#121212",
  border: "1px solid #d6d6d6",
  borderRadius: 4,
  cursor: "pointer",
} as const;

/**
 * Testimonials. Looping carousel with NO autoplay — manual nav only. The
 * progress bar tracks the scroller's position within one copy of the list.
 */
export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, step } = useCarouselLoop(ref, true);
  const loop = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section
      style={{
        background: "#fafafa",
        borderTop: "1px solid #f0f0f0",
        borderBottom: "1px solid #f0f0f0",
        padding: "100px 0",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--m7-pad)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40,
            marginBottom: 48,
            flexWrap: "wrap",
          }}
        >
          <div>
            <Overline>Customer Reviews</Overline>
            <SectionHeading style={{ maxWidth: 520 }}>
              From happy customers to smart-home visionaries.
            </SectionHeading>
          </div>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "#5a5a5a",
              margin: 0,
              maxWidth: 330,
            }}
          >
            Real Mode 7 owners on devices that arrived sealed, trade-ins that paid out
            instantly, and a little help from Seven.
          </p>
        </div>
      </div>

      <div
        ref={ref}
        className="m7-scroll"
        style={{
          display: "flex",
          gap: 22,
          overflowX: "auto",
          padding: "8px var(--m7-pad) 24px",
        }}
      >
        {loop.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            style={{
              flex: "0 0 auto",
              /* never wider than the screen — a slide you can't see the edge of
                 reads as broken rather than as a carousel */
              width: "min(440px, 82vw)",
              background: "#fff",
              border: "1px solid #ececec",
              borderRadius: 4,
              padding: "32px 34px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 16, letterSpacing: 3, marginBottom: 18 }}>
              ★★★★★
            </div>
            <p
              style={{
                fontWeight: 400,
                fontSize: 19,
                lineHeight: 1.6,
                color: "#2a2a2a",
                margin: "0 0 26px",
                flex: 1,
              }}
            >
              &quot;{t.quote}&quot;
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                borderTop: "1px solid #ececec",
                paddingTop: 20,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 99,
                  background: stripe("#e0e0e0", "#efefef", 6),
                  border: "1px solid #e2e2e2",
                }}
              />
              <div>
                <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 15 }}>
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    letterSpacing: 1,
                    color: "#9a9a9a",
                    marginTop: 3,
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(24px, 1.3vw, 18px) var(--m7-pad) 0",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span onClick={() => step(-1)} style={navBtn}>
          <ChevronLeftIcon />
        </span>
        <span onClick={() => step(1)} style={navBtn}>
          <ChevronRightIcon />
        </span>
        <div
          style={{
            flex: 1,
            height: 4,
            borderRadius: 99,
            background: "#e6e6e6",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${Math.max(4, Math.round(progress * 100))}%`,
              background: "#121212",
              borderRadius: 99,
              transition: "width .35s ease",
            }}
          />
        </div>
      </div>
    </section>
  );
}
