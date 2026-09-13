"use client";

import { useState } from "react";
import { PlusToggle } from "@/components/ui/PlusToggle";
import content from "@/content/trade-in.json";

const items = content.faq;

export function TradeInFaq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="t-faq">
      {items.map((it, i) => (
        <div className="t-faqi" key={it.q}>
          <button
            type="button"
            className="t-faqi__b flex items-center justify-between text-left"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span>{it.q}</span>
            <PlusToggle
              open={open === i}
              color="rgb(var(--color-v2-white-rgb) / 0.6)"
              border="1px solid rgb(var(--color-v2-white-rgb) / 0.14)"
            />
          </button>
          <div className="t-faqi__p grid">
            <div className="t-faqi__pi overflow-hidden">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
