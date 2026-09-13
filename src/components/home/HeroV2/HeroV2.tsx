import type { CSSProperties } from "react";
import content from "@/content/home.json";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { HeroHeadlineV2 } from "@/components/home/HeroHeadlineV2Scramble";

function MarqueeSpark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path
        d="M12 1.5 C12 10.8 13.039 11.4 21.093 6.75 C13.039 11.4 13.039 12.6 21.093 17.25 C13.039 12.6 12 13.2 12 22.5 C12 13.2 10.961 12.6 2.907 17.25 C10.961 12.6 10.961 11.4 2.907 6.75 C10.961 11.4 12 10.8 12 1.5 Z"
        fill="rgba(28,21,15,0.6)"
      />
    </svg>
  );
}

function MarqueeItem({ name }: { name: string }) {
  return (
    <span className="v2-marquee-item flex items-center">
      <span className="v2-marquee-name">{name}</span>
      <MarqueeSpark />
    </span>
  );
}

export function HeroV2() {
  return (
    <section className="v2-hero-section">
      <div className="v2-hero-container box-content mx-auto">
        <div className="v2-hero-cols grid items-center">
          <div>
            <HeroHeadlineV2 />

            <p className="v2-hero-lede">{content.hero.paragraph}</p>

            <div className="v2-hero-actions flex flex-wrap">
              <ButtonV2 label={content.hero.ctaShop.label} href={content.hero.ctaShop.href} variant="fill" />
              <ButtonV2
                label={content.hero.ctaTradeIn.label}
                href={content.hero.ctaTradeIn.href}
                variant="outline"
              />
            </div>
          </div>

          <div
            className="v2-hero-shot"
            style={{ "--v2-hero-shot": `url(${content.hero.image})` } as CSSProperties}
          >
            <div aria-hidden className="v2-hero-play flex items-center justify-center">
              <span className="v2-hero-play-dot flex items-center justify-center">
                <svg width="24" height="28" viewBox="0 0 24 28" aria-hidden>
                  <path d="M3 2 22 14 3 26Z" fill="var(--color-v2-ink)" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="v2-marquee-wrap"
        role="group"
        aria-label={`Trusted by ${content.logos.length} brands: ${content.logos
          .map((l) => l.display)
          .join(", ")}`}
      >
        <div className="v2-marquee-track flex">
          <div className="v2-marquee-row flex items-center">
            {content.logos.map((l) => (
              <MarqueeItem key={`a-${l.name}`} name={l.display} />
            ))}
          </div>
          <div className="v2-marquee-row flex items-center" aria-hidden="true">
            {content.logos.map((l) => (
              <MarqueeItem key={`b-${l.name}`} name={l.display} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
