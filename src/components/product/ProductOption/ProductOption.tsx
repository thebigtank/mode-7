export function ProductOption({ label, on }: { label: string; on?: boolean }) {
  return (
    <div className="product-option cursor-pointer" data-on={on || undefined}>
      {label}
    </div>
  );
}
