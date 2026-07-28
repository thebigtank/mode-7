"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

/**
 * Seamless looping carousel. Ported from `setupLoop(ref, trackProgress)` +
 * `step(ref, dir)`.
 *
 * The list is rendered three times; the scroller starts in the middle copy and
 * silently re-centres whenever it crosses a copy boundary, so the loop never
 * shows a seam. `trackProgress` drives the testimonials progress bar.
 */
export function useCarouselLoop(
  ref: RefObject<HTMLElement | null>,
  trackProgress = false,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const copyWidth = () => el.scrollWidth / 3; // three identical copies

    const raf = requestAnimationFrame(() => {
      el.scrollLeft = copyWidth(); // start in the middle copy
    });

    const onScroll = () => {
      const w = copyWidth();
      if (w <= 0) return;
      if (el.scrollLeft >= w * 2) el.scrollLeft -= w; // wrap forward
      else if (el.scrollLeft <= 0) el.scrollLeft += w; // wrap backward
      if (trackProgress) setProgress((el.scrollLeft % w) / w);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [ref, trackProgress]);

  const step = useCallback(
    (dir: 1 | -1) => {
      const el = ref.current;
      if (!el || !el.firstElementChild) return;
      const card = el.firstElementChild.getBoundingClientRect().width + 22;
      el.scrollBy({ left: dir * card, behavior: "smooth" });
    },
    [ref],
  );

  return { progress, step };
}
