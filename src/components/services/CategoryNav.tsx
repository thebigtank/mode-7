"use client";

import { FONT } from "@/lib/theme";

const pills = [
  { label: "Premium and Certified Refurbished Devices", id: "sec-premium" },
  { label: "Smart Home Automation", id: "sec-smarthome" },
  { label: "Solar & Green Energy", id: "sec-solar" },
  { label: "Trade-In", id: "sec-tradein" },
  { label: "FAQ", id: "sec-faq" },
];

/** Pill row that scroll-jumps to each Services section. */
export function CategoryNav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      style={{ width: "100%", padding: "26px 0", borderBottom: "1px solid #e6e6e6" }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--m7-pad)" }}>
        <div
          style={{ display: "flex", gap: 10, flexWrap: "wrap", color: "#121212" }}
        >
          {pills.map((p) => (
            <span
              key={p.id}
              onClick={() => scrollTo(p.id)}
              className="m7-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid #e2e2e2",
                borderRadius: 99,
                padding: "11px 20px",
                fontFamily: FONT.body,
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                transition: "background .2s ease,color .2s ease,border-color .2s ease",
              }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
