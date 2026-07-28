/**
 * Naira formatting, shared by the trade-in engine and the shop catalogue.
 *
 * Digits are grouped by hand rather than via `toLocaleString`. Both callers
 * render inside client components, and a fixed formatter keeps output identical
 * regardless of the runtime's ICU data — so a figure can never differ between
 * the server pass and the client pass.
 */
export function formatNaira(n: number): string {
  const sign = n < 0 ? "−" : "";
  const digits = Math.abs(Math.round(n)).toString();
  let grouped = "";
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && (digits.length - i) % 3 === 0) grouped += ",";
    grouped += digits[i];
  }
  return `${sign}₦${grouped}`;
}
