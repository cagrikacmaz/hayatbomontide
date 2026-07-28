import { useMemo, useState } from "react";
import type { BomontiEvent, EventCategory, EventVenue, Locale } from "../data/events";
import { events } from "../data/events";
import { EventCard } from "./EventCard";
import { EventDrawer } from "./EventDrawer";
import { EventFilters, type EventFilter } from "./EventFilters";

type ProgrammeCopy = {
  kicker: string;
  title: string;
  description: string;
  canopy: string;
  mahall: string;
  details: string;
  all: string;
  less: string;
  venueFilters: Record<"all" | EventVenue, string>;
};

type DrawerCopy = {
  close: string;
  when: string;
  where: string;
  reservation: string;
  pending: string;
  instagram: string;
  calendar: string;
};

export function EventTimeline({
  locale,
  copy,
  drawerCopy,
}: {
  locale: Locale;
  copy: ProgrammeCopy;
  drawerCopy: DrawerCopy;
}) {
  const [filter, setFilter] = useState<EventFilter>("all");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<BomontiEvent | null>(null);

  const filtered = useMemo(
    () =>
      events.filter((item) => {
        if (filter === "all") return true;
        if (filter === "mahall" || filter === "canopy" || filter === "joint") {
          return item.venue === (filter as EventVenue);
        }
        return item.category === (filter as EventCategory);
      }),
    [filter],
  );
  const visible = expanded ? filtered : filtered.slice(0, 8);

  return (
    <section id="etkinlikler" className="programme section-pad">
      <div className="section-shell">
        <div className="programme-heading">
          <div>
            <p className="kicker">{copy.kicker}</p>
            <h2>{copy.title}</h2>
          </div>
          <p>{copy.description}</p>
        </div>
        <EventFilters
          locale={locale}
          active={filter}
          onChange={(next) => {
            setFilter(next);
            setExpanded(false);
          }}
          venueLabels={copy.venueFilters}
        />
        <div className="timeline-labels" aria-hidden="true">
          <span>{copy.canopy}</span>
          <i />
          <span>{copy.mahall}</span>
        </div>
        <div className={`event-timeline${expanded ? " is-expanded" : ""}`} aria-live="polite">
          <div className="timeline-rail rail-canopy" aria-hidden="true" />
          <div className="timeline-rail rail-mahall" aria-hidden="true" />
          {visible.map((item, index) => (
            <div
              key={item.id}
              className={`event-position event-position-${item.venue}${index >= 4 ? " mobile-secondary" : ""}`}
            >
              {item.venue === "joint" && <span className="joint-bridge" aria-hidden="true" />}
              <EventCard event={item} locale={locale} detailLabel={copy.details} onOpen={setSelected} />
            </div>
          ))}
        </div>
        {filtered.length > 8 && (
          <div className="programme-more">
            <button type="button" className="button button-dark" onClick={() => setExpanded((value) => !value)}>
              {expanded ? copy.less : copy.all}
              <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
            </button>
            <span>{String(filtered.length).padStart(2, "0")} events / programme</span>
          </div>
        )}
      </div>
      <EventDrawer event={selected} locale={locale} copy={drawerCopy} onClose={() => setSelected(null)} />
    </section>
  );
}
