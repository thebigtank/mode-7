import type { ReactNode } from "react";
// See the note in (v2)/layout.tsx: main.scss before globals.css is what keeps
// Tailwind utilities winning over component classes, and legacy.css stays last
// and unlayered so unported routes keep rendering from it.
import "../scss/main.scss";
import "../globals.css";
import "../legacy.css";
import { Document, siteMetadata } from "../document";
import { V1Chrome } from "@/components/site/V1Chrome";

export const metadata = siteMetadata;

export default function V1Layout({ children }: { children: ReactNode }) {
  return (
    <Document>
      <V1Chrome>{children}</V1Chrome>
    </Document>
  );
}
