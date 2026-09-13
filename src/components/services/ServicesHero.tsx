import { Hero2 } from "@/components/page/Hero2";
import content from "@/content/services.json";

export function ServicesHero() {
  const { hero } = content;
  const primaryAction = hero.actions.find((a) => a.role === "primary")!;
  const secondaryAction = hero.actions.find((a) => a.role === "secondary")!;
  return (
    <Hero2
      content={{
        title: hero.title,
        lede: hero.intro,
        cta: primaryAction.label,
        ctaHref: primaryAction.href,
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
          ctaPrimaryHref: primaryAction.href,
          ctaSecondary: hero.second.ctaSecondary,
          ctaSecondaryHref: secondaryAction.href,
        },
      }}
    />
  );
}
