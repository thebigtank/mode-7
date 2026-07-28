# Mode 7 — Next.js

A Next.js (App Router) port of the **Mode 7 Business Landing Page** design-system
project from Claude Design. Mode 7 is a premium tech ecosystem brand — smart-home
automation, business laptops and tablets, premium smartphones, audio, solar/green
energy and certified refurbished devices.

> Tagline: *Powering your home, your pocket, and your future.*

The site is a **structural, interactive low-fidelity wireframe**: images are diagonal
striped placeholders with `▣ LABEL` tags, and dashed annotation pills call out
behaviour that a real build would implement (WebGL parallax, live filters, etc.).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

## Routes

| Route           | Source file (design project)  |
| --------------- | ----------------------------- |
| `/`             | `Mode 7 Wireframe.dc.html`    |
| `/about`        | `About Us.dc.html`            |
| `/shop`         | `Shop.dc.html`                |
| `/product`      | `Product.dc.html`             |
| `/cart`         | `Cart.dc.html`                |
| `/services`     | `Services.dc.html`            |
| `/trade-in`     | `Trade-In.dc.html`            |
| `/smart-home`   | `Smart Home.dc.html`          |
| `/green-energy` | `Green Energy.dc.html`        |
| `/contact`      | `Contact Us.dc.html`          |

## Structure

```
src/
  app/                    routes; layout.tsx loads the fonts and mounts SiteShell
  components/
    site/                 shared chrome: Header, MegaMenu, SearchOverlay,
                          SevenWidget, CursorDot, IntroLoader, Footer,
                          RevealWordmark, SiteShell
    home/                 the landing page's sections, in page order
    page/                 blocks reused by the inner pages (PageHero, StatBar,
                          PageSection, IconCard, MediaPanel, DarkPanel, cards)
    services/             CategoryNav + the FAQ accordion
    green-energy/         the Green Energy FAQ accordion
    wireframe/            the low-fi vocabulary (Placeholder, Annotation, …)
    ArrowButton.tsx       the CTA used by every page
    Icons.tsx             inline Lucide SVGs + social marks
  hooks/                  one hook per canvas/scroll effect, ported 1:1
  lib/                    design tokens, copy, FAQ data, wireframe toggles
public/brands/            real monochrome brand logos for the marquee
```

`SiteShell` owns everything shared: nav, mega menu, search, Seven, the custom
cursor, Lenis smooth scroll, the footer card and the reveal wordmark. Pages export
only their own sections.

## Design rules the code holds to

These come from the source design system and should not be broken casually.

- **Colours:** only black `#121212`, white and light greys. No other hues.
- **Type:** Space Grotesk (headings + `// Label` overlines), Outfit (all body copy,
  button labels, the giant footer wordmark), Space Mono (annotation pills, `▣`
  tags, card accent sub-lines). Headings are weight 600 / letter-spacing -3px;
  body copy is 18px.
- **Near-pointy corners:** every card, panel, image and button radius is **4px**.
  Only circles (`50%`), pills (`99px`/`999px`) and the Seven widget's intentional
  multi-corner shapes keep their rounding.
- **Images** are `repeating-linear-gradient(135deg, …)` stripes with a monospace
  `▣ LABEL` (dark variant `#1c1c1c`/`#262626`).
- Never say "swap engine" — it is the **Intelligent Trade-In Portal** / **Device
  Valuation** / **Upgrade Program**.

## Wireframe toggles

`src/lib/wireframe-config.ts`:

- `showIntro` — the first-load MODE 7 scramble loader. Turn off while building.
  It runs on `/` only, matching the design's sub-pages.
- `showAnnotations` — the dashed annotation pills.
- `showSeven` — the floating Seven widget (which itself always starts closed).

## Effects, and why they are written the way they are

Each lives in its own hook under `src/hooks`:

- `useLenis` — smooth scroll. The mega menu and search overlay call `stop()`/
  `start()` on it to lock page scroll.
- `useHeaderHide` — sticky hide-on-scroll nav. Uses real `scroll` listeners on
  both `window` and `document` (capture) **plus** a rAF poll, because rAF alone
  gets paused in some contexts and scroll events alone don't fire in others.
  The header only stays sticky because the page root uses `overflow-x: clip`; with
  `hidden` the root becomes a scroll container and `position: sticky` silently
  breaks.
- `useReveal` — the grey → black per-character statement reveal. Same triple
  listener strategy, for the same reason.
- `useDotGrid` — the proximity dot-grid canvas shared by "Why Mode 7" and "Our
  Team": full-viewport-width canvas behind content that stays in the 1320px
  container.
- `useStatCounter` — the 5×7 dot-font canvas that counts `00K+ → 50K+` on
  scroll-in, then blinks. IntersectionObserver plus a rAF-poll fallback.
- `useBrandBlur` — per-logo blur/fade on the brand marquee. Deliberately not a
  flat mask-fade tunnel; each logo is tracked and filtered individually.
- `useSevenEyes` — Seven's blinking, cursor-tracking eyes, drawn into every
  `[data-eq]` canvas from a single rAF loop.
- `useMenuDots` — the mega menu's dot grid. Queries `[data-menudot]` each frame
  rather than binding a ref, because the canvas mounts with the menu.
- `useFooterWordmark` — the giant MODE 7 parallax plus the cursor spotlight
  (a blurred base layer and a sharp copy masked by a radial gradient that lerps
  toward the pointer).
- `useCursorDot` — the `mix-blend-mode: difference` cursor. `mousemove` only
  records state; a single rAF loop does every DOM read and write.
- `useCarouselLoop` — both carousels triple their list and re-centre invisibly so
  the loop never shows a seam. Testimonials have no autoplay — manual nav only.

## Notes

- `backdrop-filter` (the hero stat card, the capability cards' frosted bands, the
  search backdrop) renders in a real browser but not in DOM-capture screenshots.
  Verify those visually.
- Forms are presentational. The search overlay filters a local index; nothing is
  wired to a backend.
