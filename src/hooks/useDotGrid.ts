"use client";

import { useEffect, type RefObject } from "react";

/**
 * Proximity dot-grid canvas background. Ported from `setupDotGrid(section, canvas)`
 * — shared by the "Why Mode 7" and "Our Team" sections.
 *
 * 20px slate-grey dot grid; dots within ~180px of the cursor grow in size AND
 * opacity with an eased falloff, then lerp back. The canvas is full-viewport
 * width behind content that stays constrained to the 1320px container.
 */
export function useDotGrid(
  sectionRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 20,
      BASE_R = 1.05,
      MAX_R = 3.8,
      BASE = 0.1,
      MAXO = 0.72,
      RADIUS = 180,
      LERP = 0.06;

    let dots: { x: number; y: number; o: number; r: number }[] = [];
    let W = 0;
    let H = 0;
    const mouse = { x: -99999, y: -99999 };

    const build = () => {
      const rect = section.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = SPACING / 2; y < H; y += SPACING)
        for (let x = SPACING / 2; x < W; x += SPACING)
          dots.push({ x, y, o: BASE, r: BASE_R });
    };
    build();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(build);
      ro.observe(section);
    }

    const onResize = () => build();
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -99999;
      mouse.y = -99999;
    };

    window.addEventListener("resize", onResize);
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let t = dist < RADIUS ? 1 - dist / RADIUS : 0;
        t = t * t; // ease falloff: tight bright core, soft edge
        d.o += (BASE + (MAXO - BASE) * t - d.o) * LERP;
        d.r += (BASE_R + (MAX_R - BASE_R) * t - d.r) * LERP;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 6.283185);
        ctx.fillStyle = `rgba(148,163,184,${d.o.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      ro?.disconnect();
    };
  }, [sectionRef, canvasRef]);
}
