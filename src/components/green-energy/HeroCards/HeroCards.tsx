import { Glyph, type GlyphName } from "@/components/page/ServiceIcons";
import { stripe } from "@/lib/theme";

const heroCards: { icon: GlyphName; title: string; sub: string }[] = [
  {
    icon: "sun",
    title: "Solar Power",
    sub: "High-efficiency panels, installed to code",
  },
  {
    icon: "battery",
    title: "Home Battery",
    sub: "Store cheap daytime energy for the peak",
  },
  {
    icon: "home",
    title: "Home Backup",
    sub: "Keep the whole home running through outages",
  },
];

export function HeroCards() {
  return (
    <div className="ge-herocards">
      <div className="ge-herocards__grid">
        {heroCards.map((c) => (
          <div key={c.title} className="ge-herocard" style={{ background: stripe() }}>
            <div className="ge-herocard__scrim" />
            <div className="ge-herocard__icon">
              <Glyph name={c.icon} size={24} stroke="var(--color-m7-neutral-ink)" />
            </div>
            <div className="ge-herocard__body">
              <div className="ge-herocard__title">{c.title}</div>
              <div className="ge-herocard__sub">{c.sub}</div>
              <span className="ge-herocard__cta">
                Explore More <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
