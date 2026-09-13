import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

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

export function PricingBand() {
  return (
    <section className="t-band t-band--wash">
      <div className="t-wrap">
        <Mono dot className="mb-[14px]">
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
  );
}
