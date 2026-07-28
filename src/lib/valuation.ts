/**
 * Pricing model behind the Intelligent Trade-In Portal.
 *
 * Ported from the "Mode 7 — Device Valuation" wireframe. Deliberately
 * deterministic and legible: every figure the customer sees is a named line
 * item they can point at, which is the whole promise of the page.
 *
 * All amounts are Naira. The wireframe was drawn in pounds, so the catalogue
 * was rescaled to realistic Nigerian resale values rather than swapping the
 * symbol and leaving a flagship phone valued at ₦620.
 */

import { emailLooksValid, phoneLooksValid } from "./contact";

export type Category = "phone" | "laptop" | "tablet";

export type Model = {
  id: string;
  label: string;
  /** Base resale value before storage and condition. */
  base: number;
  /** Live-market uplift, posted as its own line once condition starts. */
  mkt: number;
};

export const MODELS: Record<Category, Model[]> = {
  phone: [
    { id: "ip15p", label: "iPhone 15 Pro", base: 1_050_000, mkt: 50_000 },
    { id: "ip14p", label: "iPhone 14 Pro", base: 800_000, mkt: 42_000 },
    { id: "ip13", label: "iPhone 13", base: 510_000, mkt: 34_000 },
    { id: "s24", label: "Galaxy S24", base: 645_000, mkt: 34_000 },
    { id: "px8", label: "Pixel 8", base: 510_000, mkt: 25_000 },
    { id: "other", label: "Another phone", base: 305_000, mkt: 17_000 },
  ],
  laptop: [
    { id: "mbp14", label: 'MacBook Pro 14"', base: 1_530_000, mkt: 60_000 },
    { id: "mba", label: "MacBook Air", base: 1_055_000, mkt: 51_000 },
    { id: "x1", label: "ThinkPad X1", base: 885_000, mkt: 34_000 },
    { id: "xps", label: "Dell XPS 13", base: 780_000, mkt: 31_000 },
    { id: "other", label: "Another laptop", base: 440_000, mkt: 20_000 },
  ],
  tablet: [
    { id: "ipp", label: 'iPad Pro 12.9"', base: 920_000, mkt: 42_000 },
    { id: "ipa", label: "iPad Air", base: 610_000, mkt: 31_000 },
    { id: "tabs9", label: "Galaxy Tab S9", base: 510_000, mkt: 25_000 },
    { id: "other", label: "Another tablet", base: 290_000, mkt: 17_000 },
  ],
};

/** `[label, delta]` per capacity tier, cheapest tier always at zero. */
export const STORAGE: Record<Category, [string, number][]> = {
  phone: [
    ["128 GB", 0],
    ["256 GB", 70_000],
    ["512 GB", 155_000],
    ["1 TB", 240_000],
  ],
  laptop: [
    ["256 GB", 0],
    ["512 GB", 120_000],
    ["1 TB", 255_000],
    ["2 TB", 410_000],
  ],
  tablet: [
    ["128 GB", 0],
    ["256 GB", 75_000],
    ["512 GB", 160_000],
    ["1 TB", 255_000],
  ],
};

export const SCREEN: Record<string, [string, number]> = {
  flawless: ["Flawless", 0],
  light: ["Light wear", -75_000],
  cracked: ["Cracked / dead pixels", -255_000],
};

export const BATTERY: Record<string, [string, number]> = {
  high: ["Battery 85%+", 0],
  mid: ["Battery 70–84%", -60_000],
  low: ["Battery below 70%", -130_000],
  unsure: ["Battery not verified", -35_000],
};

export const COSMETIC: Record<string, [string, number]> = {
  likenew: ["Cosmetics like-new", 0],
  good: ["Cosmetics good", -45_000],
  worn: ["Cosmetics well-used", -95_000],
};

export const KEYS: Record<string, [string, number]> = {
  ok: ["Keyboard & ports OK", 0],
  issues: ["Keyboard/port issues", -100_000],
};

export type Upgrade = {
  id: string;
  name: string;
  /** What the device is, for the picker's sub-label. */
  kind: string;
  price: number;
};

/**
 * The devices a trade-in can be put toward. Curated by the team — a customer
 * can only trade toward something on this list, which is why it is a fixed
 * catalogue rather than anything the page derives. Swap this array for the
 * team's feed when there is one.
 */
export const UPGRADES: Upgrade[] = [
  { id: "m8p", name: "Meridian 8 Pro", kind: "Phone · 256 GB", price: 1_899_000 },
  { id: "m8", name: "Meridian 8", kind: "Phone · 128 GB", price: 1_249_000 },
  { id: "vb14", name: "Vertex Book 14", kind: "Laptop · 512 GB", price: 2_499_000 },
  { id: "ats9", name: "Aero Tab S9", kind: "Tablet · 256 GB", price: 1_379_000 },
];

export type Answers = {
  cat: Category | null;
  model: string | null;
  storageIdx: number | null;
  power: string | null;
  screen: string | null;
  battery: string | null;
  cosmetic: string | null;
  keys: string | null;
  liquid: string | null;
  lock: string | null;
  photos: { front: boolean; back: boolean; screen: boolean; video: boolean };
  locked: boolean;
  /** Which catalogue device the estimate is being put toward, once locked. */
  upgradeId: string | null;
  /**
   * How the team reaches this customer. Required before submit — a confirmed
   * figure is delivered by email or a call, so an estimate with no contact
   * details is one the team can do nothing with.
   */
  fullName: string;
  email: string;
  phone: string;
};

export const emptyAnswers = (): Answers => ({
  cat: null,
  model: null,
  storageIdx: null,
  power: null,
  screen: null,
  battery: null,
  cosmetic: null,
  keys: null,
  liquid: null,
  lock: null,
  photos: { front: false, back: false, screen: false, video: false },
  locked: false,
  upgradeId: null,
  fullName: "",
  email: "",
  phone: "",
});

/** Re-exported so trade-in callers keep a single import. See `@/lib/money`. */
export { formatNaira } from "./money";

export const roundTo5k = (n: number) => Math.round(n / 5_000) * 5_000;

export function modelFor(a: Answers): Model | null {
  if (!a.cat || !a.model) return null;
  return MODELS[a.cat].find((m) => m.id === a.model) ?? null;
}

/** Reasons this device cannot be valued automatically. Empty means eligible. */
export function disqualifiers(a: Answers): string[] {
  const r: string[] = [];
  if (a.power === "no") r.push("Device does not power on");
  if (a.liquid === "yes") r.push("Liquid damage present");
  if (a.lock === "yes") r.push("Locked to a carrier or account");
  return r;
}

/** The four uploads, in the order the evidence step asks for them. */
export const EVIDENCE_KEYS = ["front", "back", "screen", "video"] as const;

export const evidenceCount = (a: Answers) =>
  EVIDENCE_KEYS.filter((k) => a.photos[k]).length;

/**
 * Every upload is required, video included. The team values the device from
 * this evidence, so a trade-in cannot be submitted without all four.
 */
export const evidenceDone = (a: Answers) => evidenceCount(a) === EVIDENCE_KEYS.length;

/** Shared with checkout — see `@/lib/contact` for why these are permissive. */
export { emailLooksValid, phoneLooksValid };

export type ContactField = "fullName" | "email" | "phone";

/** Which contact fields are not yet usable. Empty means good to submit. */
export function contactIssues(a: Answers): ContactField[] {
  const bad: ContactField[] = [];
  if (a.fullName.trim().length < 2) bad.push("fullName");
  if (!emailLooksValid(a.email)) bad.push("email");
  if (!phoneLooksValid(a.phone)) bad.push("phone");
  return bad;
}

export const contactDone = (a: Answers) => contactIssues(a).length === 0;

export function conditionAnswered(a: Answers): boolean {
  if (!(a.power && a.screen && a.battery && a.cosmetic && a.liquid && a.lock))
    return false;
  if (a.cat === "laptop" && !a.keys) return false;
  return true;
}

export type Line = { k: string; v: number };

/** The ordered ledger, built from whatever has been answered so far. */
export function buildLines(a: Answers): Line[] {
  const lines: Line[] = [];
  const m = modelFor(a);
  if (!m || !a.cat) return lines;

  lines.push({ k: `BASE · ${m.label}`, v: m.base });

  if (a.storageIdx != null) {
    const [label, delta] = STORAGE[a.cat][a.storageIdx];
    lines.push({ k: `STORAGE · ${label}`, v: delta });
  }
  if (a.screen) lines.push({ k: `SCREEN · ${SCREEN[a.screen][0]}`, v: SCREEN[a.screen][1] });
  if (a.battery) lines.push({ k: BATTERY[a.battery][0].toUpperCase(), v: BATTERY[a.battery][1] });
  if (a.cosmetic) lines.push({ k: COSMETIC[a.cosmetic][0].toUpperCase(), v: COSMETIC[a.cosmetic][1] });
  if (a.cat === "laptop" && a.keys) lines.push({ k: KEYS[a.keys][0].toUpperCase(), v: KEYS[a.keys][1] });

  // the market line only appears once condition has started
  if (a.screen || a.battery || a.cosmetic) {
    lines.push({ k: "MARKET · demand high", v: m.mkt });
  }
  return lines;
}

export const subtotal = (lines: Line[]) =>
  Math.max(0, lines.reduce((t, l) => t + l.v, 0));

export type Valuation = {
  lines: Line[];
  /** Midpoint, rounded. Zero when nothing has been answered yet. */
  mid: number;
  lo: number;
  hi: number;
  /**
   * Evidence attached, so the spread narrows. Deliberately NOT "confirmed":
   * every figure this engine produces is an estimate. A confirmed figure only
   * ever comes from the team — by email after they review the evidence, or in
   * person once they have the device in hand.
   */
  tightened: boolean;
  reasons: string[];
};

export function valuate(a: Answers): Valuation {
  const lines = buildLines(a);
  const base = subtotal(lines);
  const tightened = evidenceDone(a);
  const spread = tightened ? 0.03 : 0.08;
  return {
    lines,
    mid: roundTo5k(base),
    lo: roundTo5k(base * (1 - spread)),
    hi: roundTo5k(base * (1 + spread)),
    tightened,
    reasons: disqualifiers(a),
  };
}

export type UpgradeMath = {
  /** The headline figure, from the midpoint of the estimate. */
  payMid: number;
  /** Least you would bring, if the estimate lands at the top of its range. */
  payLo: number;
  /** Most you would bring, if it lands at the bottom. */
  payHi: number;
  /** The estimate covers the whole device — any balance is settled with the team. */
  surplus: boolean;
};

/** What a customer actually brings, once the estimate comes off the price. */
export function upgradeMath(price: number, v: Valuation): UpgradeMath {
  return {
    payMid: Math.max(0, price - v.mid),
    payLo: Math.max(0, price - v.hi),
    payHi: Math.max(0, price - v.lo),
    surplus: v.lo >= price,
  };
}
