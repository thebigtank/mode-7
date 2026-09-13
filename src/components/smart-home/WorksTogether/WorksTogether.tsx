import { ArrowButton } from "@/components/ArrowButton";
import { MediaPanel } from "@/components/page/Blocks";

const assurances = [
  {
    title: "Vetted & Sealed",
    body: "Every smart device is tested, sealed and warrantied before it ships.",
  },
  {
    title: "Cross-Compatible",
    body: "Works across the major ecosystems and voice assistants.",
  },
  {
    title: "Setup Support",
    body: "DIY with guides, or book certified install — Seven helps either way.",
  },
];

export function WorksTogether() {
  return (
    <section className="sh-section">
      <div
        className="m7-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <div className="sh-eyebrow">{"// Works Together"}</div>
          <h2 className="sh-works__title text-balance">
            Every device speaks the same language.
          </h2>
          <p className="sh-works__lede">
            Mix and match across brands — our gear is tested for cross-compatibility
            so your bulbs, switches, sensors and cameras just work as one connected
            home. Start with a single room and expand whenever you like.
          </p>
          <ArrowButton label="Start with a room" variant="fill" href="/shop" />
        </div>
        <MediaPanel
          label="ECOSYSTEM — DEVICES CONNECTED"
          annotation="PARALLAX IMAGE REVEAL"
        />
      </div>

      <div
        className="m7-grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginTop: 34,
        }}
      >
        {assurances.map((a) => (
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
