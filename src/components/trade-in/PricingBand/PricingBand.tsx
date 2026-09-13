import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import content from "@/content/trade-in.json";

const pricing = content.pricing;

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
        <div className="t-price3 grid">
          {pricing.map((p) => (
            <div className="t-pc grid" key={p.n}>
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
