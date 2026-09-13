import { ArrowRightIcon } from "@/components/Icons";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { P } from "@/components/ui/P";
import { Glyph } from "@/components/page/ServiceIcons";
import type { GlyphName } from "@/components/page/ServiceIcons";
import { CategoryTile } from "@/components/services/CategoryTile";
import { MiniRow } from "@/components/services/MiniRow";
import { SectionHead } from "@/components/services/SectionHead";
import { StripeLabel } from "@/components/services/StripeLabel";
import content from "@/content/services.json";

export function CoreSection() {
  const { core } = content;

  return (
    <section id="sec-premium" className="svc-core w-full">
      <div className="svc-core__wrap mx-auto">
        <SectionHead overline={core.sectionHead.overline} title={core.sectionHead.title} />

        <div className="svc-core__card grid overflow-hidden">
          <div className="svc-core__panel flex flex-col">
            <div className="svc-core__badges flex items-center">
              <span className="svc-core__badge uppercase">{core.badgeTag}</span>
              <span className="svc-core__badge-sub uppercase">{core.badgeSub}</span>
            </div>
            <h3 className="svc-core__title">{core.title}</h3>
            <P size={18} className="svc-core__body">
              {core.body}
            </P>
            <div className="svc-core__rows grid">
              {core.rows.map((r) => (
                <MiniRow key={r.title} icon={r.icon as GlyphName} title={r.title} sub={r.sub} />
              ))}
            </div>
            <div className="svc-core__footer flex items-center flex-wrap">
              <ButtonV2 label={core.cta.label} variant="fill" href={core.cta.href} />
              <span className="svc-core__note uppercase">{core.note}</span>
            </div>
          </div>

          <div className="svc-core__wall relative">
            <StripeLabel>{core.wallStripeLabel}</StripeLabel>
            <div className="svc-core__wall-stat absolute">
              <div className="svc-core__wall-stat-value">{core.wallStat.value}</div>
              <div className="svc-core__wall-stat-label">{core.wallStat.label}</div>
            </div>
          </div>
        </div>

        <div className="svc-core__categories grid">
          {core.categories.map((c) => (
            <CategoryTile key={c.label} label={c.label} sub={c.sub} icon={c.icon as GlyphName} />
          ))}
          <div className="svc-lift-dark svc-core__plus flex flex-col justify-between">
            <div className="svc-core__plus-eyebrow uppercase">{core.plusTile.eyebrow}</div>
            <div className="svc-core__plus-title">{core.plusTile.title}</div>
            <span className="svc-core__plus-cta inline-flex items-center">
              {core.plusTile.cta}
              <ArrowRightIcon size={16} strokeWidth={1.8} />
            </span>
          </div>
        </div>

        <div className="svc-lift svc-card svc-core__fleet flex items-center justify-between flex-wrap">
          <div className="svc-core__fleet-lead flex items-center">
            <Glyph name="briefcase" size={34} stroke="var(--color-v2-ink)" />
            <div>
              <div className="svc-core__fleet-eyebrow uppercase">{core.fleet.eyebrow}</div>
              <div className="svc-core__fleet-title">{core.fleet.title}</div>
              <P size={18} className="svc-core__fleet-body">
                {core.fleet.body}
              </P>
            </div>
          </div>
          <ButtonV2 label={core.fleet.cta.label} variant="outline" href={core.fleet.cta.href} />
        </div>
      </div>
    </section>
  );
}
