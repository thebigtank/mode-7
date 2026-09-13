"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Mono } from "@/components/ui/Mono";
import content from "@/content/smart-home.json";

const categories = content.categories;
const { categoriesHead } = content;

type Edge = "start" | "mid" | "end";

export function CategoryShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = categories[activeIndex];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<Edge>("start");

  const updateEdge = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const THRESHOLD = 4;
    if (scrollLeft <= THRESHOLD) {
      setEdge("start");
    } else if (scrollLeft + clientWidth >= scrollWidth - THRESHOLD) {
      setEdge("end");
    } else {
      setEdge("mid");
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdge, { passive: true });
    updateEdge();
    return () => el.removeEventListener("scroll", updateEdge);
  }, [updateEdge]);

  return (
    <section className="sh-section">
      <Mono dot className="mb-4">
        {categoriesHead.overline}
      </Mono>
      <h2 className="sh-cat-head__title">{categoriesHead.title}</h2>

      <Link href="/shop" className="svc-lift block no-underline text-inherit">
        <div className="sh-cat-hero__media flex items-end">
          <div className="sh-cat-hero__label">▣ {active.label.toUpperCase()}</div>

          <div className="sh-cat-hero__scrim">
            <div className="sh-cat-hero__row flex items-end justify-between flex-wrap">
              <div>
                <div className="sh-cat-hero__title">{active.label}</div>
                <div className="sh-cat-hero__sub">{active.sub}</div>
              </div>
              <ButtonV2 label={`Explore ${active.label}`} variant="fill" />
            </div>
          </div>
        </div>
      </Link>

      <div className="sh-cat-more">
        <div className="sh-cat-more__head flex justify-between items-center">
          <div className="sh-cat-more__title">More categories</div>
          <div className="sh-cat-more__hint uppercase">Scroll to explore →</div>
        </div>

        <div ref={scrollRef} data-edge={edge} className="sh-cat-scroll flex">
          {categories.map((c, i) => (
            <Link
              key={c.label}
              href="/shop"
              className="sh-cat-card flex flex-col"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(0)}
            >
              <div className="sh-cat-card__media">
                <div className="sh-cat-card__label">▣ {c.label.toUpperCase()}</div>
              </div>

              <div className="sh-cat-card__body">
                <div className="sh-cat-card__title">{c.label}</div>
                <div className="sh-cat-card__sub">{c.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
