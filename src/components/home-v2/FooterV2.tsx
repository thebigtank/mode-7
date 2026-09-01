import Link from "next/link";
import { footerCols, legalLinks } from "@/lib/content";
import { V2, V2_CONTAINER, V2_FONT, V2_HAIR_DARK } from "@/lib/theme-v2";
import { BtnFill, BtnOutline, H2, Mono } from "./Ui";

/**
 * Section 10 — mirrors the reference homepage's two-part dark close: a centred
 * closing CTA above the footer proper (wordmark, link columns, legal row).
 *
 * Mode 7 content: the `footerCols` array for the link columns, `legalLinks` for
 * the bottom row, and the existing /contact and /services routes for the two
 * buttons.
 *
 * Colour: the filled button is a gold GROUND with an ink label (10.02:1). The
 * outline button and the links are white / `V2.faint` (7.75:1) on ink;
 * hairlines are rgba(255,255,255,0.14).
 */

/** Existing routes for the footer link labels. Anything unrouted stays inert. */
const LINK_HREF: Record<string, string> = {
  "Swap Program": "/trade-in",
  "Smart Home": "/smart-home",
  "Green Energy": "/green-energy",
  "About Us": "/about",
  "Contact Us": "/contact",
};

export function FooterV2() {
  return (
    <footer style={{ background: V2.ink }}>
      {/* closing CTA */}
      <div
        style={{
          ...V2_CONTAINER,
          padding: "clamp(64px,8vw,120px) clamp(20px,4vw,48px)",
          textAlign: "center",
          borderBottom: V2_HAIR_DARK,
        }}
      >
        <Mono color={V2.faint} style={{ marginBottom: 20 }}>
          The next step
        </Mono>
        <H2
          color={V2.white}
          size="clamp(34px,4.4vw,56px)"
          style={{ maxWidth: 900, margin: "0 auto" }}
        >
          Let&apos;s power what&apos;s next.
        </H2>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "clamp(28px,3.4vw,44px)",
          }}
        >
          <BtnFill label="Talk to us" href="/contact" />
          <BtnOutline
            label="Explore our work"
            href="/services"
            color={V2.white}
            border="rgba(255,255,255,0.28)"
          />
        </div>
      </div>

      {/* footer proper */}
      <div
        style={{
          ...V2_CONTAINER,
          padding: "clamp(48px,5.4vw,76px) clamp(20px,4vw,48px) 0",
        }}
      >
        <div className="v2-footcols">
          <div
            style={{
              fontFamily: V2_FONT.display,
              fontWeight: 400,
              fontSize: "clamp(30px,4vw,52px)",
              letterSpacing: "-0.02em",
              color: V2.white,
            }}
          >
            Mode 7
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <Mono color={V2.faint} style={{ marginBottom: 16 }}>
                {col.title}
              </Mono>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {col.links.map((l) => {
                  const href = LINK_HREF[l];
                  return (
                    <li key={l} style={{ marginBottom: 11 }}>
                      {href ? (
                        <Link
                          href={href}
                          style={{
                            fontFamily: V2_FONT.body,
                            fontSize: 16,
                            fontWeight: 300,
                            color: V2.white,
                            textDecoration: "none",
                          }}
                        >
                          {l}
                        </Link>
                      ) : (
                        <span
                          style={{
                            fontFamily: V2_FONT.body,
                            fontSize: 16,
                            fontWeight: 300,
                            color: V2.white,
                          }}
                        >
                          {l}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="v2-legal"
          style={{
            borderTop: V2_HAIR_DARK,
            marginTop: "clamp(40px,5vw,72px)",
            padding: "22px 0 30px",
          }}
        >
          <span style={{ fontFamily: V2_FONT.body, fontWeight: 300, fontSize: 13.6, lineHeight: "18px", color: V2.faint }}>
            © 2026 Mode 7. Powering homes and pockets.
          </span>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {legalLinks.map((l) => (
              <span key={l} style={{ fontFamily: V2_FONT.body, fontWeight: 300, fontSize: 13.6, lineHeight: "18px", color: V2.faint }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
