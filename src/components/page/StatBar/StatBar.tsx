import type { CSSProperties } from "react";

export function StatBar({ stats }: { stats: { n: string; label: string }[] }) {
  return (
    <section className="m7-wrap m7-top-sm">
      <div
        className="pg-statbar"
        style={{ "--pg-statbar-cols": stats.length } as CSSProperties}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="pg-statbar__cell"
            data-last={i === stats.length - 1 || undefined}
          >
            <div className="pg-statbar__n">{s.n}</div>
            <div className="pg-statbar__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
