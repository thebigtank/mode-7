/**
 * Design tokens for the Mode 7 wireframe.
 *
 * Hard constraints carried over from the design system:
 *  - Colours: ONLY black #121212, white, and light greys. No other hues.
 *  - Headings: Space Grotesk 600 / letter-spacing -3px.
 *  - Body copy: Outfit, 18px.
 *  - Small labels + `▣` placeholder tags: Space Mono.
 *  - Near-pointy corners: every card/panel/button radius is 4px. Only circles
 *    (50%), pills (99px/999px) and the Seven widget keep their rounding.
 */

export const FONT = {
  /** Space Grotesk — headings and the `// Label` overlines. */
  head: "var(--font-space-grotesk), sans-serif",
  /** Outfit — all body copy, button labels, the giant footer wordmark. */
  body: "var(--font-outfit), sans-serif",
  /** Space Mono — annotation pills, ▣ placeholder tags, card accent sub-lines. */
  mono: "var(--font-space-mono), monospace",
} as const;

export const COLOR = {
  ink: "#121212",
  body: "#5a5a5a",
  muted: "#9a9a9a",
  line: "#ececec",
  paper: "#fff",
  wash: "#fafafa",
} as const;

/** Site container width. Used for the `max(48px, …)` bleed alignment trick. */
export const CONTAINER = 1320;

/**
 * Aligns a full-bleed element's inner edge to the 1320px site container.
 *
 * The gutter itself is `--m7-pad`, which clamps down on small screens — a hard
 * 48px floor here meant full-bleed rows kept a desktop-sized gutter on a phone.
 * Pass `pad` to scale the desktop end of that clamp; the mobile end stays at
 * the site minimum so gutters never disagree across components.
 */
export const containerPad = (pad = 48) => {
  const gutter =
    pad === 48 ? "var(--m7-pad)" : `clamp(20px, 4vw, ${pad}px)`;
  return `max(${gutter}, calc((100vw - ${CONTAINER}px)/2 + ${gutter}))`;
};

/** Diagonal light-grey striped image placeholder. */
export const stripe = (a = "#e8e8e8", b = "#f4f4f4", size = 9) =>
  `repeating-linear-gradient(135deg,${a} 0 ${size}px,${b} ${size}px ${size * 2}px)`;

/** Dark variant of the striped placeholder. */
export const stripeDark = (size = 9) => stripe("#1c1c1c", "#262626", size);
