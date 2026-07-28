import { siteConfig } from "../data/siteConfig";

type FooterCopy = {
  platform: string;
  kvkk: string;
  cookies: string;
  contact: string;
  rights: string;
};

export function Footer({ copy }: { copy: FooterCopy }) {
  const links = [
    [copy.kvkk, siteConfig.kvkkUrl],
    [copy.cookies, siteConfig.cookiesUrl],
    [copy.contact, siteConfig.contactUrl],
  ];
  return (
    <footer className="site-footer">
      <div className="section-shell footer-main">
        <div>
          <p className="footer-signature">Hayat Bomonti’de</p>
          <p>{copy.platform}</p>
        </div>
        <div className="footer-brands" aria-label="Partner brands">
          <a href={siteConfig.mahallUrl} target="_blank" rel="noreferrer">
            Mahall Bomonti İzmir ↗
          </a>
          <i aria-hidden="true">×</i>
          <a href={siteConfig.canopyBookingUrl} target="_blank" rel="noreferrer">
            Canopy by Hilton İzmir ↗
          </a>
        </div>
        <p className="footer-hashtag">#HayatBomontide</p>
      </div>
      <div className="section-shell footer-bottom">
        <span>© {new Date().getFullYear()} · {copy.rights}</span>
        <nav aria-label="Legal">
          {links.map(([label, href]) =>
            href ? <a key={label} href={href}>{label}</a> : <span key={label}>{label}</span>,
          )}
        </nav>
      </div>
    </footer>
  );
}
