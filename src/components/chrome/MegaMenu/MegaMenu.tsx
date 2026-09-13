"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRightIcon, socials } from "@/components/Icons";
import { useMenuDots } from "@/hooks/useMenuDots";
import { legalLinks, menuItems } from "@/lib/content";
import { COLOR, FONT, containerPad, stripe } from "@/lib/theme";

export function MegaMenu({
  closing,
  onClose,
}: {
  closing: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);
  useMenuDots();

  const active = hover || "About Us";

  const backdropAnim = closing
    ? "m7menuOut .35s ease both"
    : "m7menuIn .3s ease both";
  const curtainBlackAnim = closing
    ? "m7curtainUp .5s cubic-bezier(.7,0,.84,0) .12s both"
    : "m7curtainDown .85s cubic-bezier(.16,1,.3,1) both";
  const curtainWhiteAnim = closing
    ? "m7curtainUp .5s cubic-bezier(.7,0,.84,0) both"
    : "m7curtainDown .85s cubic-bezier(.16,1,.3,1) .18s both";
  const blurIn = (delay: string) =>
    closing
      ? "m7blurfadeOut .3s ease both"
      : `m7blurfade .85s cubic-bezier(.16,1,.3,1) ${delay} both`;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 180,
          background: "rgba(28,21,15,0.04)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          animation: backdropAnim,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100dvh",
          zIndex: 199,
          background: COLOR.rust,
          animation: curtainBlackAnim,
        }}
      />
      <div
        data-lenis-prevent
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100dvh",
          zIndex: 200,
          background: COLOR.card,
          color: COLOR.ink,
          fontFamily: FONT.body,
          paddingTop: 75,
          overflowX: "hidden",
          overflowY: "auto",
          animation: curtainWhiteAnim,
        }}
      >
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 1fr",
            minHeight: "calc(100dvh - 75px)",
          }}
        >
          <div
            onMouseLeave={() => setHover(null)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              minHeight: 0,
            }}
          >
            {menuItems.map((it, i) => {
              const last = i === menuItems.length - 1;
              const v = Math.round(255 * (1 - (0.04 + i * 0.045)));
              const isActive = active === it.label;
              return (
                <div
                  key={it.label}
                  style={{
                    opacity: 0,
                    flex: last ? "1 1 auto" : "0 0 auto",
                    animation: closing
                      ? "m7menuRowOut .3s ease both"
                      : "m7menuRow .72s cubic-bezier(.22,1,.36,1) both",
                    animationDelay: closing
                      ? `${(i * 0.04).toFixed(2)}s`
                      : `${(0.5 + i * 0.13).toFixed(2)}s`,
                  }}
                >
                  <div
                    onMouseEnter={() => setHover(it.label)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => {
                      onClose();
                      router.push(it.href);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      width: "100%",
                      height: last ? "100%" : "auto",
                      padding: `${i === 0 ? 80 : 17}px 30px 17px ${containerPad()}`,
                      background: `rgb(${v},${v},${v})`,
                      cursor: "pointer",
                      transition: "background .25s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        opacity: isActive ? 1 : 0.32,
                        transition:
                          "opacity .55s cubic-bezier(.22,1,.36,1)",
                      }}
                    >
                      <div
                        style={{ display: "flex", alignItems: "baseline", gap: 11 }}
                      >
                        <span
                          style={{
                            fontFamily: FONT.head,
                            fontWeight: 600,
                            fontSize: "clamp(28px,3.4vw,46px)",
                            letterSpacing: "-2px",
                            lineHeight: 1.04,
                          }}
                        >
                          {it.label}
                        </span>
                      </div>
                      <ArrowRightIcon
                        size={26}
                        strokeWidth={1.9}
                        stroke={COLOR.ink}
                        style={{
                          flex: "0 0 auto",
                          transition: "transform .3s cubic-bezier(.16,1,.3,1)",
                          transform:
                            hover === it.label ? "rotate(0deg)" : "rotate(-45deg)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="m7-menu-aside"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              padding: `50px ${containerPad()} 44px 52px`,
              borderLeft: "1px solid rgba(28,21,15,0.1)",
            }}
          >
            <canvas
              data-menudot
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                flex: "0 0 auto",
                height: 460,
                maxHeight: 460,
                borderRadius: 6,
                overflow: "hidden",
                background: stripe(),
                border: `1px solid ${COLOR.lineStrong}`,
                animation: blurIn("2.15s"),
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: 16,
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  letterSpacing: 1,
                  color: COLOR.muted,
                }}
              >
                ▣ {hover || "Mode 7"}
              </div>
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: FONT.body,
                fontSize: 20,
                lineHeight: 1.6,
                color: COLOR.body,
                margin: "26px 0 0",
                animation: blurIn("2.46s"),
              }}
            >
              A complete technology hub — premium devices, smart-home automation,
              solar energy and a certified repair division. Every unit vetted, sealed
              and guaranteed.
            </div>
            <div
              style={{ position: "relative", zIndex: 1, marginTop: "auto", paddingTop: 48 }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 24,
                  color: COLOR.ink,
                  animation: blurIn("2.72s"),
                }}
              >
                {socials.map((s) => (
                  <span
                    key={s.name}
                    className="m7-social"
                    aria-label={s.name}
                    style={{
                      display: "inline-flex",
                      width: 40,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1px solid ${COLOR.lineStrong}`,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    {s.icon}
                  </span>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 26,
                  flexWrap: "wrap",
                  animation: blurIn("2.94s"),
                }}
              >
                {legalLinks.map((l) => (
                  <span
                    key={l}
                    className="m7-muted-link"
                    style={{ fontSize: 14, color: COLOR.body, cursor: "pointer" }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
