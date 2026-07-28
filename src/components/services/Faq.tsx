"use client";

import { useState } from "react";
import { faqData } from "@/lib/faq";
import { FONT } from "@/lib/theme";

/**
 * FAQ, by category. A sticky topic list on the left drives the question set on
 * the right; each question expands with a `grid-template-rows: 0fr → 1fr`
 * transition (which animates height without hard-coding one) and its `+` icon
 * rotates into an `×`.
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
        background: "#ffffff",
        padding: "100px 0",
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--m7-pad)" }}>
        <div style={{ maxWidth: 860, marginBottom: 44 }}>
          <div
            style={{
              fontFamily: FONT.head,
              fontSize: 12,
              letterSpacing: 2,
              color: "#9a9a9a",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {"// Questions"}
          </div>
          <h2
            style={{
              fontFamily: FONT.head,
              fontWeight: 600,
              fontSize: "clamp(25px, 3.5vw, 40px)",
              lineHeight: 1,
              letterSpacing: "-3px",
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
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#9a9a9a",
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
                    background: i === tab ? "#121212" : "transparent",
                    color: i === tab ? "#ffffff" : "#6a6a6a",
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: "-0.2px",
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
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: 28,
                letterSpacing: "-1.5px",
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
                      background: "#fcfcfc",
                      border: "1px solid #ececec",
                      borderRadius: 4,
                      padding: "22px 26px",
                    }}
                  >
                    <div
                      onClick={() =>
                        setOpen((s) => ({ ...s, [key]: !s[key] }))
                      }
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 20,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: FONT.head,
                          fontWeight: 600,
                          fontSize: 18,
                          letterSpacing: "-0.3px",
                          lineHeight: 1.3,
                        }}
                      >
                        {qa.q}
                      </div>
                      <span
                        style={{
                          flex: "0 0 auto",
                          width: 30,
                          height: 30,
                          border: "1px solid #e2e2e2",
                          borderRadius: 99,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform .35s cubic-bezier(.4,0,.2,1)",
                        }}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#121212"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
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
                            fontFamily: FONT.body,
                            fontSize: 16,
                            lineHeight: 1.65,
                            color: "#6a6a6a",
                            paddingTop: 14,
                            maxWidth: 780,
                          }}
                        >
                          {qa.a}
                        </div>
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
