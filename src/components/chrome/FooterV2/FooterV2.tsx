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
  color: V2.muted,
} as const;

export function FooterV2() {
  return (
    <footer>
      <div style={{ background: V2.ink }}>
        <div
          style={{
            ...V2_CONTAINER,
            padding:
              "clamp(56px,7vw,92px) clamp(20px,4vw,48px) clamp(40px,5vw,72px)",
          }}
        >
          <div
            className="v2-headrow"
            style={{ paddingBottom: "clamp(30px,3.6vw,42px)" }}
          >
            <H2
              as="p"
              color={V2.white}
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
                <Mono tone="faint" className="mb-[22px]">
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
