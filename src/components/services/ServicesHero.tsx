import { Hero2 } from "@/components/page/Hero2";
import content from "@/content/services.json";

export function ServicesHero() {
  const { hero, core } = content;
  const primaryAction = hero.actions.find((a) => a.role === "primary")!;
  const secondaryAction = hero.actions.find((a) => a.role === "secondary")!;
  return (
    <Hero2
      content={{
        title: hero.title,
        lede: hero.intro,
        cta: primaryAction.label,
        ctaHref: primaryAction.href,
        meta: [...hero.meta, `${core.categories.length} categories`],
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
          cardNumber: core.wallStat.value,
          cardLabel: core.wallStat.label,
        },
      }}
    />
  );
}
