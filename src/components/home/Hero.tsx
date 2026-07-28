import { ArrowButton } from "@/components/ArrowButton";
import { heroFeatures } from "@/lib/content";
import { FONT, stripe } from "@/lib/theme";

/**
 * Hero. 68px / line-height 1 heading with NO overline, and an inline striped
 * placeholder sitting in the line before "your future." Beneath it, a 5-up
 * feature row that is open at both ends (borders top and bottom only).
 */
export function Hero() {
  return (
    <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(48px, 5.4vw, 60px) var(--m7-pad) 0" }}>
      <div
        className="m7-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.45fr) minmax(0, 1fr)",
          gap: 48,
          alignItems: "end",
        }}
      >
        <h1
          className="m7-hero-h1"
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: "clamp(42px, 5.9vw, 68px)",
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
            margin: 0,
          }}
        >
          {/* The explicit spaces matter: on mobile the <br> elements are set to
              display:none so the headline can set larger, and JSX trims the
              whitespace around a line break — without these the words would run
              together as "home,your". A trailing space before a visible <br>
              collapses to nothing, so desktop is unaffected. */}
          Powering your home,{" "}
          <br />
          your pocket, and{" "}
          <br />
          <span
            style={{
              display: "inline-block",
              width: "2.25em",
              height: "0.68em",
              borderRadius: "0.06em",
              background: stripe("#e2e2e2", "#f0f0f0", 6),
              border: "1px solid #d8d8d8",
              verticalAlign: "-0.13em",
              marginRight: "0.32em",
            }}
          />
          your future.
        </h1>

        <div>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "#5a5a5a",
              margin: "0 0 22px",
            }}
          >
            The trusted ecosystem for certified refurbished devices, smart home
            automation, and solar energy. Every unit vetted, sealed, and guaranteed.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ArrowButton label="Shop Now" variant="fill" href="/shop" />
            <ArrowButton
              label="Value Your Device"
              variant="outline"
              href="/trade-in"
            />
          </div>
        </div>
      </div>

      {/* 5-up feature row */}
      <div
        className="m7-herofeat"
        style={{
          display: "grid",
          gap: 0,
          marginTop: 44,
          borderTop: "1px solid #ececec",
          borderBottom: "1px solid #ececec",
        }}
      >
        {heroFeatures.map((f, i) => (
          <div
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "22px 26px",
              borderRight:
                i === heroFeatures.length - 1 ? undefined : "1px solid #ececec",
            }}
          >
            <div
              style={{
                flex: "0 0 auto",
                width: 40,
                height: 40,
                borderRadius: 4,
                background: stripe("#e6e6e6", "#f2f2f2", 7),
                border: "1px solid #e2e2e2",
              }}
            />
            <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.25 }}>{f}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
