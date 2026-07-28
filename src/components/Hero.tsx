import { assetPath } from "../assetPath";

type HeroCopy = {
  eyebrow: string;
  title: string;
  description: string;
  events: string;
  places: string;
  canopyLabel: string;
  mahallLabel: string;
};

export function Hero({ copy }: { copy: HeroCopy }) {
  return (
    <section id="top" className="hero">
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-field hero-field-canopy">
          <img
            src={assetPath("/images/hero/canopy-social-house.webp")}
            alt=""
            width="1600"
            height="1067"
            fetchPriority="high"
          />
          <span className="visual-index">BOMONTİ / 01</span>
        </div>
        <div className="hero-field hero-field-mahall">
          <img
            src={assetPath("/images/hero/mahall-tower.webp")}
            alt=""
            width="1211"
            height="1984"
            fetchPriority="high"
          />
          <span className="visual-index">İZMİR / 02</span>
        </div>
        <div className="hero-route">
          <span />
        </div>
      </div>
      <div className="hero-copy section-shell">
        <p className="eyebrow reveal">{copy.eyebrow}</p>
        <h1 className="reveal reveal-delay">{copy.title}</h1>
        <p className="hero-description reveal reveal-delay-2">{copy.description}</p>
        <div className="hero-actions reveal reveal-delay-2">
          <a className="button button-light" href="#etkinlikler">
            {copy.events}<span aria-hidden="true">↘</span>
          </a>
          <a className="text-link light-link" href="#mekanlar">
            {copy.places}<span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="hero-labels section-shell">
        <span className="canopy-label">{copy.canopyLabel}</span>
        <span className="mahall-label">{copy.mahallLabel}</span>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
