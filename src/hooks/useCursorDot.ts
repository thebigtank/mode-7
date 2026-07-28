"use client";

import { useEffect, type RefObject } from "react";

/**
 * Custom negative/invert cursor dot. Ported from `setupCursor()`.
 *
 * `mousemove` does the bare minimum — record the latest pointer + target, no
 * layout reads and no style writes — so fast/coalesced moves never stall the
 * event queue. A single rAF loop owns ALL DOM work: the position write plus the
 * throttled "should the dot grow?" check.
 */

/**
 * What the dot grows over.
 *
 * This used to be "anything whose computed cursor is pointer", which caught
 * every product card, filter row, option chip and quantity stepper on the site
 * — the dot ballooned while you were trying to read a price or compare specs,
 * which read as confusing rather than expressive.
 *
 * So it is now an allow-list: real calls to action, and links that navigate.
 * Selection controls (chips, cards, checkboxes, steppers) are deliberately
 * absent — they are choices, not destinations.
 *
 * Opt a new element in with `data-cursor="grow"`, and force it off anywhere
 * inside with `data-cursor="none"`.
 */
const GROW_SELECTOR = [
  '[data-cursor="grow"]', // explicit opt-in — ArrowButton and friends
  "header a[href]", // masthead + mega-menu links
  "footer a[href]", // footer navigation
  "nav a[href]", // any nav landmark
  "p a[href]", // links inside prose
  "li a[href]",
  "h1 a[href]",
  "h2 a[href]",
  "h3 a[href]",
  "h4 a[href]",
].join(",");

/** Wins over everything above, for regions that should never grow the dot. */
const BLOCK_SELECTOR = '[data-cursor="none"]';
export function useCursorDot(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;

    let x = window.innerWidth / 2,
      y = window.innerHeight / 2;
    let px = x,
      py = y;
    let size = 13;
    let shown = false;
    let target: EventTarget | null = null;
    let lastTarget: EventTarget | null = null;

    const REST = 13,
      MID = 32,
      BIG = 68;

    /**
     * A single `closest()` pair instead of the old walk-up-reading-styles loop
     * — no getComputedStyle per ancestor, so this got cheaper as well as
     * narrower.
     */
    const shouldGrow = (node: EventTarget | null) => {
      const n = node as HTMLElement | null;
      if (!n || n.nodeType !== 1 || typeof n.closest !== "function") return false;
      if (n.closest(BLOCK_SELECTOR)) return false;
      return !!n.closest(GROW_SELECTOR);
    };

    const onMove = (e: MouseEvent | PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      target = e.target;
      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
      }
    };

    let raf = 0;
    const tick = () => {
      if (x !== px || y !== py) {
        px = x;
        py = y;
        dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      }
      if (target !== lastTarget) {
        lastTarget = target;
        let next = REST;
        if (shouldGrow(target)) {
          next = (target as HTMLElement).closest("[data-cursor-skip]") ? MID : BIG;
        }
        if (next !== size) {
          size = next;
          dot.style.width = `${size}px`;
          dot.style.height = `${size}px`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOut = () => {
      dot.style.opacity = "0";
      shown = false;
    };
    const onIn = () => {
      dot.style.opacity = "1";
      shown = true;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onOut);
    document.addEventListener("mouseenter", onIn);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onOut);
      document.removeEventListener("mouseenter", onIn);
    };
  }, [ref]);
}
