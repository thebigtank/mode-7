import content from "@/content/cart.json";

export function Stepper() {
  const c = content.stepper;

  return (
    <div className="cart-stepper flex items-center overflow-hidden">
      <span className="cart-stepper__btn flex items-center justify-center cursor-pointer">
        {c.decrementLabel}
      </span>
      <span className="cart-stepper__value text-center">{c.value}</span>
      <span className="cart-stepper__btn flex items-center justify-center cursor-pointer">
        {c.incrementLabel}
      </span>
    </div>
  );
}
