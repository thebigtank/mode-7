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
