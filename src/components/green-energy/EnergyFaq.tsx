"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";
import { FONT } from "@/lib/theme";

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
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((it, i) => {
        const isOpen = !!open[i];
        return (
          <div
            key={it.q}
            style={{
              background: "#fcfcfc",
              border: "1px solid #ececec",
              borderRadius: 4,
              padding: "24px 28px",
            }}
          >
            <div
              onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 20,
                  letterSpacing: "-0.3px",
                }}
              >
                {it.q}
              </div>
              <span
                style={{
                  flex: "0 0 auto",
                  display: "inline-flex",
                  color: "#121212",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .35s cubic-bezier(.4,0,.2,1)",
                }}
              >
                <ChevronDownIcon size={24} />
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
                transition:
                  "grid-template-rows .45s cubic-bezier(.4,0,.2,1),opacity .3s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: "#6a6a6a",
                    paddingTop: 14,
                    maxWidth: 780,
                  }}
                >
                  {it.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
