"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

export function useCarouselLoop(
  ref: RefObject<HTMLElement | null>,
  trackProgress = false,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const copyWidth = () => el.scrollWidth / 3;

    const raf = requestAnimationFrame(() => {
      el.scrollLeft = copyWidth();
    });

    const onScroll = () => {
      const w = copyWidth();
      if (w <= 0) return;
      if (el.scrollLeft >= w * 2) el.scrollLeft -= w;
      else if (el.scrollLeft <= 0) el.scrollLeft += w;
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
