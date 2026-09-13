import type { ReactNode } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { ChevronDownIcon } from "@/components/Icons";
import { Annotation } from "@/components/wireframe/Primitives";
import content from "@/content/contact.json";
import { WIREFRAME } from "@/lib/wireframe-config";

function Field({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="contact-field flex flex-col">
      <span className="contact-field__label uppercase">{name}</span>
      {children}
    </div>
  );
}

export function ContactForm() {
  const f = content.form.fields;

  return (
    <div className="contact-form">
      <div className="contact-eyebrow uppercase">{`// ${content.form.eyebrow}`}</div>
      <h2 className="contact-h2">{content.form.title}</h2>

      <div className="contact-form__fields flex flex-col">
        <div className="contact-form__row grid">
          <Field name={f.name.label}>
            <div className="contact-input">{f.name.placeholder}</div>
          </Field>
          <Field name={f.email.label}>
            <div className="contact-input">{f.email.placeholder}</div>
          </Field>
        </div>

        <Field name={f.enquiry.label}>
          <div className="contact-input flex items-center justify-between" data-variant="select">
            {f.enquiry.value}
            <span className="contact-input__chevron inline-flex">
              <ChevronDownIcon size={18} />
            </span>
          </div>
        </Field>

        <Field name={f.message.label}>
          <div className="contact-input" data-variant="textarea">
            {f.message.placeholder}
          </div>
        </Field>

        <div className="contact-form__submit flex items-center">
          <ArrowButton label={content.form.submit} variant="fill" />
          <span className="contact-form__note">{content.form.note}</span>
        </div>
      </div>

      {WIREFRAME.showAnnotations && (
        <Annotation
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            fontSize: 10,
            padding: "6px 13px",
          }}
        >
          {content.form.annotation}
        </Annotation>
      )}
    </div>
  );
}
