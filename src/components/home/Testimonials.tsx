"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";
import { Overline, SectionHeading } from "@/components/wireframe/Primitives";
import { useCarouselLoop } from "@/hooks/useCarouselLoop";
import { testimonials } from "@/lib/content";
import { COLOR, FONT } from "@/lib/theme";

/**
 * Avatars, keyed by the reviewer's name. All CC0 — see public/hero/CREDITS.md.
 * The list is tripled for the loop, so this keys on the name and never on the
 * index. Decorative: the name is set in text right beside it.
 */
const AVATAR: Record<string, string> = {
  "Daniel Okafor": "/hero/av-1.webp",
  "Amara Eze": "/hero/av-2.webp",
  "Tunde Bello": "/hero/av-3.webp",
  "Grace Adeyemi": "/hero/av-4.webp",
};

const navBtn = {
  display: "inline-flex",
  width: 46,
  height: 46,
  alignItems: "center",
  justifyContent: "center",
  background: COLOR.card,
  color: COLOR.ink,
  border: `1px solid ${COLOR.lineStrong}`,
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
        /* The rust band — the last coloured moment before the footer. Rust
           ships at #9E4B2A so cream on it is 4.85:1 rather than 4.27:1, which
           is what lets the overline and the intro paragraph set in cream. */
        background: COLOR.rust,
        borderTop: "1px solid rgba(239,230,209,0.28)",
        borderBottom: "1px solid rgba(239,230,209,0.28)",
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
            <Overline color={COLOR.onRust}>Customer Reviews</Overline>
            <SectionHeading style={{ maxWidth: 520, color: COLOR.onRust }}>
              From happy customers to smart-home visionaries.
            </SectionHeading>
          </div>
          <p
            style={{
              fontSize: "var(--m7-lede-size)",
              lineHeight: 1.6,
              color: COLOR.onRust,
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
              background: COLOR.card,
              border: "1px solid rgba(239,230,209,0.28)",
              borderRadius: 4,
              padding: "32px 34px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 16,
                letterSpacing: 3,
                /* the stars sit on the cream CARD, not the band: 5.25:1 */
                marginBottom: 18,
                color: COLOR.rust,
              }}
              aria-label="Rated 5 out of 5"
            >
              ★★★★★
            </div>
            <p
              style={{
                fontWeight: 400,
                fontSize: 19,
                lineHeight: 1.6,
                color: COLOR.inkSoft,
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
                borderTop: `1px solid ${COLOR.line}`,
                paddingTop: 20,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 99,
                  backgroundImage: `url(${AVATAR[t.name] ?? ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: `1px solid ${COLOR.lineStrong}`,
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
                    color: COLOR.muted,
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
            background: "rgba(239,230,209,0.30)",
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
              /* cream, not rust: rust on the rust band is no progress bar */
              background: COLOR.cream,
              borderRadius: 99,
              transition: "width .35s ease",
            }}
          />
        </div>
      </div>
    </section>
  );
}
