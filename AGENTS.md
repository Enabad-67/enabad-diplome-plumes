# Agent rules

Règles pour les agents Cursor travaillant sur ce dépôt vibe-coding.

## Contexte du projet

Application **ENA BAD** (Entente Nord Alsace Badminton) pour générer des **certificats PASSBAD** (diplômes « plume ») au format **A4 paysage**, à partir d’un fichier **Excel** listant les jeunes ayant validé une plume.

- **Entrée** : Excel avec colonnes `Club`, `Sexe`, `Nom d'usage`, `Prénom`, `Licence`, `Année de naissance`, `Email de contact`, `Catégorie`, `Meilleur plume`, `Plume à passer`.
- **Sortie** : un certificat par ligne (ou par jeune concerné), visuel aligné sur les maquettes selon la valeur de **Plume à passer** (rouge, jaune, verte, bleue, etc.).
- **Assets** : logos dans `assets/` à la racine (`ffbad.png`, logo ENABAD, logos clubs en pied de page). Ne pas déplacer sans mettre à jour les chemins documentés dans le README.
- **Paramétrage** : liste des coachs et responsable ENABAD lus depuis `config/*.md` (évolutif sans redeploy de code métier).
- **MVP** : import Excel → prévisualisation / export PDF (ou impression navigateur) ; pas de base de données ni d’authentification pour l’instant.
- **Hors scope MVP** : envoi d’e-mails automatiques, historique multi-saisons, comptes utilisateurs, back-office club.

Référence visuelle : captures dans le dépôt / discussion produit ; PDF exemple `assets/Diplomes plumes 2025.pdf`.

## MCP et documentation

- Utiliser le serveur MCP **user-context7** pour vérifier les versions de bibliothèques et les APIs avant d’implémenter du code dépendant d’un framework.
- Utiliser le serveur MCP **user-shadcn** pour concevoir ou étendre les composants UI selon les conventions shadcn.

## Exécution des commandes

Ne pas exécuter depuis le contexte agent les commandes de gestionnaire de paquets ou système, notamment :

- `pnpm`, `npm`, `yarn`, `tsx`
- `docker`, `git`
- et outils similaires

Laisser ces opérations au développeur ou à l’environnement dédié.

## Certificats et données

- Le libellé et la **couleur / mise en page** du certificat dépendent de **Plume à passer** (pas de « Meilleur plume » pour le visuel du diplôme, sauf besoin métier explicite).
- Nom affiché : combiner **Prénom** + **Nom d'usage** sur la ligne « Au joueur ».
- La date du diplôme peut être la date du jour à la génération, sauf spécification contraire de l’utilisateur.
- Les fichiers `config/coachs.md` et `config/responsable.md` sont la source de vérité pour les signatures ; ne pas hardcoder ces noms dans les composants.

## Structure du code

- Code applicatif sous **`next-app/`** sauf indication contraire.
- Réutiliser ou copier les assets depuis **`assets/`** (racine) vers `next-app/public/` si nécessaire pour Next.js — documenter le choix dans le README lors d’un déplacement.
