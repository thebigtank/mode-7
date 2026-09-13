export const ROUTES = [
  "/",
  "/about",
  "/services",
  "/trade-in",
  "/shop",
  "/product",
  "/cart",
  "/checkout",
  "/contact",
  "/green-energy",
  "/smart-home",
  "/parked",
];

const BREAKPOINTS = [
  390, 420, 430, 460, 560, 620, 640, 700, 760, 768, 780, 819, 820, 860,
  900, 939, 940, 980, 981, 1024, 1040, 1080, 1100, 1180, 1200, 1280, 1440,
];

export const TIER1_WIDTHS = [
  ...new Set(BREAKPOINTS.flatMap((n) => [n - 1, n])),
].sort((a, b) => a - b);

export const HEAVY_WIDTHS = [390, 768, 900, 1024, 1200, 1440];

export const HEIGHT = 900;

export const STYLE_PROPS = [
  "display", "position", "top", "right", "bottom", "left", "zIndex",
  "width", "height", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
  "marginTop", "marginBottom",
  "flexDirection", "justifyContent", "alignItems", "flexWrap", "gap",
  "gridTemplateColumns", "gridTemplateRows", "gridColumn", "gridRow",
  "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing",
  "textAlign", "textTransform", "color", "backgroundColor", "backgroundImage",
  "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
  "borderTopColor", "borderBottomColor", "borderRadius",
  "opacity", "transform", "overflow", "overflowX", "overflowY",
  "boxShadow", "objectFit", "pointerEvents", "visibility",
];

export const PSEUDO_PROPS = [
  "content", "width", "height", "top", "right", "bottom", "left",
  "backgroundColor", "backgroundImage", "transform", "opacity",
  "borderTopWidth", "borderBottomWidth", "pointerEvents",
];

export const STATE_TARGETS = [
  { route: "/", selector: ".v2-capcard", action: "hover" },
  { route: "/", selector: ".v2-caserow", action: "hover" },
  { route: "/", selector: ".v2-nav-link", action: "hover" },
  { route: "/", selector: ".v2-nav-link", action: "focus" },
  { route: "/about", selector: "[data-rv]", action: "hover" },
  { route: "/about", selector: ".a-cond-row", action: "hover" },
  { route: "/services", selector: ".svc-pill", action: "hover" },
  { route: "/services", selector: ".svc-pill", action: "focus" },
  { route: "/trade-in", selector: ".t-row", action: "hover" },
  { route: "/trade-in", selector: "button", action: "focus" },
  { route: "/shop", selector: ".m7-card", action: "hover" },
  { route: "/shop", selector: "button", action: "focus" },
  { route: "/product", selector: ".m7-card", action: "hover" },
  { route: "/contact", selector: "a", action: "focus" },
  { route: "/green-energy", selector: ".m7-faq-q", action: "hover" },
  { route: "/smart-home", selector: ".m7-card", action: "hover" },
];
