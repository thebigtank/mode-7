import type { Metadata } from "next";
import { BestSellers } from "@/components/smart-home/BestSellers";
import { CategoryShowcase } from "@/components/smart-home/CategoryShowcase";
import { MediaBanner } from "@/components/smart-home/MediaBanner";
import { WorksTogether } from "@/components/smart-home/WorksTogether";
import { Hero2 } from "@/components/page/Hero2";
import content from "@/content/smart-home.json";

export const metadata: Metadata = {
  title: "Smart Home — Mode 7",
  description:
    "Smart bulbs, switches, plugs, sensors, cameras and voice control — premium automation gear, vetted and sealed.",
};

export default function SmartHomePage() {
  const { hero, categories } = content;
  return (
    <div className="smart-home-page">
      <Hero2
        content={{
          eyebrow: hero.overline,
          title: hero.title,
          lede: hero.intro,
          cta: "Shop Smart Home",
          ctaHref: "/shop",
          meta: [...hero.meta, `${categories.length} categories`],
          second: {
            image: {
              src: hero.second.image.src,
              portraitSrc: hero.second.image.portraitSrc,
              alt: hero.second.image.alt,
              width: 160,
              height: 160,
              portraitWidth: 160,
              portraitHeight: 160,
            },
            h: hero.second.h,
            lede: hero.second.lede,
            ctaPrimary: hero.second.ctaPrimary,
            ctaPrimaryHref: "/shop",
            ctaSecondary: hero.second.ctaSecondary,
            ctaSecondaryHref: "#works",
            cardNumber: `${categories.length}`,
            cardLabel: hero.second.cardLabel,
          },
        }}
      />
      <MediaBanner label="SMART HOME — CONNECTED LIVING ROOM" />
      <CategoryShowcase />
      <BestSellers />
      <WorksTogether />
    </div>
  );
}
