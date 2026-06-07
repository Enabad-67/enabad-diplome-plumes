# Initialisation `next-app`

Ce dossier accueille l’application Next.js. L’agent **ne lance pas** l’init à votre place.

## État actuel

**shadcn** est déjà initialisé (preset b0, template Next). Enchaîner directement avec :

```bash
cd next-app
pnpm install
pnpm dev
```

## Réinit complète (développeur)

Depuis la racine du dépôt :

```bash
cd next-app
pnpm dlx shadcn@latest init --preset b0 --template next
```

## Rappel agents

Voir [AGENTS.md](../AGENTS.md) à la racine du dépôt.
