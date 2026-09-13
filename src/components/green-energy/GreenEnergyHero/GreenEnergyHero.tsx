import { ButtonV2 } from "@/components/ui/ButtonV2";
import content from "@/content/green-energy.json";

export function GreenEnergyHero() {
  const { hero } = content;
  return (
    <section className="ge-hero">
      <div className="text-center">
        <h1 className="ge-hero-h1 text-center">
          {hero.titleLine1}
          <br />
          {hero.titleLine2}
        </h1>
        <p className="ge-hero__intro">{hero.intro}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonV2 label={hero.primaryCta} variant="fill" href={hero.primaryCtaHref} />
          <ButtonV2 label={hero.secondaryCta} variant="outline" />
        </div>
      </div>
    </section>
  );
}
