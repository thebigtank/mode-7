import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Alegreya,
  Inter,
  Outfit,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";

// latin-ext carries U+20A6, the Naira sign. Without it the naira falls back to
// a system face and stops matching the rest of the type.
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

// v2's two faces, registered ALONGSIDE the three above rather than instead of
// them -- v1 typography is untouched. Alegreya is the display face; Outfit
// carries body, UI and the small uppercase labels. JetBrains Mono was the
// label face and was removed: do not reintroduce --font-jetbrains-mono here
// without re-adding every reference to it. A font-family whose var() no longer
// resolves is dropped ENTIRELY rather than falling through to the fallbacks
// written beside it.
const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-alegreya",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const FONT_VARIABLES = [
  spaceGrotesk.variable,
  outfit.variable,
  spaceMono.variable,
  alegreya.variable,
  inter.variable,
].join(" ");

export const siteMetadata: Metadata = {
  title: "Mode 7 — Powering your home, your pocket, and your future.",
  description:
    "The trusted ecosystem for certified refurbished devices, smart home automation, and solar energy. Every unit vetted, sealed, and guaranteed.",
};

// One <html>/<body> pair, shared by the two public route groups.
//
// There is no src/app/layout.tsx: Payload's admin renders its own document,
// and two <html> elements cannot nest. Next supports that by dropping the
// single root layout and giving each route group one of its own, which is what
// (v1), (v2) and (payload) each do. This keeps the markup identical between
// the two public groups rather than duplicating it.
export function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={FONT_VARIABLES}>
      <body>{children}</body>
    </html>
  );
}
