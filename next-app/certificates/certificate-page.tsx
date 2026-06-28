import type { Signatures } from "@/lib/config/read-signatures"
import type { PlumeColor } from "@/lib/plumes/types"

import { PlumeBleuePage } from "./themes/plume-bleue"
import { PlumeBlanchePage } from "./themes/plume-blanche"
import { PlumeJaunePage } from "./themes/plume-jaune"
import { PlumeRougePage } from "./themes/plume-rouge"
import { PlumeVertePage } from "./themes/plume-verte"

type CertificatePageProps = {
  plume: PlumeColor
  playerName: string
  issuedAt: string
  signatures: Signatures
  blank?: boolean
}

export function CertificatePage({
  plume,
  playerName,
  issuedAt,
  signatures,
  blank = false,
}: CertificatePageProps) {
  const props = { playerName, issuedAt, signatures, blank }

  switch (plume) {
    case "rouge":
      return <PlumeRougePage {...props} />
    case "jaune":
      return <PlumeJaunePage {...props} />
    case "verte":
      return <PlumeVertePage {...props} />
    case "bleue":
      return <PlumeBleuePage {...props} />
    case "blanche":
      return <PlumeBlanchePage {...props} />
  }
}
