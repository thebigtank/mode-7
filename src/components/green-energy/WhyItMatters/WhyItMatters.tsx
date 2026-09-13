import content from "@/content/green-energy.json";

export function WhyItMatters() {
  const { whyItMatters } = content;
  return (
    <section className="ge-section">
      <div className="ge-why__grid grid items-center">
        <div>
          <div className="ge-eyebrow uppercase">{`// ${whyItMatters.eyebrow}`}</div>
          <h2 className="ge-h2">{whyItMatters.title}</h2>
          <p className="ge-lede">{whyItMatters.lede}</p>
        </div>
        <div className="ge-why__stats flex flex-col">
          {whyItMatters.stats.map((s) => (
            <div key={s.n} className="ge-why__stat flex items-baseline">
              <div className="ge-why__stat-n">{s.n}</div>
              <div className="ge-why__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
