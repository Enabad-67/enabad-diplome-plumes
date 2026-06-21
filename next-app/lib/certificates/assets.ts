import path from "node:path"

const CERT_DIR = path.join(process.cwd(), "public", "certificates")

export const certificateAssets = {
  ffbad: path.join(CERT_DIR, "ffbad.png"),
  enabad: path.join(CERT_DIR, "enabad.png"),
  bbc: path.join(CERT_DIR, "bbc.png"),
  bcb: path.join(CERT_DIR, "bcb.png"),
  ofbc: path.join(CERT_DIR, "ofbc.png"),
  ccsbh: path.join(CERT_DIR, "ccsbh.png"),
  fondRouge: path.join(CERT_DIR, "diplome_fond_rouge.png"),
  fondJaune: path.join(CERT_DIR, "diplome_fond_jaune.png"),
  fondVert: path.join(CERT_DIR, "diplome_fond_vert.png"),
  fondBleu: path.join(CERT_DIR, "diplome_fond_bleu.png"),
  fondBlanche: path.join(CERT_DIR, "diplome_fond_image.png"),
} as const
