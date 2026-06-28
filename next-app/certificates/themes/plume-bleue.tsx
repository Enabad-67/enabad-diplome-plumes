import { CertificatePageLayout } from "@/certificates/layout/certificate-page-layout"
import { certificateAssets } from "@/lib/certificates/assets"
import type { Signatures } from "@/lib/config/read-signatures"
import { getPlumeTheme } from "@/lib/plumes/themes"

type PlumeBleuePageProps = {
  playerName: string
  issuedAt: string
  signatures: Signatures
  blank?: boolean
}

export function PlumeBleuePage({
  playerName,
  issuedAt,
  signatures,
  blank,
}: PlumeBleuePageProps) {
  return (
    <CertificatePageLayout
      backgroundSrc={certificateAssets.fondBleu}
      theme={getPlumeTheme("bleue")}
      playerName={playerName}
      issuedAt={issuedAt}
      signatures={signatures}
      blank={blank}
    />
  )
}
