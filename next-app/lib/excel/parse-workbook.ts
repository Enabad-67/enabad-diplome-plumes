import * as XLSX from "xlsx"

import { resolveColumnKey } from "./columns"
import type { ParseResult, PlayerRow, RequiredColumn, RowError } from "./types"
import { REQUIRED_COLUMNS } from "./types"
import { normalizePlume } from "@/lib/plumes/normalize"

function cellToString(value: unknown): string {
  if (value == null) return ""
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }
  return String(value).trim()
}

function buildDisplayName(prenom: string, nomUsage: string): string {
  return `${prenom} ${nomUsage}`.trim().toUpperCase()
}

export function parseWorkbookBuffer(buffer: ArrayBuffer): ParseResult {
  const workbook = XLSX.read(buffer, { type: "array", cellDates: true })
  const sheetName = workbook.SheetNames[0]

  if (!sheetName) {
    return {
      rows: [],
      errors: [{ rowIndex: 0, message: "Le fichier Excel ne contient aucune feuille." }],
      warnings: [],
    }
  }

  const sheet = workbook.Sheets[sheetName]
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
    raw: false,
  })

  if (rawRows.length === 0) {
    return {
      rows: [],
      errors: [{ rowIndex: 0, message: "Le fichier Excel ne contient aucune ligne de données." }],
      warnings: [],
    }
  }

  const headers = Object.keys(rawRows[0] ?? {})
  const columnMap = new Map<number, RequiredColumn>()

  headers.forEach((header, index) => {
    const column = resolveColumnKey(header)
    if (column) {
      columnMap.set(index, column)
    }
  })

  const mappedColumns = new Set(columnMap.values())
  const missingColumns = REQUIRED_COLUMNS.filter((col) => !mappedColumns.has(col))

  if (missingColumns.length > 0) {
    return {
      rows: [],
      errors: [
        {
          rowIndex: 0,
          message: `Colonnes manquantes : ${missingColumns.join(", ")}`,
        },
      ],
      warnings: [],
    }
  }

  const headerToColumn = new Map<string, RequiredColumn>()
  headers.forEach((header) => {
    const column = resolveColumnKey(header)
    if (column) {
      headerToColumn.set(header, column)
    }
  })

  const rows: PlayerRow[] = []
  const errors: RowError[] = []
  const warnings: RowError[] = []

  rawRows.forEach((rawRow, index) => {
    const rowIndex = index + 2
    const values: Partial<Record<RequiredColumn, string>> = {}

    for (const [header, column] of headerToColumn.entries()) {
      values[column] = cellToString(rawRow[header])
    }

    const prenom = values["Prénom"] ?? ""
    const nomUsage = values["Nom d'usage"] ?? ""
    const plumeRaw = values["Plume à passer"] ?? ""

    if (!prenom && !nomUsage) {
      warnings.push({
        rowIndex,
        message: "Ligne ignorée : prénom et nom d'usage vides.",
      })
      return
    }

    if (!prenom || !nomUsage) {
      errors.push({
        rowIndex,
        message: "Prénom ou nom d'usage manquant.",
      })
      return
    }

    const plume = normalizePlume(plumeRaw)
    if (!plume) {
      errors.push({
        rowIndex,
        message: `Plume à passer non reconnue : « ${plumeRaw || "(vide)"} ».`,
      })
      return
    }

    rows.push({
      rowIndex,
      club: values.Club ?? "",
      sexe: values.Sexe ?? "",
      nomUsage,
      prenom,
      licence: values.Licence ?? "",
      anneeNaissance: values["Année de naissance"] ?? "",
      email: values["Email de contact"] ?? "",
      categorie: values.Catégorie ?? "",
      meilleurPlume: values["Meilleur plume"] ?? "",
      plumeAPasser: plumeRaw,
      plume,
      displayName: buildDisplayName(prenom, nomUsage),
    })
  })

  return { rows, errors, warnings }
}
