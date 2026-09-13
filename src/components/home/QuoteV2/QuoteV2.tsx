import { testimonials } from "@/lib/content";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { Band } from "@/components/ui/Band";
import { Mono } from "@/components/ui/Mono";

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
