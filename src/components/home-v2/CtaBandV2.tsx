import { pillars } from "@/lib/content";
import { V2, V2_FONT, V2_TYPE } from "@/lib/theme-v2";
import { Band, BtnFill, H2, P } from "./Ui";

/**
 * Section 8 — the reference's dark routing band: a mono eyebrow, a two-line
 * display heading and a short paragraph on the left; on the right a wrap of
 * mono chips, a hairline, and a single filled action beneath it.
 *
 * Measured against `08-cta.png` at 1440: 100px of band padding, two equal
 * columns on a 116px gutter, chips 38px tall in two rows, the hairline 49px
 * under the last chip row, and the action block 42px under the hairline.
 *
 * Mode 7 content: the four chips are the `pillars` titles; the paragraph is
 * Mode 7's own routing line; the button points at the existing /contact route.
 * The chips are presentational, not controls, so the group is `aria-hidden`.
 *
 * Colour: where the reference uses a near-black block on its dark ground, this
 * uses the gold GROUND with an ink label (10.02:1) — gold as a fill is exactly
 * where the accent rule wants it, and on the ink band it is the strongest the
 * accent gets to be anywhere on the page.
 */
export function CtaBandV2() {
  return (
    <Band ground={V2.ink} pad="clamp(64px,7vw,100px)">
      <div className="v2-cta-cols">
        <div>
          <div
            style={{
              fontFamily: V2_FONT.mono,
              fontSize: V2_TYPE.mono.fontSize,
              letterSpacing: V2_TYPE.mono.letterSpacing,
              textTransform: "uppercase",
              color: V2.white,
              marginBottom: "clamp(24px,2.7vw,39px)",
            }}
          >
            Let&apos;s get specific
          </div>
          <H2 color={V2.white} style={{ maxWidth: 520 }}>
            What are you looking to power?
          </H2>
          <P color={V2.faint} style={{ marginTop: 29, maxWidth: 520, lineHeight: "26px" }}>
            Pick the part of the ecosystem you want to start with — we will take
            it from there.
          </P>
        </div>

        <div>
          <div
            aria-hidden
            style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
          >
            {pillars.map((p) => (
              <span
                key={p.title}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 38,
                  padding: "0 22px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: V2.white,
                  fontFamily: V2_FONT.mono,
                  fontSize: V2_TYPE.mono.fontSize,
                  letterSpacing: V2_TYPE.mono.letterSpacing,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {p.title}
              </span>
            ))}
          </div>

          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.22)",
              margin: "clamp(32px,3.4vw,49px) 0 clamp(28px,2.9vw,42px)",
            }}
          />

          <BtnFill label="Talk to our team" href="/contact" />
        </div>
      </div>
    </Band>
  );
}
