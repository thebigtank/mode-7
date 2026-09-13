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
import { FONT } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

gsap.registerPlugin(ScrollTrigger);

type Para = { label?: string; text: string };
type ScrollyBlock = {
  n: string;
  title: string;
  caption: string;
  lead?: string;
  paras: Para[];
};

const BLOCKS: ScrollyBlock[] = [
  {
    n: "01",
    title: "The Power of Energy Independence",
    caption: "[Animated visual: Sun illuminating the roof]",
    paras: [
      {
        text: "Switching to solar isn't just about placing panels on a roof; it is about taking complete control of your energy consumption. By harnessing clean, renewable power directly from the sun, you drastically reduce your reliance on unpredictable utility companies, shield yourself from rising electricity rates, and significantly lower your carbon footprint.",
      },
    ],
  },
  {
    n: "02",
    title: "How the System Connects",
    caption: "[Animated visual: Energy flowing to smart inverter]",
    lead: "To truly benefit from green energy, it helps to understand how the components work together to power a home seamlessly:",
    paras: [
      {
        label: "Solar Array:",
        text: "These panels act as a personal power plant, capturing sunlight throughout the day and generating raw electricity.",
      },
      {
        label: "Smart Inverters:",
        text: "The brain of the operation. This equipment safely converts the raw solar energy into the usable alternating current (AC) electricity that household appliances require.",
      },
      {
        label: "Charge Controllers:",
        text: "Advanced Maximum Power Point Tracking (MPPT) ensures the energy moving from the panels into the storage system flows at peak efficiency, extracting the most power possible regardless of cloud cover.",
      },
    ],
  },
  {
    n: "03",
    title: "Battery Storage: Your 24/7 Power Reserve",
    caption: "[Animated visual: Power routing to battery bank]",
    lead: "Generating solar power is only half the equation. Connecting a solar array to a modern, high-capacity battery system (like reliable lithium iron phosphate technology) is what unlocks true freedom.",
    paras: [
      {
        label: "Daytime Storage:",
        text: "Excess power generated during peak sunlight hours is routed straight to the battery bank instead of being wasted.",
      },
      {
        label: "Nighttime Usage:",
        text: "When the sun goes down, the home seamlessly shifts to battery power, keeping everything running without drawing from the main grid.",
      },
      {
        label: "Outage Protection:",
        text: "Advanced battery management systems monitor reserves, ensuring homes have reliable backup power during grid failures or rolling blackouts.",
      },
    ],
  },
  {
    n: "04",
    title: "Breaking Free from the Grid",
    caption: "[Animated visual: Home fully disconnected from the grid]",
    paras: [
      {
        text: "By combining efficient solar generation with robust battery storage, users create a self-sustaining micro-grid. This setup provides immunity to grid instability and massive long-term financial savings.",
      },
    ],
  },
];

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
    <>
      <style>{`
        @keyframes m7-scrolly-caption {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .m7-scrolly-caption { animation: none !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          marginTop: "clamp(55px, 7.1vw, 100px)",
          height: stacked ? "auto" : "100vh",
          display: "flex",
          flexDirection: stacked ? "column" : "row",
          overflow: stacked ? "visible" : "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: stacked ? "0 0 auto" : "0 0 50%",
            width: stacked ? "100%" : "50%",
            height: stacked ? "clamp(300px, 52vw, 460px)" : "100%",
            minWidth: 0,
          }}
        >
          <Placeholder label="ENERGY SYSTEM" height="100%" radius={0} style={{ width: "100%" }}>
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
                IMAGE — ENERGY FLOW
              </Annotation>
            )}
            <div
              key={activeIndex}
              className="m7-scrolly-caption"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                pointerEvents: "none",
                animation: "m7-scrolly-caption .5s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              <Annotation
                style={{ fontSize: 11, maxWidth: "100%", textAlign: "center" }}
              >
                {caption}
              </Annotation>
            </div>
          </Placeholder>
        </div>

        <div
          ref={colRef}
          style={{
            flex: stacked ? "0 0 auto" : "0 0 50%",
            width: stacked ? "100%" : "50%",
            minWidth: 0,
            position: stacked ? undefined : "relative",
            height: stacked ? undefined : "100%",
            overflow: stacked ? undefined : "hidden",
            display: stacked ? "flex" : undefined,
            flexDirection: stacked ? "column" : undefined,
            justifyContent: stacked ? "flex-start" : undefined,
            padding: stacked ? "0 0 clamp(44px, 6vh, 64px)" : 0,
          }}
        >
          {BLOCKS.map((b, i) => (
            <div
              key={b.n}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              style={{
                position: stacked ? undefined : "absolute",
                inset: stacked ? undefined : 0,
                minHeight: stacked ? "auto" : undefined,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: stacked ? undefined : "hidden",
                padding: stacked
                  ? "clamp(28px, 4vh, 44px) clamp(20px, 5vw, 48px)"
                  : "clamp(40px, 6vh, 72px) clamp(20px, 5vw, 48px)",
                borderTop: stacked && i > 0 ? "1px solid #ececec" : undefined,
                opacity: stacked ? 1 : 0,
                filter: stacked || fadeOnly ? "none" : "blur(12px)",
                transform:
                  stacked || fadeOnly ? "none" : "translateY(16px)",
                willChange: stacked
                  ? undefined
                  : fadeOnly
                    ? "opacity"
                    : "filter, opacity, transform",
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  letterSpacing: 1,
                  color: "#9a9a9a",
                  marginBottom: 14,
                }}
              >
                {b.n}
              </div>
              <h3
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: "clamp(24px, 2.6vw, 34px)",
                  lineHeight: 1.06,
                  letterSpacing: "-2px",
                  margin: "0 0 16px",
                  maxWidth: 560,
                  textWrap: "balance",
                }}
              >
                {b.title}
              </h3>
              <div style={{ maxWidth: 560 }}>
                {b.lead && (
                  <p
                    style={{
                      fontSize: "var(--m7-lede-size)",
                      lineHeight: 1.6,
                      color: "#5a5a5a",
                      margin: 0,
                    }}
                  >
                    {b.lead}
                  </p>
                )}
                {b.paras.map((p, pi) => (
                  <p
                    key={pi}
                    style={{
                      fontSize: "var(--m7-lede-size)",
                      lineHeight: 1.6,
                      color: "#5a5a5a",
                      margin: pi === 0 && !b.lead ? 0 : "14px 0 0",
                    }}
                  >
                    {p.label && (
                      <span
                        style={{
                          fontFamily: FONT.head,
                          fontWeight: 600,
                          fontSize: 17,
                          letterSpacing: "-0.2px",
                          color: "#121212",
                        }}
                      >
                        {p.label}{" "}
                      </span>
                    )}
                    {p.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
