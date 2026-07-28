import type { Locale } from "../data/events";

export function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div className="language-switcher" aria-label="Language">
      <button
        type="button"
        className={locale === "tr" ? "active" : ""}
        aria-pressed={locale === "tr"}
        onClick={() => onChange("tr")}
      >
        TR
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={locale === "en" ? "active" : ""}
        aria-pressed={locale === "en"}
        onClick={() => onChange("en")}
      >
        EN
      </button>
    </div>
  );
}
