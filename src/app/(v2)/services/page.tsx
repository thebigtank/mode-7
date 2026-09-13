import type { Metadata } from "next";
import { CategoryNav } from "@/components/services/CategoryNav";
import { CoreSection } from "@/components/services/CoreSection";
import { Faq } from "@/components/services/Faq";
import { ServicesLifestyle } from "@/components/services/ServicesLifestyle";
import { SmartHomeSection } from "@/components/services/SmartHomeSection";
import { SolarSection } from "@/components/services/SolarSection";
import { TradeInSection } from "@/components/services/TradeInSection";
import { Hero2 } from "@/components/page/Hero2";
import content from "@/content/services.json";

export const metadata: Metadata = {
  title: "Services — Mode 7",
  description:
    "From flagship launches to certified refurbished, instant trade-ins to concierge checkout — the premium tech store built around how you buy.",
};

export default function ServicesPage() {
  const { hero, core } = content;
  return (
    <div className="services-page">
      <Hero2
        content={{
          eyebrow: hero.eyebrow,
          title: hero.title,
          lede: hero.intro,
          cta: hero.actions[0].label,
          ctaHref: hero.actions[0].href,
          meta: [...hero.meta, `${core.categories.length} categories`],
          second: {
            image: {
              src: hero.second.image.src,
              portraitSrc: hero.second.image.portraitSrc,
              alt: hero.second.image.alt,
              width: 1600,
              height: 1000,
              portraitWidth: 1600,
              portraitHeight: 1000,
            },
            h: hero.second.h,
            lede: hero.second.lede,
            ctaPrimary: hero.second.ctaPrimary,
            ctaPrimaryHref: hero.actions[0].href,
            ctaSecondary: hero.second.ctaSecondary,
            ctaSecondaryHref: hero.actions[1].href,
            cardNumber: core.wallStat.value,
            cardLabel: core.wallStat.label,
          },
        }}
      />
      {/* <ServicesLifestyle /> */}
      <CategoryNav />
      <CoreSection />
      <SmartHomeSection />
      <SolarSection />
      <TradeInSection />
      <Faq />
    </div>
  );
}
