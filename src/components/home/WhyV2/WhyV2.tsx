import type { CSSProperties } from "react";
import content from "@/content/home.json";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

export function WhyV2() {
  return (
    <Band ground="wash" className="v2-why-band">
      <div className="v2-why-cols grid items-stretch">
        <div
          aria-hidden
          className="v2-why-shot bg-cover bg-center"
          style={{ "--v2-why-shot": `url(${content.why.image})` } as CSSProperties}
        />

        <div>
          <Mono dot tone="ink">
            {content.why.label}
          </Mono>
          <H2 className="v2-why-heading">{content.why.heading}</H2>
          <div className="v2-why-cta">
            <ButtonV2 label={content.why.ctaLabel} href={content.why.ctaHref} variant="ink" />
          </div>

          <div className="v2-why-list">
            {content.why.reasons.map((r) => (
              <div key={r.num} className="v2-reason grid items-start">
                <div className="v2-reason-num">{r.num}</div>
                <div>
                  <h3 className="v2-reason-title">{r.title}</h3>
                  <P className="v2-reason-body">{r.body}</P>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
