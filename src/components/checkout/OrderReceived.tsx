"use client";

import { useEffect, useState } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { readCheckout, type CheckoutDetails } from "@/lib/contact";
import { FONT } from "@/lib/theme";

/**
 * The order confirmation.
 *
 * Reimagined to read as a moment rather than a receipt: centred, generously
 * spaced, and it greets the customer by name. The palette is locked to ink and
 * greys, so the warmth has to come from the mark, the copy and the rhythm —
 * not from a green tick.
 *
 * Details are read from sessionStorage in an effect, which also means the
 * first paint is the neutral copy — so someone landing here directly (a
 * bookmark, a refresh in a new session) gets a graceful page rather than an
 * empty one.
 */

const STEPS: { n: string; t: string; b: string }[] = [
  {
    n: "01",
    t: "An agent picks up your order",
    b: "Your items, quantities and any trade-in estimate are already attached — you won’t be asked to repeat yourself.",
  },
  {
    n: "02",
    t: "They message you on WhatsApp",
    b: "Usually within a couple of hours during business hours, on the number you gave us.",
  },
  {
    n: "03",
    t: "You pay once you’re happy",
    b: "Transfer or card, arranged with the agent. Nothing is charged before you agree the total.",
  },
];

function CheckMark() {
  return (
    <span
      className="m7-oc-mark"
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 76,
        height: 76,
        borderRadius: "50%",
        background: "#121212",
        color: "#fff",
      }}
    >
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path
          className="m7-oc-tick"
          d="M8 17.5 14.5 24 26 11"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 20,
        padding: "11px 0",
        borderBottom: "1px solid #ececec",
        textAlign: "left",
      }}
    >
      <span
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: "#9a9a9a",
          flex: "0 0 auto",
        }}
      >
        {k}
      </span>
      <span
        style={{
          fontSize: 15,
          color: "#1a1a1a",
          textAlign: "right",
          lineHeight: 1.5,
          whiteSpace: "pre-line",
        }}
      >
        {v}
      </span>
    </div>
  );
}

export function OrderReceived() {
  const [d, setD] = useState<CheckoutDetails | null>(null);

  useEffect(() => {
    setD(readCheckout());
  }, []);

  const greeting = d?.firstName ? `Thank you, ${d.firstName}.` : "Thank you.";

  return (
    <section className="m7-wrap" style={{ paddingTop: "clamp(48px, 7vw, 96px)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div className="m7-oc-rise" style={{ animationDelay: "0s" }}>
          <CheckMark />
        </div>

        <h1
          className="m7-oc-rise"
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: "clamp(34px, 4.8vw, 58px)",
            lineHeight: 1.02,
            letterSpacing: "-2.4px",
            margin: "28px 0 0",
            textWrap: "balance",
            animationDelay: ".06s",
          }}
        >
          {greeting}
          <br />
          We’ve got your order.
        </h1>

        <p
          className="m7-oc-rise"
          style={{
            fontSize: "clamp(17px, 1.5vw, 19px)",
            lineHeight: 1.65,
            color: "#5a5a5a",
            margin: "22px auto 0",
            maxWidth: "54ch",
            animationDelay: ".12s",
          }}
        >
          A Mode 7 agent is picking it up now. They’ll message you on WhatsApp to
          confirm stock, agree the final figure and arrange delivery. Nothing has
          been charged, and nothing moves until you say so.
        </p>

        {d && (
          <div
            className="m7-oc-rise"
            style={{
              marginTop: 34,
              border: "1px solid #ececec",
              borderRadius: 6,
              background: "#fcfcfc",
              padding: "8px 24px 20px",
              animationDelay: ".18s",
            }}
          >
            <SummaryRow k="Order ref" v={d.ref} />
            <SummaryRow k="Name" v={`${d.firstName} ${d.lastName}`.trim()} />
            <SummaryRow k="WhatsApp" v={d.phone} />
            <SummaryRow k="Email" v={d.email} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 20,
                padding: "11px 0 0",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: "#9a9a9a",
                  flex: "0 0 auto",
                }}
              >
                Delivering to
              </span>
              <span
                style={{
                  fontSize: 15,
                  color: "#1a1a1a",
                  textAlign: "right",
                  lineHeight: 1.55,
                  whiteSpace: "pre-line",
                }}
              >
                {d.address}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* what happens next — a timeline, with a rule running through it */}
      <div style={{ maxWidth: 1000, margin: "clamp(48px, 6vw, 76px) auto 0" }}>
        <div
          style={{
            fontFamily: FONT.head,
            fontSize: 12,
            letterSpacing: 2,
            color: "#9a9a9a",
            textTransform: "uppercase",
            marginBottom: 26,
            textAlign: "center",
          }}
        >
          {"// What happens next"}
        </div>

        <div className="m7-oc-steps">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="m7-oc-step m7-oc-rise"
              style={{ animationDelay: `${0.24 + i * 0.06}s` }}
            >
              <span className="m7-oc-step__dot" aria-hidden="true" />
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  color: "#b4b4b4",
                  letterSpacing: 1,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 18,
                  letterSpacing: "-0.4px",
                  margin: "10px 0 8px",
                  lineHeight: 1.25,
                }}
              >
                {s.t}
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "#5a5a5a" }}>
                {s.b}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="m7-oc-rise"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          marginTop: "clamp(40px, 5vw, 64px)",
          animationDelay: ".42s",
        }}
      >
        <ArrowButton label="Back to shop" variant="fill" href="/shop" />
        <ArrowButton label="Talk to the team" variant="outline" href="/contact" />
        <ArrowButton
          label="Explore more of our services"
          variant="outline"
          href="/services"
        />
      </div>
    </section>
  );
}
