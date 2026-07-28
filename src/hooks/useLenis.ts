"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll. Mirrors `setupLenis()` from the design component: one instance
 * driven by its own rAF loop. The mega menu / search overlay call `stop()` and
 * `start()` on the returned ref to lock page scroll.
 *
 * All scroll-driven effects elsewhere still work — Lenis updates native scroll
 * and fires real scroll events.
 */
/**
 * The live instance, so overlays anywhere in the tree can lock page scroll
 * without threading a ref down through props or context.
 */
let instance: Lenis | null = null;
let locks = 0;

/**
 * Lock page scroll behind an overlay.
 *
 * `body { overflow: hidden }` alone is NOT enough here: Lenis runs its own
 * wheel/touch handling and drives the page with `window.scrollTo`, so it keeps
 * scrolling straight through the overflow rule. It has to be stopped as well.
 *
 * Ref-counted, because overlays can nest — a searchable select inside a modal
 * would otherwise unlock the page when the select closes, while the modal is
 * still up.
 */
export function lockPageScroll() {
  locks += 1;
  if (locks > 1) return;
  instance?.stop();
  document.body.style.overflow = "hidden";
}

export function unlockPageScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  instance?.start();
  document.body.style.overflow = "";
}

export function useLenis() {
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    ref.current = lenis;
    instance = lenis;
    // an overlay may already be open across a remount
    if (locks > 0) lenis.stop();

    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      ref.current = null;
      instance = null;
    };
  }, []);

  return ref;
}
