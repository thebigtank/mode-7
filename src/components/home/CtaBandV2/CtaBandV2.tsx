import { pillars } from "@/lib/content";
import { V2, V2_FONT, V2_TYPE } from "@/lib/theme-v2";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { P } from "@/components/ui/P";

export function CtaBandV2() {
  return (
    <Band ground="ink" className="v2-cta-band">
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

          <ButtonV2 label="Talk to our team" href="/contact" variant="fill" />
        </div>
      </div>
    </Band>
  );
}
