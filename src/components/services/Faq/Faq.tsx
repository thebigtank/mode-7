"use client";

import { useState } from "react";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import { PlusToggle } from "@/components/ui/PlusToggle";
import { faqData } from "@/lib/faq";
import content from "@/content/services.json";

export function Faq() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const group = faqData[tab];

  return (
    <section id="sec-faq" className="svc-faq w-full">
      <div className="svc-faq__wrap mx-auto">
        <div className="svc-faq__head">
          <Mono dot className="mb-4">
            {content.faq.eyebrow}
          </Mono>
          <h2 className="svc-faq__title">{content.faq.title}</h2>
        </div>

        <div className="svc-faq__cols grid items-start">
          <div className="svc-faq__tabs">
            <div className="svc-faq__tabs-label">{content.faq.browseLabel}</div>
            <div className="svc-faq__tab-list flex flex-col">
              {faqData.map((d, i) => (
                <div
                  key={d.tab}
                  onClick={() => setTab(i)}
                  data-active={i === tab}
                  className="svc-faq__tab cursor-pointer"
                >
                  {d.tab}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="svc-faq__group-title">{group.title}</div>
            <div className="svc-faq__questions grid">
              {group.qs.map((qa, qi) => {
                const key = `${tab}:${qi}`;
                const isOpen = !!open[key];
                return (
                  <div key={key} className="svc-faq__item">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen((s) => ({ ...s, [key]: !s[key] }))}
                      className="svc-faq__q-btn flex items-center justify-between w-full text-left cursor-pointer"
                    >
                      <span className="svc-faq__q-text">{qa.q}</span>
                      <PlusToggle open={isOpen} />
                    </button>
                    <div data-open={isOpen} className="svc-faq__a-wrap grid">
                      <div className="svc-faq__a-inner overflow-hidden">
                        <P className="svc-faq__a-text">{qa.a}</P>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
