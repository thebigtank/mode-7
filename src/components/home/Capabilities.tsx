"use client";

import { useRef } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";
import { Overline, SectionHeading } from "@/components/wireframe/Primitives";
import { useCarouselLoop } from "@/hooks/useCarouselLoop";
import { capabilities } from "@/lib/content";
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
  borderRadius: 4, // squared, not circles — matches the near-pointy system
  cursor: "pointer",
} as const;

/**
 * Featured Capabilities — a full-bleed carousel of 660px portrait cards, two at
 * a time, looping seamlessly (the list is tripled and re-centres invisibly).
 *
 * The frosted bands at the top and bottom of each card are `backdrop-filter:
 * blur()` plus a masked fade — NOT a gradient darken. They will not appear in
 * DOM-capture screenshots, only in a real browser.
 */
export function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const { step } = useCarouselLoop(ref);
  const loop = [...capabilities, ...capabilities, ...capabilities];

  return (
    <section
      style={{
        background: "#fafafa",
        borderTop: "1px solid #f0f0f0",
        borderBottom: "1px solid #f0f0f0",
        padding: "100px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 48px 40px",
          textAlign: "center",
        }}
      >
        <Overline>Featured Capabilities</Overline>
        <SectionHeading style={{ margin: "0 auto", maxWidth: 680 }}>
          Built around you, from first tap to upgrade.
        </SectionHeading>
      </div>

      <div
        ref={ref}
        className="m7-scroll m7-cap-track"
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          paddingTop: 8,
          paddingBottom: 24,
          paddingRight: 0,
          paddingLeft:
            "max(var(--m7-pad), calc((100% - 1320px)/2 + var(--m7-pad)))",
        }}
      >
        {loop.map((p, i) => (
          <div
            key={`${p.title}-${i}`}
            className="m7-cap-slide"
            style={{
              position: "relative",
              /* a percentage of a narrow viewport collapses to nothing, so the
                 slide takes a viewport-relative width with a hard floor */
              flex: "0 0 clamp(260px, calc(50% - 70px), 620px)",
              height: "clamp(400px, 62vh, 660px)",
              borderRadius: 4,
              overflow: "hidden",
              background: stripe("#d6d6d6", "#e6e6e6"),
              border: "1px solid #d4d4d4",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "42%",
                backdropFilter: "blur(16px) saturate(115%)",
                WebkitBackdropFilter: "blur(16px) saturate(115%)",
                background: "rgba(17,17,17,0.34)",
                WebkitMaskImage: "linear-gradient(180deg,#000 56%,transparent 100%)",
                maskImage: "linear-gradient(180deg,#000 56%,transparent 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                backdropFilter: "blur(16px) saturate(115%)",
                WebkitBackdropFilter: "blur(16px) saturate(115%)",
                background: "rgba(17,17,17,0.40)",
                WebkitMaskImage: "linear-gradient(0deg,#000 60%,transparent 100%)",
                maskImage: "linear-gradient(0deg,#000 60%,transparent 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                zIndex: 2,
                fontFamily: FONT.mono,
                fontSize: 9,
                letterSpacing: 1,
                color: "#ededed",
                background: "rgba(0,0,0,0.32)",
                borderRadius: 6,
                padding: "4px 9px",
              }}
            >
              ▣ IMAGE
            </div>

            <div
              className="m7-cap-body"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "34px 36px",
                color: "#fff",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: "clamp(21px, 5.6vw, 30px)",
                    letterSpacing: "-0.6px",
                    marginBottom: 14,
                  }}
                >
                  {p.title}
                </div>
                <p
                  style={{
                    fontSize: "clamp(14px, 3.9vw, 18px)",
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,0.85)",
                    margin: "0 0 22px",
                    maxWidth: "88%",
                  }}
                >
                  {p.desc}
                </p>
                <ArrowButton label={p.cta} variant="outline" />
              </div>
              <div
                className="m7-cap-bullets"
                style={{ display: "flex", flexDirection: "column", gap: 13 }}
              >
                {p.bullets.map((b) => (
                  <div
                    key={b}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 13,
                      fontSize: "clamp(14px, 3.8vw, 18px)",
                      lineHeight: 1.4,
                    }}
                  >
                    <span
                      style={{
                        flex: "0 0 auto",
                        width: 25,
                        height: 25,
                        borderRadius: 7,
                        background: "rgba(255,255,255,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                      }}
                    >
                      ✦
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
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
          justifyContent: "center",
          gap: 14,
        }}
      >
        <span onClick={() => step(-1)} style={navBtn}>
          <ChevronLeftIcon />
        </span>
        <ArrowButton label="Explore the Portal" variant="fill" href="/trade-in" />
        <span onClick={() => step(1)} style={navBtn}>
          <ChevronRightIcon />
        </span>
      </div>
    </section>
  );
}
