"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowButton } from "@/components/ArrowButton";
import { Annotation } from "@/components/wireframe/Primitives";
import content from "@/content/smart-home.json";
import { WIREFRAME } from "@/lib/wireframe-config";

const categories = content.categories;

type Edge = "start" | "mid" | "end";

function maskFor(edge: Edge): string {
  switch (edge) {
    case "start":
      return "linear-gradient(to right, #000 0%, #000 92%, transparent 100%)";
    case "end":
      return "linear-gradient(to right, transparent 0%, #000 8%, #000 100%)";
    case "mid":
    default:
      return "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)";
  }
}

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

  const maskInline = {
    WebkitMaskImage: maskFor(edge),
    maskImage: maskFor(edge),
  };

  return (
    <>
      <Link href="/shop" className="m7-lift block no-underline text-inherit mt-[34px]">
        <div className="sh-cat-hero__media">
          <div className="sh-cat-hero__label">▣ {active.label.toUpperCase()}</div>

          {WIREFRAME.showAnnotations && (
            <>
              <Annotation
                style={{
                  position: "absolute",
                  top: 22,
                  right: 26,
                  fontSize: 10,
                  padding: "6px 13px",
                }}
              >
                HERO CATEGORY — LIFESTYLE IMAGE
              </Annotation>
              <Annotation
                style={{
                  position: "absolute",
                  bottom: 22,
                  right: 26,
                  fontSize: 10,
                  padding: "6px 13px",
                }}
              >
                {activeIndex + 1} OF {categories.length} CATEGORIES
              </Annotation>
            </>
          )}

          <div className="sh-cat-hero__scrim">
            <div className="sh-cat-hero__row">
              <div>
                <div className="sh-cat-hero__title">{active.label}</div>
                <div className="sh-cat-hero__sub">{active.sub}</div>
              </div>
              <ArrowButton label={`Explore ${active.label}`} variant="fill" />
            </div>
          </div>
        </div>
      </Link>

      <div className="sh-cat-more">
        <div className="sh-cat-more__head">
          <div className="sh-cat-more__title">More categories</div>
          <div className="sh-cat-more__hint">Scroll to explore →</div>
        </div>

        <div
          ref={scrollRef}
          style={maskInline}
          className="m7-scroll m7-cat-scroll sh-cat-scroll"
        >
          {categories.map((c, i) => (
            <Link
              key={c.label}
              href="/shop"
              className="m7-cat-card sh-cat-card"
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
    </>
  );
}
