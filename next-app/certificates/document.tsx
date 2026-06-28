import { Document } from "@react-pdf/renderer"

import type { PlayerRow } from "@/lib/excel/types"
import type { Signatures } from "@/lib/config/read-signatures"
import type { PlumeColor } from "@/lib/plumes/types"

import { CertificatePage } from "./certificate-page"

type CertificatesDocumentProps = {
  players: PlayerRow[]
  signatures: Signatures
  issuedAt: string
}

export function CertificatesDocument({
  players,
  signatures,
  issuedAt,
}: CertificatesDocumentProps) {
  return (
    <Document title="Diplômes plumes ENABAD">
      {players.map((player) => (
        <CertificatePage
          key={`${player.rowIndex}-${player.displayName}`}
          plume={player.plume}
          playerName={player.displayName}
          issuedAt={issuedAt}
          signatures={signatures}
        />
      ))}
    </Document>
  )
}

type BlankCertificateDocumentProps = {
  plume: PlumeColor
  signatures: Signatures
}

export function BlankCertificateDocument({
  plume,
  signatures,
}: BlankCertificateDocumentProps) {
  return (
    <Document title={`Diplôme plume ${plume} vierge ENABAD`}>
      <CertificatePage
        plume={plume}
        playerName=""
        issuedAt=""
        signatures={signatures}
        blank
      />
    </Document>
  )
}
