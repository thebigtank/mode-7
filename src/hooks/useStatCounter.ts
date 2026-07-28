"use client";

import { useEffect, type RefObject } from "react";

/**
 * Dot-matrix "50K+" counter card. Ported from `setupStatCounter()`.
 *
 * Draws a 5×7 dot font on a flex-sized canvas: faint background dots fill the
 * card edge-to-edge, bright white dots spell the number. On scroll-in the value
 * counts 00K+ → 50K+ ("K+" is always shown, only the number animates), then the
 * finished readout blinks.
 *
 * Uses IntersectionObserver plus a rAF-poll fallback — the observer does not
 * fire reliably in every embedding.
 */
const FONT: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
};

export function useStatCounter(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SP = 7,
      FAINT = 1.5,
      BRIGHT = 2.1,
      GLYPH = 6;

    let W = 0,
      H = 0,
      cols = 0,
      rows = 0,
      offX = 0,
      offY = 0,
      cur = "";

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.round(W / SP);
      rows = Math.round(H / SP);
      offX = (W - (cols - 1) * SP) / 2;
      offY = (H - (rows - 1) * SP) / 2;
    };

    const draw = (text: string) => {
      cur = text;
      ctx.clearRect(0, 0, W, H);
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          ctx.beginPath();
          ctx.arc(offX + c * SP, offY + r * SP, FAINT, 0, 6.2832);
          ctx.fillStyle = "rgba(255,255,255,0.07)";
          ctx.fill();
        }
      if (!text) return;
      const textCols = text.length * GLYPH - 1;
      const startC = Math.round((cols - textCols) / 2);
      const startR = Math.round((rows - 7) / 2);
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < text.length; i++) {
        const g = FONT[text[i]];
        if (!g) continue;
        for (let yy = 0; yy < 7; yy++)
          for (let xx = 0; xx < 5; xx++) {
            if (g[yy][xx] !== "1") continue;
            const c = startC + i * GLYPH + xx;
            const r = startR + yy;
            if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
            ctx.beginPath();
            ctx.arc(offX + c * SP, offY + r * SP, BRIGHT, 0, 6.2832);
            ctx.fill();
          }
      }
    };

    setup();
    draw("00K+");

    let started = false;
    let countTimer: ReturnType<typeof setInterval> | null = null;
    let blinkTimer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (started) return;
      started = true;
      let v = 0;
      countTimer = setInterval(() => {
        draw((v < 10 ? `0${v}` : `${v}`) + "K+");
        if (v >= 50) {
          if (countTimer) clearInterval(countTimer);
          countTimer = null;
          let on = true;
          blinkTimer = setInterval(() => {
            on = !on;
            draw(on ? "50K+" : "");
          }, 480);
          return;
        }
        v++;
      }, 26);
    };

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && start()),
        { threshold: 0.4 },
      );
      io.observe(canvas);
    }

    let raf = 0;
    const poll = () => {
      if (!started) {
        const r = canvas.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85 && r.bottom > 0) start();
      }
      if (!started) raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);

    const onResize = () => {
      setup();
      draw(cur || "00K+");
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      if (countTimer) clearInterval(countTimer);
      if (blinkTimer) clearInterval(blinkTimer);
      cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}
