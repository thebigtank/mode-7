const specs: [string, string][] = [
  ["Display", '6.7" OLED 120Hz'],
  ["Chip", "Mode A-series"],
  ["Storage", "128 / 256 / 512 GB"],
  ["Camera", "Triple 50MP system"],
  ["Battery", "All-day, fast charge"],
  ["Warranty", "2 years"],
];

export function ProductOverview() {
  return (
    <div>
      <div className="product-overview__eyebrow">{"// Overview"}</div>
      <h2 className="product-overview__title text-balance">
        Engineered for the everyday premium.
      </h2>
      <p className="product-overview__lede">
        A flagship device vetted, sealed and guaranteed by Mode 7 — with a
        trade-in route and Seven support built in from day one.
      </p>
    </div>
  );
}

export function ProductSpecs() {
  return (
    <div>
      <div className="product-specs__title">Specifications</div>
      {specs.map(([k, v], i) => (
        <div
          key={k}
          className="product-specs__row"
          data-last={i === specs.length - 1 || undefined}
        >
          <span className="product-specs__key">{k}</span>
          <span className="product-specs__value">{v}</span>
        </div>
      ))}
    </div>
  );
}
