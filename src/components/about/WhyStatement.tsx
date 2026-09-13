"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { V2 } from "@/lib/theme-v2";

const TEXT = "A device is only as good as everything standing behind it.";

export function WhyStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  useReveal(ref, V2.ink, V2.accent);

  return (
    <p ref={ref} className="a-dm" data-rv style={{ margin: 0 }}>
      {TEXT.split("").map((ch, i) => (
        <span key={i} style={{ color: V2.accent }}>
          {ch}
        </span>
      ))}
    </p>
  );
}
