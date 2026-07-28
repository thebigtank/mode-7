"use client";

import { useEffect } from "react";

/**
 * Entrance reveals for the About page. Mounts once and observes every
 * `[data-rv]` element inside `.about-page`, adding `.in` as each scrolls into
 * view — with a small per-sibling stagger so grouped items cascade rather than
 * pop together. Honours `prefers-reduced-motion` by revealing everything up
 * front. The fade/translate itself lives in globals.css.
 */
export function RevealController() {
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".about-page [data-rv]"),
    );
    if (!items.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.target as HTMLElement;
          const sibs = Array.from(t.parentElement?.children ?? []).filter(
            (n) => n instanceof HTMLElement && n.hasAttribute("data-rv"),
          );
          const i = Math.max(0, sibs.indexOf(t));
          t.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
          t.classList.add("in");
          io.unobserve(t);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
