import { ArrowButton } from "@/components/ArrowButton";
import { ProductCard } from "@/components/page/Cards";
import content from "@/content/smart-home.json";

export function BestSellers() {
  return (
    <section className="sh-section">
      <div className="sh-bestsellers__head flex justify-between items-end flex-wrap">
        <div>
          <div className="sh-eyebrow">{`// ${content.bestSellers.eyebrow}`}</div>
          <h2 className="sh-bestsellers__title">{content.bestSellers.title}</h2>
        </div>
        <ArrowButton label={content.bestSellers.cta} variant="outline" href="/shop" />
      </div>

      <div className="sh-bestsellers__grid grid">
        {content.bestSellers.items.map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
      </div>
    </section>
  );
}
