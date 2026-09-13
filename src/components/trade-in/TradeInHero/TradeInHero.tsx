import { Mono } from "@/components/ui/Mono";
import content from "@/content/trade-in.json";

export function TradeInHero() {
  const { hero } = content;

  return (
    <section className="t-wrap t-hero">
      <div className="max-w-[62ch]">
        <Mono dot className="mb-4">
          {hero.eyebrow}
        </Mono>
        <h1 className="t-dhero">
          {hero.titleLine1}
          <br />
          {hero.titleLine2}
        </h1>
        <p className="t-lede mt-[22px]">{hero.lede}</p>
        <div className="t-tick flex flex-wrap">
          {hero.ticks.map((tick) => (
            <span className="t-label uppercase" key={tick}>
              {tick}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
