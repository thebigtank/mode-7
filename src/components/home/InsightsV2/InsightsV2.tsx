import type { CSSProperties } from "react";
import content from "@/content/home.json";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

export function InsightsV2() {
  const items = content.testimonials.slice(1, 4);
  const images = content.insightsImages;

  return (
    <Band ground="wash" className="v2-insights-band">
      <div className="v2-headrow v2-insights-headrow flex items-end justify-between">
        <div>
          <H2 className="v2-insights-heading">{content.insights.heading}</H2>
          <P className="v2-insights-body">{content.insights.body}</P>
        </div>
        <ButtonV2 label={content.insights.ctaLabel} href={content.insights.ctaHref} variant="ink" />
      </div>

      <div className="v2-articles grid items-start">
        {items.map((t, i) => (
          <article key={t.name}>
            <Mono dot tone="accent-text">
              {t.role}
            </Mono>
            <div
              aria-hidden
              className="v2-article-shot bg-cover bg-center"
              style={{ "--v2-article-shot": `url(${images[i]?.src ?? ""})` } as CSSProperties}
            />
            <h3 className="v2-article-name">{t.name}</h3>
            <P className="v2-article-quote">{`“${t.quote}”`}</P>
            <ArrowLink
              label={content.insights.readLabel}
              href="/about"
              color="var(--color-v2-accent-text)"
              className="v2-article-link"
            />
          </article>
        ))}
      </div>
    </Band>
  );
}
