"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities } from "@/lib/content";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { ButtonV2 } from "./ButtonV2";
import { Band, H2, Mono, P } from "./Ui";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 7 — "What we do". Rebuilt as a STICKY STACKED-CARD SHOWCASE, using
 * the same mechanics as v1's `home/Capabilities.tsx` (read, reproduced, not
 * imported) and repainted entirely from the `V2` palette. Nothing here imports
 * `@/lib/theme`; no v1 component is touched.
 *
 * Mechanics, identical to v1:
 *   - three normal-flow wrappers, each `position: sticky` at an increasing
 *     offset, so each wrapper's own height is exactly the scroll travel its
 *     card gets before the next pins over it. No spacers, no pinning, and no
 *     `scrollerProxy` — Lenis drives native scroll and fires real scroll
 *     events, so ScrollTrigger reads the page directly.
 *   - a scrubbed shrink/dim on every covered card, triggered on the NEXT
 *     card's wrapper travelling from `top bottom` to `top top`.
 *   - a one-shot stagger revealing each card's five `[data-rv]` elements in
 *     order: label -> title -> copy -> cta -> footnote.
 * Both live in one `gsap.context(..., section)` reverted on cleanup, with a
 * `ScrollTrigger.refresh()` immediately and again on `window` load once fonts
 * and images have settled.
 *
 * Under `prefers-reduced-motion: reduce` NEITHER animation is created: cards
 * render at full scale and brightness with content visible. Content is authored
 * VISIBLE and hidden by `gsap.from`, so a JS failure leaves a readable stack
 * rather than three blank cards. The sticky stacking is pure CSS and stays.
 */

/**
 * Card imagery, keyed by the card's title — a lookup rather than a parallel
 * array so reordering `capabilities` cannot mismatch a picture to a card.
 * Same three files the previous case-study rows used.
 */
const CAPABILITY_IMAGE: Record<string, string> = {
  "The Trade-In & Upgrade Portal": "/hero/cap-tradein.webp",
  "WhatsApp Concierge Checkout": "/hero/cap-chat.webp",
  "Smart Home & Solar Installs": "/hero/cap-solar.webp",
};

/** Each card's own route, in `capabilities` order. */
const HREFS = ["/trade-in", "/contact", "/services"];

/**
 * Sticky offsets, one per card, increasing.
 *
 * DERIVED, not carried over from v1 — v1's 92/110/128 were sized against a
 * 77px header. v2's floating nav panel is 88px tall and, since it gained its
 * 14px float gap, parks at y=14 when stuck, so its bottom edge sits at 102.
 * 88 (nav) + 14 (gap) + 10 (breathing margin) = 112, and the same +18px steps
 * v1 used give 112 / 130 / 148. The steps are what make the deck fan: each
 * pinned card parks a little lower than the one beneath it, so the stack reads
 * as a deck rather than one card replacing another in place.
 */
const STICKY = [112, 130, 148] as const;

/**
 * The scrims, alpha over `V2.ink` (#171D1D = rgb(23,29,29)) — NOT v1's
 * espresso. The left one carries the text column, the bottom one keeps the
 * full-width bullet footer legible over the bright right side of each photo.
 */
const LEFT_SCRIM =
  "linear-gradient(90deg, rgba(23,29,29,0.92) 0%, rgba(23,29,29,0.86) 34%, rgba(23,29,29,0.55) 62%, rgba(23,29,29,0.12) 88%, rgba(23,29,29,0) 100%)";
const BOTTOM_SCRIM =
  "linear-gradient(180deg, rgba(23,29,29,0) 0%, rgba(23,29,29,0.55) 45%, rgba(23,29,29,0.90) 100%)";

/**
 * SSR-safe media query. `getServerSnapshot` returns false so hydration never
 * mismatches; the store re-checks on the client right after mount and again on
 * change, and the GSAP effect re-runs when the result flips. Local by design —
 * v1's copy lives inside `home/Capabilities.tsx` and is not exported, and v2
 * must not reach into a v1 module for it.
 */
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

        // A. Stacking scrub — every card but the last gets covered, so it
        // recedes while its successor climbs into place.
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

        // B. Staggered content reveal, once, as the card enters.
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

    // Re-measure once late-loading fonts/images have settled.
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
                  /* base ground, so nothing flashes wash before the image
                     paints — ink, not v1's espresso */
                  background: V2.ink,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* 1 — image */}
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
                {/* 2 — left text scrim */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: LEFT_SCRIM,
                    pointerEvents: "none",
                  }}
                />
                {/* 3 — bottom scrim, so the full-width bullet footer stays
                       legible over the bright right side of the picture */}
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
                {/* 4 — ghosted numeral */}
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

                {/* 5 — content column. A flex child in normal flow rather than
                       absolutely positioned, so it can never run underneath the
                       footer at any width; `position: relative` lifts it above
                       the absolutely-positioned image and scrim layers. */}
                <div
                  className="v2-stack__body"
                  style={{
                    position: "relative",
                    flex: "1 1 auto",
                    minHeight: 0,
                    /* max-width lives in `.v2-stack__body`, not here: the
                       760px rule widens it to the full card, and an inline
                       value would out-specify it. */
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
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      /* faint is 7.75:1 on ink */
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
                  {/* `outline` + `onDark`, not `fill`: a gold block on every
                      card would put three saturated grounds down the stack and
                      out-shout the photography that IS the section. The white
                      hairline + white label reads as the secondary it is, and
                      white-on-ink under the scrim is 17.07:1. */}
                  <div data-rv="cta">
                    <ButtonV2
                      label={c.cta}
                      href={HREFS[i]}
                      variant="outline"
                      onDark
                    />
                  </div>
                </div>

                {/* 6 — bullet footer, full card width under the content column */}
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
                        letterSpacing: ".08em",
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
