"use client";

import Link from "next/link";
import { socials } from "@/components/Icons";
import { scrollPageToTop } from "@/hooks/useLenis";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { H2 } from "@/components/ui/H2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import content from "@/content/chrome.json";

const LINK_HREF: Record<string, string> = {
  "Swap Program": "/trade-in",
  "Smart Home": "/smart-home",
  "Green Energy": "/green-energy",
  "About Us": "/about",
  "Contact Us": "/contact",
};

export function FooterV2() {
  return (
    <footer>
      <div className="v2-footer__top">
        <div className="v2-footer__container mx-auto box-content">
          <div className="v2-headrow v2-footer__headrow flex justify-between flex-wrap">
            <H2
              as="p"
              color="var(--color-v2-white)"
              size="clamp(28px,4.4vw,46px)"
              lineHeight={1.16}
              className="v2-footer__heading"
            >
              {content.footerV2.heading}
            </H2>
            <span className="flex-none">
              <ButtonV2
                label="Back to top"
                direction="up"
                variant="outline"
                onDark
                onClick={scrollPageToTop}
              />
            </span>
          </div>

          <div className="v2-footcols v2-footer__cols grid">
            <div className="v2-footer__brandcol">
              <div className="v2-footer__brand">MODE&nbsp;7</div>
              <P
                color="var(--color-v2-faint)"
                size={15}
                className="v2-footer__desc"
              >
                {content.footerV2.description}
              </P>
              <div className="v2-footer__socials flex">
                {socials.map((s) => (
                  <span
                    key={s.name}
                    className="v2-social inline-flex items-center justify-center"
                    role="img"
                    aria-label={s.name}
                  >
                    {s.icon}
                  </span>
                ))}
              </div>
            </div>

            {content.footerV2.cols.map((col) => (
              <div key={col.title}>
                <Mono tone="faint" className="mb-[22px]">
                  {col.title}
                </Mono>
                <ul className="v2-footer__linklist">
                  {col.links.map((l) => {
                    const href = LINK_HREF[l];
                    return (
                      <li key={l} className="v2-footer__linkitem">
                        {href ? (
                          <Link href={href} className="v2-footer__link">
                            {l}
                          </Link>
                        ) : (
                          <span className="v2-footer__link">{l}</span>
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

      <div className="v2-footer__bottom">
        <div className="v2-legal v2-footer__container mx-auto box-content flex justify-between items-center flex-wrap">
          <span className="v2-footer__legaltext">{content.footerV2.copyright}</span>
          <div className="v2-footer__legallinks flex flex-wrap">
            {content.footerV2.legalLinks.map((l) => (
              <span key={l} className="v2-footer__legaltext">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
