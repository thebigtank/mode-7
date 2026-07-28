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
import { FONT } from "@/lib/theme";

/**
 * Checkout on WhatsApp.
 *
 * There is no card form and no backend — an agent takes the order from here —
 * but they still need to know who you are and where the bag is going. So the
 * button opens a short KYC form, and only once that is filled does it hand off
 * to the confirmation page.
 *
 * Details travel in sessionStorage rather than the URL; see `@/lib/contact`.
 */

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
    style: {
      width: "100%",
      fontFamily: FONT.body,
      fontSize: 15,
      lineHeight: 1.4,
      color: "#121212",
      background: "#fff",
      border: `1px solid ${show ? "#121212" : "#d6d6d6"}`,
      borderStyle: show ? ("dashed" as const) : ("solid" as const),
      borderRadius: 4,
      padding: "11px 14px",
      resize: "vertical" as const,
    },
  };

  return (
    <div style={{ gridColumn: span ? "1 / -1" : undefined }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: "#8a8a8a",
          marginBottom: 7,
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={3} />
      ) : (
        <input {...shared} type={type} />
      )}
      {/* reserves its line so nothing reflows when an error appears */}
      <div
        style={{
          minHeight: 15,
          marginTop: 5,
          fontFamily: FONT.mono,
          fontSize: 10,
          letterSpacing: 0.5,
          color: show ? "#121212" : "transparent",
        }}
      >
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
    // Lenis drives the page itself, so overflow:hidden alone doesn't hold it
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
    // Ref is stamped here, in the handler — never during render.
    saveCheckout({ ...d, ref: makeOrderRef() });
    router.push("/checkout");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout details"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(18,18,18,0.42)",
        backdropFilter: "blur(3px)",
        animation: "m7aiFade .2s ease both",
      }}
      className="m7-modal"
    >
      <form
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        noValidate
        className="m7-modal__panel"
        data-lenis-prevent
        style={{
          outline: "none",
          width: "min(600px, 100%)",
          maxHeight: "min(88dvh, 860px)",
          overflowY: "auto",
          background: "#fff",
          border: "1px solid #121212",
          borderRadius: 6,
          boxShadow: "0 32px 80px -28px rgba(0,0,0,.5)",
          animation: "m7aiIn .26s cubic-bezier(.23,1,.32,1) both",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "14px 22px",
            borderBottom: "1px solid #ececec",
            background: "#fafafa",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: "#8a8a8a",
            }}
          >
            Checkout · your details
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-cursor="grow"
            style={{
              background: "none",
              border: 0,
              cursor: "pointer",
              fontSize: 20,
              lineHeight: 1,
              color: "#8a8a8a",
              padding: 4,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: "24px 26px 26px" }}>
          <div
            style={{
              fontFamily: FONT.head,
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: "-0.8px",
            }}
          >
            Where should we send it?
          </div>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "#6a6a6a",
              margin: "10px 0 0",
              maxWidth: "48ch",
            }}
          >
            An agent picks this up and messages you on WhatsApp to confirm stock,
            the final figure and delivery. Nothing is charged here.
          </p>

          <div className="m7-kyc" style={{ display: "grid", marginTop: 22 }}>
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

          {/* only after a blocked submit — never pre-emptively */}
          {attempted && !ok && (
            <div
              style={{
                marginTop: 6,
                marginBottom: 4,
                fontFamily: FONT.mono,
                fontSize: 10.5,
                letterSpacing: 0.6,
                color: "#121212",
              }}
            >
              {bad.length} field{bad.length > 1 ? "s" : ""} still to fill in.
            </div>
          )}

          <button
            type="submit"
            data-cursor="grow"
            disabled={submitting}
            style={{
              width: "100%",
              marginTop: 16,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "#121212",
              color: "#fff",
              border: 0,
              borderRadius: 4,
              padding: "15px 20px",
              fontFamily: FONT.body,
              fontSize: 16,
              fontWeight: 500,
              cursor: submitting ? "default" : "pointer",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "Sending to an agent…" : "Send my order to an agent"}
          </button>

          <div
            style={{
              marginTop: 14,
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: 0.6,
              color: "#b4b4b4",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Used only to fulfil this order. No card details are taken on this site.
          </div>
        </div>
      </form>
    </div>
  );
}

/** The cart's checkout CTA, styled to match ArrowButton's filled variant. */
export function CheckoutButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* a real <button>, not a styled span — it has to be reachable by
          keyboard, and the trap needs something to hand focus back to */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="grow"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "#121212",
          color: "#fff",
          border: 0,
          borderRadius: 4,
          padding: "13px 20px",
          fontFamily: FONT.body,
          fontSize: 16,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Checkout on WhatsApp
      </button>
      {open && <CheckoutModal onClose={() => setOpen(false)} />}
    </>
  );
}
