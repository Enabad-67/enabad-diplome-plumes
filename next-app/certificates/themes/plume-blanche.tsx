import { Page, StyleSheet, View } from "@react-pdf/renderer"

import { CertificateContent } from "@/certificates/layout/certificate-content"
import type { Signatures } from "@/lib/config/read-signatures"
import { getPlumeTheme } from "@/lib/plumes/themes"

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  inner: {
    flex: 1,
    borderWidth: 4,
    borderColor: "#C0C0C0",
    borderStyle: "solid",
    backgroundColor: "#FFFFFF",
  },
})

type PlumeBlanchePageProps = {
  playerName: string
  issuedAt: string
  signatures: Signatures
}

export function PlumeBlanchePage({
  playerName,
  issuedAt,
  signatures,
}: PlumeBlanchePageProps) {
  const theme = getPlumeTheme("blanche")

  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.inner}>
        <CertificateContent
          theme={theme}
          playerName={playerName}
          issuedAt={issuedAt}
          signatures={signatures}
        />
      </View>
    </Page>
  )
}
