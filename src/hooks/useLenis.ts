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

/**
 * Scroll the page back to the top.
 *
 * Lenis owns the page position through its own rAF loop, so a scroll it did not
 * originate is something it has to re-sync to rather than drive. Measured, a
 * native `scrollTo({behavior:"smooth"})` does still land on 0 here — Lenis
 * adopts the external position — but it runs the browser's easing, not the
 * page's, and leaves Lenis's `targetScroll` to catch up. So when the instance
 * exists the scroll is handed to Lenis itself, which keeps one animation and
 * one source of truth; the native calls are the no-Lenis fallback only.
 */
export function scrollPageToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 1.1 });
    return;
  }
  try {
    (document.scrollingElement || document.documentElement).scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch {
    window.scrollTo(0, 0);
  }
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
