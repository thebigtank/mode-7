import type { Metadata } from "next";
import { Bento } from "@/components/about/Bento";
import { ConditionsSection } from "@/components/about/ConditionsSection";
import { RevealController } from "@/components/about/RevealController";
import { ServeSection } from "@/components/about/ServeSection";
import { SpecSheet } from "@/components/about/SpecSheet";
import { StatRow } from "@/components/about/StatRow";
import { WhySection } from "@/components/about/WhySection";
import { Hero2 } from "@/components/page/Hero2";
import { logos } from "@/lib/content";
import content from "@/content/about.json";

export const metadata: Metadata = {
  title: "About — Mode 7",
  description:
    "Mode 7 is a technology hub built on one observation: buying a device, powering it and upgrading it are separate problems, and almost nobody solves them together.",
};

export default function AboutPage() {
  const { hero } = content;
  return (
    <div className="about-page">
      <RevealController />
      <Hero2
        content={{
          eyebrow: hero.eyebrow,
          title: hero.h1,
          lede: hero.lede,
          cta: hero.cta,
          ctaHref: "/services",
          meta: [...hero.meta, `${logos.length} premium brands`],
          second: {
            image: {
              src: hero.second.image.src,
              portraitSrc: hero.second.image.portraitSrc,
              alt: hero.second.image.alt,
              width: 1672,
              height: 941,
              portraitWidth: 941,
              portraitHeight: 1672,
            },
            h: hero.second.h,
            lede: hero.second.lede,
            ctaPrimary: hero.second.ctaPrimary,
            ctaPrimaryHref: "/services",
            ctaSecondary: hero.second.ctaSecondary,
            ctaSecondaryHref: "/trade-in",
            cardNumber: hero.second.cardNumber,
            cardLabel: hero.second.cardLabel,
          },
        }}
      />
      <WhySection />
      <ConditionsSection />
      <StatRow />
      <ServeSection />
      <Bento />
      <SpecSheet />
    </div>
  );
}
