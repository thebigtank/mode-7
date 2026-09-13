
export const V2 = {
  ink: "#171D1D",
  wash: "#E6EAE6",
  washSoft: "#EDF0ED",
  white: "#FFFFFF",
  accent: "#F0C044",
  accentOn: "#1C150F",
  accentText: "#79662F",
  muted: "#5A6160",
  faint: "#AAB0AE",
  navy: "#14213D",
} as const;

export const V2_FONT = {
  display: "var(--font-alegreya), Georgia, 'Times New Roman', serif",
  body: "var(--font-outfit), var(--font-inter), system-ui, sans-serif",
  mono: "var(--font-outfit), var(--font-inter), system-ui, sans-serif",
} as const;

export const V2_TYPE = {
  h1: { fontSize: 64, lineHeight: "64px", letterSpacing: "-1.28px" },
  h2: { fontSize: 40, lineHeight: "48px", letterSpacing: "-0.4px" },
  h3: { fontSize: 20, lineHeight: "30px", letterSpacing: "-0.48px" },
  body: { fontSize: 16, lineHeight: "24px" },
  small: { fontSize: 13.6, lineHeight: "18px" },
  mono: { fontSize: 12, letterSpacing: "0.04em" },
} as const;

export const V2_CONTAINER = {
  boxSizing: "content-box",
  maxWidth: 1280,
  margin: "0 auto",
  padding: "0 clamp(20px,4vw,48px)",
} as const;

export const V2_HAIR = "1px solid rgba(23,29,29,0.14)";
export const V2_HAIR_DARK = "1px solid rgba(255,255,255,0.14)";
