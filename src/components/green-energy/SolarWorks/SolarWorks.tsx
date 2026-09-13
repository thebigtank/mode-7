import content from "@/content/green-energy.json";

export function SolarWorks() {
  const { solarWorks } = content;
  const steps = solarWorks.steps;
  return (
    <section className="ge-section">
      <div className="ge-solarworks__grid grid">
        <div className="ge-solarworks__sticky">
          <div className="ge-eyebrow uppercase">{`// ${solarWorks.eyebrow}`}</div>
          <h2 className="ge-h2 ge-solarworks__title">{solarWorks.title}</h2>
          <p className="ge-lede">{solarWorks.lede}</p>
        </div>
        <div>
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="ge-step grid"
              data-last={i === steps.length - 1 || undefined}
            >
              <div className="ge-step__n">{s.n}</div>
              <div>
                <div className="ge-step__title">{s.title}</div>
                <p className="ge-step__body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
