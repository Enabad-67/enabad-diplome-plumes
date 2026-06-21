import { Image, Page, StyleSheet, View } from "@react-pdf/renderer"

import { CertificateContent } from "@/certificates/layout/certificate-content"
import type { Signatures } from "@/lib/config/read-signatures"
import type { PlumeTheme } from "@/lib/plumes/types"

const styles = StyleSheet.create({
  page: {
    position: "relative",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    flex: 1,
    position: "relative",
    margin: "12.5%",
    backgroundColor: "#FFFFFF",
  },
})

type CertificatePageLayoutProps = {
  backgroundSrc: string
  theme: PlumeTheme
  playerName: string
  issuedAt: string
  signatures: Signatures
}

export function CertificatePageLayout({
  backgroundSrc,
  theme,
  playerName,
  issuedAt,
  signatures,
}: CertificatePageLayoutProps) {
  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Image src={backgroundSrc} style={styles.background} fixed />
      <View style={styles.content}>
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
