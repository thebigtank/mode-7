import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Mono } from "@/components/ui/Mono";

export interface Hero2Content {
  eyebrow: string;
  title: string;
  lede: string;
  cta: string;
  ctaHref: string;
  meta: string[];
  second: {
    image: {
      src: string;
      portraitSrc: string;
      alt: string;
      width: number;
      height: number;
      portraitWidth: number;
      portraitHeight: number;
    };
    h: string;
    lede: string;
    ctaPrimary: string;
    ctaPrimaryHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    cardNumber: string;
    cardLabel: string;
  };
}

export function Hero2({ content }: { content: Hero2Content }) {
  return (
    <>
      <section className="hero2-top">
        <div className="hero2-wrap">
          <div className="hero2-grid grid">
            <div className="hero2-stack grid" data-rv>
              <Mono dot>{content.eyebrow}</Mono>
              <h1 className="hero2-h1">{content.title}</h1>
            </div>
            <div className="hero2-stack grid" data-rv>
              <p className="hero2-lede">{content.lede}</p>
              <div>
                <ButtonV2 label={content.cta} variant="fill" href={content.ctaHref} />
              </div>
            </div>
          </div>

          <div className="hero2-meta flex flex-wrap" data-rv>
            {content.meta.map((m) => (
              <span className="hero2-label uppercase" key={m}>{m}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="hero2-band" data-rv>
        <picture>
          <source
            media="(max-width: 900px)"
            srcSet={content.second.image.portraitSrc}
            width={content.second.image.portraitWidth}
            height={content.second.image.portraitHeight}
          />
          <img
            className="hero2-band__img block"
            src={content.second.image.src}
            width={content.second.image.width}
            height={content.second.image.height}
            alt={content.second.image.alt}
          />
        </picture>
        <div className="hero2-band__content">
          <Mono dot tone="white">{content.eyebrow}</Mono>
          <h2 className="hero2-band__h">{content.second.h}</h2>
          <p className="hero2-band__lede">{content.second.lede}</p>
          <div className="hero2-band__actions flex flex-wrap">
            <ButtonV2
              label={content.second.ctaPrimary}
              variant="fill"
              href={content.second.ctaPrimaryHref}
            />
            <ButtonV2
              label={content.second.ctaSecondary}
              variant="outline"
              href={content.second.ctaSecondaryHref}
              onDark
              borderStrong
            />
          </div>
        </div>
        <div className="hero2-band__card">
          <div className="hero2-band__card-n">{content.second.cardNumber}</div>
          <div className="hero2-band__card-l">{content.second.cardLabel}</div>
        </div>
      </div>
    </>
  );
}
