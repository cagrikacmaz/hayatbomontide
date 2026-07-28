import { siteConfig } from "../data/siteConfig";

type VisitCopy = {
  kicker: string;
  title: string;
  description: string;
  directions: string;
  calendar: string;
  stay: string;
  addressPending: string;
  accessFacts: string[][];
};

export function VisitSection({ copy }: { copy: VisitCopy }) {
  return (
    <section id="ziyaret" className="visit section-pad">
      <div className="visit-map" aria-hidden="true">
        <span className="map-line map-line-a" />
        <span className="map-line map-line-b" />
        <span className="map-line map-line-c" />
        <i className="map-pin">B</i>
      </div>
      <div className="section-shell visit-content">
        <p className="kicker">{copy.kicker}</p>
        <h2>{copy.title}</h2>
        <p>{copy.description}</p>
        <address>{siteConfig.address ?? copy.addressPending}</address>
        <dl className="visit-facts">
          {copy.accessFacts.map(([value, label]) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
        <div className="visit-actions">
          {siteConfig.mapsUrl ? (
            <a className="button button-light" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
              {copy.directions}<span aria-hidden="true">↗</span>
            </a>
          ) : (
            <button className="button button-light" type="button" disabled title={copy.addressPending}>
              {copy.directions}
            </button>
          )}
          <a className="button button-outline-light" href="#etkinlikler">{copy.calendar}</a>
          {siteConfig.canopyBookingUrl ? (
            <a className="text-link light-link" href={siteConfig.canopyBookingUrl} target="_blank" rel="noreferrer">
              {copy.stay}<span aria-hidden="true">→</span>
            </a>
          ) : (
            <span className="text-link light-link is-disabled">{copy.stay}<span aria-hidden="true">→</span></span>
          )}
        </div>
      </div>
    </section>
  );
}
