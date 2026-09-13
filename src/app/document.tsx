import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Alegreya,
  Inter,
  Outfit,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";

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

export function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={FONT_VARIABLES}>
      <body>{children}</body>
    </html>
  );
}
