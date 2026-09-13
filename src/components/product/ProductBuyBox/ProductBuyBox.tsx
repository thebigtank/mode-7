import { ArrowButton } from "@/components/ArrowButton";
import { ProductOption } from "@/components/product/ProductOption";
import content from "@/content/product.json";
import { PRODUCTS, priceLabel } from "@/lib/catalogue";

const VARIANT = { fill: "fill", outline: "outline" } as const;

export function ProductBuyBox() {
  const c = content.buybox;
  const flagship = PRODUCTS.find((p) => p.id === content.productId)!;

  return (
    <div className="product-buybox">
      <div className="product-buybox__kicker uppercase">{c.kicker}</div>
      <h1 className="product-buybox__title">{c.title}</h1>
      <div className="product-buybox__price">{priceLabel(flagship)}</div>
      <div className="product-buybox__financing">{c.financing}</div>

      <div className="product-buybox__label uppercase">{c.storageLabel}</div>
      <div className="product-buybox__options flex" data-group="storage">
        {c.storageOptions.map((o) => (
          <ProductOption key={o.label} label={o.label} on={o.on} />
        ))}
      </div>

      <div className="product-buybox__label uppercase">{c.conditionLabel}</div>
      <div className="product-buybox__options flex" data-group="condition">
        {c.conditionOptions.map((o) => (
          <ProductOption key={o.label} label={o.label} on={o.on} />
        ))}
      </div>

      <div className="product-buybox__actions flex flex-wrap">
        {c.actions.map((a) => (
          <ArrowButton
            key={a.label}
            label={a.label}
            href={a.href}
            variant={VARIANT[a.variant as keyof typeof VARIANT] ?? "fill"}
          />
        ))}
      </div>

      <div className="product-buybox__trade-note">
        {c.tradeNoteBefore} {priceLabel(flagship)}
        {c.tradeNoteAfter}
      </div>

      <div className="product-buybox__delivery">{c.delivery}</div>
    </div>
  );
}
