import type { BomontiEvent, Locale } from "../data/events";
import { categoryLabels } from "../data/events";
import { eventImagePath } from "../assetPath";

export function EventCard({
  event,
  locale,
  detailLabel,
  onOpen,
}: {
  event: BomontiEvent;
  locale: Locale;
  detailLabel: string;
  onOpen: (event: BomontiEvent) => void;
}) {
  return (
    <article className={`event-card venue-${event.venue}`}>
      <button
        type="button"
        className={`event-image event-visual-${event.image}`}
        style={{ backgroundImage: `url("${eventImagePath(event.image)}")` }}
        aria-label={`${event.title[locale]} — ${detailLabel}`}
        onClick={() => onOpen(event)}
      >
        <span className="event-image-index">{event.id.slice(0, 2).toUpperCase()}</span>
        <span className="event-image-mark" aria-hidden="true" />
      </button>
      <div className="event-card-body">
        <div className="event-card-meta">
          <span className={`venue-chip venue-chip-${event.venue}`}>
            {event.venueLabel[locale]}
          </span>
          <span>{categoryLabels[event.category][locale]}</span>
        </div>
        <p className="event-date">{event.dateLabel[locale]}</p>
        <h3>{event.title[locale]}</h3>
        <p>{event.shortDescription[locale]}</p>
        <button type="button" className="text-link event-detail" onClick={() => onOpen(event)}>
          {detailLabel}<span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}
