import { ArrowRightIcon } from "@/components/Icons";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import type { GlyphName } from "@/components/page/ServiceIcons";
import { BentoCell } from "@/components/services/BentoCell";
import { SectionHead } from "@/components/services/SectionHead";
import { StripeLabel } from "@/components/services/StripeLabel";
import content from "@/content/services.json";

export function SolarSection() {
  const { solar } = content;

  return (
    <section id="sec-solar" className="svc-solar w-full">
      <div className="svc-solar__wrap mx-auto">
        <SectionHead
          overline={solar.sectionHead.overline}
          title={solar.sectionHead.title}
          lede={solar.sectionHead.lede}
          maxWidth={720}
        />
        <div className="svc-solar__mosaic grid">
          <div className="svc-lift svc-tilestripe svc-solar__panels relative overflow-hidden">
            <StripeLabel>{solar.panels.stripeLabel}</StripeLabel>
            <div className="svc-solar__panels-copy absolute">
              <div className="svc-solar__panels-title">{solar.panels.title}</div>
              <div className="svc-solar__panels-sub">{solar.panels.sub}</div>
              <ButtonV2
                label={solar.panels.cta.label}
                variant="fill"
                href={solar.panels.cta.href}
              />
            </div>
          </div>

          <div className="svc-lift svc-tilestripe svc-solar__battery relative overflow-hidden">
            <StripeLabel>{solar.battery.stripeLabel}</StripeLabel>
            <div className="svc-solar__battery-copy absolute">
              <div className="svc-solar__battery-title">{solar.battery.title}</div>
              <div className="svc-solar__battery-sub">{solar.battery.sub}</div>
            </div>
            <span className="svc-solar__arrow absolute">
              <ArrowRightIcon size={20} strokeWidth={1.8} stroke="var(--color-v2-ink)" />
            </span>
          </div>

          <div className="svc-lift svc-tilestripe svc-solar__station relative overflow-hidden">
            <StripeLabel>{solar.powerStation.stripeLabel}</StripeLabel>
            <div className="svc-solar__station-copy absolute">
              <div className="svc-solar__station-title">{solar.powerStation.title}</div>
            </div>
            <span className="svc-solar__arrow absolute">
              <ArrowRightIcon size={20} strokeWidth={1.8} stroke="var(--color-v2-ink)" />
            </span>
          </div>

          {solar.cells.map((c) => (
            <BentoCell
              key={c.slot}
              slot={c.slot}
              icon={c.icon as GlyphName}
              title={c.title}
              sub={c.sub}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
