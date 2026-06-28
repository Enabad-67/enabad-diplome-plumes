import { CertificatePageLayout } from "@/certificates/layout/certificate-page-layout"
import { certificateAssets } from "@/lib/certificates/assets"
import type { Signatures } from "@/lib/config/read-signatures"
import { getPlumeTheme } from "@/lib/plumes/themes"

type PlumeBlanchePageProps = {
  playerName: string
  issuedAt: string
  signatures: Signatures
  blank?: boolean
}

export function PlumeBlanchePage({
  playerName,
  issuedAt,
  signatures,
  blank,
}: PlumeBlanchePageProps) {
  return (
    <CertificatePageLayout
      backgroundSrc={certificateAssets.fondBlanche}
      theme={getPlumeTheme("blanche")}
      playerName={playerName}
      issuedAt={issuedAt}
      signatures={signatures}
      blank={blank}
    />
  )
}
