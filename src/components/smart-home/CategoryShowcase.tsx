"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowButton } from "@/components/ArrowButton";
import { Annotation } from "@/components/wireframe/Primitives";
import { FONT, stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

interface Category {
  label: string;
  sub: string;
}

const categories: Category[] = [
  { label: "Smart Lighting", sub: "Bulbs, strips & panels" },
  { label: "Switches & Plugs", sub: "Wall switches, smart plugs" },
  { label: "Voice & Control", sub: "Assistants, remotes, hubs" },
  { label: "Sensors", sub: "Motion, door, temperature" },
  { label: "Cameras & Security", sub: "Indoor, outdoor, doorbells" },
  { label: "Climate", sub: "Thermostats & radiator valves" },
  { label: "Hubs & Bridges", sub: "Connect every device" },
  { label: "Accessories", sub: "Mounts, cables, power" },
];

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
      <Link
        href="/shop"
        className="m7-lift"
        style={{
          display: "block",
          textDecoration: "none",
          color: "inherit",
          marginTop: 34,
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            background: stripe(),
            border: "1px solid #e2e2e2",
            height: "clamp(320px, 42vw, 480px)",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 26,
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: 1,
              color: "#9a9a9a",
            }}
          >
            ▣ {active.label.toUpperCase()}
          </div>

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

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              padding: "clamp(28px, 4vw, 48px) clamp(26px, 4vw, 40px)",
              background:
                "linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 60%, transparent 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: "clamp(26px, 3.6vw, 42px)",
                    letterSpacing: "-2px",
                    lineHeight: 1.05,
                    color: "#121212",
                  }}
                >
                  {active.label}
                </div>
                <div
                  style={{
                    fontSize: 17,
                    color: "#5a5a5a",
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {active.sub}
                </div>
              </div>
              <ArrowButton label={`Explore ${active.label}`} variant="fill" />
            </div>
          </div>
        </div>
      </Link>

      <div style={{ marginTop: "clamp(44px, 6vw, 72px)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              fontFamily: FONT.head,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 24px)",
              letterSpacing: "-0.5px",
            }}
          >
            More categories
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: 1.5,
              color: "#9a9a9a",
              textTransform: "uppercase",
            }}
          >
            Scroll to explore →
          </div>
        </div>

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: 14,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            paddingBottom: 4,
            marginRight: "calc(var(--m7-pad) * -1)",
            paddingRight: "var(--m7-pad)",
            ...maskInline,
          }}
          className="m7-scroll m7-cat-scroll"
        >
          {categories.map((c, i) => (
            <Link
              key={c.label}
              href="/shop"
              className="m7-cat-card"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(0)}
              style={{
                flex: "0 0 clamp(220px, 28vw, 280px)",
                textDecoration: "none",
                color: "inherit",
                scrollSnapAlign: "start",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  background: stripe(),
                  border: "1px solid #e2e2e2",
                  height: "clamp(200px, 26vw, 260px)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 18,
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    letterSpacing: 0.8,
                    color: "#9a9a9a",
                    zIndex: 1,
                  }}
                >
                  ▣ {c.label.toUpperCase()}
                </div>
              </div>

              <div style={{ padding: "16px 4px 0" }}>
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: 18,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#8a8a8a",
                    marginTop: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {c.sub}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
