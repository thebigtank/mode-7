"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";

const items = [
  {
    q: "Is my roof suitable for solar?",
    a: "Most homes are viable. Our free survey checks roof direction, shading and usage, then models exactly what you’d generate and save before you commit anything.",
  },
  {
    q: "How long does an install take?",
    a: "Accredited engineers install and commission a typical system in a single day, then hand over a working, monitored setup.",
  },
  {
    q: "What happens on cloudy days or at night?",
    a: "Paired with a home battery you store cheap daytime energy for the evening peak, and the grid covers anything left over.",
  },
  {
    q: "Can I add a battery or EV charger later?",
    a: "Yes — systems are designed to expand. A hybrid inverter leaves headroom for storage and 7kW home charging whenever you’re ready.",
  },
  {
    q: "What warranties are included?",
    a: "25-year panel performance warranties, plus a written generation guarantee on the system as installed — not just the hardware.",
  },
];

export function EnergyFaq() {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  return (
    <div className="ge-faq">
      {items.map((it, i) => {
        const isOpen = !!open[i];
        return (
          <div key={it.q} className="ge-faq__item">
            <div
              onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
              className="ge-faq__head"
            >
              <div className="ge-faq__q">{it.q}</div>
              <span className="ge-faq__chevron" data-open={isOpen || undefined}>
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
