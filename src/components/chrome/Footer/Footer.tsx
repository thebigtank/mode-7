"use client";

import { ArrowButton } from "@/components/ArrowButton";
import { socials } from "@/components/Icons";
import content from "@/content/chrome.json";

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
    <footer className="m7-on-dark v1-footer overflow-hidden">
      <div className="v1-footer__container mx-auto box-content">
        <div className="v1-footer__headrow flex justify-between items-end flex-wrap">
          <div className="v1-footer__heading-wrap">
            <div className="v1-footer__heading">{content.footer.heading}</div>
          </div>
          <span className="flex-none">
            <ArrowButton
              label="Back to top"
              variant="outline"
              direction="up"
              onClick={scrollTop}
            />
          </span>
        </div>

        <div className="v1-footer__cols m7-grid-3 grid">
          <div className="v1-footer__brandcol">
            <div className="v1-footer__brand">MODE&nbsp;7</div>
            <div className="v1-footer__desc">{content.footer.description}</div>
            <div className="v1-footer__socials flex">
              {socials.map((s) => (
                <span
                  key={s.name}
                  className="m7-social-dark v1-footer__social inline-flex items-center justify-center"
                  aria-label={s.name}
                >
                  {s.icon}
                </span>
              ))}
            </div>
          </div>

          {content.footer.cols.map((c) => (
            <div key={c.title}>
              <div className="v1-footer__col-title uppercase">{c.title}</div>
              <div className="v1-footer__col-links flex flex-col">
                {c.links.map((l) => (
                  <span key={l} className="m7-footer-link">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="m7-footer-mark" aria-hidden="true">
          MODE&nbsp;7
        </div>
      </div>
    </footer>
  );
}
