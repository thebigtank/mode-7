import { Mono } from "@/components/ui/Mono";

export function TradeInHero() {
  return (
    <section className="t-wrap t-hero">
      <div className="max-w-[62ch]">
        <Mono dot style={{ marginBottom: 16 }}>
          Intelligent Trade-In Portal
        </Mono>
        <h1 className="t-dhero">
          Your device already
          <br />
          has a value.
        </h1>
        <p className="t-lede mt-[22px]">
          We just make it the honest one. Answer a few questions and watch the number build
          itself, line by line — no black box, no lowball, no submit-and-pray.
        </p>
        <div className="t-tick">
          <span className="t-label">≈ 60 seconds</span>
          <span className="t-label">Live market data</span>
          <span className="t-label">Trade toward any device</span>
          <span className="t-label">Vetted · Sealed · Guaranteed</span>
        </div>
      </div>
    </section>
  );
}
