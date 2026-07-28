import { assetPath } from "../assetPath";
import { siteConfig } from "../data/siteConfig";

type HeritageCopy = {
  kicker: string;
  title: string;
  description: string;
  milestones: string[][];
  historyCta: string;
  projectCta: string;
  archiveAlt: string;
  todayAlt: string;
};

export function HeritageStory({ copy }: { copy: HeritageCopy }) {
  return (
    <section id="hikaye" className="heritage section-pad" aria-labelledby="heritage-title">
      <div className="section-shell">
        <div className="heritage-heading">
          <p className="kicker">{copy.kicker}</p>
          <h2 id="heritage-title">{copy.title}</h2>
          <p>{copy.description}</p>
        </div>

        <div className="heritage-layout">
          <div className="heritage-visual">
            <figure className="heritage-now">
              <img
                src={assetPath("/images/gallery/mahall-music.webp")}
                alt={copy.todayAlt}
                width="1080"
                height="1350"
                loading="lazy"
              />
              <figcaption>BUGÜN / MAHALL BOMONTİ İZMİR</figcaption>
            </figure>
            <figure className="heritage-archive">
              <img
                src={assetPath("/images/history/mahall-factory-archive.jpg")}
                alt={copy.archiveAlt}
                width="400"
                height="369"
                loading="lazy"
              />
              <figcaption>FABRİKA AVLUSU / ARŞİV</figcaption>
            </figure>
            <span className="heritage-stamp" aria-hidden="true">1912 → BUGÜN</span>
          </div>

          <div>
            <ol className="heritage-timeline">
              {copy.milestones.map(([year, title, text]) => (
                <li key={year}>
                  <span>{year}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="heritage-actions">
              <a href={siteConfig.mahallHistoryUrl} target="_blank" rel="noreferrer">
                {copy.historyCta}<span aria-hidden="true">↗</span>
              </a>
              <a href={siteConfig.turkerlerProjectUrl} target="_blank" rel="noreferrer">
                {copy.projectCta}<span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
