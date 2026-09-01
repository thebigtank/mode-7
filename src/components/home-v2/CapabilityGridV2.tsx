import { heroFeatures } from "@/lib/content";
import { V2, V2_FONT, V2_TYPE } from "@/lib/theme-v2";
import { ButtonV2 } from "./ButtonV2";
import { ArrowLink, Band, H2 } from "./Ui";

/**
 * Section 4 — the reference's service grid: a left-aligned two-line display
 * heading over a 3x2 block of cards. Five cards carry a line icon, a serif
 * title, a paragraph and a trailing "explore" link; the fifth sits on the dark
 * ground and the sixth is the accent CTA tile.
 *
 * Measured against `04-services.png` at 1440: cards 412x300 on a 20px gutter
 * (3 x 412 + 2 x 20 = 1276 ≈ the 1280 container), 40px card padding, a 24px
 * icon at the top, the title 24px serif, the body 16px, and the link pinned to
 * the card's bottom edge; the heading sits 92px above the first row.
 *
 * Mode 7 content: cells 1–5 are the five `heroFeatures` strings, each with the
 * one-line description already paired with it in `pillars` where one exists,
 * and its route. Cell 6 points at the existing /contact route. No description
 * is written for this section that Mode 7 does not already publish.
 *
 * "Explore" is a `ButtonV2` `outline`, hidden at rest and revealed on the
 * card's `:hover` OR `:focus-within` — the latter is what keeps it reachable by
 * keyboard, since a control that only answers the mouse is no control at all.
 * It keeps its box in layout while hidden (opacity, not display), so the card
 * cannot change height and the grid cannot jump. Under
 * `prefers-reduced-motion: reduce` the transition is dropped AND the button is
 * made permanently visible: a reveal with no motion cue is worse than none.
 * All of that lives in `.v2-explore` / `.v2-capcard` in `V2Styles`.
 *
 * Colour: the outline button's label is ink on the white cards and white on
 * the dark fifth (`onDark`) — gold as text on white is 1.70:1 and forbidden at
 * any size. The CTA tile is the gold GROUND with `V2.accentOn` type (10.02:1);
 * its link is ink, because white on gold would be 1.70:1. That cell's "Book a
 * discovery call" is its only action and stays always visible.
 */

/** Existing routes for the five feature cards. */
const HREF: Record<string, string> = {
  "Premium Devices": "/shop",
  "Certified Refurbished": "/shop",
  "Smart Home Automation": "/smart-home",
  "Solar & Green Energy": "/green-energy",
  Accessories: "/shop",
};

/**
 * One line of Mode 7's own copy per card. The first four are the `sub` strings
 * already paired with these names in `pillars`; Accessories has no published
 * line, so it carries none rather than an invented one.
 */
const BLURB: Record<string, string> = {
  "Premium Devices": "Laptops, tablets and phones, fully vetted.",
  "Certified Refurbished": "Renewed, sealed and guaranteed like new.",
  "Smart Home Automation": "One app to run your entire connected home.",
  "Solar & Green Energy": "Clean-energy systems, installed and managed.",
};

/** 24px line marks, one per card — drawn here, nothing downloaded. */
function Icon({ name, color }: { name: string; color: string }) {
  const s = { stroke: color, strokeWidth: 1.2, fill: "none" } as const;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      {name === "Premium Devices" ? (
        <>
          <rect x="3" y="4" width="14" height="11" rx="1" {...s} />
          <path d="M1 18h18" {...s} strokeLinecap="round" />
          <rect x="18" y="9" width="5" height="11" rx="1" {...s} />
        </>
      ) : name === "Certified Refurbished" ? (
        <>
          <path d="M20 12a8 8 0 1 1-2.4-5.7" {...s} strokeLinecap="round" />
          <path d="M20 3v4h-4" {...s} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 12.2 11 14.7l4.6-4.8" {...s} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : name === "Smart Home Automation" ? (
        <>
          <path d="M3.5 10.5 12 3.5l8.5 7" {...s} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 9.8V20h13V9.8" {...s} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="14.5" r="2.2" {...s} />
        </>
      ) : name === "Solar & Green Energy" ? (
        <>
          <circle cx="12" cy="12" r="4" {...s} />
          <path
            d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19"
            {...s}
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path d="M6 9V6.5a6 6 0 0 1 12 0V9" {...s} strokeLinecap="round" />
          <rect x="3.5" y="9" width="17" height="11" rx="2" {...s} />
        </>
      )}
    </svg>
  );
}

export function CapabilityGridV2() {
  return (
    <Band ground={V2.wash} pad="clamp(64px,8.7vw,126px)" padBottom="clamp(64px,6.3vw,90px)">
      {/* 56px, up from 40px, on a 1.06 line-height. The tracking scales with
          it: the reference sets its 64px h1 at -1.28px, i.e. -0.02em, so 56px
          takes -1.12px — rounded to the -1.1px quoted in the brief. The margin
          below drops from 92px to 46px: the heading now carries enough weight
          to own the grid beneath it, and 92px read as two unrelated blocks. */}
      <H2
        size="clamp(34px,3.9vw,56px)"
        lineHeight={1.06}
        style={{ maxWidth: 680, letterSpacing: "-1.1px", marginBottom: "clamp(24px,3.2vw,46px)" }}
      >
        Built around you, from first tap to upgrade.
      </H2>

      <div className="v2-services">
        {heroFeatures.map((f, i) => {
          /* the fifth card takes the dark ground, as the reference's does */
          const dark = i === 4;
          const ground = dark ? V2.ink : V2.white;
          const title = dark ? V2.white : V2.ink;
          const body = dark ? V2.faint : V2.muted;

          return (
            <article
              key={f}
              className="v2-capcard"
              style={{
                background: ground,
                borderRadius: 2,
                minHeight: 300,
                padding: 40,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Icon name={f} color={title} />
              <h3
                style={{
                  margin: "22px 0 0",
                  fontFamily: V2_FONT.display,
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: 1.25,
                  letterSpacing: "-0.24px",
                  color: title,
                }}
              >
                {f}
              </h3>
              {BLURB[f] ? (
                <p
                  style={{
                    margin: "16px 0 0",
                    fontFamily: V2_FONT.body,
                    fontWeight: 300,
                    fontSize: 16,
                    lineHeight: "26px",
                    color: body,
                  }}
                >
                  {BLURB[f]}
                </p>
              ) : null}
              {/* `outline`, not `fill`: five gold blocks across the grid would
                  put the accent everywhere and leave the one real CTA (cell 6,
                  a gold GROUND) with nothing to be louder than. Outline is the
                  compact ButtonV2 — a 32px tile on 5px padding, ~42px tall —
                  which sits inside a 40px-padded card without crowding it.
                  `onDark` on the fifth card flips the hairline and label to
                  white, since ink-on-ink would vanish.

                  The resting state (opacity 0 + a 6px nudge) is set by
                  `.v2-explore` in V2Styles, NOT inline: an inline `opacity` or
                  `transform` would out-specify the stylesheet's hover and
                  focus-within rules and the button would never appear. */}
              <div className="v2-explore" style={{ marginTop: "auto", paddingTop: 24 }}>
                <ButtonV2
                  label="Explore"
                  href={HREF[f] ?? "/shop"}
                  variant="outline"
                  onDark={dark}
                />
              </div>
            </article>
          );
        })}

        {/* cell 6: the accent CTA tile */}
        <article
          style={{
            background: V2.accent,
            borderRadius: 2,
            minHeight: 300,
            padding: 40,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: V2_FONT.display,
              fontWeight: 400,
              fontSize: 40,
              lineHeight: 1.12,
              letterSpacing: V2_TYPE.h2.letterSpacing,
              /* ink on gold, 10.02:1 */
              color: V2.accentOn,
            }}
          >
            Not sure where to start?
          </h3>
          <ArrowLink
            label="Book a discovery call"
            href="/contact"
            color={V2.accentOn}
            style={{ marginTop: "auto", paddingTop: 24 }}
          />
        </article>
      </div>
    </Band>
  );
}
