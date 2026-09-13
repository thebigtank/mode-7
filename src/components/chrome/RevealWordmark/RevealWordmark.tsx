"use client";

import { useRef } from "react";
import { useFooterWordmark } from "@/hooks/useFooterWordmark";
import content from "@/content/chrome.json";

export function RevealWordmark() {
  const c = content.revealWordmark;
  const wrapRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  useFooterWordmark(wrapRef, spotlightRef);

  return (
    <div className="reveal-wordmark fixed inset-x-0 bottom-0 flex flex-col items-stretch">
      <div className="m7-reveal-mark reveal-wordmark__stage overflow-hidden flex items-end justify-center">
        <div ref={wrapRef} className="reveal-wordmark__wrap relative inline-block">
          <div className="reveal-wordmark__word reveal-wordmark__word--blur text-center whitespace-nowrap">{c.wordmark}</div>
          <div
            ref={spotlightRef}
            className="reveal-wordmark__word reveal-wordmark__word--spotlight text-center whitespace-nowrap absolute inset-0"
          >
            {c.wordmark}
          </div>
        </div>
      </div>

      <div className="reveal-wordmark__bar flex items-center justify-between flex-wrap">
        <div className="reveal-wordmark__copyright">{c.copyright}</div>
        <div className="reveal-wordmark__legal flex flex-wrap">
          {c.legalLinks.map((l) => (
            <span key={l} className="m7-muted-link reveal-wordmark__legal-link">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
