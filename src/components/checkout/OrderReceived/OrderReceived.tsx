"use client";

import { useEffect, useState } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { readCheckout, type CheckoutDetails } from "@/lib/contact";

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
    <span className="m7-oc-mark oc-mark" aria-hidden="true">
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

function SummaryRow({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div className="oc-summary__row" data-last={last || undefined}>
      <span className="oc-summary__key">{k}</span>
      <span className="oc-summary__value" data-last={last || undefined}>
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
    <section className="m7-wrap oc">
      <div className="oc__intro">
        <div className="m7-oc-rise" style={{ animationDelay: "0s" }}>
          <CheckMark />
        </div>

        <h1
          className="m7-oc-rise oc__title text-balance"
          style={{ animationDelay: ".06s" }}
        >
          {greeting}
          <br />
          We’ve got your order.
        </h1>

        <p className="m7-oc-rise oc__lede" style={{ animationDelay: ".12s" }}>
          A Mode 7 agent is picking it up now. They’ll message you on WhatsApp to
          confirm stock, agree the final figure and arrange delivery. Nothing has
          been charged, and nothing moves until you say so.
        </p>

        {d && (
          <div className="m7-oc-rise oc-summary" style={{ animationDelay: ".18s" }}>
            <SummaryRow k="Order ref" v={d.ref} />
            <SummaryRow k="Name" v={`${d.firstName} ${d.lastName}`.trim()} />
            <SummaryRow k="WhatsApp" v={d.phone} />
            <SummaryRow k="Email" v={d.email} />
            <SummaryRow k="Delivering to" v={d.address} last />
          </div>
        )}
      </div>

      <div className="oc-next">
        <div className="oc-next__eyebrow">{"// What happens next"}</div>

        <div className="m7-oc-steps">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="m7-oc-step m7-oc-rise"
              style={{ animationDelay: `${0.24 + i * 0.06}s` }}
            >
              <span className="m7-oc-step__dot" aria-hidden="true" />
              <div className="oc-step__num">{s.n}</div>
              <div className="oc-step__title">{s.t}</div>
              <div className="oc-step__body">{s.b}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="m7-oc-rise oc-actions" style={{ animationDelay: ".42s" }}>
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
