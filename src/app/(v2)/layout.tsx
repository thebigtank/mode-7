import type { ReactNode } from "react";
// Import order IS the cascade order, and it cannot be declared.
//
// A layer's position is fixed where it is first mentioned, and Tailwind's
// PostCSS plugin strips a bare `@layer a, b, c;` ordering statement out of the
// file it processes -- confirmed, including with the statement on line 1. So
// the order is arranged here instead:
//
//   base.scss    @layer base        resets and document defaults
//   legacy.css   @layer legacy      the original stylesheet, shrinking
//   main.scss    @layer components  everything ported so far
//   globals.css  @layer theme, utilities
//
// A ported component rule therefore beats a rule still in legacy.css, and a
// Tailwind utility beats both. Reordering these four lines silently inverts
// one of those and nothing errors.
import "../scss/base.scss";
import "../legacy.css";
import "../scss/main.scss";
import "../globals.css";
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
