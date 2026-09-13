import type { CSSProperties } from "react";
import content from "@/content/about.json";

const M_LABELS: string[] = content.serve.masonryLabels;
const M_HEIGHTS = [150, 212, 176, 240, 192, 164, 226, 200];
const M_NCOLS = 7;
const M_PER_COL = 3;

export function Masonry() {
  return (
    <div className="a-mason" data-rv aria-hidden="true">
      {Array.from({ length: M_NCOLS }, (_, col) => {
        const base = Array.from({ length: M_PER_COL }, (_, j) => {
          const k = col * M_PER_COL + j;
          return {
            h: M_HEIGHTS[k % M_HEIGHTS.length],
            label: M_LABELS[k % M_LABELS.length],
          };
        });
        const tiles = [...base, ...base];
        return (
          <div
            className="a-mcol"
            key={col}
            style={
              {
                "--a-mcol-duration": `${38 + (col % 5) * 6}s`,
                "--a-mcol-direction": col % 2 ? "reverse" : "normal",
              } as CSSProperties
            }
          >
            {tiles.map((t, ti) => (
              <div
                className="a-tile"
                key={ti}
                style={{ "--a-tile-h": `${t.h}px` } as CSSProperties}
              >
                <span className="a-tile__tag">▣ {t.label}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
