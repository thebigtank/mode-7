import { Hero2 } from "@/components/page/Hero2";
import { logos } from "@/lib/content";
import content from "@/content/about.json";

export function AboutHero() {
  const { hero } = content;
  return (
    <Hero2
      content={{
        title: hero.h1,
        lede: hero.lede,
        cta: hero.cta,
        ctaHref: hero.ctaHref,
        meta: [...hero.meta, `${logos.length} premium brands`],
        second: {
          image: {
            src: hero.second.image.src,
            portraitSrc: hero.second.image.portraitSrc,
            alt: hero.second.image.alt,
          },
          h: hero.second.h,
          lede: hero.second.lede,
          ctaPrimary: hero.second.ctaPrimary,
          ctaPrimaryHref: hero.second.ctaPrimaryHref,
          ctaSecondary: hero.second.ctaSecondary,
          ctaSecondaryHref: hero.second.ctaSecondaryHref,
          cardNumber: hero.second.cardNumber,
          cardLabel: hero.second.cardLabel,
        },
      }}
    />
  );
}
