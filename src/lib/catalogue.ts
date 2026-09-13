import { formatNaira } from "./money";

export type Category =
  | "Phones"
  | "Laptops"
  | "Tablets"
  | "Smart Home"
  | "Solar & Power"
  | "Audio"
  | "Accessories";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  meta: string;
  badge?: string;
  ai: {
    summary: string;
    points: string[];
    note: string;
  };
};

export const PRODUCTS: Product[] = [
  {
    id: "flagship-x",
    name: "Mode Flagship X",
    category: "Phones",
    price: 1_850_000,
    meta: "Premium · Sealed",
    badge: "New",
    ai: {
      summary:
        "The Flagship X is our top-end phone — the one to buy if you want a device that stays fast for four or five years rather than two. Sealed, vetted and covered by the two-year Mode 7 guarantee.",
      points: [
        "6.7\" OLED at 120Hz — noticeably smoother scrolling than a 60Hz panel",
        "Triple 50MP camera system that holds up in low light, which is where most phone cameras fall apart",
        "All-day battery with fast charge; realistically a full day of heavy use",
      ],
      note: "If you mostly text, call and browse, this is more phone than you need — the Flagship's value is in the camera and the years of headroom. Ask about the refurbished flagship instead.",
    },
  },
  {
    id: "pro-laptop-14",
    name: "Pro Laptop 14",
    category: "Laptops",
    price: 2_750_000,
    meta: "Premium · Sealed",
    ai: {
      summary:
        "A 14-inch workstation for people whose laptop is their job — developers, editors, analysts. It is built around sustained performance rather than benchmark spikes, so it does not throttle twenty minutes into a render.",
      points: [
        "Handles video editing and containerised dev work without fan noise dominating the room",
        "Full-size ports, so no dongle collection",
        "Serviceable battery — a real consideration at this price",
      ],
      note: "Overkill for browsing, documents and email. If that is your day, the Vertex Book or a certified refurbished 13-inch will do the same work for a lot less.",
    },
  },
  {
    id: "pro-tablet",
    name: "Pro Tablet",
    category: "Tablets",
    price: 1_450_000,
    meta: "Premium · Sealed",
    ai: {
      summary:
        "A large-format tablet aimed at drawing, note-taking and reading rather than at replacing a laptop. Pen latency is the thing that actually matters here, and it is very low.",
      points: [
        "Genuinely good for handwritten notes and mark-up on documents",
        "Bright enough to read outdoors, which most tablets are not",
        "Pairs with the Pro Laptop as a second display",
      ],
      note: "It is not a laptop replacement. If you need to type for hours or run desktop software, buy a laptop — adding a keyboard case to a tablet rarely ends well.",
    },
  },
  {
    id: "refurb-flagship",
    name: "Refurb Flagship",
    category: "Phones",
    price: 990_000,
    meta: "Certified Refurbished",
    badge: "Refurbished",
    ai: {
      summary:
        "Last generation's flagship, fully refurbished by our team: new battery, new screen if it needed one, data-wiped, and sealed. It is the best value phone we sell.",
      points: [
        "Roughly 85% of the current flagship's performance for a little over half the price",
        "Battery is replaced, not just tested — so you start at 100% health",
        "Same two-year guarantee as a new unit",
      ],
      note: "Cosmetically it may show very light wear on the frame. If you want a phone that is flawless out of the box, buy new.",
    },
  },
  {
    id: "smart-hub",
    name: "Smart Hub",
    category: "Smart Home",
    price: 340_000,
    meta: "Automation · Sealed",
    ai: {
      summary:
        "The controller that ties your smart home together — lights, sockets, cameras, sensors — so they run on local automations instead of each needing its own app and its own cloud account.",
      points: [
        "Automations keep running when the internet drops, which matters here",
        "Works with the common protocols, so you are not locked to one brand",
        "Low power draw — it can sit on a small inverter or UPS",
      ],
      note: "A hub on its own does nothing. Budget for the sensors and switches too, or start with a bundle.",
    },
  },
  {
    id: "solar-kit",
    name: "Solar Panel Kit",
    category: "Solar & Power",
    price: 4_350_000,
    meta: "Green Energy · Installed",
    badge: "Installed",
    ai: {
      summary:
        "A rooftop array sized for a typical family home — panels, inverter, mounting and commissioning by our own accredited engineers, usually in a single day.",
      points: [
        "Cuts generator hours substantially, which is normally where the savings actually come from",
        "Pairs with the Home Battery to carry you through the evening peak",
        "Installed and commissioned to code, never sub-contracted",
      ],
      note: "Solar alone does not give you power at night. Without a battery you are still on the grid or the generator after dark — plan the two together.",
    },
  },
  {
    id: "studio-headphones",
    name: "Studio Headphones",
    category: "Audio",
    price: 630_000,
    meta: "Premium · Sealed",
    ai: {
      summary:
        "Closed-back over-ears tuned fairly flat, so they are as useful for mixing as for listening. Active noise cancelling is strong enough for flights and open-plan offices.",
      points: [
        "Comfortable for multi-hour sessions — the clamp is lighter than most",
        "Wired and wireless, so they work with an audio interface too",
        "Around 30 hours per charge with ANC on",
      ],
      note: "If you want bass-forward, fun-sounding headphones for the gym, these are the wrong pair. They are deliberately neutral.",
    },
  },
  {
    id: "home-battery",
    name: "Home Battery",
    category: "Solar & Power",
    price: 7_100_000,
    meta: "Green Energy · Installed",
    ai: {
      summary:
        "Whole-home storage that charges from solar or the grid and carries essential circuits through outages and the evening peak. This is the component that makes solar feel like real power rather than daytime power.",
      points: [
        "Switches over fast enough that you do not notice the grid dropping",
        "Sized for essentials overnight — lights, fans, fridge, networking, a TV",
        "Monitored, so you can see state of charge and draw",
      ],
      note: "It is the most expensive part of a green-energy setup and the payback is slower than the panels. If budget is tight, start with panels and add storage later.",
    },
  },
  {
    id: "refurb-laptop-13",
    name: "Refurb Laptop 13",
    category: "Laptops",
    price: 1_620_000,
    meta: "Certified Refurbished",
    badge: "Refurbished",
    ai: {
      summary:
        "A certified refurbished 13-inch ultraportable — the practical choice for study, office work and travel. Battery replaced, chassis cleaned up, drive wiped and re-imaged.",
      points: [
        "Light enough to carry daily without thinking about it",
        "Ample for documents, browsing, calls and light photo work",
        "Two-year guarantee, same as new stock",
      ],
      note: "Not the machine for heavy video work or large builds. If you compile or render, look at the Pro Laptop 14.",
    },
  },
];

export const PRICE_BANDS = [
  "Under ₦500,000",
  "₦500,000 – ₦1,500,000",
  "₦1,500,000 – ₦3,000,000",
  "Over ₦3,000,000",
];

export const priceLabel = (p: Product) => formatNaira(p.price);
