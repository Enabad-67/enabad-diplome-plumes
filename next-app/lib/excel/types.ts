import type { PlumeColor } from "@/lib/plumes/types"

export const REQUIRED_COLUMNS = [
  "Club",
  "Nom d'usage",
  "Prénom",
  "Meilleur plume",
] as const

export const OPTIONAL_COLUMNS = [
  "Sexe",
  "Licence",
  "Année de naissance",
  "Email de contact",
  "Catégorie",
  "Plume à passer",
] as const

export const ALL_COLUMNS = [
  ...REQUIRED_COLUMNS,
  ...OPTIONAL_COLUMNS,
] as const

export type RequiredColumn = (typeof REQUIRED_COLUMNS)[number]
export type ExcelColumn = (typeof ALL_COLUMNS)[number]

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
