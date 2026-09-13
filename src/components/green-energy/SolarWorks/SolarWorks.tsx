const steps = [
  {
    n: "01",
    title: "Free home survey",
    body: "We assess your roof, shading, usage patterns and goals — remotely or on-site.",
  },
  {
    n: "02",
    title: "Custom system design",
    body: "A tailored panel, battery and inverter layout with clear, honest savings projections.",
  },
  {
    n: "03",
    title: "Certified install",
    body: "Accredited engineers install and commission everything to code, usually in a day.",
  },
  {
    n: "04",
    title: "Monitor & save",
    body: "Track generation, storage and savings live — and let the system optimise itself.",
  },
];

export function SolarWorks() {
  return (
    <section className="ge-section">
      <div className="ge-solarworks__grid">
        <div className="ge-solarworks__sticky">
          <div className="ge-eyebrow">{"// How Solar Works"}</div>
          <h2 className="ge-h2 ge-solarworks__title">The Power of Energy Independence</h2>
          <p className="ge-lede">
            Switching to solar isn&rsquo;t just about placing panels on a roof; it is
            about taking complete control of your energy consumption. By harnessing
            clean, renewable power directly from the sun, you drastically reduce your
            reliance on unpredictable utility companies, shield yourself from rising
            electricity rates, and significantly lower your carbon footprint.
          </p>
        </div>
        <div>
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="ge-step"
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
