export function LiveEventStrip({ label }: { label: string }) {
  const items = [
    "After Work Sessions",
    "Ege Sofrası",
    "Design Walk",
    "Sunset Sessions",
  ];
  return (
    <div className="event-strip" aria-label={label}>
      <strong>{label}</strong>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {[...items, ...items].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}<i aria-hidden="true">✦</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
