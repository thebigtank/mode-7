"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import content from "@/content/checkout.json";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { lockPageScroll, unlockPageScroll } from "@/hooks/useLenis";
import {
  checkoutIssues,
  emptyCheckout,
  makeOrderRef,
  saveCheckout,
  type CheckoutField,
} from "@/lib/contact";

const FIELD_NAME = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  phone: "phone",
  address: "address",
} as const;

function Field({
  label,
  hint,
  value,
  invalid,
  onChange,
  type = "text",
  autoComplete,
  multiline,
  placeholder,
  span,
}: {
  label: string;
  hint: string;
  value: string;
  invalid: boolean;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  placeholder?: string;
  span?: boolean;
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);
  const show = touched && invalid;

  const shared = {
    id,
    value,
    placeholder,
    autoComplete,
    "aria-invalid": show,
    onBlur: () => setTouched(true),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    className: "checkout-field__input",
    "data-invalid": show || undefined,
  };

  return (
    <div className="checkout-field" data-span={span || undefined}>
      <label htmlFor={id} className="checkout-field__label block uppercase">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={3} />
      ) : (
        <input {...shared} type={type} />
      )}
      <div className="checkout-field__hint" data-shown={show || undefined}>
        {show ? hint : " "}
      </div>
    </div>
  );
}

export function CheckoutModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const panelRef = useRef<HTMLFormElement>(null);
  const [d, setD] = useState(emptyCheckout);
  const [submitting, setSubmitting] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const c = content.modal;

  const bad = checkoutIssues(d);
  const ok = bad.length === 0;

  useFocusTrap(panelRef);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    lockPageScroll();
    document.addEventListener("keydown", onKey);
    return () => {
      unlockPageScroll();
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const set = (patch: Partial<typeof d>) => setD((p) => ({ ...p, ...patch }));

  function submit(e: FormEvent) {
    e.preventDefault();
    setAttempted(true);
    if (!ok || submitting) return;
    setSubmitting(true);
    saveCheckout({ ...d, ref: makeOrderRef() });
    router.push("/checkout");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={c.dialogLabel}
      onClick={onClose}
      className="m7-modal checkout-modal fixed inset-0 z-[90000] flex justify-center"
    >
      <form
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        noValidate
        className="m7-modal__panel checkout-modal__panel overflow-y-auto"
        data-lenis-prevent
      >
        <div className="checkout-modal__head sticky top-0 z-[1] flex items-center justify-between">
          <span className="checkout-modal__head-label uppercase">{c.headLabel}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={c.closeLabel}
            className="checkout-modal__close cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="checkout-modal__body">
          <div className="checkout-modal__title">{c.title}</div>
          <p className="checkout-modal__lede">{c.lede}</p>

          <div className="checkout-modal__kyc grid">
            {c.fields.map((f) => {
              const name: CheckoutField | undefined =
                FIELD_NAME[f.name as keyof typeof FIELD_NAME];
              if (!name) return null;

              return (
                <Field
                  key={name}
                  label={f.label}
                  hint={f.hint}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder || undefined}
                  multiline={f.multiline}
                  span={f.span}
                  value={d[name]}
                  invalid={bad.includes(name)}
                  onChange={(v) => set({ [name]: v } as Partial<typeof d>)}
                />
              );
            })}
          </div>

          {attempted && !ok && (
            <div className="checkout-modal__warning">
              {bad.length} {bad.length > 1 ? c.warningMany : c.warningOne}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="checkout-modal__submit inline-flex items-center justify-center"
            data-submitting={submitting || undefined}
          >
            {submitting ? c.submitBusyLabel : c.submitLabel}
          </button>

          <div className="checkout-modal__foot text-center">{c.foot}</div>
        </div>
      </form>
    </div>
  );
}

export function CheckoutButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="checkout-button inline-flex items-center cursor-pointer"
      >
        {content.button.label}
      </button>
      {open && <CheckoutModal onClose={() => setOpen(false)} />}
    </>
  );
}
