export function DarkStat({ n, label }: { n: string; label: string }) {
  return (
    <div className="pg-dark-stat">
      <div className="pg-dark-stat__n">{n}</div>
      <div className="pg-dark-stat__label">{label}</div>
    </div>
  );
}
