import { Annotation } from "@/components/wireframe/Primitives";
import { COLOR, FONT } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

/**
 * The full-bleed lifestyle image. Its own block AFTER the hero section: truly
 * full-bleed — edge to edge, with no padding, border or radius, so it meets the
 * sections above and below with no seam — at a `min(86vh, 920px)` height.
 *
 * The compact glassmorphism stat card is pinned bottom-left, and its left edge
 * stays aligned to the 1320px site container via the `max(38px, …)` calc — so it
 * lines up with the page grid even though the image itself is full-bleed.
 */
export function FullBleedImage() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 0,
        overflow: "hidden",
        backgroundImage: "url(/hero/bleed.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "min(86vh,920px)",
      }}
    >
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
          background: "rgba(28,21,15,0.48)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(239,230,209,0.22)",
          borderRadius: 4,
          padding: 14,
          display: "grid",
          gridTemplateColumns: "minmax(0, 248px) minmax(0, 1fr)",
          gap: 24,
          boxShadow: "0 24px 60px rgba(28,21,15,0.26)",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            backgroundImage: "url(/hero/customer.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid rgba(239,230,209,0.25)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "16px 18px 16px 0",
            color: COLOR.onEspresso,
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
              color: COLOR.onEspresso,
            }}
          >
            Powering your world with uncompromising quality. Every piece of
            technology we deliver is rigorously vetted, sealed, and guaranteed to
            elevate your daily experience.
          </p>
        </div>
      </div>
    </div>
  );
}
