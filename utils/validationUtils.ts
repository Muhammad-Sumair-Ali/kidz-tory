

export function formatField(field: string | string[]): string {
  if (!field) throw new Error("Field must not be empty");
  return Array.isArray(field) ? field.join(", ") : field;
}

export function parseFavoriteThings(favoriteThings: string[] | string): string[] {
  const parsed = Array.isArray(favoriteThings)
    ? favoriteThings.filter(Boolean)
    : favoriteThings
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  if (!parsed.length) {
    throw new Error("favoriteThings must not be empty");
  }

  return parsed;
}

export function cleanTitle(title: string): string {
  return title
    .replace(/^["']|["']$/g, "")
    .trim();
}