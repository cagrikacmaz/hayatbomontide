import { useEffect, useRef } from "react";
import type { BomontiEvent, Locale } from "../data/events";
import { categoryLabels } from "../data/events";
import { eventImagePath } from "../assetPath";

type DrawerCopy = {
  close: string;
  when: string;
  where: string;
  reservation: string;
  pending: string;
  instagram: string;
  calendar: string;
};

export function EventDrawer({
  event,
  locale,
  copy,
  onClose,
}: {
  event: BomontiEvent | null;
  locale: Locale;
  copy: DrawerCopy;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!event) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") onClose();
      if (keyboardEvent.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])",
          ),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (keyboardEvent.shiftKey && document.activeElement === first) {
          keyboardEvent.preventDefault();
          last.focus();
        } else if (!keyboardEvent.shiftKey && document.activeElement === last) {
          keyboardEvent.preventDefault();
          first.focus();
        }
      }
    };
    document.body.classList.add("drawer-open");
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.classList.remove("drawer-open");
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [event, onClose]);

  if (!event) return null;
  const shareText = encodeURIComponent(`${event.title[locale]} · #HayatBomontide`);

  return (
    <div className="drawer-layer">
      <button className="drawer-backdrop" type="button" aria-label={copy.close} onClick={onClose} />
      <div
        className="event-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-drawer-title"
        ref={dialogRef}
      >
        <button ref={closeRef} type="button" className="drawer-close" onClick={onClose} aria-label={copy.close}>
          <span aria-hidden="true">×</span>
        </button>
        <div
          className={`drawer-image event-visual-${event.image}`}
          role="img"
          aria-label={event.imageAlt[locale]}
          style={{ backgroundImage: `url("${eventImagePath(event.image)}")` }}
        >
          <span>{event.venueLabel[locale]}</span>
        </div>
        <div className="drawer-content">
          <div className="event-card-meta">
            <span className={`venue-chip venue-chip-${event.venue}`}>{event.venueLabel[locale]}</span>
            <span>{categoryLabels[event.category][locale]}</span>
          </div>
          <h2 id="event-drawer-title">{event.title[locale]}</h2>
          <p className="drawer-lead">{event.longDescription[locale]}</p>
          <dl className="drawer-facts">
            <div>
              <dt>{copy.when}</dt>
              <dd>{event.dateLabel[locale]}{event.time ? ` · ${event.time}` : ""}</dd>
            </div>
            <div>
              <dt>{copy.where}</dt>
              <dd>{event.venueLabel[locale]}</dd>
            </div>
            <div>
              <dt>{copy.reservation}</dt>
              <dd>{copy.pending}</dd>
            </div>
          </dl>
          <div className="drawer-actions">
            <a
              className="button button-dark"
              href={`https://www.instagram.com/?caption=${shareText}`}
              target="_blank"
              rel="noreferrer"
            >
              {copy.instagram}<span aria-hidden="true">↗</span>
            </a>
            <button type="button" className="button button-outline" disabled title={copy.pending}>
              {copy.calendar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
