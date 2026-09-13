import content from "@/content/product.json";

export function ProductOverview() {
  const c = content.overview;

  return (
    <div>
      <div className="product-overview__eyebrow uppercase">{c.eyebrow}</div>
      <h2 className="product-overview__title text-balance">{c.title}</h2>
      <p className="product-overview__lede">{c.lede}</p>
    </div>
  );
}

export function ProductSpecs() {
  const c = content.overview;

  return (
    <div>
      <div className="product-specs__title">{c.specsTitle}</div>
      {c.specs.map((s, i) => (
        <div
          key={s.key}
          className="product-specs__row flex justify-between"
          data-last={i === c.specs.length - 1 || undefined}
        >
          <span className="product-specs__key">{s.key}</span>
          <span className="product-specs__value">{s.value}</span>
        </div>
      ))}
    </div>
  );
}
