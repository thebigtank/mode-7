import type { ReactNode } from "react";
// Import order IS the cascade order -- see the note in (v2)/layout.tsx.
import "../scss/base.scss";
import "../legacy.css";
import "../scss/main.scss";
import "../globals.css";
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
