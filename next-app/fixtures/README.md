# Fixtures

## `sample-plumes.xlsx`

Fichier Excel de test avec 5 joueurs (une ligne par plume : rouge, jaune, verte, bleue, blanche).

### Recette de test manuelle

1. `cd next-app && pnpm install && pnpm dev`
2. Ouvrir [http://localhost:3000](http://localhost:3000)
3. Importer `fixtures/sample-plumes.xlsx`
4. Vérifier l’aperçu : 5 lignes, aucune erreur
5. Choisir une date, cliquer **Générer le PDF**
6. Vérifier le PDF téléchargé :
   - 5 pages paysage A4
   - une variante visuelle par plume
   - noms en majuscules, date en français
   - coachs et responsable issus de `config/*.md`
7. Modifier `config/coachs.md`, redémarrer le serveur, régénérer : les noms doivent changer

### Régénérer le fichier

```bash
cd next-app
node --input-type=module -e "
import * as XLSX from 'xlsx';
const rows = [/* voir script dans l'historique git ou README racine */];
"
```

Ou recréer manuellement avec les colonnes documentées dans le README racine.
