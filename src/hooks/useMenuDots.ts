"use client";

import { useEffect } from "react";

/**
 * Interactive proximity dot-grid behind the mega menu's right column. Ported
 * from `setupMenuDots()` — dark dots on white that grow and brighten near the
 * cursor.
 *
 * A persistent rAF loop queries `[data-menudot]` each frame rather than binding
 * to a ref, because the canvas mounts and unmounts with the menu.
 */
export function useMenuDots() {
  useEffect(() => {
    const SP = 20,
      BASE_R = 1.05,
      MAX_R = 3.8,
      BASE = 0.04,
      MAXO = 0.24,
      RADIUS = 175,
      LERP = 0.07;

    const pointer = { x: -99999, y: -99999 };
    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    type MdCanvas = HTMLCanvasElement & {
      _mdInit?: boolean;
      _mdCtx?: CanvasRenderingContext2D;
      _mdW?: number;
      _mdH?: number;
      _mdDots?: { x: number; y: number; o: number; r: number }[];
    };

    const draw = (canvas: MdCanvas) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        canvas._mdInit = false;
        return;
      }
      if (
        !canvas._mdInit ||
        canvas._mdW !== rect.width ||
        canvas._mdH !== rect.height
      ) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas._mdCtx = ctx;
        canvas._mdW = rect.width;
        canvas._mdH = rect.height;
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const dots = [];
        for (let y = SP / 2; y < rect.height; y += SP)
          for (let x = SP / 2; x < rect.width; x += SP)
            dots.push({ x, y, o: BASE, r: BASE_R });
        canvas._mdDots = dots;
        canvas._mdInit = true;
      }
      const ctx = canvas._mdCtx!;
      const W = canvas._mdW!;
      const H = canvas._mdH!;
      const dots = canvas._mdDots!;
      const mx = pointer.x - rect.left;
      const my = pointer.y - rect.top;
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        const dx = d.x - mx,
          dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let t = dist < RADIUS ? 1 - dist / RADIUS : 0;
        t = t * t;
        d.o += (BASE + (MAXO - BASE) * t - d.o) * LERP;
        d.r += (BASE_R + (MAX_R - BASE_R) * t - d.r) * LERP;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 6.2832);
        ctx.fillStyle = `rgba(18,18,18,${d.o.toFixed(3)})`;
        ctx.fill();
      }
    };

    let raf = 0;
    const tick = () => {
      const cv = document.querySelector<MdCanvas>("[data-menudot]");
      if (cv) draw(cv);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
