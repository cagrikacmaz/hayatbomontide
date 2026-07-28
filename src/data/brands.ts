export type DestinationBrand = {
  name: string;
  category: {
    tr: string;
    en: string;
  };
  url: string;
  accent: "terracotta" | "blue" | "amber" | "paper";
};

export const destinationBrands: DestinationBrand[] = [
  {
    name: "Espressolab",
    category: { tr: "Kahve & Fırın", en: "Coffee & Bakery" },
    url: "https://espressolab.com/kurumsal/magazalar/izmir-mahall-bomonti",
    accent: "terracotta",
  },
  {
    name: "Köşebaşı",
    category: { tr: "Ocakbaşı & Sofra", en: "Grill & Table" },
    url: "https://www.kosebasi.com/sube/izmir-mahall-bomonti",
    accent: "amber",
  },
  {
    name: "BigChefs",
    category: { tr: "Dünya Mutfağı", en: "World Cuisine" },
    url: "https://bigchefs.com.tr/subeler/bigchefs-mahall-bomonti/",
    accent: "terracotta",
  },
  {
    name: "The Hunger",
    category: { tr: "Gün Boyu Gastronomi", en: "All-day Dining" },
    url: "https://thehunger.com.tr/",
    accent: "paper",
  },
  {
    name: "Chinese & Sushi Express",
    category: { tr: "Uzak Doğu Mutfağı", en: "Far Eastern Cuisine" },
    url: "https://www.sushiexpress.com.tr/tr/subeler/izmir-mahall-bomonti",
    accent: "blue",
  },
  {
    name: "Decathlon",
    category: { tr: "Spor & Aktif Yaşam", en: "Sport & Active Life" },
    url: "https://www.decathlon.com.tr/store-locator",
    accent: "blue",
  },
  {
    name: "Mavi",
    category: { tr: "Denim & Lifestyle", en: "Denim & Lifestyle" },
    url: "https://www.mavi.com/",
    accent: "paper",
  },
  {
    name: "Macrocenter",
    category: { tr: "Gurme Market", en: "Gourmet Market" },
    url: "https://www.macrocenter.com.tr/magazalarimiz",
    accent: "amber",
  },
  {
    name: "1900’ler Bomonti Social House",
    category: { tr: "Ege Mutfağı & Kokteyl", en: "Aegean Dining & Cocktails" },
    url: "https://www.hilton.com/tr/hotels/izmirpy-canopy-izmir-bomonti/dining/",
    accent: "terracotta",
  },
];
