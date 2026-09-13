import content from "@/content/home.json";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

export function CtaBandV2() {
  return (
    <Band ground="ink" className="v2-cta-band">
      <div className="v2-cta-cols grid items-start">
        <div>
          <Mono tone="white" className="v2-cta-label">
            {content.cta.label}
          </Mono>
          <H2 color="var(--color-v2-white)" className="v2-cta-heading">
            {content.cta.heading}
          </H2>
          <P color="var(--color-v2-faint)" className="v2-cta-body">
            {content.cta.body}
          </P>
        </div>

        <div>
          <div aria-hidden className="v2-cta-pills flex flex-wrap">
            {content.pillars.map((p) => (
              <span key={p.title} className="v2-cta-pill inline-flex items-center whitespace-nowrap">
                {p.title}
              </span>
            ))}
          </div>

          <div className="v2-cta-rule" />

          <ButtonV2 label={content.cta.ctaLabel} href={content.cta.ctaHref} variant="fill" />
        </div>
      </div>
    </Band>
  );
}
