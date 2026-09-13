const stats = [
  { n: "3×", label: "grid prices have risen over the last decade" },
  { n: "70%+", label: "of daytime energy a typical home can self-supply" },
  { n: "50%", label: "Average bill reduction" },
];

export function WhyItMatters() {
  return (
    <section className="ge-section">
      <div className="ge-why__grid">
        <div>
          <div className="ge-eyebrow">{"// Why It Matters"}</div>
          <h2 className="ge-h2">Energy prices only go one way. Your bills don’t have to.</h2>
          <p className="ge-lede">
            Grid electricity keeps climbing and supply keeps wobbling. Generating
            your own clean power is no longer a luxury — it’s the smartest hedge a
            household can make.
          </p>
        </div>
        <div className="ge-why__stats">
          {stats.map((s) => (
            <div key={s.n} className="ge-why__stat">
              <div className="ge-why__stat-n">{s.n}</div>
              <div className="ge-why__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
