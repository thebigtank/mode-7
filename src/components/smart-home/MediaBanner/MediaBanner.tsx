export function MediaBanner({ label }: { label: string }) {
  return (
    <div className="sh-banner">
      <div className="sh-banner__media">
        <div className="sh-banner__label">{`▣ ${label}`}</div>
      </div>
    </div>
  );
}
