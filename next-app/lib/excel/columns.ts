import type { RequiredColumn } from "./types"

const COLUMN_ALIASES: Record<RequiredColumn, string[]> = {
  Club: ["club"],
  Sexe: ["sexe"],
  "Nom d'usage": ["nom d'usage", "nom d usage", "nom"],
  Prénom: ["prenom", "prénom"],
  Licence: ["licence"],
  "Année de naissance": [
    "annee de naissance",
    "année de naissance",
    "annee naissance",
    "année naissance",
  ],
  "Email de contact": ["email de contact", "email", "e-mail"],
  Catégorie: ["categorie", "catégorie"],
  "Meilleur plume": ["meilleur plume", "meilleure plume"],
  "Plume à passer": [
    "plume a passer",
    "plume à passer",
    "plume a valider",
    "plume à valider",
  ],
}

function stripAccents(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "")
}

export function normalizeHeader(header: string): string {
  return stripAccents(header).toLowerCase().trim().replace(/\s+/g, " ")
}

export function resolveColumnKey(
  header: string,
): RequiredColumn | null {
  const normalized = normalizeHeader(header)

  for (const [column, aliases] of Object.entries(COLUMN_ALIASES) as [
    RequiredColumn,
    string[],
  ][]) {
    if (
      aliases.includes(normalized) ||
      normalizeHeader(column) === normalized
    ) {
      return column
    }
  }

  return null
}
