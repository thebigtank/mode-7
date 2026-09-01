/**
 * Copy + data for the Mode 7 landing page, lifted verbatim from the
 * `renderVals()` block of the source design component.
 */

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "Seven walked me through trading in my old phone and setting up my whole smart home in one afternoon. Every device arrived sealed and works flawlessly.",
    name: "Daniel Okafor",
    role: "Smart-Home Owner",
  },
  {
    quote:
      "The refurbished laptop looks and runs brand new — and the WhatsApp checkout made buying it effortless. This is how premium tech retail should feel.",
    name: "Amara Eze",
    role: "Creative Director",
  },
  {
    quote:
      "I cut my energy bill in half after Mode 7’s solar install. The team was certified, fast, and the whole system runs from one app.",
    name: "Tunde Bello",
    role: "Homeowner",
  },
  {
    quote:
      "Got an instant, fair trade-in value through the portal and upgraded the same day. No haggling, no surprises — just a sealed, guaranteed device.",
    name: "Grace Adeyemi",
    role: "Product Manager",
  },
];

export type Capability = {
  title: string;
  desc: string;
  cta: string;
  bullets: string[];
};

export const capabilities: Capability[] = [
  {
    title: "The Trade-In & Upgrade Portal",
    desc: "Upload your diagnostic data and let our system calculate your device's exact upgrade value in seconds — then upgrade the same day.",
    cta: "Value a device",
    bullets: [
      "AI-driven device diagnostics",
      "Instant, fair trade-in value",
      "Sealed, guaranteed upgrades",
    ],
  },
  {
    title: "WhatsApp Concierge Checkout",
    desc: "Browse the shop on the web, then finalize your premium purchase instantly through secure, personalized chat.",
    cta: "Start a chat",
    bullets: [
      "Secure personalized checkout",
      "Browse on web, buy in chat",
      "Real human + AI support",
    ],
  },
  {
    title: "Smart Home & Solar Installs",
    desc: "Full home automation and a clean-energy transition, designed and deployed by certified Mode 7 engineers.",
    cta: "Book an install",
    bullets: [
      "Certified Mode 7 engineers",
      "Whole-home automation",
      "Clean-energy transition",
    ],
  },
];

/** The scroll-reveal statement in the "Why Mode 7" section. */
export const revealStatement =
  "We do far more than supply the latest devices — we redefine how you live with technology, energy and devices. Mode 7 powers homes and pockets, curating premium hardware, sustainable energy and effortless upgrades under one trusted roof. Every unit is vetted, sealed and guaranteed — this isn't retail, it's a complete technology lifecycle engineered around you.";

export const pillars = [
  { title: "Premium Devices", sub: "Laptops, tablets and phones, fully vetted." },
  { title: "Certified Refurbished", sub: "Renewed, sealed and guaranteed like new." },
  { title: "Smart Home Automation", sub: "One app to run your entire connected home." },
  { title: "Solar & Green Energy", sub: "Clean-energy systems, installed and managed." },
];

export const heroFeatures = [
  "Premium Devices",
  "Certified Refurbished",
  "Smart Home Automation",
  "Solar & Green Energy",
  "Accessories",
];

/**
 * Brand marks. `src` + `name` is the original shape v1's `BrandStrip` renders
 * as small logo images — untouched, so it still shows exactly the 13 brands it
 * always has (`BrandStrip` filters to entries that carry a `src`). `display`
 * is the full, properly spelled brand name for TEXT-ONLY contexts — the
 * homepage-v2 gold marquee, which spells everything out rather than showing a
 * wordmark, so the 7 brands added there need no logo asset and carry no `src`.
 *
 * `logos.length` is read by `StatsV2` for the "premium brand partners" figure
 * (see `content rules` in the v2 CLAUDE.md) — it is derived, never asserted,
 * so growing this array from 13 to 20 for the marquee is safe by design.
 */
export const logos: { src?: string; name: string; display: string }[] = [
  { src: "/brands/apple.svg", name: "Apple", display: "Apple" },
  { src: "/brands/samsung.svg", name: "Samsung", display: "Samsung" },
  { src: "/brands/sony.svg", name: "Sony", display: "Sony" },
  { src: "/brands/google.svg", name: "Google", display: "Google" },
  { src: "/brands/bose.svg", name: "Bose", display: "Bose" },
  { src: "/brands/lenovo.svg", name: "Lenovo", display: "Lenovo" },
  { src: "/brands/dell.svg", name: "Dell", display: "Dell" },
  // HP's wordmark logo stays "HP"; the marquee spells the initialism out.
  { src: "/brands/hp.svg", name: "HP", display: "Hewlett Packard" },
  { src: "/brands/jbl.svg", name: "JBL", display: "JBL" },
  { src: "/brands/anker.svg", name: "Anker", display: "Anker" },
  { src: "/brands/dyson.svg", name: "Dyson", display: "Dyson" },
  { src: "/brands/xiaomi.svg", name: "Xiaomi", display: "Xiaomi" },
  { src: "/brands/jackery.png", name: "Jackery", display: "Jackery" },
  // Marquee-only additions below — text names, no logo asset.
  { name: "LG", display: "LG" },
  { name: "Philips Hue", display: "Philips Hue" },
  { name: "EcoFlow", display: "EcoFlow" },
  { name: "Sonos", display: "Sonos" },
  { name: "Logitech", display: "Logitech" },
  { name: "Belkin", display: "Belkin" },
  { name: "Microsoft", display: "Microsoft" },
];

/** Mega-menu items. `href` targets the App Router routes. */
export const menuItems = [
  { label: "About Us", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "Trade-In", href: "/trade-in" },
  { label: "Smart Home", href: "/smart-home" },
  { label: "Green Energy", href: "/green-energy" },
  { label: "Contact Us", href: "/contact" },
];

export const footerCols = [
  { title: "Services", links: ["Swap Program", "Smart Home", "Green Energy"] },
  {
    title: "Explore",
    links: ["About Us", "Sustainability", "Contact Us", "Find a Store"],
  },
];

export const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

/** Search overlay index. `pop` items are the default "Popular" suggestions. */
export const searchIndex = [
  { label: "Premium Smartphones", type: "Phones", pop: true },
  { label: "Smart Home Automation", type: "Smart Home", pop: true },
  { label: "Business Laptops", type: "Laptops" },
  { label: "Pro Tablets", type: "Tablets" },
  { label: "Audio & Headphones", type: "Audio" },
  { label: "Solar & Green Energy", type: "Energy", pop: true },
  { label: "Certified Refurbished", type: "Refurbished", pop: true },
  { label: "Intelligent Trade-In Portal", type: "Service" },
  { label: "Device Valuation", type: "Service" },
  { label: "Upgrade Program", type: "Service" },
  { label: "Repair & Diagnostics", type: "Support" },
  { label: "Seven AI Assistant", type: "Support" },
];
