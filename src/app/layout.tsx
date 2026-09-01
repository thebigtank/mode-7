import type { Metadata } from "next";
import {
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Outfit,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";
import { SiteShell } from "@/components/site/SiteShell";
import "./globals.css";

// latin-ext carries U+20A6, the Naira sign. Without it ₦ falls back to a
// system face and stops matching the rest of the type.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

/* ── /homepage-v2 only ──────────────────────────────────────────────────────
 * Three extra faces, added ALONGSIDE the three above (which v1 depends on and
 * which are untouched). They stand in for the reference site's licensed type:
 * Instrument Serif for display headings, Inter for body/UI, JetBrains Mono for
 * the small uppercase labels. Exposed via `V2_FONT` in `src/lib/theme-v2.ts`.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mode 7 — Powering your home, your pocket, and your future.",
  description:
    "The trusted ecosystem for certified refurbished devices, smart home automation, and solar energy. Every unit vetted, sealed, and guaranteed.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} ${spaceMono.variable} ${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
