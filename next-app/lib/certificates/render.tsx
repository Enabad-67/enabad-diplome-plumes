import { renderToBuffer } from "@react-pdf/renderer"

import { CertificatesDocument } from "@/certificates/document"
import type { PlayerRow } from "@/lib/excel/types"
import type { Signatures } from "@/lib/config/read-signatures"

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
