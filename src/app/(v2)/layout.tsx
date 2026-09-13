import type { ReactNode } from "react";
import { V2Chrome } from "@/components/site/V2Chrome";

export default function V2Layout({ children }: { children: ReactNode }) {
  return <V2Chrome>{children}</V2Chrome>;
}
