import type { PlumeColor } from "@/lib/plumes/types"

export const REQUIRED_COLUMNS = [
  "Club",
  "Sexe",
  "Nom d'usage",
  "Prénom",
  "Licence",
  "Année de naissance",
  "Email de contact",
  "Catégorie",
  "Meilleur plume",
  "Plume à passer",
] as const

export type RequiredColumn = (typeof REQUIRED_COLUMNS)[number]

export type PlayerRow = {
  rowIndex: number
  club: string
  sexe: string
  nomUsage: string
  prenom: string
  licence: string
  anneeNaissance: string
  email: string
  categorie: string
  meilleurPlume: string
  plumeAPasser: string
  plume: PlumeColor
  displayName: string
}

export type RowError = {
  rowIndex: number
  message: string
}

export type ParseResult = {
  rows: PlayerRow[]
  errors: RowError[]
  warnings: RowError[]
}
