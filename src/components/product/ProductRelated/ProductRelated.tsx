import { ProductCard } from "@/components/page/Cards";
import content from "@/content/product.json";
import { PRODUCTS, priceLabel } from "@/lib/catalogue";

const related = content.related.productIds
  .map((id) => PRODUCTS.find((p) => p.id === id))
  .filter((p) => p !== undefined)
  .map((p) => ({ name: p.name, meta: p.meta, price: priceLabel(p) }));

export function ProductRelated() {
  const c = content.related;

  return (
    <section className="m7-wrap m7-top-lg">
      <div className="product-related__eyebrow uppercase">{c.eyebrow}</div>
      <h2 className="product-related__title text-balance">{c.title}</h2>
      <div className="product-related__grid grid">
        {related.map((p) => (
          <ProductCard key={p.name} {...p} height={260} />
        ))}
      </div>
    </section>
  );
}
