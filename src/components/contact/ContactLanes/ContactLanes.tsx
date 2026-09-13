import { ArrowButton } from "@/components/ArrowButton";
import content from "@/content/contact.json";

export function ContactLanes() {
  return (
    <section className="contact-section" data-lead>
      <div className="contact-eyebrow">{`// ${content.lanes.eyebrow}`}</div>
      <div className="contact-lanes__grid">
        {content.lanes.items.map((l) => (
          <div key={l.title} className="contact-lane">
            <svg
              className="contact-lane__icon"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            <div className="contact-lane__title">{l.title}</div>
            <p className="contact-lane__body">{l.body}</p>
            <div className="contact-lane__cta">
              <ArrowButton label={l.cta} variant="outline" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
