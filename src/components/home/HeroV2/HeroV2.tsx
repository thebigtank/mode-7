import { logos } from "@/lib/content";
import { V2, V2_CONTAINER, V2_FONT } from "@/lib/theme-v2";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { HeroHeadlineV2 } from "@/components/home/HeroHeadlineV2Scramble";

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
          padding: "clamp(44px,5.6vw,80px) clamp(20px,4vw,48px) clamp(64px,7.8vw,112px)",
        }}
      >
        <div className="v2-hero-cols">
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

      <div
        className="v2-marquee-wrap"
        role="group"
        aria-label={`Trusted by ${logos.length} brands: ${logos
          .map((l) => l.display)
          .join(", ")}`}
      >
        <div className="v2-marquee-track">
          <div className="v2-marquee-row">
            {logos.map((l) => (
              <MarqueeItem key={`a-${l.name}`} name={l.display} />
            ))}
          </div>
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
