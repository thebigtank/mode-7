import type { ReactNode } from "react";

export function StripeLabel({ children }: { children: ReactNode }) {
  return <div className="svc-stripe-label absolute z-[2]">▣ {children}</div>;
}
