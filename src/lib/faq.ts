/** FAQ content for the Services page, grouped by topic tab. */
export type FaqGroup = { tab: string; title: string; qs: { q: string; a: string }[] };

export const faqData: FaqGroup[] = [
  {
    tab: "Premium Devices",
    title: "Premium devices",
    qs: [
      {
        q: "Are all devices brand-new and sealed?",
        a: "Yes — every premium device is genuine, factory-sealed and inspected before it ships. No grey imports, ever.",
      },
      {
        q: "Which brands do you carry?",
        a: "Flagship phones, laptops and tablets from Apple, Samsung, Google, Lenovo, Dell, HP and more — 13+ premium brands in one store.",
      },
      {
        q: "Do devices include a manufacturer warranty?",
        a: "Yes — full manufacturer warranty plus the Mode 7 guarantee on every unit.",
      },
      {
        q: "Can I pay in instalments?",
        a: "Yes — flexible instalment and financing options are available at checkout on eligible orders.",
      },
      {
        q: "How fast is delivery?",
        a: "In-stock devices ship same or next business day with tracked, sealed delivery nationwide.",
      },
      {
        q: "Can Seven help me choose?",
        a: "Absolutely — Seven pairs AI recommendations with real product specialists to match you to the right device.",
      },
    ],
  },
  {
    tab: "Certified Refurbished",
    title: "Certified refurbished",
    qs: [
      {
        q: 'What does "certified refurbished" mean?',
        a: "Premium hardware professionally renewed, graded to like-new, and factory-sealed again before it reaches you.",
      },
      {
        q: "Do refurbished devices have a warranty?",
        a: "Yes — a 12-month warranty, a 50-point inspection report and 14-day free returns.",
      },
      {
        q: "How much can I save?",
        a: "Typically up to 40% off new retail, depending on the model and grade.",
      },
      {
        q: "Will there be visible wear?",
        a: "Grade-A units are practically indistinguishable from new, and every unit’s exact grade is listed before you buy.",
      },
      {
        q: "Are the batteries replaced?",
        a: "Batteries are tested and replaced whenever they fall below our health threshold.",
      },
      {
        q: "Can I trade in toward a refurbished device?",
        a: "Yes — apply your trade-in value to any refurbished or new device in store.",
      },
    ],
  },
  {
    tab: "Solar & Green Energy",
    title: "Solar & green energy",
    qs: [
      {
        q: "What solar products do you sell?",
        a: "Panels, inverters, home batteries, portable power stations and full solar generator kits.",
      },
      {
        q: "Do you install the systems?",
        a: "We’re a retailer — we ship complete, ready-to-set-up kits and don’t carry out installations.",
      },
      {
        q: "How do I know what size I need?",
        a: "Seven and our energy specialists help you size a system to your usage and budget.",
      },
      {
        q: "Are the power stations good for backup?",
        a: "Yes — portable stations from Jackery, Anker and EcoFlow cover outages, cabins and off-grid use.",
      },
      {
        q: "Is financing available for solar?",
        a: "Yes — green-energy financing lets you pay over time on eligible orders.",
      },
      {
        q: "Can panels and batteries ship together?",
        a: "Yes — panels, inverters and batteries can arrive sealed in one consolidated order.",
      },
    ],
  },
  {
    tab: "Smart Home Automation",
    title: "Smart home automation",
    qs: [
      {
        q: "What can I automate?",
        a: "Lighting, climate, security, entertainment and energy monitoring — all from a single app.",
      },
      {
        q: "Do the kits work together?",
        a: "We curate compatible kits so lighting, climate and security run within one ecosystem.",
      },
      {
        q: "Do I need a professional to set it up?",
        a: "No — kits are designed for easy self-setup, and Seven guides you if you get stuck.",
      },
      {
        q: "Which platforms are supported?",
        a: "Major platforms and voice assistants; every product lists its compatibility on its page.",
      },
      {
        q: "Can I start small and expand later?",
        a: "Yes — begin with a single room or scene and add devices any time.",
      },
      {
        q: "Is my smart-home data secure?",
        a: "We stock products that meet strong security standards and keep your data private.",
      },
    ],
  },
  {
    tab: "Trade-In",
    title: "Trade-in & upgrades",
    qs: [
      {
        q: "How does trade-in work?",
        a: "Tell Seven what you own, get an instant AI valuation, and apply it toward your next device.",
      },
      {
        q: "How fast is a valuation?",
        a: "About 60 seconds for a fair, AI-calculated value — no haggling.",
      },
      {
        q: "What devices can I trade in?",
        a: "Phones, laptops, tablets and select smart-home and audio gear.",
      },
      {
        q: "How is my value calculated?",
        a: "By model, condition and current market value — transparent, with no surprises.",
      },
      {
        q: "Can I upgrade the same day?",
        a: "Yes — apply your value instantly to a sealed upgrade and check out right away.",
      },
      {
        q: "What happens to my old device?",
        a: "It’s securely wiped, then renewed and resold as certified refurbished.",
      },
    ],
  },
];
