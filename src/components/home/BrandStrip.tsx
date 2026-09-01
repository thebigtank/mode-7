"use client";

import { useRef } from "react";
import { AsteriskMark } from "@/components/Icons";
import { Annotation } from "@/components/wireframe/Primitives";
import { useBrandBlur } from "@/hooks/useBrandBlur";
import { logos } from "@/lib/content";
import { COLOR, FONT, containerPad } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

/**
 * Brand strip. Asterisk mark + caption pinned LEFT; the logos scroll in from the
 * SITE CONTAINER's right edge (not the viewport edge) on an infinite marquee.
 *
 * Each logo blurs + fades individually as it exits and blurs back in as it
 * enters — see `useBrandBlur`. The list is duplicated once and the track
 * translates -50%, which is what makes the loop seamless.
 */
export function BrandStrip() {
  const ref = useRef<HTMLDivElement>(null);
  useBrandBlur(ref);

  const row = (keyPrefix: string) =>
    logos.map((l) => (
      <div
        key={`${keyPrefix}-${l.name}`}
        data-logo="1"
        style={{
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 158,
          height: 48,
          opacity: 0,
          filter: "grayscale(1) blur(9px)",
        }}
      >
        {/* plain <img>: these are tiny static marks and the marquee needs no
            layout-shifting wrapper */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={l.src}
          alt={l.name}
          style={{
            maxHeight: 26,
            maxWidth: 118,
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    ));

  return (
    <section
      style={{
        position: "relative",
        padding: "30px 0",
        marginTop: 0,
        background: COLOR.cream,
      }}
    >
      {/* The caption is `flex: 0 0 auto`, so on a narrow screen it claimed the
          entire row and left the marquee about a pixel wide. Below 760px the
          two stack instead: caption on its own line, marquee full-bleed under
          it. See .m7-brandstrip in globals.css. */}
      <div
        className="m7-brandstrip"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          paddingRight: containerPad(),
        }}
      >
        {/* caption pinned on the left */}
        <div
          className="m7-brandstrip__cap"
          style={{
            position: "relative",
            zIndex: 2,
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            gap: 16,
            paddingLeft: containerPad(),
            paddingRight: 44,
            /* opaque mask so the marquee logos scroll BEHIND the caption rather
               than through it — it must track the section ground exactly, or it
               reads as a lighter patch sitting on top of the strip */
            background: COLOR.cream,
          }}
        >
          <AsteriskMark size={22} />
          <div
            className="m7-brandstrip__text"
            style={{
              fontFamily: FONT.body,
              fontWeight: 600,
              /* sized to hold one line at 360px — it read as a two-line block
                 stacked above the marquee, which fought the strip's rhythm */
              fontSize: "clamp(10px, 3vw, 15px)",
              lineHeight: 1.35,
              letterSpacing: "0.2px",
              color: COLOR.ink,
              textTransform: "uppercase",
              maxWidth: 255,
            }}
          >
            We deal only in the world&apos;s finest premium brands.
          </div>
        </div>

        <div
          ref={ref}
          className="m7-brandstrip__track"
          style={{ flex: 1, minWidth: 0, overflow: "hidden" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              width: "max-content",
              animation: "m7marL 32s linear infinite",
            }}
          >
            {row("a")}
            {row("b")}
          </div>
        </div>
      </div>

      {WIREFRAME.showAnnotations && (
        <div style={{ position: "absolute", top: 8, right: 14 }}>
          <Annotation style={{ fontSize: 10, padding: "6px 13px", background: COLOR.card }}>
            SEAMLESS INFINITE SCROLL LOOP
          </Annotation>
        </div>
      )}
    </section>
  );
}
