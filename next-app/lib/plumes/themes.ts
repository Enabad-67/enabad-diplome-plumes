import type { PlumeColor, PlumeTheme } from "./types"

export const PLUME_THEMES: Record<PlumeColor, PlumeTheme> = {
  rouge: {
    id: "rouge",
    plumeLabel: "PLUME ROUGE",
    accentColor: "#E8A598",
    borderColor: "#E8A598",
  },
  jaune: {
    id: "jaune",
    plumeLabel: "PLUME JAUNE",
    accentColor: "#F5D000",
    useGradient: true,
    gradientColors: ["#F5D000", "#FF4B4B"],
  },
  verte: {
    id: "verte",
    plumeLabel: "PLUME VERTE",
    accentColor: "#76D75D",
    leftBandColor: "#76D75D",
    rightBandColor: "#FF4B4B",
  },
  bleue: {
    id: "bleue",
    plumeLabel: "PLUME BLEUE",
    accentColor: "#7EC8E3",
    leftBandColor: "#7EC8E3",
    rightBandColor: "#FF4B4B",
  },
  blanche: {
    id: "blanche",
    plumeLabel: "PLUME BLANCHE",
    accentColor: "#4A4A4A",
    borderColor: "#C0C0C0",
  },
}

export function getPlumeTheme(plume: PlumeColor): PlumeTheme {
  return PLUME_THEMES[plume]
}
