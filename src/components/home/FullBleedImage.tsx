import { Annotation } from "@/components/wireframe/Primitives";
import { FONT, stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

/**
 * The full-bleed lifestyle image. Its own block AFTER the hero section: full
 * viewport width with only ~26px of side padding and a `min(86vh, 920px)`
 * height.
 *
 * The compact glassmorphism stat card is pinned bottom-left, and its left edge
 * stays aligned to the 1320px site container via the `max(38px, …)` calc — so it
 * lines up with the page grid even though the image itself is full-bleed.
 */
export function FullBleedImage() {
  return (
    <div style={{ padding: "44px 26px 18px" }}>
      <div
        style={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          background: stripe(),
          border: "1px solid #e2e2e2",
          height: "min(86vh,920px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 24,
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: 1,
            color: "#9a9a9a",
          }}
        >
          ▣ FULL-BLEED LIFESTYLE / SMART-HOME IMAGE
        </div>

        {WIREFRAME.showAnnotations && (
          <Annotation style={{ position: "absolute", top: 22, right: 24 }}>
            WEBGL PARALLAX BACKGROUND · ELEMENTS FLOAT ON SCROLL
          </Annotation>
        )}

        {/* glassmorphism stat card */}
        <div
          className="m7-fullbleed-card"
          style={{
            position: "absolute",
            left: "max(var(--m7-pad), calc((100vw - 1320px)/2 + 38px))",
            bottom: 28,
            width: "min(600px, calc(100vw - 72px))",
            maxWidth: "calc(100% - 56px)",
            height: "auto",
            minHeight: 180,
            background: "rgba(18,18,18,0.42)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 4,
            padding: 14,
            display: "grid",
            gridTemplateColumns: "minmax(0, 248px) minmax(0, 1fr)",
            gap: 24,
            boxShadow: "0 24px 60px rgba(0,0,0,0.24)",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              background: stripe("#cfcfcf", "#dedede"),
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                fontFamily: FONT.mono,
                fontSize: 9,
                letterSpacing: 1,
                color: "#6a6a6a",
                background: "rgba(255,255,255,0.85)",
                borderRadius: 5,
                padding: "3px 8px",
              }}
            >
              ▣ CUSTOMER
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "16px 18px 16px 0",
              color: "#fff",
            }}
          >
            <p
              style={{
                fontFamily: FONT.head,
                fontWeight: 500,
                fontSize: 16,
                lineHeight: 1.5,
                letterSpacing: "-0.2px",
                margin: 0,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Powering your world with uncompromising quality. Every piece of
              technology we deliver is rigorously vetted, sealed, and guaranteed to
              elevate your daily experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
