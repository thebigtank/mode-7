"use client";

import { useEffect, type RefObject } from "react";

export function useHeaderHide(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const scrollTop = () =>
      (document.scrollingElement || document.documentElement).scrollTop;

    let last = scrollTop();
    let hidden = false;

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const y = scrollTop();
      if (y < 80) {
        if (hidden) {
          el.style.transform = "translateY(0)";
          hidden = false;
        }
        last = y;
      } else if (y > last + 4) {
        if (!hidden) {
          el.style.transform = "translateY(-100%)";
          hidden = true;
        }
        last = y;
      } else if (y < last - 4) {
        if (hidden) {
          el.style.transform = "translateY(0)";
          hidden = false;
        }
        last = y;
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("scroll", update, { passive: true, capture: true });

    let raf = 0;
    const poll = () => {
      update();
      raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);

    return () => {
      window.removeEventListener("scroll", update);
      document.removeEventListener("scroll", update, true);
      cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
}
