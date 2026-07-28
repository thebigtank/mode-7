"use client";

import { useEffect, type RefObject } from "react";

/**
 * Per-logo blur/fade on the brand marquee. Ported from `setupBrandBlur()`.
 *
 * Deliberately NOT a flat mask-fade tunnel: a rAF loop tracks each
 * `[data-logo]`'s x-position inside the viewport window and applies its own
 * `grayscale(1) blur()` + opacity with a smoothstep falloff, so each logo blurs
 * out individually as it exits and blurs back in as it enters.
 */
export function useBrandBlur(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const FADE = 150,
      MAXBLUR = 10,
      FULLOP = 0.62;

    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const W = rect.width;
        el.querySelectorAll<HTMLElement>("[data-logo]").forEach((item) => {
          const r = item.getBoundingClientRect();
          const cx = r.left + r.width / 2 - rect.left;
          let t = 1;
          if (cx < FADE) t = cx / FADE;
          else if (cx > W - FADE) t = (W - cx) / FADE;
          t = Math.max(0, Math.min(1, t));
          const e = t * t * (3 - 2 * t); // smoothstep
          item.style.filter = `grayscale(1) blur(${((1 - e) * MAXBLUR).toFixed(2)}px)`;
          item.style.opacity = (FULLOP * e).toFixed(3);
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref]);
}
