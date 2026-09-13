import { Hero2 } from "@/components/page/Hero2";
import content from "@/content/smart-home.json";

export function SmartHomeHero() {
  const { hero } = content;
  return (
    <Hero2
      content={{
        title: hero.title,
        lede: hero.intro,
        cta: hero.cta,
        ctaHref: hero.ctaHref,
        showMeta: false,
        showCard: false,
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
        },
      }}
    />
  );
}
