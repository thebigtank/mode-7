import { ProductCard } from "@/components/page/Cards";
import { PRODUCTS, priceLabel } from "@/lib/catalogue";

const related = ["studio-headphones", "smart-hub", "pro-tablet", "home-battery"]
  .map((id) => PRODUCTS.find((p) => p.id === id))
  .filter((p) => p !== undefined)
  .map((p) => ({ name: p.name, meta: p.meta, price: priceLabel(p) }));

export function ProductRelated() {
  return (
    <section className="m7-wrap m7-top-lg">
      <div className="product-related__eyebrow">{"// You May Also Like"}</div>
      <h2 className="product-related__title text-balance">Complete the setup.</h2>
      <div className="m7-c4 product-related__grid">
        {related.map((p) => (
          <ProductCard key={p.name} {...p} height={260} />
        ))}
      </div>
    </section>
  );
}
