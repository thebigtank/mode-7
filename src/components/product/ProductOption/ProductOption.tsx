export function ProductOption({ label, on }: { label: string; on?: boolean }) {
  return (
    <div className="product-option" data-on={on || undefined}>
      {label}
    </div>
  );
}
