"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/content/home.json";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

gsap.registerPlugin(ScrollTrigger);

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
      content.capabilities.forEach((_, i) => {
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
    <Band ground="wash" className="v2-work-band">
      <div ref={sectionRef}>
        <Mono dot tone="ink">
          {content.work.label}
        </Mono>
        <H2 className="v2-work-heading">{content.work.heading}</H2>

        <div className="v2-headrow v2-work-headrow flex items-end justify-between">
          <P className="v2-work-body">{content.work.body}</P>
          <ButtonV2 label={content.work.ctaLabel} href={content.work.ctaHref} variant="ink" />
        </div>

        <div className="v2-stack">
          {content.capabilities.map((c, i) => (
            <div
              key={c.title}
              className="v2-stack__wrap"
              ref={(el) => {
                wrapRefs.current[i] = el;
              }}
              style={{ "--v2-stack-top": `${[112, 130, 148][i]}px` } as CSSProperties}
            >
              <article
                className="v2-stack__card flex flex-col"
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{ "--v2-stack-shot": `url(${c.image})` } as CSSProperties}
              >
                <div aria-hidden className="v2-stack__shot" />
                <div aria-hidden className="v2-stack__scrim-left" />
                <div aria-hidden className="v2-stack__scrim-bottom" />
                <div aria-hidden className="v2-stack__index">{`0${i + 1}`}</div>

                <div className="v2-stack__body flex flex-col justify-center">
                  <div data-rv="label" className="v2-stack__label">
                    {`Capability 0${i + 1} — 03`}
                  </div>
                  <h3 data-rv="title" className="v2-stack__title">
                    {c.title}
                  </h3>
                  <p data-rv="copy" className="v2-stack__copy">
                    {c.desc}
                  </p>
                  <div data-rv="cta">
                    <ButtonV2 label={c.cta} href={c.href} variant="outline" onDark />
                  </div>
                </div>

                <div data-rv="footnote" className="v2-stack__foot grid">
                  {c.bullets.map((b) => (
                    <div key={b} className="v2-stack__bullet">
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
