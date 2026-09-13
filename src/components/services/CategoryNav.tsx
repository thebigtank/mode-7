"use client";

import type { MouseEvent } from "react";
import { V2 } from "@/lib/theme-v2";

const pills = [
  { label: "Premium and Certified Refurbished Devices", id: "sec-premium" },
  { label: "Smart Home Automation", id: "sec-smarthome" },
  { label: "Solar & Green Energy", id: "sec-solar" },
  { label: "Trade-In", id: "sec-tradein" },
  { label: "FAQ", id: "sec-faq" },
];

export function CategoryNav() {
  const scrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section style={{ width: "100%", padding: "26px 0", background: V2.accent }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--m7-pad)" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {pills.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              onClick={(e) => scrollTo(e, p.id)}
              className="svc-pill inline-flex items-center no-underline cursor-pointer"
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
