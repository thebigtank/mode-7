import { MediaPanel } from "@/components/page/MediaPanel";
import content from "@/content/contact.json";

export function StoreLocator() {
  return (
    <section className="contact-section">
      <div className="contact-eyebrow uppercase">{`// ${content.stores.eyebrow}`}</div>
      <h2 className="contact-h2">{content.stores.title}</h2>

      <div className="store-locator__map">
        <MediaPanel
          label={content.stores.mapLabel}
          height={420}
          annotation={content.stores.mapAnnotation}
        />
      </div>

      <div className="store-locator__grid grid">
        {content.stores.items.map((s) => (
          <div key={s.city} className="store-card">
            <div className="store-card__city">{s.city}</div>
            <div className="store-card__address">{s.address}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
