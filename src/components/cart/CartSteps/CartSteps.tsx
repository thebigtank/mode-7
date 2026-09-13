import content from "@/content/cart.json";

export function CartSteps() {
  return (
    <div className="cart-steps flex flex-wrap items-center">
      {content.steps.map((s, i) => (
        <div key={s} className="contents">
          {i > 0 && <span className="cart-steps__sep" />}
          <div className="cart-steps__item flex items-center">
            <span
              className="cart-steps__num flex items-center justify-center"
              data-active={i === 0 || undefined}
            >
              {i + 1}
            </span>
            <span className="cart-steps__label" data-active={i === 0 || undefined}>
              {s}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
