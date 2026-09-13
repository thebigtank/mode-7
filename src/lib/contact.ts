
export const emailLooksValid = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

export const phoneLooksValid = (s: string) => s.replace(/\D/g, "").length >= 10;

export type CheckoutDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
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

export function checkoutIssues(d: Omit<CheckoutDetails, "ref">): CheckoutField[] {
  const bad: CheckoutField[] = [];
  if (d.firstName.trim().length < 2) bad.push("firstName");
  if (d.lastName.trim().length < 2) bad.push("lastName");
  if (!emailLooksValid(d.email)) bad.push("email");
  if (!phoneLooksValid(d.phone)) bad.push("phone");
  if (d.address.trim().length < 10) bad.push("address");
  return bad;
}

export const CHECKOUT_KEY = "m7:checkout";

export function saveCheckout(d: CheckoutDetails) {
  try {
    sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(d));
  } catch {
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

export function makeOrderRef(now = Date.now()): string {
  return `M7-C-${now.toString(36).slice(-5).toUpperCase()}`;
}
