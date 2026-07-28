import { useEffect, useRef, useState } from "react";
import type { Locale } from "../data/events";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavCopy = {
  experience: string;
  story: string;
  events: string;
  places: string;
  visit: string;
  explore: string;
  menu: string;
  close: string;
};

export function Header({
  locale,
  onLocaleChange,
  copy,
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  copy: NavCopy;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        window.setTimeout(() => toggleRef.current?.focus(), 0);
      }
    };
    const main = document.getElementById("main");
    const footer = document.querySelector<HTMLElement>(".site-footer");

    document.body.classList.toggle("menu-open", open);
    main?.toggleAttribute("inert", open);
    footer?.toggleAttribute("inert", open);
    document.addEventListener("keydown", onKey);
    if (open) window.requestAnimationFrame(() => firstLinkRef.current?.focus());

    return () => {
      document.body.classList.remove("menu-open");
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    [copy.experience, "#deneyim"],
    [copy.story, "#hikaye"],
    [copy.places, "#markalar"],
    [copy.events, "#etkinlikler"],
    [copy.visit, "#ziyaret"],
  ];

  return (
    <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
      <a className="campaign-signature" href="#top" aria-label="Hayat Bomonti’de">
        Hayat Bomonti’de
      </a>
      <nav className="desktop-nav" aria-label="Ana menü">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        <a className="button button-small button-dark desktop-cta" href="#etkinlikler">
          {copy.explore}
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-haspopup="dialog"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? copy.close : copy.menu}</span>
          <i aria-hidden="true" />
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menüsü"
        aria-hidden={!open}
      >
        <nav aria-label="Mobil menü">
          {links.map(([label, href], index) => (
            <a
              ref={index === 0 ? firstLinkRef : undefined}
              key={href}
              href={href}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <p>#HayatBomontide · #LifeAtBomonti</p>
      </div>
    </header>
  );
}
