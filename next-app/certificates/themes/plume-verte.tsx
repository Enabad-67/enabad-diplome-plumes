import { CertificatePageLayout } from "@/certificates/layout/certificate-page-layout"
import { certificateAssets } from "@/lib/certificates/assets"
import type { Signatures } from "@/lib/config/read-signatures"
import { getPlumeTheme } from "@/lib/plumes/themes"

type PlumeVertePageProps = {
  playerName: string
  issuedAt: string
  signatures: Signatures
  blank?: boolean
}

export function PlumeVertePage({
  playerName,
  issuedAt,
  signatures,
  blank,
}: PlumeVertePageProps) {
  return (
    <CertificatePageLayout
      backgroundSrc={certificateAssets.fondVert}
      theme={getPlumeTheme("verte")}
      playerName={playerName}
      issuedAt={issuedAt}
      signatures={signatures}
      blank={blank}
    />
  )
}
