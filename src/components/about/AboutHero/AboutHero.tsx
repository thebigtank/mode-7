import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Mono } from "@/components/ui/Mono";
import { logos } from "@/lib/content";
import content from "@/content/about.json";

export function AboutHero() {
  const { hero } = content;
  return (
    <>
      <section className="a-hero">
        <div className="a-wrap">
        <div className="a-hero__grid">
          <div className="a-stack" data-rv>
            <Mono dot>{hero.eyebrow}</Mono>
            <h1 className="a-hero-h1">{hero.h1}</h1>
          </div>
          <div className="a-stack" data-rv>
            <p className="a-lede">{hero.lede}</p>
            <div>
              <ButtonV2 label={hero.cta} variant="fill" href="/services" />
            </div>
          </div>
        </div>

        <div className="a-hero__meta" data-rv>
          {hero.meta.map((m) => (
            <span className="a-label" key={m}>{m}</span>
          ))}
          <span className="a-label">{logos.length} premium brands</span>
        </div>
        </div>
      </section>

      <div className="a-hero2" data-rv>
        <picture>
          <source
            media="(max-width: 900px)"
            srcSet={hero.second.image.portraitSrc}
            width={941}
            height={1672}
          />
          <img
            className="a-hero2__img"
            src={hero.second.image.src}
            width={1672}
            height={941}
            alt={hero.second.image.alt}
          />
        </picture>
        <div className="a-hero2__content">
          <Mono dot tone="white">{hero.eyebrow}</Mono>
          <h2 className="a-hero2__h">{hero.second.h}</h2>
          <p className="a-hero2__lede">{hero.second.lede}</p>
          <div className="a-hero2__actions">
            <ButtonV2 label={hero.second.ctaPrimary} variant="fill" href="/services" />
            <ButtonV2
              label={hero.second.ctaSecondary}
              variant="outline"
              href="/trade-in"
              onDark
              borderStrong
            />
          </div>
        </div>
        <div className="a-hero2__card">
          <div className="a-hero2__card-n">{hero.second.cardNumber}</div>
          <div className="a-hero2__card-l">{hero.second.cardLabel}</div>
        </div>
      </div>
    </>
  );
}
