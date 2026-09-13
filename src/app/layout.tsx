import type { Metadata } from "next";
import {
  Alegreya,
  Inter,
  Outfit,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";
import { SiteShell } from "@/components/site/SiteShell";
// Order is the cascade, and main.scss HAS to come first.
//
// A cascade layer's position is fixed by where it is first mentioned, and
// Tailwind's PostCSS plugin strips a bare `@layer a, b, c;` ordering statement
// out of the file it processes -- so the order cannot be declared, only
// arranged. Importing globals.css first registers theme and utilities before
// main.scss registers base and components, which puts components AFTER
// utilities and makes every component class beat every utility: the exact
// inverse of the rule this architecture exists to enforce.
//
// main.scss first => base, components, theme, utilities. Utilities last,
// utilities win.
//
// legacy.css stays last and stays unlayered, so it still outranks both until
// each of its routes is ported out of it. It shrinks to nothing by Phase 5.
import "./scss/main.scss";
import "./globals.css";
import "./legacy.css";

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

/* ── v2 routes only ─────────────────────────────────────────────────────────
 * Two extra faces, added ALONGSIDE the three above (which v1 depends on and
 * which are untouched — `/shop`, `/cart`, `/checkout`, `/product`,
 * `/contact`, `/green-energy` and `/smart-home` are all still v1). They stand in for the reference site's licensed type:
 * Alegreya for display headings, Outfit for body/UI. Outfit also carries the
 * small uppercase labels now — JetBrains Mono, the label face, was removed
 * (see CLAUDE.md's Typography table); do not reintroduce
 * `--font-jetbrains-mono` here without re-adding every reference to it.
 * Exposed via `V2_FONT` in `src/lib/theme-v2.ts`.
 */
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
      className={`${spaceGrotesk.variable} ${outfit.variable} ${spaceMono.variable} ${alegreya.variable} ${inter.variable}`}
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
