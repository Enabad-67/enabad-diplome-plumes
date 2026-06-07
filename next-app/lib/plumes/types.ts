export type PlumeColor = "rouge" | "jaune" | "verte" | "bleue" | "blanche"

export type PlumeTheme = {
  id: PlumeColor
  plumeLabel: string
  accentColor: string
  leftBandColor?: string
  rightBandColor?: string
  borderColor?: string
  useGradient?: boolean
  gradientColors?: [string, string]
}
