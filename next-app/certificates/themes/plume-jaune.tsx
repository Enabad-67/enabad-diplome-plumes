import { CertificatePageLayout } from "@/certificates/layout/certificate-page-layout"
import { certificateAssets } from "@/lib/certificates/assets"
import type { Signatures } from "@/lib/config/read-signatures"
import { getPlumeTheme } from "@/lib/plumes/themes"

type PlumeJaunePageProps = {
  playerName: string
  issuedAt: string
  signatures: Signatures
}

export function PlumeJaunePage({
  playerName,
  issuedAt,
  signatures,
}: PlumeJaunePageProps) {
  return (
    <CertificatePageLayout
      backgroundSrc={certificateAssets.fondJaune}
      theme={getPlumeTheme("jaune")}
      playerName={playerName}
      issuedAt={issuedAt}
      signatures={signatures}
    />
  )
}
