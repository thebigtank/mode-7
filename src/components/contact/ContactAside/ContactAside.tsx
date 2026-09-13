import type { CSSProperties } from "react";
import content from "@/content/contact.json";

export function ContactAside() {
  return (
    <div className="contact-aside flex flex-col">
      <div className="contact-card">
        <div className="contact-card__title">{content.channels.title}</div>
        <div className="contact-channels flex flex-col">
          {content.channels.items.map((c) => (
            <div key={c} className="contact-channel flex items-center">
              <div className="contact-channel__avatar" />
              <div className="contact-channel__name">{c}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-card">
        <div className="contact-card__title">{content.hours.title}</div>
        <div className="contact-hours flex flex-col">
          {content.hours.items.map((h) => (
            <div key={h.day} className="contact-hours__row flex justify-between">
              <span className="contact-hours__day">{h.day}</span>
              <span className="contact-hours__time">{h.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
