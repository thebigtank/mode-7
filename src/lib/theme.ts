
export const FONT = {
  head: "var(--font-space-grotesk), sans-serif",
  body: "var(--font-outfit), sans-serif",
  mono: "var(--font-space-mono), monospace",
} as const;

export const COLOR = {
  cream: "#EFE6D1",
  card: "#F7EFDD",
  sage: "#CBC5AA",
  rust: "#9E4B2A",
  ember: "#B75A24",
  gold: "#F0C044",
  espresso: "#1C150F",
  dark: "#3C3521",
  darkRaise: "#4A4229",

  ink: "#1C150F",
  inkSoft: "#3C3521",
  body: "#5B553D",
  muted: "#5B553D",
  faint: "#7A765B",

  line: "#DCD1B6",
  lineStrong: "#CEC3A8",
  hair: "#A39A7E",

  onRust: "#EFE6D1",
  onRustFaint: "#DDBFA2",
  rustDeep: "#743A21",
  rustHover: "#894226",

  onSage: "#1C150F",
  onSageMuted: "#514A3E",
  onSageLine: "#AEA88F",

  onGold: "#1C150F",
  onGoldMuted: "#5C481F",
  onGoldLine: "#CCA43D",
  goldDeep: "#B99436",

  onEspresso: "#EFE6D1",
  onEspressoMuted: "#B2A792",
  onEspressoFaint: "#928876",
  onEspressoLine: "rgba(239,230,209,0.16)",
  espressoRaise: "#2D261E",
  espressoBorder: "#3A3229",
} as const;

export const CONTAINER = 1320;

export const containerPad = (pad = 48) => {
  const gutter =
    pad === 48 ? "var(--m7-pad)" : `clamp(20px, 4vw, ${pad}px)`;
  return `max(${gutter}, calc((100vw - ${CONTAINER}px)/2 + ${gutter}))`;
};

export const stripe = (a = "#D9CDB2", b = "#E7DBC0", size = 9) =>
  `repeating-linear-gradient(135deg,${a} 0 ${size}px,${b} ${size}px ${size * 2}px)`;

export const stripeDark = (size = 9) => stripe("#271F18", "#362E25", size);
export const stripeSage = (size = 9) => stripe("#B7B197", "#C2BCA2", size);
export const stripeRust = (size = 9) => stripe("#9E4B2A", "#B75A24", size);
export const stripeGold = (size = 9) => stripe("#D7AD3F", "#E5B842", size);
