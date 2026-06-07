import { readFile } from "node:fs/promises"
import path from "node:path"

export type Signatures = {
  coaches: string[]
  responsibleName: string
  responsibleTitle: string
}

let cachedSignatures: Signatures | null = null

function configPath(filename: string): string {
  return path.join(process.cwd(), "..", "config", filename)
}

async function readConfigFile(filename: string): Promise<string> {
  const primary = configPath(filename)
  try {
    return await readFile(primary, "utf-8")
  } catch {
    const fallback = path.join(process.cwd(), "config", filename)
    return readFile(fallback, "utf-8")
  }
}

function parseCoachs(content: string): string[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
}

function parseResponsable(content: string): {
  responsibleName: string
  responsibleTitle: string
} {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))

  return {
    responsibleName: lines[0] ?? "",
    responsibleTitle: lines[1] ?? "",
  }
}

export async function getSignatures(): Promise<Signatures> {
  if (cachedSignatures) {
    return cachedSignatures
  }

  const [coachsContent, responsableContent] = await Promise.all([
    readConfigFile("coachs.md"),
    readConfigFile("responsable.md"),
  ])

  const coaches = parseCoachs(coachsContent)
  const { responsibleName, responsibleTitle } = parseResponsable(responsableContent)

  cachedSignatures = {
    coaches,
    responsibleName,
    responsibleTitle,
  }

  return cachedSignatures
}
