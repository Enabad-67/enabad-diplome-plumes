import type { PlumeColor } from "./types"

const PLUME_ALIASES: Record<PlumeColor, string[]> = {
  rouge: ["rouge", "plume rouge", "passbad rouge", "plume de bronze rouge"],
  jaune: ["jaune", "plume jaune", "passbad jaune"],
  verte: ["verte", "plume verte", "passbad verte", "vert"],
  bleue: ["bleue", "bleu", "plume bleue", "passbad bleue", "plume bleu"],
  blanche: ["blanche", "blanc", "plume blanche", "passbad blanche"],
}

function stripAccents(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "")
}

function normalizeKey(value: string): string {
  return stripAccents(value).toLowerCase().trim().replace(/\s+/g, " ")
}

export function normalizePlume(raw: string): PlumeColor | null {
  const key = normalizeKey(raw)
  if (!key) return null

  for (const [plume, aliases] of Object.entries(PLUME_ALIASES) as [
    PlumeColor,
    string[],
  ][]) {
    if (aliases.some((alias) => key === alias || key.includes(alias))) {
      return plume
    }
  }

  return null
}
