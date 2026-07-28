"use client";

import { useEffect, type RefObject } from "react";

/**
 * The signature grey → black per-character scroll reveal. Ported from
 * `setupReveal(ref)`.
 *
 * Listens on window + document (capture) AND keeps a rAF poll: window scroll
 * alone does not fire reliably in every embedding. Keep all three.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const start = vh * 0.96,
        end = vh * -0.08;
      let p = (start - rect.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      const spans = el.children;
      const n = spans.length;
      const active = Math.round(p * n);
      for (let i = 0; i < n; i++) {
        (spans[i] as HTMLElement).style.color = i < active ? "#121212" : "#cfcfcf";
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
  }, [ref]);
}
