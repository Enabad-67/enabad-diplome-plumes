import { todayIsoDate } from "@/lib/certificates/format-date"
import { renderCertificatesPdf } from "@/lib/certificates/render"
import { getSignatures } from "@/lib/config/read-signatures"
import { parseWorkbookBuffer } from "@/lib/excel/parse-workbook"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return Response.json(
        { errors: [{ rowIndex: 0, message: "Fichier Excel manquant." }] },
        { status: 400 },
      )
    }

    const issuedAt =
      (formData.get("issuedAt") as string | null)?.trim() || todayIsoDate()

    const buffer = await file.arrayBuffer()
    const result = parseWorkbookBuffer(buffer)

    if (result.errors.length > 0) {
      return Response.json({ errors: result.errors, warnings: result.warnings }, { status: 400 })
    }

    if (result.rows.length === 0) {
      return Response.json(
        {
          errors: [
            {
              rowIndex: 0,
              message: "Aucune ligne valide à transformer en diplôme.",
            },
          ],
          warnings: result.warnings,
        },
        { status: 400 },
      )
    }

    const signatures = await getSignatures()
    const pdfBuffer = await renderCertificatesPdf(
      result.rows,
      signatures,
      issuedAt,
    )

    const filename = `diplomes-plumes-${issuedAt}.pdf`

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(pdfBuffer.length),
      },
    })
  } catch (error) {
    console.error("Certificate generation failed:", error)
    return Response.json(
      {
        errors: [
          {
            rowIndex: 0,
            message:
              error instanceof Error
                ? error.message
                : "Erreur inattendue lors de la génération du PDF.",
          },
        ],
      },
      { status: 500 },
    )
  }
}
