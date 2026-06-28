import { renderToBuffer } from "@react-pdf/renderer"

import { BlankCertificateDocument, CertificatesDocument } from "@/certificates/document"
import type { PlayerRow } from "@/lib/excel/types"
import type { Signatures } from "@/lib/config/read-signatures"
import type { PlumeColor } from "@/lib/plumes/types"

import { formatIssuedDate } from "./format-date"

export async function renderCertificatesPdf(
  players: PlayerRow[],
  signatures: Signatures,
  issuedAtIso: string,
): Promise<Buffer> {
  const issuedAt = formatIssuedDate(issuedAtIso)

  const buffer = await renderToBuffer(
    <CertificatesDocument
      players={players}
      signatures={signatures}
      issuedAt={issuedAt}
    />,
  )

  return Buffer.from(buffer)
}

export async function renderBlankCertificatePdf(
  plume: PlumeColor,
  signatures: Signatures,
): Promise<Buffer> {
  const buffer = await renderToBuffer(
    <BlankCertificateDocument plume={plume} signatures={signatures} />,
  )

  return Buffer.from(buffer)
}
