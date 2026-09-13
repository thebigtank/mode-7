"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import content from "@/content/about.json";

export function WhyStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  useReveal(ref, "var(--color-v2-ink)", "var(--color-v2-accent)");
  const text = content.why.statement;

  return (
    <p ref={ref} className="a-dm" data-rv>
      {text.split("").map((ch, i) => (
        <span key={i} className="a-dm__ch">
          {ch}
        </span>
      ))}
    </p>
  );
}
