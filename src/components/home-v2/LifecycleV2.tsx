import { pillars } from "@/lib/content";
import { V2, V2_FONT, V2_HAIR, V2_TYPE } from "@/lib/theme-v2";
import { Band } from "./Ui";

/**
 * Section 3 — the reference's centred index: a two-line display heading, a
 * segmented pill beneath it, then a ruled list of rows, each a right-aligned
 * mono label, a ringed marker, and a serif statement.
 *
 * Measured against `03-lifecycle.png` at 1440: heading capped near 760px and
 * centred, the segment control 69px below it, the list inset to 912px (not the
 * full 1280 container) and centred, rows on a 94px rhythm with hairlines
 * between, mono labels right-aligned against a 44px marker.
 *
 * Mode 7 content: the heading is `Ecosystem.tsx`'s "A fully integrated
 * technology lifecycle."; the four rows are the `pillars` array — `title` as
 * the mono label, `sub` as the statement. The two segments are presentational
 * only: they mirror the reference's toggle shape, carry no state and are not
 * interactive controls, so they are marked `aria-hidden`.
 *
 * The reference marks each row with a ✕ because its list is a list of
 * problems. Mode 7's four rows are capabilities, so the marker is a check —
 * the shape is kept, the meaning is not inverted.
 */
export function LifecycleV2() {
  return (
    <Band ground={V2.wash} pad="clamp(64px,6.7vw,96px)" padBottom="clamp(64px,6.3vw,90px)">
      <h2
        style={{
          margin: "0 auto",
          maxWidth: 760,
          textAlign: "center",
          fontFamily: V2_FONT.display,
          fontWeight: 400,
          fontSize: "clamp(30px,3.1vw,40px)",
          lineHeight: 1.2,
          letterSpacing: V2_TYPE.h2.letterSpacing,
          color: V2.ink,
        }}
      >
        A fully integrated technology lifecycle.
      </h2>

      {/* segmented control — decorative, mirrors the reference's toggle */}
      <div
        aria-hidden
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "clamp(40px,4.8vw,69px) 0 clamp(32px,3.8vw,54px)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: 4,
            borderRadius: 999,
            border: "1px solid rgba(23,29,29,0.22)",
          }}
        >
          <span
            style={{
              padding: "9px 20px",
              borderRadius: 999,
              background: V2.ink,
              color: V2.white,
              fontFamily: V2_FONT.mono,
              fontSize: V2_TYPE.mono.fontSize,
              letterSpacing: V2_TYPE.mono.letterSpacing,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            The ecosystem
          </span>
          <span
            style={{
              padding: "9px 20px",
              borderRadius: 999,
              color: V2.muted,
              fontFamily: V2_FONT.mono,
              fontSize: V2_TYPE.mono.fontSize,
              letterSpacing: V2_TYPE.mono.letterSpacing,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            The Mode 7 way
          </span>
        </div>
      </div>

      {/* the list is inset from the container, not full-bleed to it */}
      <div style={{ maxWidth: 912, margin: "0 auto", borderTop: V2_HAIR }}>
        {pillars.map((p) => (
          <div
            key={p.title}
            className="v2-life-row"
            style={{ minHeight: 94, padding: "18px 0", borderBottom: V2_HAIR }}
          >
            <div
              className="v2-life-label"
              style={{
                textAlign: "right",
                fontFamily: V2_FONT.mono,
                fontSize: V2_TYPE.mono.fontSize,
                letterSpacing: V2_TYPE.mono.letterSpacing,
                textTransform: "uppercase",
                color: V2.ink,
              }}
            >
              {p.title}
            </div>

            <span
              aria-hidden
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(23,29,29,0.3)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 auto",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 9.4 7.3 12.6 14 5.8"
                  stroke={V2.ink}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div
              style={{
                fontFamily: V2_FONT.display,
                fontWeight: 400,
                fontSize: "clamp(20px,1.9vw,24px)",
                lineHeight: 1.3,
                letterSpacing: "-0.2px",
                color: V2.muted,
              }}
            >
              {p.sub}
            </div>
          </div>
        ))}
      </div>
    </Band>
  );
}
