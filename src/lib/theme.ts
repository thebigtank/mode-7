/**
 * Design tokens for Mode 7.
 *
 * Palette (supplied 2026-08-31), used the way the Gradient reference uses its
 * own: as a set of FULL-WIDTH SECTION GROUNDS, not as accents on white. Cream is
 * the default ground; rust, ember, sage, gold and espresso punctuate it. Nothing
 * on this page is pure white or pure black — cream is the lightest surface and
 * espresso the darkest.
 *
 *   #EFE6D1 cream    #AC512D rust*    #CBC5AA sage     #1C150F espresso
 *   #3C3521 olive    #A39A7E stone    #5B553D moss     #7A765B sand
 *   #B75A24 ember    #F0C044 gold
 *
 * *rust ships at #9E4B2A, a 10% shift of #AC512D toward espresso. Cream body
 *  copy on #AC512D measures 4.27:1, just under the 4.5:1 floor; at #9E4B2A it
 *  is 4.85:1. The two are near-indistinguishable side by side.
 *
 * Two measurements shape the rest:
 *
 *  1. Gold and sage are LIGHT grounds, not accents. Gold on cream is 1.37:1 —
 *     it can never be a mark on a light section, only a ground with dark text.
 *  2. Stone #A39A7E is 2.27:1 on cream, so it is a rules-and-dividers colour.
 *     Muted TEXT on cream has to be moss #5B553D (6.03:1); sand #7A765B is
 *     3.71:1 and is large-text-or-decorative only.
 *
 * Type and geometry are unchanged from the wireframe — this pass is colour only:
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

/**
 * Semantic colour roles. Every ratio quoted is measured, not estimated.
 */
export const COLOR = {
  /* --- section grounds ---------------------------------------------------- */
  /** The default ground. Every section is this unless it is a named band. */
  cream: "#EFE6D1",
  /** Cards lifted off cream. */
  card: "#F7EFDD",
  /** Band ground — the Ecosystem section. */
  sage: "#CBC5AA",
  /** Band ground — the hero. Darkened from #AC512D so cream clears AA. */
  rust: "#9E4B2A",
  /** The palette's brighter rust. NOT a band: nothing in the palette reaches
   *  4.5:1 on it (cream 3.76, espresso 3.87, gold 2.74), so it cannot carry a
   *  small label at any colour. It lives as a graphic tint — the stripe
   *  placeholders on the rust bands — where nothing sits on top of it. */
  ember: "#B75A24",
  /** Band ground — Testimonials, the pre-footer moment. */
  gold: "#F0C044",
  /** Band ground — the footer. Also the primary text colour everywhere. */
  espresso: "#1C150F",
  /** The palette's dark brown (olive #3C3521), and the site's one dark SURFACE:
   *  the footer ground and every dark button. Sampled from the reference footer
   *  at #372515. Espresso stays the TEXT colour on light grounds; the two are
   *  not interchangeable — espresso as a surface reads black, not brown.
   *  Measured on #3C3521: cream 9.83:1, gold 7.15:1, stone 4.34:1. */
  dark: "#3C3521",
  /** Hover / pressed lift off `dark`. espressoRaise #2D261E is DARKER than
   *  #3C3521 and would read as a press-in, not a lift. 1.20:1 against dark. */
  darkRaise: "#4A4229",

  /* --- text on cream (and on card) ---------------------------------------- */
  /** Primary text. 14.57:1 on cream. */
  ink: "#1C150F",
  /** Headings and emphatic secondary text. 9.83:1 on cream. */
  inkSoft: "#3C3521",
  /** Body copy. 6.03:1 on cream. */
  body: "#5B553D",
  /** Small labels, mono overlines. Also 6.03:1 — small text gets no discount. */
  muted: "#5B553D",
  /** Large or decorative muted text only. 3.71:1 on cream. */
  faint: "#7A765B",

  /* --- lines -------------------------------------------------------------- */
  line: "#DCD1B6",
  lineStrong: "#CEC3A8",
  /** Stone. A divider, never text. */
  hair: "#A39A7E",

  /* --- on the rust band --------------------------------------------------- */
  /** 4.85:1 on rust. */
  onRust: "#EFE6D1",
  /** Secondary text on rust. 3.45:1 — large text and UI only. */
  onRustFaint: "#DDBFA2",
  /** Tone-on-tone display type on rust. 1.47:1, deliberately. */
  rustDeep: "#743A21",
  /** Pressed / hover ground for a rust control. Darker, not brighter: cream on
   *  ember is only 3.76:1, so brightening would break the label. 5.90:1. */
  rustHover: "#894226",

  /* --- on the sage band --------------------------------------------------- */
  /** 10.40:1 on sage. */
  onSage: "#1C150F",
  /** 5.05:1 on sage, derived from the sage hue rather than a neutral grey. */
  onSageMuted: "#514A3E",
  onSageLine: "#AEA88F",

  /* --- on the gold band --------------------------------------------------- */
  /** 10.60:1 on gold. */
  onGold: "#1C150F",
  /** 5.13:1 on gold, derived from the gold hue. */
  onGoldMuted: "#5C481F",
  onGoldLine: "#CCA43D",
  /** Tone-on-tone display type on gold — the resting state of the scroll
   *  reveal. 1.68:1, deliberately near-invisible. */
  goldDeep: "#B99436",

  /* --- on the espresso band ----------------------------------------------- */
  /** 14.57:1 on espresso. */
  onEspresso: "#EFE6D1",
  /** 7.59:1 on espresso. */
  onEspressoMuted: "#B2A792",
  /** 5.16:1 on espresso — the floor, for legal rows. */
  onEspressoFaint: "#928876",
  onEspressoLine: "rgba(239,230,209,0.16)",
  /** Panels lifted off the espresso ground. */
  espressoRaise: "#2D261E",
  /** Visible borders on a dark ground. */
  espressoBorder: "#3A3229",
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

/** Diagonal striped image placeholder, tinted for whichever ground it sits on. */
export const stripe = (a = "#D9CDB2", b = "#E7DBC0", size = 9) =>
  `repeating-linear-gradient(135deg,${a} 0 ${size}px,${b} ${size}px ${size * 2}px)`;

/** Placeholder on the espresso / dark panels. */
export const stripeDark = (size = 9) => stripe("#271F18", "#362E25", size);
/** Placeholder on the sage band. */
export const stripeSage = (size = 9) => stripe("#B7B197", "#C2BCA2", size);
/** Placeholder on a rust band — the two tones either side of ember. */
export const stripeRust = (size = 9) => stripe("#9E4B2A", "#B75A24", size);
/** Placeholder on the gold band. */
export const stripeGold = (size = 9) => stripe("#D7AD3F", "#E5B842", size);
