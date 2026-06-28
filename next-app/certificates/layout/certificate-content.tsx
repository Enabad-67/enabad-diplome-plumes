import { Image, StyleSheet, Text, View } from "@react-pdf/renderer"

import { certificateAssets } from "@/lib/certificates/assets"
import type { Signatures } from "@/lib/config/read-signatures"
import type { PlumeTheme } from "@/lib/plumes/types"

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 48,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 12,
    position: "relative",
    minHeight: 70,
  },
  ffbadLogo: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 70,
    height: 70,
    objectFit: "contain",
  },
  enabadLogo: {
    width: 180,
    height: 70,
    objectFit: "contain",
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginTop: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: "Helvetica",
  },
  plumeLabel: {
    fontSize: 42,
    fontFamily: "Helvetica-Bold",
    marginTop: 8,
    letterSpacing: 2,
  },
  playerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: 40,
    fontSize: 14,
    fontFamily: "Helvetica",
  },
  playerName: {
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  blankField: {
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    width: 180,
    marginBottom: 2,
  },
  blankDateField: {
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    width: 100,
    marginBottom: 2,
  },
  playerLabelRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  signaturesRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
    paddingHorizontal: 40,
  },
  signatureColumn: {
    width: "42%",
    alignItems: "center",
  },
  signatureLine: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#FF4B4B",
    marginBottom: 8,
    minHeight: 1,
  },
  coachName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  responsibleName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 2,
    textAlign: "center",
  },
  responsibleTitle: {
    fontSize: 9,
    fontFamily: "Helvetica",
    textAlign: "center",
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 12,
  },
  clubLogo: {
    width: 55,
    height: 55,
    objectFit: "contain",
  },
})

type CertificateContentProps = {
  theme: PlumeTheme
  playerName: string
  issuedAt: string
  signatures: Signatures
  blank?: boolean
}

export function CertificateContent({
  theme,
  playerName,
  issuedAt,
  signatures,
  blank = false,
}: CertificateContentProps) {
  return (
    <View style={styles.content}>
      <View style={styles.headerRow}>
        <Image src={certificateAssets.enabad} style={styles.enabadLogo} />
        <Image src={certificateAssets.ffbad} style={styles.ffbadLogo} />
      </View>

      <Text style={[styles.title, { color: theme.accentColor }]}>
        CERTIFICAT PASSBAD
      </Text>
      <Text style={styles.subtitle}>Décerné suite à l'obtention de la</Text>
      <Text style={[styles.plumeLabel, { color: theme.accentColor }]}>
        {theme.plumeLabel}
      </Text>

      <View style={styles.playerRow}>
        {blank ? (
          <>
            <View style={styles.playerLabelRow}>
              <Text>Au joueur </Text>
              <View style={styles.blankField} />
            </View>
            <View style={styles.playerLabelRow}>
              <Text>le </Text>
              <View style={styles.blankDateField} />
            </View>
          </>
        ) : (
          <>
            <Text>
              Au joueur <Text style={styles.playerName}>{playerName}</Text>
            </Text>
            <Text>le {issuedAt}</Text>
          </>
        )}
      </View>

      <View style={styles.signaturesRow}>
        <View style={styles.signatureColumn}>
          <View style={styles.signatureLine} />
          {signatures.coaches.map((coach) => (
            <Text key={coach} style={styles.coachName}>
              {coach.toUpperCase()}
            </Text>
          ))}
        </View>
        <View style={styles.signatureColumn}>
          <View style={styles.signatureLine} />
          <Text style={styles.responsibleName}>
            {signatures.responsibleName.toUpperCase()}
          </Text>
          <Text style={styles.responsibleTitle}>
            {signatures.responsibleTitle}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Image src={certificateAssets.bbc} style={styles.clubLogo} />
        <Image src={certificateAssets.bcb} style={styles.clubLogo} />
        <Image src={certificateAssets.ofbc} style={styles.clubLogo} />
        <Image src={certificateAssets.ccsbh} style={styles.clubLogo} />
      </View>
    </View>
  )
}
