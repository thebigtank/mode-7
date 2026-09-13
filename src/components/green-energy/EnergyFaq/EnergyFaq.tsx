"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";
import content from "@/content/green-energy.json";

const items = content.faq.items;

export function EnergyFaq() {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  return (
    <div className="ge-faq flex flex-col">
      {items.map((it, i) => {
        const isOpen = !!open[i];
        return (
          <div key={it.q} className="ge-faq__item">
            <div
              onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
              className="ge-faq__head flex items-center justify-between"
            >
              <div className="ge-faq__q">{it.q}</div>
              <span className="ge-faq__chevron inline-flex" data-open={isOpen || undefined}>
                <ChevronDownIcon size={24} />
              </span>
            </div>
            <div className="ge-faq__panel" data-open={isOpen || undefined}>
              <div className="ge-faq__panel-inner">
                <div className="ge-faq__a">{it.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
