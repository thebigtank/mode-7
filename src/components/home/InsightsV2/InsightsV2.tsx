import { testimonials } from "@/lib/content";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

const IMAGES = ["/hero/team-2.webp", "/hero/team-4.webp", "/hero/team-6.webp"];

export function InsightsV2() {
  const items = testimonials.slice(1, 4);

  return (
    <Band ground="wash" className="v2-insights-band">
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
            <Mono dot tone="accent-text">
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
