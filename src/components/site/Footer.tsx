"use client";

import { ArrowButton } from "@/components/ArrowButton";
import { socials } from "@/components/Icons";
import { footerCols } from "@/lib/content";
import { COLOR, FONT } from "@/lib/theme";

/**
 * The footer: a full-bleed dark-brown band that sits at the bottom of the
 * opaque content layer and slides up over the giant fixed MODE 7 wordmark
 * behind it. It runs edge to edge — no side margin, no radius.
 *
 * Top: closing statement + a "Back to top" ArrowButton pointing up.
 * Mid: brand block (wordmark, copy, social icon circles) + 2 link columns.
 * There is deliberately NO newsletter and NO blog/insights column.
 */
export function Footer() {
  const scrollTop = () => {
    try {
      (document.scrollingElement || document.documentElement).scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer
      /* m7-on-dark flips the global focus ring to cream; an espresso ring on the
         dark band would be a ring nobody can find. */
      className="m7-on-dark"
      style={{
        /* dark, not espresso: the reference footer samples #372515, a warm
           brown. Cream on #3C3521 is 9.83:1, so the onEspresso* text roles all
           still clear their floors here. */
        background: COLOR.espresso,
        color: COLOR.onEspresso,
        padding: "clamp(52px, 7vw, 88px) 0 40px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          paddingInline: "clamp(20px, 4vw, 56px)",
        }}
      >
        {/* top: closing statement + back to top */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40,
            flexWrap: "wrap",
            paddingBottom: 38,
          }}
        >
          <div style={{ maxWidth: 680 }}>
            <div
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: "clamp(28px, 4.4vw, 46px)",
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                color: COLOR.onEspresso,
              }}
            >
              Powering your home, your pocket, and your future.
            </div>
          </div>
          <span style={{ flex: "0 0 auto" }}>
            <ArrowButton
              label="Back to top"
              variant="outline"
              direction="up"
              onClick={scrollTop}
            />
          </span>
        </div>

        {/* mid: brand block + link columns */}
        <div
          className="m7-grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "1.7fr 1fr 1fr",
            gap: "clamp(30px, 4vw, 48px)",
            padding: "clamp(40px, 5vw, 64px) 0 8px",
            borderTop: `1px solid ${COLOR.onEspressoLine}`,
          }}
        >
          {/* the brand block's right padding only makes sense beside a column */}
          <div style={{ paddingRight: "clamp(0px, 4vw, 40px)" }}>
            <div
              style={{
                fontFamily: FONT.head,
                fontWeight: 700,
                fontSize: 30,
                letterSpacing: 4,
                marginBottom: 20,
              }}
            >
              MODE&nbsp;7
            </div>
            <div
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: COLOR.onEspressoMuted,
                maxWidth: 330,
                marginBottom: 30,
              }}
            >
              A comprehensive technology hub for your home and everyday life —
              premium devices, smart-home automation, solar energy and a certified
              repair division. Every unit vetted, sealed and guaranteed.
            </div>
            <div
              style={{ display: "flex", gap: 11, color: COLOR.onEspresso }}
            >
              {socials.map((s) => (
                <span
                  key={s.name}
                  className="m7-social-dark"
                  aria-label={s.name}
                  style={{
                    display: "inline-flex",
                    width: 42,
                    height: 42,
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${COLOR.onEspressoLine}`,
                    borderRadius: "50%",
                    cursor: "pointer",
                    transition: "all .2s ease",
                  }}
                >
                  {s.icon}
                </span>
              ))}
            </div>
          </div>

          {footerCols.map((c) => (
            <div key={c.title}>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  letterSpacing: 1.5,
                  color: COLOR.onEspressoMuted,
                  textTransform: "uppercase",
                  marginBottom: 22,
                }}
              >
                {c.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {c.links.map((l) => (
                  <span
                    key={l}
                    className="m7-footer-link"
                    style={{
                      fontSize: 15,
                      color: COLOR.onEspresso,
                      cursor: "pointer",
                    }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/*
          Mobile wordmark.

          On desktop MODE 7 is the giant black cut-out behind the page that the
          footer slides up to uncover (see RevealWordmark). That reveal depends
          on a tall scroll runway and a pointer-tracked spotlight, neither of
          which a phone has — so below 900px the reveal is switched off and the
          wordmark is stated plainly here instead: white on the black card, the
          last thing in the black area, above the divider before the copyright.
        */}
        <div className="m7-footer-mark" aria-hidden="true">
          MODE&nbsp;7
        </div>
      </div>
    </footer>
  );
}
