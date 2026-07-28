"use client";

import { useRef } from "react";
import { useFooterWordmark } from "@/hooks/useFooterWordmark";
import { legalLinks } from "@/lib/content";
import { FONT, containerPad } from "@/lib/theme";

/**
 * The sticky-reveal layer that lives BEHIND the page (z-0, fixed to the bottom).
 * All page content sits in an opaque white wrapper that slides up over this, and
 * a 20vw-ish spacer after the wrapper uncovers it at full scroll.
 *
 * The wordmark is two stacked layers: a blur(13px) base plus a sharp copy masked
 * by a small radial spotlight that follows the cursor.
 */
export function RevealWordmark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  useFooterWordmark(wrapRef, spotlightRef);

  const wordmarkStyle = {
    textAlign: "center" as const,
    whiteSpace: "nowrap" as const,
    fontFamily: FONT.body,
    fontWeight: 700,
    fontSize: "22vw",
    lineHeight: 0.78,
    letterSpacing: "-0.04em",
    color: "#121212",
  };

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      {/* Hidden below 900px — the footer states the wordmark directly there
          instead. The legal row underneath stays on every size. */}
      <div
        className="m7-reveal-mark"
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          lineHeight: 0,
          paddingTop: 34,
          paddingBottom: 42,
        }}
      >
        <div
          ref={wrapRef}
          style={{
            position: "relative",
            display: "inline-block",
            willChange: "transform",
            pointerEvents: "auto",
            cursor: "default",
          }}
        >
          <div style={{ ...wordmarkStyle, filter: "blur(13px)" }}>MODE&nbsp;7</div>
          <div
            ref={spotlightRef}
            style={{
              ...wordmarkStyle,
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              WebkitMaskImage:
                "radial-gradient(circle 18vw at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)",
              maskImage:
                "radial-gradient(circle 18vw at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)",
            }}
          >
            MODE&nbsp;7
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
          padding: `26px ${containerPad(38)} 22px`,
          borderTop: "1px solid #e4e4e4",
          pointerEvents: "auto",
        }}
      >
        <div style={{ fontSize: 13, color: "#8a8a8a" }}>
          © 2026 Mode 7. Powering homes and pockets.
        </div>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {legalLinks.map((l) => (
            <span
              key={l}
              className="m7-muted-link"
              style={{ fontSize: 13, color: "#6a6a6a", cursor: "pointer" }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
