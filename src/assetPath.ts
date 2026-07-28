export function assetPath(path: string) {
  const relativePath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${relativePath}`;
}

const eventImages: Record<string, string> = {
  afterwork: "canopy-social-house.webp",
  music: "canopy-social-house.webp",
  cinema: "canopy-social-house.webp",
  wellness: "canopy-fitness.webp",
  stay: "canopy-fitness.webp",
  table: "canopy-social-house.webp",
  tasting: "canopy-social-house.webp",
  harvest: "canopy-social-house.webp",
  taste: "canopy-social-house.webp",
  coffee: "canopy-social-house.webp",
  sunset: "canopy-exterior.webp",
  festival: "canopy-exterior.webp",
  architecture: "canopy-foyer.webp",
  design: "canopy-foyer.webp",
  makers: "canopy-foyer.webp",
  market: "canopy-foyer.webp",
  family: "canopy-exterior.webp",
  route: "mahall-tower.webp",
  anniversary: "mahall-tower.webp",
};

export function eventImagePath(key: string) {
  const filename = eventImages[key] ?? "mahall-tower.webp";
  return assetPath(`/images/gallery/${filename}`);
}
