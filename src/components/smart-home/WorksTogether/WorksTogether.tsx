import { ArrowButton } from "@/components/ArrowButton";
import { MediaPanel } from "@/components/page/MediaPanel";
import content from "@/content/smart-home.json";

export function WorksTogether() {
  const { works } = content;
  return (
    <section className="sh-section">
      <div className="sh-works__grid grid items-center">
        <div>
          <div className="sh-eyebrow">{`// ${works.eyebrow}`}</div>
          <h2 className="sh-works__title text-balance">{works.title}</h2>
          <p className="sh-works__lede">{works.lede}</p>
          <ArrowButton label={works.cta} variant="fill" href="/shop" />
        </div>
        <MediaPanel label={works.mediaLabel} annotation={works.mediaAnnotation} />
      </div>

      <div className="sh-works__assurances grid">
        {works.assurances.map((a) => (
          <div key={a.title} className="sh-assurance">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-m7-neutral-ink)"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sh-assurance__icon"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            <div className="sh-assurance__title">{a.title}</div>
            <p className="sh-assurance__body">{a.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
