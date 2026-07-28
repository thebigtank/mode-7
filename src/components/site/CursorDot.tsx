"use client";

import { useRef } from "react";
import { useCursorDot } from "@/hooks/useCursorDot";

/**
 * The negative/invert cursor dot. `mix-blend-mode: difference` inverts whatever
 * it sits over, so it reads on both the white page and the black footer card.
 */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  useCursorDot(ref);

  return (
    <div
      ref={ref}
      className="m7-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 13,
        height: 13,
        borderRadius: 999,
        background: "#fff",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 100000,
        opacity: 0,
        transform: "translate(-50%,-50%)",
        transition:
          "width .5s cubic-bezier(.16,1,.3,1), height .5s cubic-bezier(.16,1,.3,1), opacity .3s ease",
        willChange: "transform,width,height",
      }}
    />
  );
}
