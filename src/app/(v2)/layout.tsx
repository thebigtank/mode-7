import type { ReactNode } from "react";
import "../scss/base.scss";
import "../legacy.css";
import "../scss/main.scss";
import "../globals.css";
import { Document, siteMetadata } from "../document";
import { V2Chrome } from "@/components/chrome/V2Chrome";

export const metadata = siteMetadata;

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <Document>
      <V2Chrome>{children}</V2Chrome>
    </Document>
  );
}
