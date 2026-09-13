import type { ReactNode } from "react";
import { V1Chrome } from "@/components/site/V1Chrome";

export default function V1Layout({ children }: { children: ReactNode }) {
  return <V1Chrome>{children}</V1Chrome>;
}
