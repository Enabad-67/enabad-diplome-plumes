"use client"

import { FileDown, FileUp, Loader2 } from "lucide-react"
import { useCallback, useMemo, useRef, useState, type FocusEvent } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  formatIsoToShortDate,
  parseShortDateToIso,
  todayIsoDate,
} from "@/lib/certificates/format-date"
import { parseWorkbookBuffer } from "@/lib/excel/parse-workbook"
import type { ParseResult } from "@/lib/excel/types"
import type { PlumeColor } from "@/lib/plumes/types"
import { PLUME_COLORS } from "@/lib/plumes/types"

const PLUME_LABELS: Record<string, string> = {
  rouge: "Plume rouge",
  jaune: "Plume jaune",
  verte: "Plume verte",
  bleue: "Plume bleue",
  blanche: "Plume blanche",
}

export function DiplomesWorkflow() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [issuedAt, setIssuedAt] = useState(todayIsoDate())
  const [issuedAtDisplay, setIssuedAtDisplay] = useState(() =>
    formatIsoToShortDate(todayIsoDate()),
  )
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadingPlume, setDownloadingPlume] = useState<PlumeColor | null>(
    null,
  )
  const [apiError, setApiError] = useState<string | null>(null)

  const processFile = useCallback(async (selected: File) => {
    setFile(selected)
    setApiError(null)
    const buffer = await selected.arrayBuffer()
    const result = parseWorkbookBuffer(buffer)
    setParseResult(result)
  }, [])

  const onFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selected = event.target.files?.[0]
      if (selected) {
        await processFile(selected)
      }
    },
    [processFile],
  )

  const onDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragging(false)
      const selected = event.dataTransfer.files?.[0]
      if (selected) {
        await processFile(selected)
      }
    },
    [processFile],
  )

  const canGenerate = useMemo(() => {
    return (
      file != null &&
      parseResult != null &&
      parseResult.errors.length === 0 &&
      parseResult.rows.length > 0 &&
      !isGenerating
    )
  }, [file, parseResult, isGenerating])

  const generatePdf = useCallback(async () => {
    if (!file || !canGenerate) return

    setIsGenerating(true)
    setApiError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("issuedAt", issuedAt)

      const response = await fetch("/api/certificates", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const payload = (await response.json()) as {
          errors?: { rowIndex: number; message: string }[]
        }
        const messages =
          payload.errors?.map((e) => `Ligne ${e.rowIndex} : ${e.message}`) ?? [
            "La génération du PDF a échoué.",
          ]
        setApiError(messages.join("\n"))
        return
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = `diplomes-plumes-${issuedAt}.pdf`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Erreur réseau lors de la génération.",
      )
    } finally {
      setIsGenerating(false)
    }
  }, [file, canGenerate, issuedAt])

  const downloadBlankPdf = useCallback(async (plume: PlumeColor) => {
    setDownloadingPlume(plume)
    setApiError(null)

    try {
      const response = await fetch(
        `/api/certificates/blank?plume=${encodeURIComponent(plume)}`,
      )

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string }
        setApiError(payload.error ?? "Le téléchargement du modèle vierge a échoué.")
        return
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = `diplome-plume-${plume}-vierge.pdf`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Erreur réseau lors du téléchargement.",
      )
    } finally {
      setDownloadingPlume(null)
    }
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Diplômes plumes ENABAD
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Importez un fichier Excel pour générer un PDF multi-pages (un diplôme
          par joueur).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modèles vierges</CardTitle>
          <CardDescription>
            Téléchargez un diplôme vierge (sans nom ni date) pour chaque
            couleur de plume, à remplir à la main ou à l&apos;impression.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {PLUME_COLORS.map((plume) => (
              <Button
                key={plume}
                variant="outline"
                disabled={downloadingPlume != null}
                onClick={() => downloadBlankPdf(plume)}
              >
                {downloadingPlume === plume ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <FileDown />
                )}
                {PLUME_LABELS[plume]}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1. Fichier Excel</CardTitle>
          <CardDescription>
            Colonnes obligatoires : Club, Nom d&apos;usage, Prénom, Meilleure
            plume. Colonnes optionnelles : Sexe, Licence, Année de naissance,
            Email de contact, Catégorie, Plume à passer (sinon la meilleure
            plume détermine le diplôme).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                fileInputRef.current?.click()
              }
            }}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-10 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted/40"
            }`}
          >
            <FileUp className="size-8 text-muted-foreground" />
            <div>
              <p className="font-medium">
                Glissez-déposez votre fichier .xlsx ici
              </p>
              <p className="text-sm text-muted-foreground">
                ou cliquez pour parcourir
              </p>
            </div>
            {file && (
              <p className="text-sm text-muted-foreground">
                Fichier sélectionné : <strong>{file.name}</strong>
              </p>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={onFileChange}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Date du diplôme</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="jj/mm/aaaa"
            value={issuedAtDisplay}
            onChange={(e) => setIssuedAtDisplay(e.target.value)}
            onBlur={(e: FocusEvent<HTMLInputElement>) => {
              const parsed = parseShortDateToIso(e.target.value)
              if (parsed) {
                setIssuedAt(parsed)
                setIssuedAtDisplay(formatIsoToShortDate(parsed))
              } else {
                setIssuedAtDisplay(formatIsoToShortDate(issuedAt))
              }
            }}
            className="max-w-xs"
          />
        </CardContent>
      </Card>

      {parseResult && (
        <Card>
          <CardHeader>
            <CardTitle>3. Aperçu</CardTitle>
            <CardDescription>
              {parseResult.rows.length} diplôme
              {parseResult.rows.length > 1 ? "s" : ""} seront généré
              {parseResult.rows.length > 1 ? "s" : ""}.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {parseResult.errors.length > 0 && (
              <Alert variant="destructive">
                <AlertTitle>Erreurs bloquantes</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 list-disc pl-4">
                    {parseResult.errors.map((error) => (
                      <li key={`${error.rowIndex}-${error.message}`}>
                        Ligne {error.rowIndex} : {error.message}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {parseResult.warnings.length > 0 && (
              <Alert>
                <AlertTitle>Avertissements</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 list-disc pl-4">
                    {parseResult.warnings.map((warning) => (
                      <li key={`${warning.rowIndex}-${warning.message}`}>
                        Ligne {warning.rowIndex} : {warning.message}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {parseResult.rows.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ligne</TableHead>
                    <TableHead>Joueur</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Plume à passer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parseResult.rows.map((row) => (
                    <TableRow key={row.rowIndex}>
                      <TableCell>{row.rowIndex}</TableCell>
                      <TableCell>{row.displayName}</TableCell>
                      <TableCell>{row.club}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {PLUME_LABELS[row.plume] ?? row.plume}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      {apiError && (
        <Alert variant="destructive">
          <AlertTitle>Échec de la génération</AlertTitle>
          <AlertDescription className="whitespace-pre-line">
            {apiError}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <Button onClick={generatePdf} disabled={!canGenerate}>
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" />
              Génération…
            </>
          ) : (
            "Générer le PDF"
          )}
        </Button>
      </div>
    </div>
  )
}
