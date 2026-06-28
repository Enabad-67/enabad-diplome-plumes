import { renderBlankCertificatePdf } from "@/lib/certificates/render"
import { getSignatures } from "@/lib/config/read-signatures"
import { normalizePlume } from "@/lib/plumes/normalize"
import type { PlumeColor } from "@/lib/plumes/types"
import { PLUME_COLORS } from "@/lib/plumes/types"

export const runtime = "nodejs"

function isPlumeColor(value: string): value is PlumeColor {
  return PLUME_COLORS.includes(value as PlumeColor)
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rawPlume = searchParams.get("plume")?.trim() ?? ""

    const plume = isPlumeColor(rawPlume)
      ? rawPlume
      : normalizePlume(rawPlume)

    if (!plume) {
      return Response.json(
        {
          error:
            "Plume invalide. Valeurs acceptées : rouge, jaune, verte, bleue, blanche.",
        },
        { status: 400 },
      )
    }

    const signatures = await getSignatures()
    const pdfBuffer = await renderBlankCertificatePdf(plume, signatures)
    const filename = `diplome-plume-${plume}-vierge.pdf`

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(pdfBuffer.length),
      },
    })
  } catch (error) {
    console.error("Blank certificate generation failed:", error)
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur inattendue lors de la génération du PDF vierge.",
      },
      { status: 500 },
    )
  }
}
