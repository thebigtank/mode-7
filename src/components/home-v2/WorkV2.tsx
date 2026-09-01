import { capabilities } from "@/lib/content";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { ArrowLink, Band, BtnFill, H2, Mono, P } from "./Ui";

/**
 * Section 7 — the reference's case-study stack: a dotted mono eyebrow, a
 * display heading, a lead paragraph with a dark action block pushed to the
 * right, then full-width hairline-bordered rows whose left side carries a mono
 * category, a large serif title and a trailing link, and whose right side is a
 * flush image.
 *
 * Measured against `07-work.png` at 1440: eyebrow 111px below the band top,
 * heading at 40px, the lead/button row 60px under it, rows 378px tall on a
 * 24px stack gap, a 1px hairline border at 2px radius, 64px of text padding
 * inside the left side, and an image occupying the right 516px of the 1280
 * row — a 1 / 0.675 split.
 *
 * Mode 7 content: the three `capabilities` entries. Each row's category label
 * is that capability's FIRST BULLET; the title is its `title`, the body its
 * `desc`, and the trailing link is its own `cta` string pointing at the
 * matching existing route. The lead paragraph is a sentence of
 * `revealStatement` verbatim, not new copy. Images are `/hero/cap-tradein.webp`,
 * `cap-chat.webp` and `cap-solar.webp`, in capability order.
 *
 * The reference pairs each row with a large money metric. Mode 7 publishes no
 * such figures, so these rows carry NONE — the space the metric occupied is
 * given to the capability's own description rather than to an invented number.
 * Every row therefore keeps the image on the right, as the reference does.
 *
 * Colour: category labels are `V2.accentText` (4.60:1 on wash) — gold as text
 * on a light ground is 1.40:1 and forbidden.
 */
const IMAGES = [
  "/hero/cap-tradein.webp",
  "/hero/cap-chat.webp",
  "/hero/cap-solar.webp",
];

const HREFS = ["/trade-in", "/contact", "/services"];

export function WorkV2() {
  return (
    <Band ground={V2.wash} pad="clamp(64px,7.7vw,111px)" padBottom="clamp(64px,6.7vw,96px)">
      <Mono dot color={V2.ink}>
        What we do
      </Mono>
      <H2 style={{ marginTop: 24, maxWidth: 760 }}>
        Built for every part of the lifecycle.
      </H2>

      <div
        className="v2-headrow"
        style={{ marginTop: "clamp(28px,3.4vw,49px)", marginBottom: "clamp(36px,3.3vw,47px)" }}
      >
        <P style={{ maxWidth: 560, lineHeight: "26px" }}>
          Mode 7 powers homes and pockets, curating premium hardware,
          sustainable energy and effortless upgrades under one trusted roof.
        </P>
        <BtnFill
          label="See all services"
          href="/services"
          ground={V2.ink}
          color={V2.white}
        />
      </div>

      <div style={{ display: "grid", gap: 24 }}>
        {capabilities.map((c, i) => (
          <div
            key={c.title}
            className="v2-caserow"
            style={{
              border: "1px solid rgba(23,29,29,0.18)",
              borderRadius: 2,
              overflow: "hidden",
              minHeight: 378,
            }}
          >
            <div
              style={{
                padding: "clamp(32px,4.4vw,64px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Mono color={V2.accentText}>{c.bullets[0]}</Mono>
              <h3
                style={{
                  margin: "24px 0 0",
                  maxWidth: 460,
                  fontFamily: V2_FONT.display,
                  fontWeight: 400,
                  fontSize: "clamp(26px,2.5vw,32px)",
                  lineHeight: 1.18,
                  letterSpacing: "-0.32px",
                  color: V2.ink,
                }}
              >
                {c.title}
              </h3>
              <P style={{ marginTop: 20, maxWidth: 460, lineHeight: "26px" }}>
                {c.desc}
              </P>
              <ArrowLink
                label={c.cta}
                href={HREFS[i]}
                style={{ marginTop: "auto", paddingTop: 32 }}
              />
            </div>

            <div
              aria-hidden
              style={{
                minHeight: 260,
                backgroundImage: `url(${IMAGES[i]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        ))}
      </div>
    </Band>
  );
}
