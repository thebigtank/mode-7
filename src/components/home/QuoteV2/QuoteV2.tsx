import { Band } from "@/components/ui/Band";
import { Mono } from "@/components/ui/Mono";
import content from "@/content/home.json";

export function QuoteV2() {
  const t = content.testimonials[0];

  return (
    <Band ground="ink" className="v2-quote-band">
      <div className="v2-quote__cols grid items-center">
        <div>
          <Mono dot tone="white" className="v2-quote__label">
            {content.quote.label}
          </Mono>

          <blockquote className="v2-quote__text">{`“${t.quote}”`}</blockquote>

          <div className="v2-quote__by flex items-center">
            <div>
              <div className="v2-quote__name">{t.name}</div>
              <div className="v2-quote__role">{t.role}</div>
            </div>

            <span aria-hidden className="v2-quote__rule shrink-0" />

            <span
              aria-hidden
              className="v2-quote__avatar shrink-0 bg-cover bg-center"
            />
          </div>
        </div>

        <div
          aria-hidden
          className="v2-quote__portrait bg-cover bg-center"
        />
      </div>
    </Band>
  );
}
