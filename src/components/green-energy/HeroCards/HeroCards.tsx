import type { CSSProperties } from "react";
import { Glyph, type GlyphName } from "@/components/page/ServiceIcons";
import content from "@/content/green-energy.json";
import { stripe } from "@/lib/theme";

const heroCards = content.heroCards as { icon: GlyphName; title: string; sub: string }[];

export function HeroCards() {
  return (
    <div className="ge-herocards">
      <div className="ge-herocards__grid grid">
        {heroCards.map((c) => (
          <div key={c.title} className="ge-herocard" style={{ "--stripe-bg": stripe() } as CSSProperties}>
            <div className="ge-herocard__scrim" />
            <div className="ge-herocard__icon flex items-center justify-center">
              <Glyph name={c.icon} size={24} stroke="var(--color-m7-neutral-ink)" />
            </div>
            <div className="ge-herocard__body">
              <div className="ge-herocard__title">{c.title}</div>
              <div className="ge-herocard__sub">{c.sub}</div>
              <span className="ge-herocard__cta inline-flex items-center">
                Explore More <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
