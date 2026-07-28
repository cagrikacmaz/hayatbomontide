import { assetPath } from "../assetPath";
import { siteConfig } from "../data/siteConfig";
import { venues } from "../data/venues";

type EcosystemCopy = {
  kicker: string;
  title: string;
  description: string;
  canopyTitle: string;
  canopyText: string;
  canopyCta: string;
  mahallTitle: string;
  mahallText: string;
  mahallCta: string;
  bridge: string;
  facts: string[][];
};

export function BrandEcosystem({ copy }: { copy: EcosystemCopy }) {
  return (
    <section id="deneyim" className="ecosystem section-pad">
      <div className="section-shell">
        <div className="section-intro">
          <p className="kicker">{copy.kicker}</p>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <div className="brand-flow" id="mekanlar">
          <article className="brand-panel brand-panel-canopy">
            <span className="panel-number">01</span>
            <div className="brand-image">
              <img
                src={assetPath("/images/venues/canopy-exterior.webp")}
                alt="Canopy by Hilton İzmir Bomonti dış görünümü"
                width="1400"
                height="1050"
                loading="lazy"
              />
              <span>CANOPY / İZMİR</span>
            </div>
            <div className="brand-content">
              <p className="brand-name">Canopy by Hilton İzmir</p>
              <h3>{copy.canopyTitle}</h3>
              <p>{copy.canopyText}</p>
              <ul className="tag-list" aria-label="Canopy experiences">
                {venues.canopy.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <a className="text-link muted-link" href={siteConfig.canopyBookingUrl} target="_blank" rel="noreferrer">
                {copy.canopyCta}<span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <div className="ecosystem-connector" aria-hidden="true">
            <i />
            <span>∞</span>
          </div>
          <article className="brand-panel brand-panel-mahall">
            <span className="panel-number">02</span>
            <div className="brand-image brand-image-mahall">
              <img
                src={assetPath("/images/venues/mahall-tower.webp")}
                alt="Mahall Bomonti İzmir kulesinin gerçek görünümü"
                width="1050"
                height="1720"
                loading="lazy"
              />
              <span>MAHALL / İZMİR</span>
            </div>
            <div className="brand-content">
              <p className="brand-name">Mahall Bomonti İzmir</p>
              <h3>{copy.mahallTitle}</h3>
              <p>{copy.mahallText}</p>
              <ul className="tag-list" aria-label="Mahall experiences">
                {venues.mahall.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <a className="text-link muted-link" href={siteConfig.mahallUrl} target="_blank" rel="noreferrer">
                {copy.mahallCta}<span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
        <dl className="destination-facts">
          {copy.facts.map(([value, label]) => (
            <div key={value}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
        <blockquote className="ecosystem-quote">“{copy.bridge}”</blockquote>
      </div>
    </section>
  );
}
