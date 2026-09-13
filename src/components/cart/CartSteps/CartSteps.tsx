const steps = ["Bag", "Agent confirms", "Payment & delivery"];

export function CartSteps() {
  return (
    <div className="cart-steps">
      {steps.map((s, i) => (
        <div key={s} className="contents">
          {i > 0 && <span className="cart-steps__sep" />}
          <div className="cart-steps__item">
            <span className="cart-steps__num" data-active={i === 0 || undefined}>
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
