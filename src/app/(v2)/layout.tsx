import type { ReactNode } from "react";
// Order is the cascade, and main.scss HAS to come first.
//
// A cascade layer's position is fixed by where it is first mentioned, and
// Tailwind's PostCSS plugin strips a bare `@layer a, b, c;` ordering statement
// out of the file it processes -- so the order cannot be declared, only
// arranged. globals.css first would register theme and utilities before
// main.scss registers base and components, putting components AFTER utilities
// and making every component class beat every utility: the exact inverse of
// the rule this architecture exists to enforce.
//
// legacy.css stays last and stays unlayered, so it still outranks both until
// each of its routes is ported out of it.
import "../scss/main.scss";
import "../globals.css";
import "../legacy.css";
import { Document, siteMetadata } from "../document";
import { V2Chrome } from "@/components/site/V2Chrome";

export const metadata = siteMetadata;

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <Document>
      <V2Chrome>{children}</V2Chrome>
    </Document>
  );
}
