export type Locale = "tr" | "en";
export type LocalizedText = Record<Locale, string>;
export type EventVenue = "mahall" | "canopy" | "joint";
export type EventCategory =
  | "gastronomy"
  | "music"
  | "design"
  | "wellness"
  | "family"
  | "culture"
  | "afterwork";

export interface BomontiEvent {
  id: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  longDescription: LocalizedText;
  venue: EventVenue;
  venueLabel: LocalizedText;
  category: EventCategory;
  dateLabel: LocalizedText;
  startDate?: string;
  endDate?: string;
  time?: string;
  recurring?: string;
  image: string;
  imageAlt: LocalizedText;
  featured?: boolean;
  reservationUrl?: string;
}

const venueLabels: Record<EventVenue, LocalizedText> = {
  canopy: { tr: "Canopy by Hilton", en: "Canopy by Hilton" },
  mahall: { tr: "Mahall Bomonti", en: "Mahall Bomonti" },
  joint: { tr: "Birlikte", en: "Together" },
};

const descriptions: Record<EventCategory, LocalizedText> = {
  gastronomy: {
    tr: "Yerel üreticileri, yaratıcı tabakları ve Ege’nin paylaşma kültürünü aynı masada buluşturan bir keşif.",
    en: "A shared table bringing together local producers, creative plates and the generous spirit of the Aegean.",
  },
  music: {
    tr: "Gün batımından geceye uzanan, mekânın ritmine göre şekillenen canlı bir müzik deneyimi.",
    en: "A live music experience shaped by the venue’s mood, flowing from sunset into the night.",
  },
  design: {
    tr: "Mimariyi, malzemeyi ve İzmir’in güncel yaratıcı kültürünü yakından okumaya davet eden bir buluşma.",
    en: "A closer look at architecture, material and Izmir’s contemporary creative culture.",
  },
  wellness: {
    tr: "Şehrin temposuna sakin, duyusal ve iyi hissettiren bir ara.",
    en: "A calm, sensory pause from the pace of the city.",
  },
  family: {
    tr: "Çocukların ürettiği, yetişkinlerin birlikte vakit geçirdiği merak dolu bir hafta sonu programı.",
    en: "A curious weekend programme where children create and families spend time together.",
  },
  culture: {
    tr: "Sinemadan yerel üretime, şehrin yeni seslerini açık ve samimi bir programda bir araya getiriyor.",
    en: "An open, welcoming programme connecting the city’s new voices, from cinema to local making.",
  },
  afterwork: {
    tr: "İş çıkışını kısa bir buluşmadan haftalık bir şehir ritüeline dönüştüren rahat bir akşam.",
    en: "An easy-going evening turning after-work drinks into a weekly city ritual.",
  },
};

const event = (
  id: string,
  venue: EventVenue,
  category: EventCategory,
  titleTr: string,
  titleEn: string,
  dateTr: string,
  dateEn: string,
  image: string,
  featured = false,
): BomontiEvent => ({
  id,
  venue,
  venueLabel: venueLabels[venue],
  category,
  title: { tr: titleTr, en: titleEn },
  shortDescription: descriptions[category],
  longDescription: {
    tr: `${descriptions[category].tr} Program akışı ve katılım bilgileri etkinlik tarihi kesinleştiğinde güncellenecek.`,
    en: `${descriptions[category].en} Programme and attendance details will be updated once the date is confirmed.`,
  },
  dateLabel: { tr: dateTr, en: dateEn },
  image,
  imageAlt: {
    tr: `${titleTr} için gerçek mekân atmosferi`,
    en: `Real venue atmosphere for ${titleEn}`,
  },
  featured,
});

export const events: BomontiEvent[] = [
  event("after-work-sessions", "mahall", "afterwork", "After Work Sessions", "After Work Sessions", "Her Perşembe", "Every Thursday", "afterwork", true),
  event("slow-sunday", "canopy", "wellness", "Slow Sunday", "Slow Sunday", "Her Pazar", "Every Sunday", "wellness", true),
  event("ege-sofrasi", "canopy", "gastronomy", "Ege Sofrası", "The Aegean Table", "Tarih yakında", "Date to be announced", "table", true),
  event("sunset-dj", "mahall", "music", "Sunset DJ Sessions", "Sunset DJ Sessions", "Yaz programı", "Summer programme", "sunset", true),
  event("coffee-lab", "canopy", "gastronomy", "Third Wave Coffee Lab", "Third Wave Coffee Lab", "Ayda iki kez", "Twice a month", "coffee", true),
  event("open-air-cinema", "mahall", "culture", "Open Air Cinema", "Open Air Cinema", "Yaz programı", "Summer programme", "cinema"),
  event("coffee-days", "joint", "gastronomy", "Bomonti Coffee Days", "Bomonti Coffee Days", "Sonbahar programı", "Autumn programme", "coffee", true),
  event("architecture-walk", "canopy", "design", "Architecture Walk", "Architecture Walk", "Tarih yakında", "Date to be announced", "architecture"),
  event("street-fine", "mahall", "gastronomy", "Street Food × Fine Dining", "Street Food × Fine Dining", "Tarih yakında", "Date to be announced", "table"),
  event("design-talks", "canopy", "design", "Design Talks", "Design Talks", "Aylık", "Monthly", "design"),
  event("live-music", "mahall", "music", "Live Music Nights", "Live Music Nights", "Ayda iki kez", "Twice a month", "music"),
  event("local-makers", "mahall", "design", "Local Makers Pop-up", "Local Makers Pop-up", "Sezonluk program", "Seasonal programme", "makers"),
  event("wellness-morning", "canopy", "wellness", "Wellness Morning", "Wellness Morning", "Ayda iki kez", "Twice a month", "wellness"),
  event("family-weekends", "mahall", "family", "Family Weekends", "Family Weekends", "Hafta sonları", "Weekends", "family"),
  event("creative-lab", "mahall", "family", "Children’s Creative Lab", "Children’s Creative Lab", "Ayda iki kez", "Twice a month", "family"),
  event("gastronomy-route", "joint", "gastronomy", "Gastronomi Rotası", "Gastronomy Route", "Tarih yakında", "Date to be announced", "route"),
  event("harvest-nights", "canopy", "gastronomy", "Harvest Nights", "Harvest Nights", "Bağbozumu dönemi", "Harvest season", "harvest"),
  event("craft-tasting", "canopy", "gastronomy", "Craft Tasting Night", "Craft Tasting Night", "Tarih yakında", "Date to be announced", "tasting"),
  event("october-festival", "joint", "music", "Ekim Bira Festivali", "October Beer Festival", "Ekim programı", "October programme", "festival"),
  event("weekend-izmir", "canopy", "culture", "Hafta Sonu İzmir", "A Weekend in Izmir", "Sezonluk program", "Seasonal programme", "stay"),
  event("pop-up-table", "joint", "gastronomy", "Şeflerin Ortak Masası", "The Chefs’ Shared Table", "Tarih yakında", "Date to be announced", "table"),
  event("new-year-market", "mahall", "family", "Bomonti New Year Market", "Bomonti New Year Market", "Yılbaşı dönemi", "Festive season", "market"),
  event("anniversary", "joint", "culture", "Bir Yıl, Tek Ritim", "One Year, One Rhythm", "Yıl dönümü programı", "Anniversary programme", "anniversary"),
  event("local-sounds", "mahall", "music", "Local Sounds", "Local Sounds", "Tarih yakında", "Date to be announced", "music"),
];

export const categoryLabels: Record<EventCategory | "all", LocalizedText> = {
  all: { tr: "Tümü", en: "All" },
  gastronomy: { tr: "Gastronomi", en: "Gastronomy" },
  music: { tr: "Müzik", en: "Music" },
  design: { tr: "Tasarım", en: "Design" },
  wellness: { tr: "Wellness", en: "Wellness" },
  family: { tr: "Aile", en: "Family" },
  culture: { tr: "Kültür", en: "Culture" },
  afterwork: { tr: "After Work", en: "After Work" },
};
