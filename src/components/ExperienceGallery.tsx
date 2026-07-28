import { assetPath } from "../assetPath";

type GalleryCopy = {
  kicker: string;
  title: string;
  description: string;
};

const galleryItems = [
  ["/images/gallery/mahall-music.webp", "Mahall / Live Culture", "music"],
  ["/images/gallery/mahall-audience.webp", "Mahall / The City Meets", "audience"],
  ["/images/gallery/mahall-walk.webp", "Mahall / Everyday Life", "walk"],
  ["/images/gallery/mahall-courtyard.webp", "Mahall / Heritage Courtyard", "courtyard"],
  ["/images/gallery/canopy-social-house.webp", "Canopy / Social House", "social"],
  ["/images/gallery/canopy-exterior.webp", "Canopy / Stay", "stay"],
];

export function ExperienceGallery({ copy }: { copy: GalleryCopy }) {
  return (
    <section id="kadraj" className="gallery section-pad">
      <div className="section-shell">
        <div className="gallery-heading">
          <div>
            <p className="kicker">{copy.kicker}</p>
            <h2>{copy.title}</h2>
          </div>
          <p>{copy.description}</p>
        </div>
        <div className="gallery-grid">
          {galleryItems.map(([src, label, visual], index) => (
            <figure key={visual} className={`gallery-item gallery-item-${index + 1}`}>
              <div>
                <img
                  src={assetPath(src)}
                  alt={label}
                  width="1400"
                  height="934"
                  loading="lazy"
                />
                <span className="gallery-number">0{index + 1}</span>
              </div>
              {index !== 2 && index !== 4 && <figcaption>{label}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
