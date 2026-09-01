import Link from "next/link";
import { V2, V2_CONTAINER, V2_FONT, V2_TYPE } from "@/lib/theme-v2";

/**
 * Chrome for `/homepage-v2`: the reference's dark announcement strip above a
 * sticky bar carrying wordmark, nav and a single dark action block.
 *
 * The bar is a PANEL inside the container rather than a full-bleed band — the
 * reference floats a lighter panel flush with the 1280 content edges and lets
 * the wash page ground show either side of it.
 *
 * Mode 7 content: the "Mode 7" wordmark; five existing-route labels drawn from
 * `menuItems` in content.ts (no new labels invented); the announcement line is
 * the tagline already used in the site metadata and the v1 hero, so nothing is
 * written for the strip. `SiteShell` suppresses the v1 chrome on this route.
 *
 * Colour: the strip's leading dot is gold as a FILL (a graphic, not type). The
 * action block is ink with a white label, matching the reference; gold is not
 * used for it because a header block in gold would out-shout the hero swash.
 */
const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "Trade-In", href: "/trade-in" },
  { label: "Smart Home", href: "/smart-home" },
  { label: "About Us", href: "/about" },
];

export function HeaderV2() {
  return (
    <>
      {/* announcement strip — ink, 40px, mono, centred */}
      <div style={{ background: V2.ink }}>
        <div
          style={{
            ...V2_CONTAINER,
            minHeight: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            fontFamily: V2_FONT.mono,
            fontSize: V2_TYPE.mono.fontSize,
            letterSpacing: V2_TYPE.mono.letterSpacing,
            textTransform: "uppercase",
            color: V2.white,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: V2.accent,
              flex: "0 0 auto",
            }}
          />
          <span>Every unit vetted, sealed and guaranteed</span>
          <Link
            href="/about"
            style={{
              color: V2.faint,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Read more <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <header
        style={{ position: "sticky", top: 0, zIndex: 40, background: V2.wash }}
      >
        <div style={{ ...V2_CONTAINER }}>
          <div
            style={{
              background: V2.washSoft,
              minHeight: 88,
              padding: "12px 32px",
              display: "flex",
              alignItems: "center",
              gap: "clamp(20px,4vw,64px)",
            }}
          >
            <Link
              href="/homepage-v2"
              style={{
                fontFamily: V2_FONT.display,
                fontWeight: 400,
                fontSize: 28,
                letterSpacing: "-0.02em",
                color: V2.ink,
                textDecoration: "none",
                flex: "0 0 auto",
              }}
            >
              Mode 7
            </Link>

            <nav
              className="v2-navlinks"
              style={{ display: "flex", gap: "clamp(16px,2.2vw,32px)" }}
              aria-label="Primary"
            >
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  style={{
                    fontFamily: V2_FONT.body,
                    fontSize: 16,
                    fontWeight: 400,
                    /* ink, not accent: gold type on wash is 1.40:1 */
                    color: V2.ink,
                    textDecoration: "none",
                  }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              style={{
                marginLeft: "auto",
                flex: "0 0 auto",
                display: "inline-flex",
                alignItems: "center",
                minHeight: 48,
                padding: "13px 24px",
                borderRadius: 4,
                background: V2.ink,
                color: V2.white,
                fontFamily: V2_FONT.body,
                fontSize: 16,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
