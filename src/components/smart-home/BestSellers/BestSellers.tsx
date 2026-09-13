import Link from "next/link";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Mono } from "@/components/ui/Mono";
import content from "@/content/smart-home.json";

export function BestSellers() {
  return (
    <section className="sh-section">
      <div className="sh-bestsellers__head flex justify-between items-end flex-wrap">
        <div>
          <Mono dot className="mb-4">
            {content.bestSellers.eyebrow}
          </Mono>
          <h2 className="sh-bestsellers__title">{content.bestSellers.title}</h2>
        </div>
        <ButtonV2 label={content.bestSellers.cta} variant="outline" href="/shop" />
      </div>

      <div className="sh-bestsellers__grid grid">
        {content.bestSellers.items.map((p) => (
          <Link key={p.name} href="/product" className="sh-product flex flex-col">
            <div className="sh-product__media">
              <div className="sh-product__label">▣ {p.name.toUpperCase()}</div>
            </div>
            <div className="sh-product__row flex justify-between items-baseline">
              <div>
                <div className="sh-product__name">{p.name}</div>
                <div className="sh-product__meta">{p.meta}</div>
              </div>
              <div className="sh-product__price whitespace-nowrap">{p.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
