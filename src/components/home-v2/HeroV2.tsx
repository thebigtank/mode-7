import { logos } from "@/lib/content";
import { V2, V2_CONTAINER, V2_FONT } from "@/lib/theme-v2";
import { ButtonV2 } from "@/components/ui/ButtonV2";
// The rotating word's character-scramble ("decode") variant (live). A GSAP
// wipe alternative is parked, not deleted, at "./HeroHeadlineV2Wipe" — swap
// this import to that path to bring it back; see the note at the top of
// that file. Both variants export their component as `HeroHeadlineV2`, so
// switching is always this one line.
import { HeroHeadlineV2 } from "./HeroHeadlineV2Scramble";

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
 * with exactly ONE word changing: the noun on line 1 decodes, left to right,
 * through a six-word pool inside a masked slot. Everything load-bearing
 * about it — the reserved slot width, the fixed accessible name, the motion
 * gates — is documented there.
 *
 * Colour: the reference sets its final headline phrase in orange. Here the
 * word is DARK TYPE over a permanent gold marker that covers only the lower
 * half of the letterforms — see the band note below for the measured
 * contrast and the geometry.
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
 * moves, with the decoding words passing through it. It lives in
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
 * all three lines is at full opacity). The section ground is now `V2.white`
 * (was `V2.wash`, see the section element below), which only moves the
 * page-ground pair — the gold band is a fixed swatch, unaffected by what the
 * section around it sits on:
 *
 *   over the gold band   #171D1D on #F0C044   **10.02:1**  passes AAA body
 *   over the page ground #171D1D on #FFFFFF   **17.07:1**  passes AAA body
 *
 * (on the retired `V2.wash` ground these were 10.02:1 and 14.05:1 — the gold
 * pair is identical, the page-ground pair only got roomier.)
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

/**
 * The marquee's separator: a six-pointed sparkle built from three crossing
 * strokes (vertical, and +-60deg) rather than a five-point star or a plain
 * straight-edged asterisk. Six tips sit at 60deg apart, radius 10.5, around
 * the (12,12) centre of a square 24x24 viewBox; between every pair of
 * adjacent tips the outline is ONE cubic bezier whose two control points sit
 * close to the centre (radius 1.2) along each tip's own radial angle. That
 * shared "handle near the centre" is what does the work: the curve leaves
 * each tip heading straight in along its radius (a true cusp, not a rounded
 * corner, so the point stays sharp) and bows in close to the centre before
 * heading back out to the next tip — a pinched, concave waist on every ray,
 * not a straight bar. Softened ink rather than full `accentOn`, so it reads
 * as a quieter accent than the bold brand names either side of it.
 */
function MarqueeSpark({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ flex: "0 0 auto" }}
    >
      <path
        d="M12 1.5 C12 10.8 13.039 11.4 21.093 6.75 C13.039 11.4 13.039 12.6 21.093 17.25 C13.039 12.6 12 13.2 12 22.5 C12 13.2 10.961 12.6 2.907 17.25 C10.961 12.6 10.961 11.4 2.907 6.75 C10.961 11.4 12 10.8 12 1.5 Z"
        fill="rgba(28,21,15,0.6)"
      />
    </svg>
  );
}

/** One name + trailing spark, repeated to build a marquee half. */
function MarqueeItem({ name }: { name: string }) {
  return (
    <span className="v2-marquee-item">
      <span className="v2-marquee-name">{name}</span>
      <MarqueeSpark />
    </span>
  );
}

export function HeroV2() {
  return (
    <section style={{ background: V2.white }}>
      <div
        style={{
          ...V2_CONTAINER,
          /* bottom padding is ALSO the gap to the marquee: the gold band
             sits right outside this div as a full-bleed sibling (see
             below), carrying no top margin/padding of its own, so widening
             the space above the band happens HERE, never inside
             .v2-marquee-row's own padding — that would make the band
             itself taller instead. The previous clamp(48px,5vw,76px) (and,
             before that, clamp(40px,4.2vw,60px)) both read as crowding the
             band against the buttons when measured on the rendered page —
             72px at 1440 sat noticeably tighter than the section's own top
             padding (80px at 1440, clamp(44px,5.6vw,80px)) despite the gold
             band being a much harder visual stop than the header above it.
             clamp(64px,7.8vw,112px) is a decisive jump rather than another
             small nudge: 112px at the 1440 reference (+40px over the last
             value, and above the top padding on purpose, since a solid
             colour band needs more separation than a plain section start),
             64px at the mobile floor (+16px). Screenshotted at both widths
             against the live page before landing on these numbers; the
             band's own height (`.v2-marquee-row`'s padding) is untouched,
             so this only moves the gap above it. */
          padding: "clamp(44px,5.6vw,80px) clamp(20px,4vw,48px) clamp(64px,7.8vw,112px)",
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
      </div>

      {/* gold marquee band — brand names only, separated by the spark glyph,
          scrolling continuously right to left, no heading or label rendered
          beside it (the accessible name lives entirely in the `aria-label`
          below). Full-bleed: the standard width:100vw + margin:calc(50%-50vw)
          breakout, safe here because `.v2-marquee-wrap` is a plain block with
          no positioned ancestor between it and the page root, and both the
          page root (`homepage-v2/page.tsx`, inline `overflowX:"clip"`) and
          <body> (globals.css) already clip the sub-pixel scrollbar overshoot
          100vw can introduce — this rule needs no defensive margin of its
          own. `.v2-marquee-wrap`'s OWN `overflow:hidden` is what crops the
          sliding track, not a safety net (see V2Styles.tsx). */}
      <div
        className="v2-marquee-wrap"
        role="group"
        aria-label={`Trusted by ${logos.length} brands: ${logos
          .map((l) => l.display)
          .join(", ")}`}
      >
        <div className="v2-marquee-track">
          {/* the real copy — plain content, since the accessible name is
              already carried by the wrap's aria-label above */}
          <div className="v2-marquee-row">
            {logos.map((l) => (
              <MarqueeItem key={`a-${l.name}`} name={l.display} />
            ))}
          </div>
          {/* the seamless duplicate the -50% translate needs. It is a visual
              copy only — screen readers must not announce it twice. */}
          <div className="v2-marquee-row" aria-hidden="true">
            {logos.map((l) => (
              <MarqueeItem key={`b-${l.name}`} name={l.display} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
