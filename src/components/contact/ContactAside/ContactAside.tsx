import content from "@/content/contact.json";
import { stripe } from "@/lib/theme";

export function ContactAside() {
  return (
    <div className="contact-aside">
      <div className="contact-card">
        <div className="contact-card__title">{content.channels.title}</div>
        <div className="contact-channels">
          {content.channels.items.map((c) => (
            <div key={c} className="contact-channel">
              <div className="contact-channel__avatar" style={{ background: stripe() }} />
              <div className="contact-channel__name">{c}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-card">
        <div className="contact-card__title">{content.hours.title}</div>
        <div className="contact-hours">
          {content.hours.items.map((h) => (
            <div key={h.day} className="contact-hours__row">
              <span className="contact-hours__day">{h.day}</span>
              <span className="contact-hours__time">{h.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
