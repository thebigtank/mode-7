"use client";

import { useEffect, type RefObject } from "react";

export function useReveal(
  ref: RefObject<HTMLElement | null>,
  activeColor = "#1C150F",
  restColor = "#B99436",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.children;
    const spanCount = spans.length;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      for (let i = 0; i < spanCount; i++) {
        (spans[i] as HTMLElement).style.color = activeColor;
      }
      return;
    }

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const start = vh * 0.96,
        end = vh * -0.08;
      let p = (start - rect.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      const active = Math.round(p * spanCount);
      for (let i = 0; i < spanCount; i++) {
        (spans[i] as HTMLElement).style.color = i < active ? activeColor : restColor;
      }
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    let last = -1;
    let raf = 0;
    const poll = () => {
      const top = Math.round(el.getBoundingClientRect().top);
      if (top !== last) {
        last = top;
        update();
      }
      raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("scroll", onScroll, true);
      cancelAnimationFrame(raf);
    };
  }, [ref, activeColor, restColor]);
}
