import { Page, StyleSheet, View } from "@react-pdf/renderer"

import { CertificateContent } from "@/certificates/layout/certificate-content"
import type { Signatures } from "@/lib/config/read-signatures"
import { getPlumeTheme } from "@/lib/plumes/themes"

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  leftBand: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "9%",
    backgroundColor: "#76D75D",
  },
  rightBand: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "9%",
    backgroundColor: "#FF4B4B",
  },
  inner: {
    flex: 1,
    marginHorizontal: "9%",
    backgroundColor: "#FFFFFF",
  },
})

type PlumeVertePageProps = {
  playerName: string
  issuedAt: string
  signatures: Signatures
}

export function PlumeVertePage({
  playerName,
  issuedAt,
  signatures,
}: PlumeVertePageProps) {
  const theme = getPlumeTheme("verte")

  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.leftBand} />
      <View style={styles.rightBand} />
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
