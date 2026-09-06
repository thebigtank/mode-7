import { ArrowButton } from "@/components/ArrowButton";
import { heroFeatures } from "@/lib/content";
import { COLOR, FONT } from "@/lib/theme";

/**
 * Hero. 68px / line-height 1 heading with NO overline, and an inline striped
 * placeholder sitting in the line before "your future." Beneath it, a 5-up
 * feature row that is open at both ends (borders top and bottom only).
 *
 * This is the page's opening GOLD band. Gold is a light ground, so the whole
 * band is set dark: espresso at 10.60:1 for the headline and labels, onGoldMuted
 * at 5.13:1 for the lead. Cream on gold is 1.37:1 and appears nowhere here. The
 * rules are espresso at low alpha and the placeholders are gold-on-gold stripes,
 * so nothing on the band reverts to a neutral grey.
 */
/**
 * Feature-row imagery, keyed by the label it sits beside. All CC0 — see
 * public/hero/CREDITS.md. Kept as a lookup rather than a parallel array so a
 * reordering of `heroFeatures` cannot silently mismatch a picture to a label.
 */
const FEATURE_IMAGE: Record<string, string> = {
  "Premium Devices": "/hero/devices.webp",
  "Certified Refurbished": "/hero/refurb.webp",
  "Smart Home Automation": "/hero/smarthome.webp",
  "Solar & Green Energy": "/hero/solar.webp",
  Accessories: "/hero/access.webp",
};

export function Hero() {
  return (
    <div style={{ background: COLOR.gold }}>
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
            color: COLOR.onGold,
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
              /* Decorative, and deliberately a CSS background rather than an
                 <img>: this sits inside the <h1>, so an image element here
                 would land in the heading's accessible name. */
              backgroundImage: "url(/hero/interior.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid rgba(28,21,15,0.25)",
              verticalAlign: "-0.13em",
              marginRight: "0.32em",
            }}
          />
          your future.
        </h1>

        <div>
          <p
            style={{
              fontSize: "var(--m7-lede-size)",
              lineHeight: 1.6,
              /* onGoldMuted at 5.13:1 — cream on gold would be 1.37:1 */
              color: COLOR.onGoldMuted,
              margin: "0 0 22px",
            }}
          >
            The trusted ecosystem for certified refurbished devices, smart home
            automation, and solar energy. Every unit vetted, sealed, and guaranteed.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {/* the dark button, not rust: it has to separate from the band */}
            <ArrowButton label="Shop Now" variant="ink" href="/shop" />
            <ArrowButton
              label="Value Your Device"
              variant="outline"
              href="/trade-in"
              style={{ borderColor: COLOR.onGoldLine }}
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
          borderTop: "1px solid rgba(28,21,15,0.22)",
          borderBottom: "1px solid rgba(28,21,15,0.22)",
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
                i === heroFeatures.length - 1
                  ? undefined
                  : "1px solid rgba(28,21,15,0.22)",
            }}
          >
            <div
              style={{
                flex: "0 0 auto",
                width: 40,
                height: 40,
                borderRadius: 4,
                /* The label beside it already names the category, so the
                   picture is decorative and carries no alt text of its own. */
                backgroundImage: `url(${FEATURE_IMAGE[f] ?? ""})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid rgba(28,21,15,0.25)",
              }}
            />
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1.25,
                color: COLOR.onGold,
              }}
            >
              {f}
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
