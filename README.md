# ENA BAD — Diplômes plumes

Génération de certificats **PASSBAD** (plumes) pour l’**Entente Nord Alsace Badminton**, à partir d’un export Excel des jeunes ayant validé leur niveau.

## Contexte

### Objectif

Permettre au club de produire rapidement des **diplômes A4 paysage** conformes aux modèles officiels (FFBaD / PASSBAD), sans retouche manuelle dans un logiciel de PAO, pour chaque jeune listé dans un fichier Excel.

### Utilisateurs

- Staff ENABAD / responsables jeunes ou compétition
- Coaches impliqués dans la validation des plumes (noms affichés sur le certificat)

### Périmètre MVP

| Inclus | Exclu (pour l’instant) |
|--------|-------------------------|
| Import d’un fichier Excel (colonnes ci-dessous) | Base de données, comptes, auth |
| Génération d’un certificat par ligne / jeune | Envoi automatique des e-mails |
| Variante visuelle selon **Plume à passer** (rouge, jaune, verte, bleue, blanche) | Gestion multi-saisons / archives |
| Export **PDF multi-pages** (un diplôme par joueur) via `@react-pdf/renderer` | |
| Logos FFBaD, ENABAD, clubs (dossier `assets/`) | Édition Excel dans l’app |
| Coachs et responsable lus depuis `config/*.md` | |

### Fichier Excel — colonnes attendues

| Colonne | Usage prévu |
|---------|-------------|
| `Club` | Info club (filtrage / trace, optionnel sur le visuel) |
| `Sexe` | Donnée joueur |
| `Nom d'usage` | Nom sur le certificat |
| `Prénom` | Nom sur le certificat |
| `Licence` | Donnée fédérale |
| `Année de naissance` | Donnée joueur |
| `Email de contact` | Contact (hors MVP : envoi mail) |
| `Catégorie` | Catégorie sportive |
| `Meilleur plume` | Référence niveau déjà atteint |
| **`Plume à passer`** | **Détermine le modèle et la couleur du diplôme** |

### Certificat (visuel)

Format **A4 paysage**. Éléments communs :

- Logo **FFBaD** en haut à droite
- Logo **ENA BAD** au centre (haut)
- Titre « CERTIFICAT PASSBAD », texte « Décerné suite à l'obtention de la », libellé **PLUME &lt;COULEUR&gt;** (grande typo, couleur selon la plume)
- Ligne « Au joueur … le … » (prénom + nom d'usage, date)
- Signatures : coachs (gauche), responsable ENABAD (droite)
- Logos des clubs partenaires en bas de page

Variantes observées (selon la plume) : bordures ou fond dégradé (ex. jaune→rouge pour plume jaune, bandes vert/rouge ou bleu/rouge pour d’autres niveaux). L’implémentation doit mapper **Plume à passer** → thème (couleurs, bordures, fond).

### Assets (`assets/`)

| Fichier | Rôle |
|---------|------|
| `ffbad.png` | Logo FFBaD (haut droite) |
| `ENA Bad(1).png` | Logo ENABAD (centre) |
| `BBC.png` | Club Bischwiller Badminton Club |
| `BCB.png` | Logo BCB |
| `OFBC.png` | Logo OFBC |
| `CCSBH_fond_transparent.png` | Logo CCSBH Hoerdt |
| `Diplomes plumes 2025.pdf` | Référence / exemple rendu |

Les logos sont servis depuis `next-app/public/certificates/` (copie des fichiers ci-dessus).

### Paramétrage (`config/`)

- **`config/coachs.md`** — liste des coachs (une ligne = un nom), affichée sous la ligne de signature gauche.
- **`config/responsable.md`** — nom et titre de la responsable (ex. compétition / jeunes ENABAD), colonne droite.

Modifier ces fichiers pour mettre à jour les signatures sans changer le code.

## Structure du dépôt

| Dossier / fichier | Rôle |
|-------------------|------|
| `assets/` | Logos et PDF de référence |
| `config/` | Coachs et responsable (Markdown) |
| `next-app/` | Application Next.js (shadcn, preset b0) |
| `AGENTS.md` | Règles pour les agents IA |

## Prérequis

- Node.js (LTS recommandé)
- [pnpm](https://pnpm.io/)

## Démarrage

```bash
cd next-app
pnpm install
pnpm dev
```

Application sur [http://localhost:3000](http://localhost:3000).

### Utilisation

1. Importer un fichier Excel (colonnes ci-dessus).
2. Vérifier l’aperçu (erreurs bloquantes si plume inconnue ou colonnes manquantes).
3. Choisir la date du diplôme.
4. **Générer le PDF** : un fichier unique avec une page paysage A4 par joueur.

Fichier de test : [`next-app/fixtures/sample-plumes.xlsx`](next-app/fixtures/sample-plumes.xlsx) (5 plumes). Recette détaillée : [`next-app/fixtures/README.md`](next-app/fixtures/README.md).

### Dépendances applicatives

Dans `next-app/package.json` :

- `@react-pdf/renderer` — génération PDF
- `xlsx` — lecture Excel

`next.config.mjs` déclare `serverExternalPackages: ["@react-pdf/renderer"]`.

### Signatures (coachs / responsable)

Modifier [`config/coachs.md`](config/coachs.md) et [`config/responsable.md`](config/responsable.md) à la racine. Une copie de secours existe dans `next-app/config/` pour les déploiements où seul le dossier app est présent.

Redémarrer `pnpm dev` après modification des fichiers config.

## User stories

Le dossier `US/` n’est pas initialisé. Pour documenter une fonctionnalité :

```
US/US-XXX-<slug>/
├── fonctionnel.md
├── technique.md
└── visuel.md
```

Modèles dans `.cursor/skills/bootstrap-vibe-coding/templates/US/`.

## Agents IA

Règles de travail : [AGENTS.md](./AGENTS.md).
