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

/**
 * Pill row that scroll-jumps to each Services section.
 *
 * The band sits on `V2.accent` gold. Per CLAUDE.md's gold rule, gold is a
 * GROUND here, never a text colour, so the pills are outlined and labelled in
 * `V2.navy` — added to `theme-v2.ts` for exactly this treatment, since
 * neither `accentOn` (reads as "the standard dark-on-gold fill", not a
 * distinct outline) nor plain `ink` was the right third colour. White text
 * appears ONLY on the pill's navy hover/focus fill, never on the gold band
 * itself — the gold rule's "never white on gold" (1.70:1) never comes into
 * play here.
 *
 * Rest/hover/focus-visible are plain CSS (`.svc-pill` in globals.css, scoped
 * under `.services-page`), not React state: the previous pass here tracked
 * `hovered` in React and painted every state as an inline style (CLAUDE.md
 * trap #2 territory — resting state belongs in the stylesheet, not inline).
 * Hover and focus-visible resolve to the IDENTICAL navy-fill/white-label
 * look, so there is no stacking case to reason about (trap #5's stacking bug
 * is about two DIFFERENT elements' independent `:hover`/`:focus-within`
 * conditions combining unexpectedly — one control's own hover and keyboard
 * focus converging on the same visual result is safe by construction).
 *
 * These are real `<a href="#id">` elements, not `<span onClick>`: focusable
 * and operable from the keyboard with no extra `tabIndex`/`onKeyDown`
 * wiring, and a screen-reader or no-JS visitor still gets the plain anchor
 * jump. The smooth in-page scroll is progressive enhancement on top of that,
 * not a replacement for it.
 */
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
              className="svc-pill"
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
