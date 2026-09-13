import { ButtonV2 } from "@/components/ui/ButtonV2";
import type { GlyphName } from "@/components/page/ServiceIcons";
import { BentoCell } from "@/components/services/BentoCell";
import { SectionHead } from "@/components/services/SectionHead";
import { StripeLabel } from "@/components/services/StripeLabel";
import content from "@/content/services.json";

export function SmartHomeSection() {
  const { smartHome } = content;

  return (
    <section id="sec-smarthome" className="svc-smarthome w-full">
      <div className="svc-smarthome__wrap mx-auto">
        <SectionHead
          overline={smartHome.sectionHead.overline}
          title={smartHome.sectionHead.title}
          lede={smartHome.sectionHead.lede}
          maxWidth={720}
        />
        <div className="svc-smarthome__mosaic grid">
          <div className="svc-lift svc-tilestripe svc-smarthome__feature relative overflow-hidden">
            <StripeLabel>{smartHome.feature.stripeLabel}</StripeLabel>
            <div className="svc-smarthome__feature-copy absolute">
              <div className="svc-smarthome__feature-title">{smartHome.feature.title}</div>
              <div className="svc-smarthome__scenes flex flex-wrap">
                {smartHome.feature.scenes.map((s) => (
                  <span key={s} className="svc-smarthome__scene uppercase">
                    {s}
                  </span>
                ))}
              </div>
              <ButtonV2
                label={smartHome.feature.cta.label}
                variant="fill"
                href={smartHome.feature.cta.href}
              />
            </div>
          </div>
          {smartHome.cells.map((c) => (
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
