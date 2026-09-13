"use client";

import { useState } from "react";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import { PlusToggle } from "@/components/ui/PlusToggle";
import { faqData } from "@/lib/faq";
import { V2, V2_FONT, V2_HAIR } from "@/lib/theme-v2";

/**
 * FAQ, by category. A sticky topic list on the left drives the question set on
 * the right; each question expands with a `grid-template-rows: 0fr → 1fr`
 * transition (which animates height without hard-coding one) and its `+` icon
 * rotates into an `×`.
 *
 * Re-tokened for `/services`'s v2 port: the "// Questions" eyebrow now renders
 * through the shared `Mono` component and the answer copy through `P` —
 * both from `@/components/ui/Mono` and `@/components/ui/P` — rather than local FONT-styled markup.
 *
 * The circular plus/cross indicator is `PlusToggle`, also from
 * `@/components/ui/PlusToggle` — shared with `/trade-in`'s `TradeInFaq.tsx`
 * rather than each page drawing its own icon, so the ring/stroke/rotation
 * are defined once. The question toggle is now a real `<button
 * aria-expanded>` too (it was a `<div onClick>` with no keyboard support or
 * exposed state before this pass — fixed here rather than left standing
 * while only the icon changed).
 */
export function Faq() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const group = faqData[tab];

  return (
    <section
      id="sec-faq"
      style={{
        width: "100%",
        background: V2.white,
        padding: "100px 0",
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--m7-pad)" }}>
        <div style={{ maxWidth: 860, marginBottom: 44 }}>
          <Mono dot style={{ marginBottom: 16 }}>
            Questions
          </Mono>
          <h2
            style={{
              fontFamily: V2_FONT.display,
              fontWeight: 400,
              fontSize: "clamp(25px, 3.5vw, 40px)",
              lineHeight: 1.18,
              letterSpacing: "-0.016em",
              color: V2.ink,
              margin: 0,
              textWrap: "balance",
            }}
          >
            Answers, by category.
          </h2>
        </div>

        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "0.5fr 1.5fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div style={{ position: "sticky", top: 100 }}>
            <div
              style={{
                fontFamily: V2_FONT.mono,
                fontSize: 11,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: V2.muted,
                marginBottom: 14,
              }}
            >
              Browse topics
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {faqData.map((d, i) => (
                <div
                  key={d.tab}
                  onClick={() => setTab(i)}
                  style={{
                    padding: "13px 16px",
                    borderRadius: 4,
                    background: i === tab ? V2.ink : "transparent",
                    color: i === tab ? V2.white : V2.muted,
                    fontFamily: V2_FONT.display,
                    fontWeight: 400,
                    fontSize: 16,
                    letterSpacing: "-0.01em",
                    cursor: "pointer",
                    transition: "background .2s ease,color .2s ease",
                  }}
                >
                  {d.tab}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: V2_FONT.display,
                fontWeight: 400,
                fontSize: 28,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: V2.ink,
                margin: "0 0 22px",
              }}
            >
              {group.title}
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}
            >
              {group.qs.map((qa, qi) => {
                const key = `${tab}:${qi}`;
                const isOpen = !!open[key];
                return (
                  <div
                    key={key}
                    style={{
                      background: V2.white,
                      border: V2_HAIR,
                      borderRadius: 4,
                      padding: "22px 26px",
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpen((s) => ({ ...s, [key]: !s[key] }))
                      }
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 20,
                        width: "100%",
                        background: "none",
                        border: 0,
                        padding: 0,
                        font: "inherit",
                        color: "inherit",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: V2_FONT.display,
                          fontWeight: 400,
                          fontSize: 18,
                          letterSpacing: "-0.01em",
                          lineHeight: 1.3,
                          color: V2.ink,
                        }}
                      >
                        {qa.q}
                      </span>
                      <PlusToggle open={isOpen} />
                    </button>
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
                        <P style={{ paddingTop: 14, maxWidth: 780 }}>{qa.a}</P>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
