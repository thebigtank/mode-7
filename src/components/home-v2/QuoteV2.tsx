import { testimonials } from "@/lib/content";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { Band, Mono } from "./Ui";

/**
 * Section 6 — the reference's dark testimonial band: a dotted mono eyebrow, an
 * oversized serif pull-quote, and an attribution row on the left; a square
 * image on the right.
 *
 * Measured against `06-quote.png` at 1440: 64px of band padding, a 516px
 * square in the right column with a 204px gutter, the eyebrow 97px below the
 * band top, the quote at 40/48 wrapping inside 560px, and the attribution
 * ~80px under the last line, separated from the trailing mark by a vertical
 * hairline.
 *
 * Mode 7 content: `testimonials[0]` (quote, name, role) verbatim,
 * `/hero/av-1.webp` for the portrait chip and `/hero/customer.webp` for the
 * square. The reference puts a client logo after the divider; Mode 7's
 * testimonials are from individuals, not brands, so the chip is the person's
 * portrait and nothing brand-shaped is invented to fill the slot.
 *
 * No metrics appear here — Mode 7 publishes none.
 */
export function QuoteV2() {
  const t = testimonials[0];

  return (
    <Band ground={V2.ink} pad="clamp(56px,4.4vw,64px)">
      <div className="v2-quote-cols">
        <div>
          <Mono dot color={V2.white} style={{ marginBottom: "clamp(24px,2.3vw,34px)" }}>
            Customer review
          </Mono>

          <blockquote
            style={{
              margin: 0,
              maxWidth: 560,
              fontFamily: V2_FONT.display,
              fontWeight: 400,
              fontSize: "clamp(26px,3.1vw,40px)",
              lineHeight: 1.2,
              letterSpacing: "-0.4px",
              color: V2.white,
              textWrap: "pretty",
            }}
          >
            “{t.quote}”
          </blockquote>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: "clamp(40px,5.5vw,80px)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: V2_FONT.body,
                  fontSize: 16,
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: V2.white,
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: V2_FONT.body,
                  fontSize: 15,
                  fontWeight: 300,
                  lineHeight: "22px",
                  color: V2.faint,
                }}
              >
                {t.role}
              </div>
            </div>
            <span
              aria-hidden
              style={{
                width: 1,
                height: 46,
                background: "rgba(255,255,255,0.28)",
                flex: "0 0 auto",
              }}
            />
            <span
              aria-hidden
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                flex: "0 0 auto",
                backgroundImage: "url(/hero/av-1.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>

        <div
          aria-hidden
          className="v2-quote-portrait"
          style={{
            aspectRatio: "1 / 1",
            backgroundImage: "url(/hero/customer.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </Band>
  );
}
