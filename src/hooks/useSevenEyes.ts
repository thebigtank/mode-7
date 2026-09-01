"use client";

import { useEffect } from "react";

/**
 * Seven's avatar: two blinking, cursor-tracking eyes. Ported from
 * `setupEqualizer()`.
 *
 * One rAF loop draws two vertical ovals into every `[data-eq]` canvas on the
 * page (the closed pill and the open panel header share the same treatment).
 * They blink on a loose cadence and shift toward the global pointer —
 * left/up/right move out, looking-down stays put. Eyes sit slightly above
 * centre; dpr is capped at 3 for crispness.
 */
export function useSevenEyes() {
  useEffect(() => {
    const pointer = { x: -99999, y: -99999 };
    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const blinkAt = () => 1400 + Math.random() * 2600;
    let nextBlink = performance.now() + blinkAt();
    let blinkStart = -1;
    const BLINK_DUR = 150;

    type EqCanvas = HTMLCanvasElement & {
      _eqInit?: boolean;
      _eqCtx?: CanvasRenderingContext2D;
      _eqW?: number;
      _eqH?: number;
      _gx?: number;
      _gy?: number;
    };

    const draw = (canvas: EqCanvas, openK: number) => {
      if (!canvas._eqInit) {
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        canvas._eqCtx = ctx;
        canvas._eqW = rect.width;
        canvas._eqH = rect.height;
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        canvas._eqInit = true;
        canvas._gx = 0;
        canvas._gy = 0;
      }
      const ctx = canvas._eqCtx!;
      const W = canvas._eqW!;
      const H = canvas._eqH!;
      const M = Math.min(W, H);

      // gaze target from this canvas's own centre toward the pointer
      const rect = canvas.getBoundingClientRect();
      const ccx = rect.left + rect.width / 2;
      const ccy = rect.top + rect.height / 2;
      let tgx = 0,
        tgy = 0;
      if (pointer.x > -9999) {
        const dx = pointer.x - ccx,
          dy = pointer.y - ccy;
        const d = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, d / 140); // more deflection as it approaches, capped
        tgx = (dx / d) * reach;
        tgy = (dy / d) * reach;
      }
      canvas._gx! += (tgx - canvas._gx!) * 0.4; // snappier tracking
      canvas._gy! += (tgy - canvas._gy!) * 0.4;

      const eyeW = M * 0.185,
        eyeH = M * 0.4,
        gap = M * 0.3;
      const maxShift = M * 0.16;
      const cx = W / 2 + canvas._gx! * maxShift;
      // shift up only — stay put when looking down
      const cy = H / 2 - M * 0.06 + Math.min(canvas._gy!, 0) * maxShift;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#1C150F";
      const ry = Math.max(eyeW * 0.5, (eyeH / 2) * openK); // collapse to a slit on blink
      ctx.beginPath();
      ctx.ellipse(cx - gap / 2, cy, eyeW / 2, ry, 0, 0, 6.2832);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + gap / 2, cy, eyeW / 2, ry, 0, 0, 6.2832);
      ctx.fill();
    };

    let raf = 0;
    const tick = () => {
      const now = performance.now();
      if (blinkStart < 0 && now >= nextBlink) blinkStart = now;
      let openK = 1;
      if (blinkStart >= 0) {
        const p = (now - blinkStart) / BLINK_DUR;
        if (p >= 1) {
          blinkStart = -1;
          nextBlink = now + blinkAt();
          openK = 1;
        } else {
          openK = Math.abs(Math.cos(p * Math.PI)); // 1 -> 0 -> 1 (close then open)
        }
      }
      document
        .querySelectorAll<EqCanvas>("[data-eq]")
        .forEach((cv) => draw(cv, openK));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
