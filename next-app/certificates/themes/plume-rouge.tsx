import { CertificatePageLayout } from "@/certificates/layout/certificate-page-layout"
import { certificateAssets } from "@/lib/certificates/assets"
import type { Signatures } from "@/lib/config/read-signatures"
import { getPlumeTheme } from "@/lib/plumes/themes"

type PlumeRougePageProps = {
  playerName: string
  issuedAt: string
  signatures: Signatures
}

export function PlumeRougePage({
  playerName,
  issuedAt,
  signatures,
}: PlumeRougePageProps) {
  return (
    <CertificatePageLayout
      backgroundSrc={certificateAssets.fondRouge}
      theme={getPlumeTheme("rouge")}
      playerName={playerName}
      issuedAt={issuedAt}
      signatures={signatures}
    />
  )
}
