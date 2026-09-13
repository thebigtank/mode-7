import { ArrowButton } from "@/components/ArrowButton";
import { ProductOption } from "@/components/product/ProductOption";
import { PRODUCTS, priceLabel } from "@/lib/catalogue";

const flagship = PRODUCTS.find((p) => p.id === "flagship-x")!;

export function ProductBuyBox() {
  return (
    <div className="m7-buybox product-buybox">
      <div className="product-buybox__kicker">Premium · Sealed · Guaranteed</div>
      <h1 className="product-buybox__title">Mode Flagship X</h1>
      <div className="product-buybox__price">{priceLabel(flagship)}</div>
      <div className="product-buybox__financing">
        or around ₦77,000/mo over 24 months · trade in to bring this down
      </div>

      <div className="product-buybox__label">Storage</div>
      <div className="product-buybox__options">
        <ProductOption label="128GB" />
        <ProductOption label="256GB" on />
        <ProductOption label="512GB" />
      </div>

      <div className="product-buybox__label">Condition</div>
      <div className="product-buybox__options product-buybox__options--condition">
        <ProductOption label="New" on />
        <ProductOption label="Certified Refurbished" />
      </div>

      <div className="product-buybox__actions">
        <ArrowButton label="Add to Cart" variant="fill" href="/cart" />
        <ArrowButton
          label="Trade in toward this"
          variant="outline"
          href="/trade-in#value-your-device"
        />
      </div>

      <div className="product-buybox__trade-note">
        Have a device to trade? Value it in about a minute and we take the
        estimate off this price — you bring the difference, not{" "}
        {priceLabel(flagship)}.
      </div>

      <div className="product-buybox__delivery">
        Free next-day delivery · 2-year warranty · 30-day returns. Ask Seven for
        setup help any time.
      </div>
    </div>
  );
}
