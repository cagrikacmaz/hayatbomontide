import { useCallback, useEffect, useState } from "react";
import type { Locale } from "../data/events";
import { events } from "../data/events";
import { tr } from "../locales/tr";
import { en } from "../locales/en";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { LiveEventStrip } from "./LiveEventStrip";
import { BrandEcosystem } from "./BrandEcosystem";
import { HeritageStory } from "./HeritageStory";
import { BrandDirectory } from "./BrandDirectory";
import { EventTimeline } from "./EventTimeline";
import { DayAtBomonti } from "./DayAtBomonti";
import { ExperienceGallery } from "./ExperienceGallery";
import { VisitSection } from "./VisitSection";
import { Footer } from "./Footer";
import { siteConfig } from "../data/siteConfig";

export function Microsite() {
  const [locale, setLocale] = useState<Locale>("tr");
  const copy = locale === "tr" ? tr : en;

  useEffect(() => {
    const stored = window.localStorage.getItem("bomonti-locale");
    if (stored !== "tr" && stored !== "en") return;
    const hydrationSync = window.setTimeout(() => setLocale(stored), 0);
    return () => window.clearTimeout(hydrationSync);
  }, []);

  const changeLocale = useCallback((next: Locale) => {
    setLocale(next);
    window.localStorage.setItem("bomonti-locale", next);
    document.documentElement.lang = next;
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Hayat Bomonti’de",
        description: copy.footer.platform,
      },
      {
        "@type": "Place",
        name: "Mahall Bomonti İzmir & Canopy by Hilton İzmir",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Konak",
          addressRegion: "İzmir",
          postalCode: "35170",
          addressCountry: "TR",
        },
        url: siteConfig.mahallUrl,
      },
      ...events
        .filter((item) => item.startDate)
        .map((item) => ({
          "@type": "Event",
          name: item.title[locale],
          startDate: item.startDate,
          endDate: item.endDate,
          location: { "@type": "Place", name: item.venueLabel[locale] },
        })),
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header locale={locale} onLocaleChange={changeLocale} copy={copy.nav} />
      <main id="main">
        <Hero copy={copy.hero} />
        <LiveEventStrip label={copy.ticker} />
        <BrandEcosystem copy={copy.ecosystem} />
        <HeritageStory copy={copy.heritage} />
        <BrandDirectory locale={locale} copy={copy.brands} />
        <EventTimeline locale={locale} copy={copy.programme} drawerCopy={copy.drawer} />
        <DayAtBomonti copy={copy.day} />
        <ExperienceGallery copy={copy.gallery} />
        <VisitSection copy={copy.visit} />
      </main>
      <Footer copy={copy.footer} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
