import { ButtonV2 } from "@/components/ui/ButtonV2";
import { P } from "@/components/ui/P";
import { Glyph, ShieldCheck } from "@/components/page/ServiceIcons";
import type { GlyphName } from "@/components/page/ServiceIcons";
import { SectionHead } from "@/components/services/SectionHead";
import content from "@/content/services.json";

export function TradeInSection() {
  const { tradeIn } = content;

  return (
    <section id="sec-tradein" className="svc-tradein w-full">
      <div className="svc-tradein__wrap mx-auto">
        <SectionHead overline={tradeIn.sectionHead.overline} title={tradeIn.sectionHead.title} />

        <div className="svc-tradein__mosaic grid">
          <div className="svc-lift-dark svc-tradein__refurb flex flex-col">
            <div className="svc-tradein__refurb-top flex items-start justify-between">
              <Glyph name="refresh" size={32} stroke="var(--color-v2-white)" />
              <span className="svc-tradein__refurb-tag text-right uppercase">{tradeIn.refurb.tag}</span>
            </div>
            <div className="svc-tradein__refurb-title">{tradeIn.refurb.title}</div>
            <P size={18} color="var(--color-v2-faint)" className="svc-tradein__refurb-body">
              {tradeIn.refurb.body}
            </P>
            <div className="svc-tradein__refurb-bullets flex flex-col">
              {tradeIn.refurb.bullets.map((b) => (
                <div key={b} className="svc-tradein__refurb-bullet flex items-center">
                  <ShieldCheck stroke="var(--color-v2-faint)" />
                  {b}
                </div>
              ))}
            </div>
            <div className="svc-tradein__refurb-stat">
              <div className="svc-tradein__refurb-stat-value">{tradeIn.refurb.stat.value}</div>
              <div className="svc-tradein__refurb-stat-label">{tradeIn.refurb.stat.label}</div>
            </div>
          </div>

          {tradeIn.cards.map((c, i) => (
            <div
              key={c.title}
              data-slot={i === 0 ? "first" : "second"}
              className="svc-lift svc-card svc-tradein__card flex flex-col"
            >
              <div className="svc-tradein__card-top flex items-start justify-between">
                <Glyph name={c.icon as GlyphName} size={30} stroke="var(--color-v2-ink)" />
                <span className="svc-tradein__card-tag text-right uppercase">{c.tag}</span>
              </div>
              <div className="svc-tradein__card-title">{c.title}</div>
              <P size={18} className="svc-tradein__card-body">
                {c.body}
              </P>
              <div className="svc-tradein__card-foot uppercase">{c.foot}</div>
            </div>
          ))}

          <div className="svc-lift svc-card svc-tradein__wide flex flex-col justify-center items-start">
            <div className="svc-tradein__wide-eyebrow uppercase">{tradeIn.wide.eyebrow}</div>
            <div className="svc-tradein__wide-title">{tradeIn.wide.title}</div>
            <P size={18} className="svc-tradein__wide-body">
              {tradeIn.wide.body}
            </P>
            <ButtonV2 label={tradeIn.wide.cta.label} variant="fill" href={tradeIn.wide.cta.href} />
          </div>
        </div>
      </div>
    </section>
  );
}
