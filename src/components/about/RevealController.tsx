"use client";

import { useEffect } from "react";

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
