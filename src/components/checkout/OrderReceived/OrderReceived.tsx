"use client";

import { useEffect, useState } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import content from "@/content/checkout.json";
import { readCheckout, type CheckoutDetails } from "@/lib/contact";

const VARIANT = { fill: "fill", outline: "outline" } as const;

function CheckMark() {
  return (
    <span
      className="oc-mark inline-flex items-center justify-center"
      aria-hidden="true"
    >
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path
          className="oc-tick"
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
    <div
      className="oc-summary__row flex items-baseline justify-between text-left"
      data-last={last || undefined}
    >
      <span className="oc-summary__key shrink-0 uppercase">{k}</span>
      <span
        className="oc-summary__value text-right"
        data-last={last || undefined}
      >
        {v}
      </span>
    </div>
  );
}

export function OrderReceived() {
  const [d, setD] = useState<CheckoutDetails | null>(null);
  const c = content.received;

  useEffect(() => {
    setD(readCheckout());
  }, []);

  const greeting = d?.firstName
    ? c.greetingNamed.replace("{name}", d.firstName)
    : c.greeting;

  return (
    <section className="m7-wrap oc">
      <div className="oc__intro text-center">
        <div className="oc-rise">
          <CheckMark />
        </div>

        <h1 className="oc-rise oc__title text-balance">
          {greeting}
          <br />
          {c.titleTail}
        </h1>

        <p className="oc-rise oc__lede">{c.lede}</p>

        {d && (
          <div className="oc-rise oc-summary">
            <SummaryRow k={c.summaryLabels.ref} v={d.ref} />
            <SummaryRow
              k={c.summaryLabels.name}
              v={`${d.firstName} ${d.lastName}`.trim()}
            />
            <SummaryRow k={c.summaryLabels.phone} v={d.phone} />
            <SummaryRow k={c.summaryLabels.email} v={d.email} />
            <SummaryRow k={c.summaryLabels.address} v={d.address} last />
          </div>
        )}
      </div>

      <div className="oc-next">
        <div className="oc-next__eyebrow text-center uppercase">
          {c.nextEyebrow}
        </div>

        <div className="oc-steps relative grid">
          {c.steps.map((s) => (
            <div key={s.num} className="oc-step oc-rise relative">
              <span className="oc-step__dot absolute top-0 left-0" aria-hidden="true" />
              <div className="oc-step__num">{s.num}</div>
              <div className="oc-step__title">{s.title}</div>
              <div className="oc-step__body">{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="oc-rise oc-actions flex flex-wrap justify-center">
        {c.actions.map((a) => (
          <ArrowButton
            key={a.label}
            label={a.label}
            href={a.href}
            variant={VARIANT[a.variant as keyof typeof VARIANT] ?? "fill"}
          />
        ))}
      </div>
    </section>
  );
}
