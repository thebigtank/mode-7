import { logos } from "@/lib/content";
import { V2, V2_CONTAINER, V2_FONT } from "@/lib/theme-v2";
import { ButtonV2 } from "./ButtonV2";
import { HeroHeadlineV2 } from "./HeroHeadlineV2";
import { Mono } from "./Ui";

/**
 * Section 1 — the reference's split hero: a two-line ANIMATED display headline
 * with a lead paragraph and a matched primary/secondary button pair on the
 * left, a framed video still with a centred play target on the right, and a
 * single-row "trusted by" logo strip beneath both columns.
 *
 * Measured against `01-hero.png` at 1440: h1 72/74.9/-1.44px starting 88px under
 * the bar, lead paragraph wrapping at ~530px, actions 60px below it, the still
 * 490x276 in the right column, the strip 108px under the fold of both columns.
 *
 * Mode 7 content: v1 `Hero.tsx`'s headline supplies the h1's fixed accessible
 * name, "Powering your home, your pocket, and your future.", and its lead
 * paragraph verbatim; the existing /shop and /trade-in routes;
 * `/hero/bleed.webp`; and the `logos` array for the strip.
 *
 * THE HEADLINE ITSELF LIVES IN `HeroHeadlineV2`, a client component. It is one
 * ordinary three-line sentence, every line the same size and weight —
 * "Powering your Pocket / with tech that's vetted, / sealed and guaranteed." —
 * with exactly ONE word changing: the noun on line 1 rolls vertically through
 * a six-word pool inside a masked slot. Everything load-bearing about it — the
 * reserved slot width, the fixed accessible name, the motion gates — is
 * documented there.
 *
 * Colour: the reference sets its final headline phrase in orange. Here the
 * rolling word is DARK TYPE over a gold marker that covers only the lower half
 * of the letterforms — see the band note below for the measured contrast and
 * the geometry.
 *
 * Layout note: the two hero columns are the reference's 558/642 split
 * REVERSED — the text column is now the wide one (1.45fr vs 1fr) with an 80px
 * gutter, giving the text 710px and the still a 490x276 16:9 frame at 1440.
 * That 710px is what sizes the headline: line 1 at its RESERVED width is the
 * widest of the three lines, and 710px is the ceiling it has to fit under.
 * See `.v2-hero-h1` in `V2Styles.tsx` for the measured fit.
 */

/**
 * WHERE THE GOLD STROKE WENT.
 *
 * The stroke is no longer a `background-image` on one phrase of a static
 * headline: it is a single solid element that BELONGS TO THE SLOT and never
 * moves, with the rolling words passing through it. It lives in
 * `HeroHeadlineV2` and `.v2-hero-band` in `V2Styles`, and it reuses this
 * section's geometry unchanged — pixel-scanned against the gradient it
 * replaces, its top edge lands 0.25px lower and its bottom 0.75px lower. The
 * measurements that fixed that geometry are recorded here because they are
 * what the marker still has to obey.
 *
 * WHY DARK TYPE ON GOLD RATHER THAN GOLD TYPE. The phrase used to be GOLD
 * TYPE on the pale hero ground: #F0C044 on V2.wash, measured **1.40:1**.
 * WCAG's floor is 3:1 for large text and 4.5:1 for body; 1.40:1 clears
 * neither, by more than half. The accent rule in `theme-v2.ts` says gold is a
 * GROUND, not a text colour, on anything light — so the type went back to
 * dark and the gold became the surface underneath it.
 *
 * Measured contrast, re-read off the rendered page (V2.ink #171D1D, which is
 * what the headline uses — there is no longer any dimmed state, every word on
 * all three lines is at full opacity):
 *
 *   over the gold band   #171D1D on #F0C044   **10.02:1**  passes AAA body
 *   over the page ground #171D1D on #E6EAE6   **14.05:1**  passes AAA body
 *
 * The retired gold-text options, all on `wash`, are kept because this was the
 * page's one documented exception to the accent rule and the numbers closed it:
 *
 *   #F0C044  1.40:1  the old value. Fails every threshold at every size.
 *   #9E8235  3.03:1  passes large text only.
 *   #8C7532  3.67:1  comfortable on large text, short of body.
 *   #79662F  4.60:1  passes body text at any size. This is `V2.accentText`.
 *
 * THE BAND. A hard-stop linear gradient, so it reads as a marker stroke and
 * not as a filled block: no padding, no radius, no shape to hold together.
 * Percentages are relative to a box the height of the fontBoundingBox — 102
 * above the baseline and 35 below it per 100px of font size, so 137 tall with
 * the baseline sitting 25.5% up from its bottom. Alegreya's x-height is 45.6
 * per 100px. The stops:
 *
 *   42%  band TOP  = 25.5% (baseline) + 16.6% (half the x-height, 22.8/137)
 *   18%  band BOTTOM = 7.3% below the baseline (10 per 100px)
 *
 * The top stop puts the edge across the middle of the lowercase x-height, so
 * the upper half of every letterform sits on the page ground. The bottom stop
 * is there because a single-stop gradient runs the gold all the way to the
 * bottom of the box — 35 per 100px below the baseline, deeper than the 24.2
 * descenders. 18% stops the band just under the baseline, where a real marker
 * stroke ends. The band is positioned against the SLOT in that same
 * 137-unit system (see `.v2-hero-band` in `V2Styles`), which is how it
 * reproduces the old inline geometry without being attached to any word.
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
            <HeroHeadlineV2 />

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
