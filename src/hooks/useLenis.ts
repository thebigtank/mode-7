"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;
let locks = 0;

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
