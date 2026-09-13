import { ContactAside } from "@/components/contact/ContactAside";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactMessage() {
  return (
    <section className="contact-section">
      <div className="contact-message__grid">
        <ContactForm />
        <ContactAside />
      </div>
    </section>
  );
}
