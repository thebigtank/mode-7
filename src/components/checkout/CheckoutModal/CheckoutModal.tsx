"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { lockPageScroll, unlockPageScroll } from "@/hooks/useLenis";
import {
  checkoutIssues,
  emptyCheckout,
  makeOrderRef,
  saveCheckout,
  type CheckoutField,
} from "@/lib/contact";

const HINTS: Record<CheckoutField, string> = {
  firstName: "Please enter your first name.",
  lastName: "Please enter your last name.",
  email: "That doesn’t look like an email address.",
  phone: "Please enter a reachable phone number.",
  address: "Please give a full delivery address we can find.",
};

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
      <label htmlFor={id} className="checkout-field__label">
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
      aria-label="Checkout details"
      onClick={onClose}
      className="m7-modal checkout-modal"
    >
      <form
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        noValidate
        className="m7-modal__panel checkout-modal__panel"
        data-lenis-prevent
      >
        <div className="checkout-modal__head">
          <span className="checkout-modal__head-label">Checkout · your details</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="checkout-modal__close"
          >
            ×
          </button>
        </div>

        <div className="checkout-modal__body">
          <div className="checkout-modal__title">Where should we send it?</div>
          <p className="checkout-modal__lede">
            An agent picks this up and messages you on WhatsApp to confirm stock,
            the final figure and delivery. Nothing is charged here.
          </p>

          <div className="m7-kyc checkout-modal__kyc">
            <Field
              label="First name"
              hint={HINTS.firstName}
              autoComplete="given-name"
              value={d.firstName}
              invalid={bad.includes("firstName")}
              onChange={(v) => set({ firstName: v })}
            />
            <Field
              label="Last name"
              hint={HINTS.lastName}
              autoComplete="family-name"
              value={d.lastName}
              invalid={bad.includes("lastName")}
              onChange={(v) => set({ lastName: v })}
            />
            <Field
              label="Email address"
              hint={HINTS.email}
              type="email"
              autoComplete="email"
              value={d.email}
              invalid={bad.includes("email")}
              onChange={(v) => set({ email: v })}
            />
            <Field
              label="Phone number"
              hint={HINTS.phone}
              type="tel"
              autoComplete="tel"
              placeholder="The number on WhatsApp"
              value={d.phone}
              invalid={bad.includes("phone")}
              onChange={(v) => set({ phone: v })}
            />
            <Field
              span
              multiline
              label="Delivery address"
              hint={HINTS.address}
              autoComplete="street-address"
              placeholder="Street, area, city and state"
              value={d.address}
              invalid={bad.includes("address")}
              onChange={(v) => set({ address: v })}
            />
          </div>

          {attempted && !ok && (
            <div className="checkout-modal__warning">
              {bad.length} field{bad.length > 1 ? "s" : ""} still to fill in.
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="checkout-modal__submit"
            data-submitting={submitting || undefined}
          >
            {submitting ? "Sending to an agent…" : "Send my order to an agent"}
          </button>

          <div className="checkout-modal__foot">
            Used only to fulfil this order. No card details are taken on this site.
          </div>
        </div>
      </form>
    </div>
  );
}

export function CheckoutButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="checkout-button">
        Checkout on WhatsApp
      </button>
      {open && <CheckoutModal onClose={() => setOpen(false)} />}
    </>
  );
}
