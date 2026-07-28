"use client";

import { useState } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { ArrowRightIcon } from "@/components/Icons";
import { Annotation, Overline, SectionHeading } from "@/components/wireframe/Primitives";
import { pillars } from "@/lib/content";
import { FONT, stripeDark } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

/**
 * Ecosystem pillars. Interactive vertical list on the LEFT (arrow icons, not
 * numbers — the copy is kept uniform so every row is exactly the same height)
 * and a two-panel "video wall" on the RIGHT.
 *
 * The two panels are separate elements with a 14px bezel gap, but they show ONE
 * video: each panel's dark striped content layer is sized to the full pair and
 * offset so the image continues seamlessly across the gap, like two monitors
 * driving a single picture. All three gaps are 14px to match the text-card gaps.
 */
export function Ecosystem() {
  const [active, setActive] = useState(0);

  /**
   * One video spanning two framed panels: each panel clips it, and panel two
   * offsets its copy left so the halves line up. On mobile there is only one
   * panel, so .m7-eco-video resets it to a normal full-width layer.
   */
  const videoLayer = (offsetLeft: boolean) => (
    <div
      className="m7-eco-video"
      style={{
        position: "absolute",
        top: 0,
        left: offsetLeft ? "calc(-100% - 14px)" : 0,
        height: "100%",
        width: "calc(200% + 14px)",
        background: stripeDark(),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          border: "1.5px solid #6f6f6f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#8a8a8a",
          fontSize: 26,
          paddingLeft: 5,
        }}
      >
        ▶
      </div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 11,
          letterSpacing: 1,
          color: "#7a7a7a",
        }}
      >
        ▣ ONE ECOSYSTEM VIDEO
      </div>
    </div>
  );

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
            alignItems: "flex-start",
            gap: 40,
            marginBottom: 54,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <Overline>The Ecosystem</Overline>
            <SectionHeading style={{ marginBottom: 24 }}>
              A fully integrated technology lifecycle.
            </SectionHeading>
            <ArrowButton
              label="Explore Our Ecosystem"
              variant="fill"
              href="/services"
            />
          </div>
          <div style={{ maxWidth: 340 }}>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#5a5a5a", margin: 0 }}>
              From the moment you buy to the day you upgrade, every part of the Mode
              7 ecosystem works together.
            </p>
          </div>
        </div>

        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.45fr)",
            gap: 14,
            alignItems: "stretch",
          }}
        >
          {/* interactive list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              justifyContent: "center",
            }}
          >
            {pillars.map((p, i) => {
              const on = i === active;
              return (
                <div
                  key={p.title}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex",
                    gap: 18,
                    alignItems: "flex-start",
                    padding: "24px 26px",
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "all .2s",
                    background: on ? "#121212" : "#ffffff",
                    border: on ? "1px solid #121212" : "1px solid #e4e4e4",
                    color: on ? "#ffffff" : "#121212",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      display: "inline-flex",
                      paddingTop: 2,
                      color: on ? "rgba(255,255,255,0.5)" : "#c2c2c2",
                    }}
                  >
                    <ArrowRightIcon size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: FONT.head,
                        fontWeight: 600,
                        fontSize: 20,
                        marginBottom: 7,
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: on ? "rgba(255,255,255,0.62)" : "#8a8a8a",
                      }}
                    >
                      {p.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* two panels, one video — a single full panel on mobile */}
          <div
            className="m7-eco-panels"
            style={{
              position: "relative",
              display: "flex",
              gap: 14,
              alignItems: "stretch",
            }}
          >
            <div
              className="m7-eco-panel"
              style={{
                position: "relative",
                flex: 1,
                overflow: "hidden",
                borderRadius: 4,
                border: "1px solid #2a2a2a",
              }}
            >
              {videoLayer(false)}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 18,
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  letterSpacing: 1,
                  color: "#6f6f6f",
                }}
              >
                ▣ PANEL 1
              </div>
            </div>
            <div
              className="m7-eco-panel"
              style={{
                position: "relative",
                flex: 1,
                overflow: "hidden",
                borderRadius: 4,
                border: "1px solid #2a2a2a",
              }}
            >
              {videoLayer(true)}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  letterSpacing: 1,
                  color: "#6f6f6f",
                }}
              >
                PANEL 2 ▣
              </div>
            </div>

            {WIREFRAME.showAnnotations && (
              <Annotation
                dark
                style={{
                  position: "absolute",
                  bottom: 18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 10,
                  padding: "6px 13px",
                  background: "rgba(18,18,18,.6)",
                }}
              >
                SINGLE VIDEO SPLIT ACROSS TWO PANELS
              </Annotation>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
