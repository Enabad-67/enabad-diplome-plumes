import {
  Defs,
  LinearGradient,
  Page,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  View,
} from "@react-pdf/renderer"

import { CertificateContent } from "@/certificates/layout/certificate-content"
import type { Signatures } from "@/lib/config/read-signatures"
import { getPlumeTheme } from "@/lib/plumes/themes"

const styles = StyleSheet.create({
  page: {
    position: "relative",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  inner: {
    flex: 1,
    margin: 28,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
})

type PlumeJaunePageProps = {
  playerName: string
  issuedAt: string
  signatures: Signatures
  gradientId: string
}

export function PlumeJaunePage({
  playerName,
  issuedAt,
  signatures,
  gradientId,
}: PlumeJaunePageProps) {
  const theme = getPlumeTheme("jaune")
  const [from, to] = theme.gradientColors ?? ["#F5D000", "#FF4B4B"]

  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Svg style={styles.gradient} viewBox="0 0 842 595">
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor={from} />
            <Stop offset="100%" stopColor={to} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="842" height="595" fill={`url(#${gradientId})`} />
      </Svg>
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
