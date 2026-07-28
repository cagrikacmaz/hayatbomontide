import type { EventCategory, EventVenue, Locale } from "../data/events";
import { categoryLabels } from "../data/events";

export type EventFilter = "all" | EventVenue | EventCategory;

export function EventFilters({
  locale,
  active,
  onChange,
  venueLabels,
}: {
  locale: Locale;
  active: EventFilter;
  onChange: (filter: EventFilter) => void;
  venueLabels: Record<"all" | EventVenue, string>;
}) {
  const filters: EventFilter[] = [
    "all",
    "mahall",
    "canopy",
    "joint",
    "gastronomy",
    "music",
    "design",
    "wellness",
    "family",
  ];

  return (
    <div className="event-filters" role="toolbar" aria-label="Event filters">
      {filters.map((filter) => {
        const label =
          filter === "all" || filter === "mahall" || filter === "canopy" || filter === "joint"
            ? venueLabels[filter]
            : categoryLabels[filter][locale];
        return (
          <button
            type="button"
            key={filter}
            className={active === filter ? "active" : ""}
            aria-pressed={active === filter}
            onClick={() => onChange(filter)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
