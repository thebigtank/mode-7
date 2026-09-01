"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowButton } from "@/components/ArrowButton";
import { Overline, SectionHeading } from "@/components/wireframe/Primitives";
import { capabilities } from "@/lib/content";
import { COLOR, FONT } from "@/lib/theme";

gsap.registerPlugin(ScrollTrigger);

/**
 * Card imagery, keyed by the card's title. All CC0 — see
 * public/hero/CREDITS.md. A lookup rather than a parallel array so a reordering
 * of `capabilities` cannot silently mismatch a picture to a card.
 */
const CAPABILITY_IMAGE: Record<string, string> = {
  "The Trade-In & Upgrade Portal": "/hero/cap-tradein.webp",
  "WhatsApp Concierge Checkout": "/hero/cap-chat.webp",
  "Smart Home & Solar Installs": "/hero/cap-solar.webp",
};

/**
 * Sticky offsets, one per card, increasing. The site header is 77px tall and
 * sticky at top:0, so 92px clears it with room to spare; the +18px steps are
 * what make the deck fan slightly as it stacks — each pinned card parks a
 * little lower than the one beneath it, so the stack reads as a deck of cards
 * rather than one card replacing another in place.
 */
const STICKY = [92, 110, 128] as const;

/** rgba(espresso) — the scrims and hairlines are alpha over #1C150F. */
const LEFT_SCRIM =
  "linear-gradient(90deg, rgba(28,21,15,0.92) 0%, rgba(28,21,15,0.86) 34%, rgba(28,21,15,0.55) 62%, rgba(28,21,15,0.12) 88%, rgba(28,21,15,0) 100%)";
const BOTTOM_SCRIM =
  "linear-gradient(180deg, rgba(28,21,15,0) 0%, rgba(28,21,15,0.55) 45%, rgba(28,21,15,0.90) 100%)";

/**
 * SSR-safe media query. `getServerSnapshot` returns false so hydration never
 * mismatches; the store re-checks on the client right after mount and again on
 * change, and the GSAP effect re-runs when the result flips. Local by design —
 * `EnergyScrolly` carries its own copy and there is no shared hook to import.
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

/**
 * Featured Capabilities — a sticky stacked-card showcase.
 *
 * Each card lives in a normal-flow `.m7-stack__wrap` that is `position: sticky`
 * at an increasing offset, so the wrapper's own height (one card) is exactly
 * the scroll travel a card gets before its successor pins over it. No spacers,
 * no pinning, no scroller proxy — Lenis drives native scroll and fires real
 * scroll events, so ScrollTrigger reads the page directly.
 *
 * Two GSAP behaviours sit on top of that CSS stack:
 *  A. a scrub that shrinks and dims each card as its successor travels from the
 *     bottom of the viewport up to its pinned position, and
 *  B. a one-shot stagger that reveals each card's five `[data-rv]` elements
 *     (label → title → copy → cta → footnote) as the card enters.
 * Both are skipped wholesale under `prefers-reduced-motion`; the stack itself
 * is pure CSS and involves no motion beyond ordinary scrolling, so it stays.
 * Content is authored VISIBLE and hidden by `gsap.from`, so a JS failure leaves
 * a plain, readable stack rather than three blank cards.
 */
export function Capabilities() {
  const sectionRef = useRef<HTMLElement | null>(null);
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
    <section
      ref={sectionRef}
      style={{
        background: COLOR.cream,
        borderTop: `1px solid ${COLOR.line}`,
        borderBottom: `1px solid ${COLOR.line}`,
        padding: "100px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 48px 40px",
          textAlign: "center",
        }}
      >
        <Overline>Featured Capabilities</Overline>
        <SectionHeading style={{ margin: "0 auto", maxWidth: 680 }}>
          Built around you, from first tap to upgrade.
        </SectionHeading>
      </div>

      <div
        className="m7-stack"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 var(--m7-pad)",
        }}
      >
        {capabilities.map((p, i) => (
          <div
            key={p.title}
            className="m7-stack__wrap"
            ref={(el) => {
              wrapRefs.current[i] = el;
            }}
            style={{ position: "sticky", top: STICKY[i] }}
          >
            <article
              className="m7-stack__card"
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{
                position: "relative",
                height: "clamp(520px, 76vh, 720px)",
                borderRadius: 4,
                overflow: "hidden",
                transformOrigin: "center top",
                willChange: "transform",
                // base ground so nothing flashes cream before the image paints
                background: COLOR.espresso,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* 1 — image */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${CAPABILITY_IMAGE[p.title] ?? ""})`,
                  backgroundSize: "cover",
                  // the photos put their subject right-of-centre deliberately
                  backgroundPosition: "center",
                }}
              />
              {/* 2 — left text scrim */}
              <div
                aria-hidden="true"
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
                aria-hidden="true"
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
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "clamp(8px, 2vw, 24px)",
                  right: "clamp(16px, 3vw, 48px)",
                  fontFamily: FONT.head,
                  fontSize: "clamp(160px, 26vw, 380px)",
                  fontWeight: 600,
                  lineHeight: 0.78,
                  letterSpacing: "-0.05em",
                  color: "rgba(239,230,209,0.10)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {`0${i + 1}`}
              </div>

              {/* 5 — content column. In normal flow (flex child) rather than
                     absolutely positioned, so it can never run underneath the
                     footer at any width; `position: relative` lifts it above
                     the absolutely-positioned image and scrim layers. */}
              <div
                style={{
                  position: "relative",
                  flex: "1 1 auto",
                  minHeight: 0,
                  maxWidth: "min(560px, 52%)",
                  padding: "clamp(28px, 4vw, 56px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  data-rv="label"
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: COLOR.onEspressoMuted,
                    marginBottom: 18,
                  }}
                >
                  {`Capability 0${i + 1} — 03`}
                </div>
                <h3
                  data-rv="title"
                  style={{
                    fontFamily: FONT.head,
                    fontSize: "clamp(28px, 3.4vw, 46px)",
                    fontWeight: 600,
                    lineHeight: 1.04,
                    letterSpacing: "-0.03em",
                    color: COLOR.onEspresso,
                    margin: "0 0 16px",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  data-rv="copy"
                  style={{
                    fontSize: "clamp(15px, 1.2vw, 18px)",
                    lineHeight: 1.6,
                    color: COLOR.onEspresso,
                    margin: "0 0 26px",
                    maxWidth: "46ch",
                  }}
                >
                  {p.desc}
                </p>
                <div data-rv="cta">
                  <ArrowButton label={p.cta} variant="outline" />
                </div>
              </div>

              {/* 6 — bullet footer, full card width under the content column */}
              <div
                data-rv="footnote"
                className="m7-stack__foot"
                style={{
                  position: "relative",
                  flex: "0 0 auto",
                  padding:
                    "clamp(16px, 2vw, 26px) clamp(28px, 4vw, 56px)",
                  borderTop: "1px solid rgba(239,230,209,0.22)",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "clamp(12px, 2vw, 32px)",
                }}
              >
                {p.bullets.map((b) => (
                  <div
                    key={b}
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 11,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: COLOR.onEspresso,
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
    </section>
  );
}
