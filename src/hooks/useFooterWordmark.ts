"use client";

import { useEffect, type RefObject } from "react";

export function useFooterWordmark(
  wrapRef: RefObject<HTMLElement | null>,
  spotlightRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const s = document.scrollingElement || document.documentElement;
      const dist = s.scrollHeight - s.clientHeight - s.scrollTop;
      const range = s.clientHeight * 0.9;
      let p = 1 - dist / range;
      p = Math.max(0, Math.min(1, p));
      const shift = (1 - p) * (el.offsetHeight + 8);
      el.style.transform = `translateY(${shift.toFixed(1)}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", update, { passive: true });

    let raf = 0;
    const poll = () => {
      update();
      raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);

    return () => {
      window.removeEventListener("scroll", update);
      document.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [wrapRef]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fg = spotlightRef.current;
    if (!wrap || !fg) return;

    let tx = 50,
      ty = 50,
      cx = 50,
      cy = 50,
      hov = 0,
      rev = 0;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      if (!r.width) return;
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      hov = 1;
    };
    const onLeave = () => {
      hov = 0;
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseenter", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.28;
      cy += (ty - cy) * 0.28;
      rev += (hov - rev) * 0.14;
      const A = rev.toFixed(3);
      const pos = `${cx.toFixed(1)}% ${cy.toFixed(1)}%`;
      const m = `radial-gradient(circle 18vw at ${pos}, rgba(0,0,0,${A}) 0%, rgba(0,0,0,${A}) 50%, rgba(0,0,0,0) 100%)`;
      fg.style.webkitMaskImage = m;
      fg.style.maskImage = m;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseenter", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [wrapRef, spotlightRef]);
}
