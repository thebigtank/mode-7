import content from "@/content/cart.json";

export function CartHeading() {
  return (
    <>
      <div className="cart-eyebrow uppercase">{content.eyebrow}</div>
      <h2 className="cart-heading">{content.heading}</h2>
    </>
  );
}
