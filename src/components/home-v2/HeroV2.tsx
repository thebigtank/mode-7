import { logos } from "@/lib/content";
import { V2, V2_CONTAINER, V2_FONT } from "@/lib/theme-v2";
import { ButtonV2 } from "./ButtonV2";
import { Mono } from "./Ui";

/**
 * Section 1 — the reference's split hero: a three-line display headline with a
 * lead paragraph and a matched primary/secondary button pair on the left, a framed
 * video still with a centred play target on the right, and a single-row
 * "trusted by" logo strip beneath both columns.
 *
 * Measured against `01-hero.png` at 1440: h1 64/64/-1.28px starting 88px under
 * the bar, lead paragraph wrapping at ~530px, actions 60px below it, the still
 * 642x360 in the right column, the strip 108px under the fold of both columns.
 *
 * Mode 7 content: the v1 `Hero.tsx` headline "Powering your home, your pocket,
 * and your future." and its lead paragraph verbatim; the existing /shop and
 * /trade-in routes; `/hero/bleed.webp`; and the `logos` array for the strip.
 *
 * Colour: the reference sets its final headline phrase in orange. Gold cannot
 * be TEXT on the wash ground (1.40:1), so "your future." becomes the page's
 * signature GOLD HIGHLIGHT SWASH instead — the words stay `V2.ink` and the
 * span takes a gold background. Ink on gold is 10.02:1 and the yellow still
 * carries the emphasis. The swash is `white-space: nowrap` so it always lands
 * whole on one line — split across two it reads as two unrelated marks.
 */
export function HeroV2() {
  return (
    <section style={{ background: V2.wash }}>
      <div
        style={{
          ...V2_CONTAINER,
          padding: "clamp(44px,5.6vw,80px) clamp(20px,4vw,48px) clamp(40px,4.2vw,60px)",
        }}
      >
        <div className="v2-hero-cols">
          {/* left: headline, lead, actions */}
          <div>
            <h1
              className="v2-hero-h1"
              style={{
                margin: 0,
                fontFamily: V2_FONT.display,
                fontWeight: 400,
                color: V2.ink,
              }}
            >
              Powering your home, your pocket, and{" "}
              <span
                style={{
                  color: V2.ink,
                  background: V2.accent,
                  padding: "0 0.08em",
                  /* the swash reads as one mark, so it never splits a line */
                  whiteSpace: "nowrap",
                }}
              >
                your future.
              </span>
            </h1>

            <p
              style={{
                margin: "clamp(28px,2.8vw,40px) 0 0",
                maxWidth: 532,
                fontFamily: V2_FONT.body,
                fontWeight: 300,
                fontSize: 16,
                lineHeight: "26px",
                color: V2.ink,
              }}
            >
              The trusted ecosystem for certified refurbished devices, smart home
              automation, and solar energy. Every unit vetted, sealed, and
              guaranteed.
            </p>

            <div
              style={{
                display: "flex",
                gap: 12,
                /* NO `align-items` — the default `stretch` is what makes the
                   two buttons the same height. `fill` has no border and is
                   42px on its own content; `outline`'s 1px hairline makes it
                   44px. v1's hero row relies on the same stretch, so both
                   pairs land on 44px and read as one matched pair. */
                flexWrap: "wrap",
                marginTop: "clamp(32px,4.2vw,60px)",
              }}
            >
              <ButtonV2 label="Shop now" href="/shop" variant="fill" />
              <ButtonV2
                label="Value your device"
                href="/trade-in"
                variant="outline"
              />
            </div>
          </div>

          {/* right: framed still with a centred play target */}
          <div
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              border: `4px solid ${V2.ink}`,
              backgroundColor: V2.ink,
              backgroundImage: "url(/hero/bleed.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: 94,
                  height: 94,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.92)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="28" viewBox="0 0 24 28" aria-hidden>
                  <path d="M3 2 22 14 3 26Z" fill={V2.ink} />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* logo strip — one row, label inline at the left */}
        <div
          className="v2-logos"
          style={{ marginTop: "clamp(48px,6.7vw,96px)" }}
        >
          <Mono style={{ flex: "0 0 auto" }}>Trusted by</Mono>
          {logos.map((l) => (
            /* plain <img>: tiny static brand marks, as v1's BrandStrip does */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={l.name}
              src={l.src}
              alt={l.name}
              style={{
                maxHeight: 24,
                maxWidth: 78,
                width: "auto",
                height: "auto",
                objectFit: "contain",
                filter: "grayscale(1)",
                opacity: 0.55,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
