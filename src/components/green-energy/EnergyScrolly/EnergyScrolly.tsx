"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Annotation, Placeholder } from "@/components/wireframe/Primitives";
import content from "@/content/green-energy.json";
import { WIREFRAME } from "@/lib/wireframe-config";

gsap.registerPlugin(ScrollTrigger);

const BLOCKS = content.scrolly.blocks;

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

export function EnergyScrolly() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const colRef = useRef<HTMLDivElement | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const narrow = useMediaQuery("(max-width: 900px)");
  const stacked = narrow;
  const fadeOnly = reducedMotion;

  useEffect(() => {
    if (stacked) return;
    const section = sectionRef.current;
    const col = colRef.current;
    if (!section || !col) return;
    const blocks = blockRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + window.innerHeight * 3,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const fromHidden = fadeOnly
        ? { opacity: 0 }
        : { opacity: 0, filter: "blur(12px)", y: 16 };
      const ENTER_TO = fadeOnly
        ? { opacity: 1 }
        : { opacity: 1, filter: "blur(0px)", y: 0 };
      const EXIT_TO = fadeOnly
        ? { opacity: 0 }
        : { opacity: 0, filter: "blur(12px)", y: -16 };
      const inEase = fadeOnly ? "power1.out" : "power2.out";
      const outEase = fadeOnly ? "power1.in" : "power2.in";

      const WINDOWS = [
        { enter: 0, exit: 22 },
        { enter: 22, exit: 45 },
        { enter: 45, exit: 68 },
        { enter: 68, exit: 90 },
      ];

      WINDOWS.forEach((w, i) => {
        const el = blocks[i];
        if (!el) return;
        tl.fromTo(
          el,
          fromHidden,
          w.enter > 0
            ? { ...ENTER_TO, ease: inEase, duration: 10, immediateRender: false }
            : { ...ENTER_TO, ease: inEase, duration: 10 },
          w.enter,
        );
        tl.to(el, { ...EXIT_TO, ease: outEase, duration: 10 }, w.exit);
      });

      const flipCaption = (i: number) => {
        const dir = tl.scrollTrigger?.direction ?? 1;
        setActiveIndex(dir >= 0 ? i + 1 : i);
      };
      tl.call(() => flipCaption(0), [], 27);
      tl.call(() => flipCaption(1), [], 50);
      tl.call(() => flipCaption(2), [], 73);
    }, section);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
      blocks.forEach((block) =>
        gsap.set(block, { opacity: 1, clearProps: "filter,transform" }),
      );
    };
  }, [stacked, fadeOnly]);

  const caption = BLOCKS[activeIndex].caption;

  return (
    <section ref={sectionRef} className="ge-scrolly flex flex-row" data-stacked={stacked || undefined}>
      <div className="ge-scrolly__media" data-stacked={stacked || undefined}>
        <Placeholder label={content.scrolly.mediaLabel} height="100%" radius={0} style={{ width: "100%" }}>
          {WIREFRAME.showAnnotations && (
            <Annotation
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                fontSize: 10,
                padding: "6px 13px",
              }}
            >
              {content.scrolly.annotationLabel}
            </Annotation>
          )}
          <div key={activeIndex} className="ge-scrolly-caption flex items-center justify-center">
            <Annotation
              style={{ fontSize: 11, maxWidth: "100%", textAlign: "center" }}
            >
              {caption}
            </Annotation>
          </div>
        </Placeholder>
      </div>

      <div ref={colRef} className="ge-scrolly__col" data-stacked={stacked || undefined}>
        {BLOCKS.map((b, i) => (
          <div
            key={b.n}
            ref={(el) => {
              blockRefs.current[i] = el;
            }}
            className="ge-scrolly__block flex flex-col justify-center"
            data-stacked={stacked || undefined}
            data-first={i === 0 || undefined}
            style={
              stacked
                ? undefined
                : {
                    opacity: 0,
                    filter: fadeOnly ? "none" : "blur(12px)",
                    transform: fadeOnly ? "none" : "translateY(16px)",
                    willChange: fadeOnly ? "opacity" : "filter, opacity, transform",
                  }
            }
          >
            <div className="ge-scrolly__n">{b.n}</div>
            <h3 className="ge-scrolly__title">{b.title}</h3>
            <div className="ge-scrolly__body">
              {b.lead && <p className="ge-scrolly__lead">{b.lead}</p>}
              {b.paras.map((p, pi) => (
                <p
                  key={pi}
                  className="ge-scrolly__para"
                  data-first={pi === 0 && !b.lead ? true : undefined}
                >
                  {"label" in p && p.label && (
                    <span className="ge-scrolly__para-label">{p.label} </span>
                  )}
                  {p.text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
