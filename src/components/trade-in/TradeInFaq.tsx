"use client";

import { useState } from "react";

/**
 * Trade-In FAQ accordion, on the dark guarantee band. First item opens by
 * default, matching the wireframe. Answers restate what the page already shows
 * rather than introducing new promises.
 */
const items = [
  {
    q: "How accurate is the live estimate?",
    a: "It’s a real range built from your answers and current market data — but it stays an estimate. Your photos and video narrow the range; only the valuations team can confirm a figure, and they do that after they’ve assessed the device.",
  },
  {
    q: "When does the estimate become a confirmed figure?",
    a: "Two ways. If the photos and video tell the team enough, they confirm the value from that evidence and email it to you, usually within 24 hours. Otherwise you bring the device to the office, they inspect it in person, and the value is confirmed on the spot.",
  },
  {
    q: "Why do I have to upload a video?",
    a: "The team values the device from what they can actually see. Three photos and a short video of all sides are required before an estimate can be submitted — without them there’s nothing to assess.",
  },
  {
    q: "How does the trade actually work?",
    a: "Your estimate comes off the price of the device you’re trading toward, and you bring the difference. Trade a device we estimate at ₦700,000 toward a ₦1,800,000 phone and you bring ₦1,100,000 — not the full price. Account credit isn’t automatic; if you’d rather have credit than a device, speak to the team.",
  },
  {
    q: "Why might a device be turned down?",
    a: "A device that won’t power on, has liquid damage, or is locked to a carrier or account can’t be valued automatically — you’ll see that the moment you tell us, with no wasted effort, plus a free responsible-recycling route.",
  },
  {
    q: "Is my data wiped?",
    a: "Every device we take in is securely wiped with certified data destruction before it’s renewed or recycled — whether or not it ends up eligible for trade.",
  },
];

export function TradeInFaq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="t-faq">
      {items.map((it, i) => (
        <div className="t-faqi" key={it.q}>
          <button
            type="button"
            className="t-faqi__b"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            {it.q}
          </button>
          <div className="t-faqi__p">
            <div className="t-faqi__pi">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
