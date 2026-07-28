import type { Locale } from "../data/events";
import { destinationBrands } from "../data/brands";

type BrandDirectoryCopy = {
  kicker: string;
  title: string;
  description: string;
  cta: string;
};

export function BrandDirectory({
  locale,
  copy,
}: {
  locale: Locale;
  copy: BrandDirectoryCopy;
}) {
  return (
    <section id="markalar" className="brand-directory section-pad" aria-labelledby="brand-directory-title">
      <div className="section-shell">
        <div className="brand-directory-heading">
          <div>
            <p className="kicker">{copy.kicker}</p>
            <h2 id="brand-directory-title">{copy.title}</h2>
          </div>
          <p>{copy.description}</p>
        </div>
        <div className="brand-directory-grid">
          {destinationBrands.map((brand, index) => (
            <a
              className={`directory-card directory-card-${brand.accent}`}
              href={brand.url}
              target="_blank"
              rel="noreferrer"
              key={brand.name}
            >
              <span className="directory-index">0{index + 1}</span>
              <p>{brand.category[locale]}</p>
              <h3>{brand.name}</h3>
              <span className="directory-cta">
                {copy.cta}<i aria-hidden="true">↗</i>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
