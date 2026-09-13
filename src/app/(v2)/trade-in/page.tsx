import type { Metadata } from "next";
import { TradeInFaq } from "@/components/trade-in/TradeInFaq";
import { ValuationWorkspace } from "@/components/trade-in/ValuationWorkspace";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import { V2 } from "@/lib/theme-v2";

export const metadata: Metadata = {
  title: "Trade-In — Mode 7",
  description:
    "Answer a few questions and watch your device's value build itself, line by line — no black box, no lowball. Put the estimate straight toward your next device.",
};

const pricing = [
  {
    n: "01",
    t: "Live market data",
    b: "Base values track what devices actually resell for this week — not a stale table. The market line moves with real demand.",
  },
  {
    n: "02",
    t: "One number, one party",
    b: "The estimate you build is the offer we take to the valuations team. Same figure or better in most cases — you approve before anything moves.",
  },
  {
    n: "03",
    t: "No lowball, ever",
    b: "Every deduction is a named line item you can see and question. Nothing is subtracted quietly after you commit.",
  },
];

/** Never call this the "swap engine" — it is the Intelligent Trade-In Portal. */
export default function TradeInPage() {
  return (
    <div className="tradein-page">
      {/* ------------------------------------------------------------- hero */}
      <section className="t-wrap t-hero">
        <div className="max-w-[62ch]">
          <Mono dot style={{ marginBottom: 16 }}>
            Intelligent Trade-In Portal
          </Mono>
          <h1 className="t-dhero">
            Your device already
            <br />
            has a value.
          </h1>
          <p className="t-lede mt-[22px]">
            We just make it the honest one. Answer a few questions and watch the number build
            itself, line by line — no black box, no lowball, no submit-and-pray.
          </p>
          <div className="t-tick">
            <span className="t-label">≈ 60 seconds</span>
            <span className="t-label">Live market data</span>
            <span className="t-label">Trade toward any device</span>
            <span className="t-label">Vetted · Sealed · Guaranteed</span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- the one valuation surface */}
      <section className="t-wrap t-band t-band--valuation" id="value-your-device">
        <Mono dot style={{ marginBottom: 14 }}>
          Value your device
        </Mono>
        <h2 className="t-dl t-dl--spaced max-w-[22ch]">
          Tell us about it. Watch the number.
        </h2>
        <ValuationWorkspace />
      </section>

      {/* -------------------------------------------------------- how we price */}
      <section className="t-band t-band--wash">
        <div className="t-wrap">
          <Mono dot style={{ marginBottom: 14 }}>
            How the number is made
          </Mono>
          <h2 className="t-dl max-w-[20ch]">
            Every figure you saw is the whole story.
          </h2>
          <div className="t-price3">
            {pricing.map((p) => (
              <div className="t-pc" key={p.n}>
                <span className="t-pc__n">{p.n}</span>
                <div className="t-pc__t">{p.t}</div>
                <P>{p.b}</P>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- guarantee / faq */}
      <section className="t-band t-band--ink">
        <div className="t-wrap">
          <Mono dot color={V2.faint} style={{ marginBottom: 16 }}>
            Before you ask
          </Mono>
          <h2 className="t-dl max-w-[18ch]">
            Your device, valued the way we’d want ours valued.
          </h2>
          <TradeInFaq />
        </div>
      </section>
    </div>
  );
}
