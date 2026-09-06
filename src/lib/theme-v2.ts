/**
 * Palette for `/homepage-v2` ONLY.
 *
 * This is a parallel exploration: it reproduces the section structure and
 * colour palette of a reference homepage while carrying Mode 7's own content.
 * It lives in its own file so these values can never contaminate the Mode 7
 * design tokens in `src/lib/theme.ts` — the two palettes must not mix. Nothing
 * outside `src/components/home-v2`, `src/app/homepage-v2` and the single v2
 * branch in `SiteShell.tsx` should import from here.
 *
 * Typefaces: v2 uses its OWN stack, `V2_FONT` below — Alegreya / Inter /
 * Outfit, registered in `src/app/layout.tsx` alongside (never instead of)
 * the three v1 faces. v1's `FONT` is untouched. JetBrains Mono was the
 * label/eyebrow face until it was dropped in favour of the body face,
 * Outfit — see `V2_FONT.mono` below and CLAUDE.md's Typography table.
 *
 * ── THE ACCENT RULE (load-bearing) ──────────────────────────────────────────
 *
 * The accent is Mode 7's gold #F0C044. Measured: **1.40:1 on `wash`**,
 * **1.70:1 on `white`**, **10.02:1 on `ink`**.
 *
 * GOLD IS A GROUND, NOT A TEXT COLOUR — EXCEPT ON INK. It is a light colour,
 * so it behaves the opposite way to a mid-dark accent: it cannot mark a light
 * surface, it can only *be* a light surface. Concretely:
 *
 *   1. Use `accent` as a FILL — buttons, the CTA card, the hero highlight
 *     swash — always with `accentOn` (#1C150F) as the text on top. 10.02:1.
 *   2. Gold as TEXT is legal ONLY on the `ink` ground (10.02:1): the stats
 *     figures in the dark band, and accent labels inside any dark band.
 *   3. Gold as text on `wash` or `white` is FORBIDDEN AT ANY SIZE. 1.40:1 and
 *     1.70:1 fail even the 3:1 large-text floor — display scale does not
 *     rescue it. For small accent text on a light ground (link labels,
 *     category eyebrows) use `accentText` #79662F: 4.60:1 on wash, 5.59:1 on
 *     white. Large accent numerals on white use `accentText` too.
 *   4. White on gold is 1.70:1 — never do it. A gold-filled button takes an
 *     INK label, never a white one.
 *
 * Every other ratio quoted below is measured, not estimated.
 */

export const V2 = {
  /** Dark bands and primary text. 14.05:1 on `wash`, 17.07:1 on `white`. */
  ink: "#171D1D",
  /** The pale grey-green light band — the page's default ground. */
  wash: "#E6EAE6",
  /** A lighter variant of `wash`, for a band that needs to lift slightly. */
  washSoft: "#EDF0ED",
  /** Card ground lifted off `wash` / `washSoft`. */
  white: "#FFFFFF",
  /**
   * Mode 7 gold. A GROUND, not a text colour — see the accent rule above.
   * 1.40:1 on wash, 1.70:1 on white, 10.02:1 on ink.
   */
  accent: "#F0C044",
  /** What sits ON gold: labels, headings, button text. 10.02:1. */
  accentOn: "#1C150F",
  /**
   * Gold pushed dark enough to be small text on a LIGHT ground.
   * 4.60:1 on wash, 5.59:1 on white. Use wherever the accent has to be type
   * rather than a fill.
   */
  accentText: "#79662F",
  /** Secondary text on the light grounds. 5.21:1 on wash, 6.34:1 on white. */
  muted: "#5A6160",
  /** Secondary text on the `ink` bands. 7.75:1. */
  faint: "#AAB0AE",
  /**
   * Navy — not part of the core warm palette (that's `ink`/`wash`/`accent`),
   * added specifically for the `/services` category-pill nav, whose band
   * sits on `accent` gold. The gold rule above forbids gold-as-text on any
   * light ground and forbids white directly on gold (1.70:1); a pill nav on
   * a solid gold band still needs a THIRD colour to outline/label itself
   * with at rest, since `ink`/`accentOn` would both read as "the standard
   * dark-on-gold fill" rather than a distinct outline treatment. Chosen as a
   * deep, near-black blue — different enough from `ink`'s dark grey-green to
   * read as its own colour beside gold, dark enough to clear text contrast
   * on gold by a wide margin. Measured: 9.38:1 as text/border on `accent`
   * gold (comfortably past the 4.5:1 body floor and the 3:1 non-text/border
   * floor), 15.97:1 for `white` text on this as a fill (the pill's hover/
   * focus state — white only ever appears on this navy fill, never on gold
   * itself, per the gold rule's standing "never white on gold" rule).
   */
  navy: "#14213D",
} as const;

/**
 * Typefaces for `/homepage-v2` ONLY.
 *
 * Google-Fonts stand-ins for the reference site's three licensed faces:
 *   display  Serrif Condensed w300  ->  Alegreya 400
 *   body/UI  ABC Oracle w300-700    ->  Inter 300/400/500/700
 *   labels   Apercu Mono Pro w400   ->  JetBrains Mono 400/700, retired: the
 *                                       small uppercase labels now set in
 *                                       Outfit, the body face, with tracking
 *                                       retuned for a proportional face (see
 *                                       `V2_TYPE.mono` below and CLAUDE.md).
 *
 * Each name resolves to a CSS variable set on <html> by `next/font/google`.
 * The v1 `FONT` export in `@/lib/theme` is separate and unaffected.
 */
export const V2_FONT = {
  /** All display headings — h1, h2, card and row titles set in serif. */
  display: "var(--font-alegreya), Georgia, 'Times New Roman', serif",
  /** Body copy, navigation, buttons, card text. */
  body: "var(--font-outfit), var(--font-inter), system-ui, sans-serif",
  /**
   * Small uppercase labels and eyebrows. Was JetBrains Mono; now the SAME
   * stack as `body` — the mono face was retired and its uses moved to
   * Outfit (CLAUDE.md's Typography table has the reasoning). Kept as its
   * own key (rather than folding call sites onto `V2_FONT.body` directly)
   * because every label site also reads `V2_TYPE.mono` for a tracking value
   * distinct from body running copy — the two travel together.
   */
  mono: "var(--font-outfit), var(--font-inter), system-ui, sans-serif",
} as const;

/**
 * The measured type scale of the reference at a 1440px viewport. Sections read
 * from here rather than restating numbers, so the scale stays consistent.
 */
export const V2_TYPE = {
  h1: { fontSize: 64, lineHeight: "64px", letterSpacing: "-1.28px" },
  h2: { fontSize: 40, lineHeight: "48px", letterSpacing: "-0.4px" },
  h3: { fontSize: 20, lineHeight: "30px", letterSpacing: "-0.48px" },
  body: { fontSize: 16, lineHeight: "24px" },
  small: { fontSize: 13.6, lineHeight: "18px" },
  /**
   * Retuned for Outfit. 0.08em was chosen for JetBrains Mono, whose fixed
   * advance width already reads as "spaced out" at 12px uppercase — a
   * proportional face at the same tracking looks loose, gappy between wide
   * letter pairs (M, W) and cramped between narrow ones (I, l). Measured on
   * the rendered header/CTA/lifecycle labels at 1440 and 390: 0.04em holds
   * the same uppercase-label presence without the unevenness.
   */
  mono: { fontSize: 12, letterSpacing: "0.04em" },
} as const;

/** Inner container for every v2 section. Full-bleed ground, contained content. */
export const V2_CONTAINER = {
  /**
   * 1280 is the CONTENT width, not the border-box width: `content-box` keeps
   * the gutter outside it, so at 1440 the content runs 80 -> 1360 exactly as
   * the reference does. With the default `border-box` the gutter would eat
   * into the 1280 and shift every section 48px inward.
   */
  boxSizing: "content-box",
  maxWidth: 1280,
  margin: "0 auto",
  padding: "0 clamp(20px,4vw,48px)",
} as const;

/** Hairline on a light (`wash` / `washSoft` / `white`) ground. */
export const V2_HAIR = "1px solid rgba(23,29,29,0.14)";
/** Hairline on the `ink` bands. */
export const V2_HAIR_DARK = "1px solid rgba(255,255,255,0.14)";
