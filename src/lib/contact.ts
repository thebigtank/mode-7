/**
 * Contact/KYC shapes and validation, shared by the trade-in interview and the
 * WhatsApp checkout.
 *
 * Validation is deliberately permissive. The point is to catch a genuinely
 * unusable value, not to police formats — a strict email pattern or an
 * assumption about Nigerian phone shapes rejects real customers, and the cost
 * of a bad address here is one bounced message versus a lost order.
 */

export const emailLooksValid = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

/** At least 10 digits, ignoring spaces, dashes, brackets and a leading +. */
export const phoneLooksValid = (s: string) => s.replace(/\D/g, "").length >= 10;

/** What checkout collects before handing the bag to an agent. */
export type CheckoutDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  /** Order reference, stamped at submit time. */
  ref: string;
};

export type CheckoutField = keyof Omit<CheckoutDetails, "ref">;

export const emptyCheckout = (): Omit<CheckoutDetails, "ref"> => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
});

/** Which fields are not yet usable. Empty means good to submit. */
export function checkoutIssues(d: Omit<CheckoutDetails, "ref">): CheckoutField[] {
  const bad: CheckoutField[] = [];
  if (d.firstName.trim().length < 2) bad.push("firstName");
  if (d.lastName.trim().length < 2) bad.push("lastName");
  if (!emailLooksValid(d.email)) bad.push("email");
  if (!phoneLooksValid(d.phone)) bad.push("phone");
  if (d.address.trim().length < 10) bad.push("address");
  return bad;
}

/**
 * The order details survive the hop to the confirmation page in sessionStorage
 * rather than the URL — there is no backend in this wireframe, and a delivery
 * address does not belong in a query string or in browser history.
 */
export const CHECKOUT_KEY = "m7:checkout";

export function saveCheckout(d: CheckoutDetails) {
  try {
    sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(d));
  } catch {
    // private mode / storage disabled — the confirmation just falls back to
    // its generic copy, which is a soft landing rather than a broken one.
  }
}

export function readCheckout(): CheckoutDetails | null {
  try {
    const raw = sessionStorage.getItem(CHECKOUT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as CheckoutDetails;
    return d && typeof d.firstName === "string" ? d : null;
  } catch {
    return null;
  }
}

/**
 * Stamped in the submit handler, never during render — `Date.now()` in a render
 * pass would differ between the server and client trees.
 */
export function makeOrderRef(now = Date.now()): string {
  return `M7-C-${now.toString(36).slice(-5).toUpperCase()}`;
}
