import { testimonials } from "@/lib/content";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

/**
 * Section 9 — the reference's closing card row: a large display heading with a
 * one-line subtitle beneath it and a dark action block pushed to the right,
 * then a row of cards, each a dotted mono category over a wide image, a title,
 * a paragraph and a trailing link.
 *
 * Measured against `09-insights.png` at 1440: heading at 48px (the one place
 * the reference steps above the 40px h2), subtitle 47px under it, the action
 * block right-aligned on the subtitle's line, cards ~384 wide on a 32px
 * gutter, category 69px above a 16:9 image, title 24px, body 16px.
 *
 * The reference row is a carousel with a fourth card bleeding off the right
 * edge. This is a static three-up grid instead: a peeking fourth card would
 * need a fourth item, and Mode 7 has exactly three left after the pull-quote
 * takes the first.
 *
 * Mode 7 content: Mode 7 publishes no articles, so the shape carries reviews
 * rather than invented titles or dates. `testimonials[1]`, `[2]` and `[3]`:
 * each card's category is the person's `role`, its title their `name`, its
 * body their `quote`. The subtitle is a clause of `revealStatement`
 * verbatim. Images are `/hero/team-2.webp`, `team-4.webp`,
 * `team-6.webp`. No dates are shown, because there are none to show.
 *
 * Colour: category labels are `V2.accentText` (4.60:1 on wash); the leading
 * dot is a gold FILL. The reference sets one card's "read more" in orange —
 * here that link is `V2.accentText` too, since gold type on wash is 1.40:1.
 */
const IMAGES = ["/hero/team-2.webp", "/hero/team-4.webp", "/hero/team-6.webp"];

export function InsightsV2() {
  const items = testimonials.slice(1, 4);

  return (
    <Band ground={V2.wash} pad="clamp(64px,8.7vw,126px)" padBottom="clamp(64px,7vw,100px)">
      <div className="v2-headrow" style={{ marginBottom: "clamp(44px,4.8vw,69px)" }}>
        <div>
          <H2 size="clamp(34px,3.7vw,48px)" lineHeight={1.1}>
            What our customers say
          </H2>
          <P style={{ marginTop: "clamp(28px,3.3vw,47px)", maxWidth: 640 }}>
            Every unit is vetted, sealed and guaranteed — this isn&apos;t retail,
            it&apos;s a complete technology lifecycle engineered around you.
          </P>
        </div>
        <ButtonV2 label="All reviews" href="/about" variant="ink" />
      </div>

      <div className="v2-articles">
        {items.map((t, i) => (
          <article key={t.name}>
            <Mono dot color={V2.accentText}>
              {t.role}
            </Mono>
            <div
              aria-hidden
              style={{
                marginTop: "clamp(24px,2.9vw,42px)",
                aspectRatio: "16 / 9",
                backgroundImage: `url(${IMAGES[i]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <h3
              style={{
                margin: "clamp(20px,2vw,28px) 0 0",
                fontFamily: V2_FONT.body,
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.25,
                letterSpacing: "-0.24px",
                color: V2.ink,
              }}
            >
              {t.name}
            </h3>
            <P style={{ marginTop: 18, lineHeight: "26px" }}>“{t.quote}”</P>
            <ArrowLink
              label="Read the story"
              href="/about"
              color={V2.accentText}
              style={{ marginTop: 24 }}
            />
          </article>
        ))}
      </div>
    </Band>
  );
}
