"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

/**
 * The pull-line in "Why We Exist", rendered as per-character spans that go
 * grey → black on scroll — the site's signature reveal, driven by the shared
 * `useReveal` hook. Entrance fade is handled separately via the `data-rv` hook
 * on the wrapper.
 */
const TEXT = "A device is only as good as everything standing behind it.";

export function WhyStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  useReveal(ref);

  return (
    <p ref={ref} className="a-dm" data-rv style={{ margin: 0 }}>
      {TEXT.split("").map((ch, i) => (
        <span key={i} style={{ color: "#cfcfcf" }}>
          {ch}
        </span>
      ))}
    </p>
  );
}
