"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import content from "@/content/home.json";

const POOL = content.hero.wordPool;

const DWELL_MS = 2300;
const COVER_MS = 360;
const HOLD_COVERED_MS = 110;
const COLLAPSE_MS = 340;

const ARIA_LABEL = content.hero.ariaLabel;

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function HeroHeadlineV2() {
  const [index, setIndex] = useState(0);

  const [widths, setWidths] = useState<number[] | null>(null);

  const slotRef = useRef<HTMLSpanElement | null>(null);
  const wipeRef = useRef<HTMLSpanElement | null>(null);
  const sizerRefs = useRef<(HTMLElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const measure = useCallback(() => {
    const els = sizerRefs.current;
    if (els.length !== POOL.length || els.some((el) => !el)) return;
    const w = els.map((el) => el!.getBoundingClientRect().width);
    setWidths((prev) =>
      prev && prev.length === w.length && prev.every((v, i) => v === w[i])
        ? prev
        : w,
    );
  }, []);

  useIsoLayoutEffect(measure, [measure]);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(slot);
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [measure]);

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [awake, setAwake] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setAwake(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0 },
    );
    io.observe(slot);
    return () => io.disconnect();
  }, []);

  const gateOn = inView && awake;

  useEffect(() => {
    if (!reduced) return;
    timelineRef.current?.kill();
    timelineRef.current = null;
    if (wipeRef.current) {
      gsap.set(wipeRef.current, { scaleX: 0, transformOrigin: "left center" });
    }
  }, [reduced]);

  useEffect(() => {
    if (!gateOn) return;
    const next = (index + 1) % POOL.length;
    const id = window.setTimeout(() => {
      if (reduced || !widths) {
        setIndex(next);
        return;
      }

      const wipe = wipeRef.current;
      if (!wipe) return;

      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.set(wipe, {
        width: widths[index],
        scaleX: 0,
        transformOrigin: "left center",
      })
        .to(wipe, { scaleX: 1, duration: COVER_MS / 1000, ease: "power2.out" })
        .call(() => setIndex(next))
        .set(wipe, { width: widths[next], transformOrigin: "right center" })
        .to(wipe, {
          scaleX: 0,
          duration: COLLAPSE_MS / 1000,
          ease: "power2.in",
          delay: HOLD_COVERED_MS / 1000,
        });
    }, DWELL_MS);
    return () => window.clearTimeout(id);
  }, [gateOn, reduced, widths, index]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  return (
    <h1 className="v2-hero-h1" aria-label={ARIA_LABEL}>
      <span aria-hidden="true" className="v2-hero-line">
        Powering your{" "}
        <span className="v2-hero-slot" ref={slotRef}>
          {POOL.map((w, i) => (
            <span
              key={w}
              ref={(el) => {
                sizerRefs.current[i] = el;
              }}
              className="v2-hero-sizer"
            >
              {w}
            </span>
          ))}

          <span className="v2-hero-word">{POOL[index]}</span>

          <span className="v2-hero-wipe" ref={wipeRef} aria-hidden="true" />
        </span>
      </span>

      <span aria-hidden="true" className="v2-hero-line">
        with tech that&rsquo;s vetted,
      </span>
      <span aria-hidden="true" className="v2-hero-line">
        sealed and guaranteed.
      </span>
    </h1>
  );
}
