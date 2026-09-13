"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities } from "@/lib/content";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITY_IMAGE: Record<string, string> = {
  "The Trade-In & Upgrade Portal": "/hero/cap-tradein.webp",
  "WhatsApp Concierge Checkout": "/hero/cap-chat.webp",
  "Smart Home & Solar Installs": "/hero/cap-solar.webp",
};

const HREFS = ["/trade-in", "/contact", "/services"];

const STICKY = [112, 130, 148] as const;

const LEFT_SCRIM =
  "linear-gradient(90deg, rgba(23,29,29,0.92) 0%, rgba(23,29,29,0.86) 34%, rgba(23,29,29,0.55) 62%, rgba(23,29,29,0.12) 88%, rgba(23,29,29,0) 100%)";
const BOTTOM_SCRIM =
  "linear-gradient(180deg, rgba(23,29,29,0) 0%, rgba(23,29,29,0.55) 45%, rgba(23,29,29,0.90) 100%)";

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function WorkV2() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      capabilities.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;

        const next = wrapRefs.current[i + 1];
        if (next) {
          gsap.fromTo(
            card,
            { scale: 1, filter: "brightness(1)" },
            {
              scale: 0.94,
              filter: "brightness(0.62)",
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        gsap.from(card.querySelectorAll("[data-rv]"), {
          y: 18,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: card, start: "top 78%", once: true },
        });
      });
    }, section);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <Band ground={V2.wash} pad="clamp(64px,7.7vw,111px)" padBottom="clamp(64px,6.7vw,96px)">
      <div ref={sectionRef}>
        <Mono dot color={V2.ink}>
          What we do
        </Mono>
        <H2 style={{ marginTop: 24, maxWidth: 760 }}>
          Built for every part of the lifecycle.
        </H2>

        <div
          className="v2-headrow"
          style={{
            marginTop: "clamp(28px,3.4vw,49px)",
            marginBottom: "clamp(36px,3.3vw,47px)",
          }}
        >
          <P style={{ maxWidth: 560, lineHeight: "26px" }}>
            Mode 7 powers homes and pockets, curating premium hardware,
            sustainable energy and effortless upgrades under one trusted roof.
          </P>
          <ButtonV2 label="See all services" href="/services" variant="ink" />
        </div>

        <div className="v2-stack">
          {capabilities.map((c, i) => (
            <div
              key={c.title}
              className="v2-stack__wrap"
              ref={(el) => {
                wrapRefs.current[i] = el;
              }}
              style={{ position: "sticky", top: STICKY[i] }}
            >
              <article
                className="v2-stack__card"
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{
                  position: "relative",
                  height: "clamp(520px, 76vh, 720px)",
                  borderRadius: 2,
                  overflow: "hidden",
                  transformOrigin: "center top",
                  willChange: "transform",
                  background: V2.ink,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${CAPABILITY_IMAGE[c.title] ?? ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: LEFT_SCRIM,
                    pointerEvents: "none",
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "46%",
                    background: BOTTOM_SCRIM,
                    pointerEvents: "none",
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "clamp(8px, 2vw, 24px)",
                    right: "clamp(16px, 3vw, 48px)",
                    fontFamily: V2_FONT.display,
                    fontSize: "clamp(160px, 26vw, 380px)",
                    fontWeight: 400,
                    lineHeight: 0.78,
                    letterSpacing: "-0.05em",
                    color: "rgba(255,255,255,0.10)",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {`0${i + 1}`}
                </div>

                <div
                  className="v2-stack__body"
                  style={{
                    position: "relative",
                    flex: "1 1 auto",
                    minHeight: 0,
                    padding: "clamp(28px, 4vw, 56px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    data-rv="label"
                    style={{
                      fontFamily: V2_FONT.mono,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".07em",
                      textTransform: "uppercase",
                      color: V2.faint,
                      marginBottom: 18,
                    }}
                  >
                    {`Capability 0${i + 1} — 03`}
                  </div>
                  <h3
                    data-rv="title"
                    style={{
                      fontFamily: V2_FONT.display,
                      fontSize: "clamp(28px, 3.4vw, 46px)",
                      fontWeight: 400,
                      lineHeight: 1.04,
                      letterSpacing: "-0.03em",
                      color: V2.white,
                      margin: "0 0 16px",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    data-rv="copy"
                    style={{
                      fontFamily: V2_FONT.body,
                      fontWeight: 300,
                      fontSize: "clamp(15px, 1.2vw, 18px)",
                      lineHeight: 1.6,
                      color: V2.white,
                      margin: "0 0 26px",
                      maxWidth: "46ch",
                    }}
                  >
                    {c.desc}
                  </p>
                  <div data-rv="cta">
                    <ButtonV2
                      label={c.cta}
                      href={HREFS[i]}
                      variant="outline"
                      onDark
                    />
                  </div>
                </div>

                <div
                  data-rv="footnote"
                  className="v2-stack__foot"
                  style={{
                    position: "relative",
                    flex: "0 0 auto",
                    padding: "clamp(16px, 2vw, 26px) clamp(28px, 4vw, 56px)",
                    borderTop: "1px solid rgba(255,255,255,0.22)",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "clamp(12px, 2vw, 32px)",
                  }}
                >
                  {c.bullets.map((b) => (
                    <div
                      key={b}
                      style={{
                        fontFamily: V2_FONT.mono,
                        fontSize: 11,
                        letterSpacing: ".04em",
                        textTransform: "uppercase",
                        color: V2.white,
                        lineHeight: 1.4,
                      }}
                    >
                      {b}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </Band>
  );
}
