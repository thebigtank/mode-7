"use client";

import Link from "next/link";
import { socials } from "@/components/Icons";
import { scrollPageToTop } from "@/hooks/useLenis";
import { footerCols, legalLinks } from "@/lib/content";
import { V2, V2_CONTAINER, V2_FONT, V2_HAIR_DARK } from "@/lib/theme-v2";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { H2 } from "@/components/ui/H2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

/**
 * Section 10 — the footer, laid out as v1's homepage footer is (see
 * `@/components/site/Footer`), in TWO full-bleed grounds:
 *
 *   dark band (`V2.ink`)
 *     1. closing statement left, "Back to top" right
 *     2. hairline
 *     3. brand block (wordmark, copy, socials) + the two link columns, 1.7fr 1fr 1fr
 *   light band (`V2.wash`)
 *     4. the legal row
 *
 * The two bands are SIBLINGS, not nested: the legal band must not inherit the
 * dark ground or the dark band's horizontal padding, so it sets its own ground
 * at full viewport width and re-applies `V2_CONTAINER` to its own contents.
 * That is what puts the copyright on the same gutter as the MODE 7 wordmark
 * above it while the colour runs edge to edge. The colour change IS the
 * separator, so the legal row carries no hairline of its own.
 *
 * It mirrors v1's STRUCTURE only. The palette stays v2 throughout: `V2.ink`
 * ground with `V2.white` primary / `V2.faint` secondary text and white-alpha
 * hairlines; `V2.wash` ground with `V2.muted` text (5.21:1). Gold never
 * appears on the light band — it is 1.40:1 on `wash`.
 */

/** Existing routes for the footer link labels. Anything unrouted stays inert. */
const LINK_HREF: Record<string, string> = {
  "Swap Program": "/trade-in",
  "Smart Home": "/smart-home",
  "Green Energy": "/green-energy",
  "About Us": "/about",
  "Contact Us": "/contact",
};

const LEGAL_TYPE = {
  fontFamily: V2_FONT.body,
  fontWeight: 300,
  fontSize: 13.6,
  lineHeight: "18px",
  /* On the `wash` band, not the ink one: `muted` is 5.21:1 here, where
     `faint` (built for ink) would be 1.86:1. */
  color: V2.muted,
} as const;

export function FooterV2() {
  return (
    <footer>
      {/* ── the dark band ─────────────────────────────────────────────── */}
      <div style={{ background: V2.ink }}>
        <div
          style={{
            ...V2_CONTAINER,
            padding:
              "clamp(56px,7vw,92px) clamp(20px,4vw,48px) clamp(40px,5vw,72px)",
          }}
        >
          {/* 1 — closing statement + back to top */}
          <div
            className="v2-headrow"
            style={{ paddingBottom: "clamp(30px,3.6vw,42px)" }}
          >
            <H2
              as="p"
              color={V2.white}
              /* v1 sets clamp(28px,4.4vw,46px)/1.04. This is the same string
                 as the h1 in the same face, so it takes the same leading for
                 the same reason: Noto Serif's ink is ~1.01em tall and its
                 x-height is large (0.536em, vs Outfit's 0.475em), so 1.04
                 would collide and 1.14 read dense. 1.16 leaves 0.15em.
                 (The 1.14 this replaces was descender CLEARANCE for Instrument
                 Serif; that face is gone and clearance is no longer the
                 constraint — see .v2-hero-h1 in V2Styles.tsx.)
                 Tracking stays eased from v1's -0.04em to -0.02em: a serif at
                 -0.04em collides at this size. */
              size="clamp(28px,4.4vw,46px)"
              lineHeight={1.16}
              style={{ maxWidth: 680, letterSpacing: "-0.02em" }}
            >
              Powering your home, your pocket, and your future.
            </H2>
            <span style={{ flex: "0 0 auto" }}>
              <ButtonV2
                label="Back to top"
                direction="up"
                variant="outline"
                onDark
                onClick={scrollPageToTop}
              />
            </span>
          </div>

          {/* 2 + 3 — hairline, then brand block + link columns */}
          <div
            className="v2-footcols"
            style={{
              borderTop: V2_HAIR_DARK,
              padding: "clamp(40px,5vw,64px) 0 8px",
            }}
          >
            <div style={{ paddingRight: "clamp(0px,4vw,40px)" }}>
              <div
                style={{
                  /* was JetBrains Mono at 4px tracking (0.13em); retuned for
                     Outfit — see CLAUDE.md's Typography table. */
                  fontFamily: V2_FONT.mono,
                  fontWeight: 700,
                  fontSize: 30,
                  letterSpacing: 2,
                  lineHeight: 1.1,
                  color: V2.white,
                  marginBottom: 20,
                }}
              >
                MODE&nbsp;7
              </div>
              <P
                color={V2.faint}
                size={15}
                style={{ maxWidth: 330, lineHeight: 1.75, marginBottom: 30 }}
              >
                A comprehensive technology hub for your home and everyday life —
                premium devices, smart-home automation, solar energy and a
                certified repair division. Every unit vetted, sealed and
                guaranteed.
              </P>
              <div style={{ display: "flex", gap: 11, color: V2.white }}>
                {socials.map((s) => (
                  <span
                    key={s.name}
                    className="v2-social"
                    /* role=img makes the aria-label valid on a non-interactive
                       element: a bare span with aria-label is not exposed. These
                       are inert marks, exactly as they are in v1. */
                    role="img"
                    aria-label={s.name}
                  >
                    {s.icon}
                  </span>
                ))}
              </div>
            </div>

            {footerCols.map((col) => (
              <div key={col.title}>
                <Mono color={V2.faint} style={{ marginBottom: 22 }}>
                  {col.title}
                </Mono>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {col.links.map((l) => {
                    const href = LINK_HREF[l];
                    const type = {
                      fontFamily: V2_FONT.body,
                      fontSize: 15,
                      fontWeight: 300,
                      color: V2.white,
                      textDecoration: "none",
                    } as const;
                    return (
                      <li key={l} style={{ marginBottom: 14 }}>
                        {href ? (
                          <Link href={href} style={type}>
                            {l}
                          </Link>
                        ) : (
                          <span style={type}>{l}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── the light band: full-bleed ground, contained content ───────── */}
      <div style={{ background: V2.wash }}>
        <div
          className="v2-legal"
          style={{
            ...V2_CONTAINER,
            padding: "22px clamp(20px,4vw,48px) 30px",
          }}
        >
          <span style={LEGAL_TYPE}>
            © 2026 Mode 7. Powering homes and pockets.
          </span>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {legalLinks.map((l) => (
              <span key={l} style={LEGAL_TYPE}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
