# /commit

> Commande pour sauvegarder mon workspace avec git.

---

## Mission

Quand je lance `/commit`, exécute la séquence suivante :

### Étape 1 : Vérifier l'état du dépôt

Lance `git status` pour voir ce qui a changé depuis le dernier commit.

- S'il n'y a aucun changement, dis-le moi simplement et arrête-toi là.
- Vérifie que rien dans `secrets/` (à part `.gitignore`) n'apparaît comme fichier à ajouter. Si c'est le cas, alerte-moi avant de continuer, ne l'ajoute jamais.

### Étape 2 : Résumer les changements

Présente-moi une liste claire de ce qui a changé (fichiers modifiés, ajoutés, supprimés), avec `git diff` si utile pour comprendre la nature des changements.

### Étape 3 : Proposer un message de commit

Rédige un message de commit court (une ligne, en français, qui explique le pourquoi plutôt que le quoi) et présente-le moi :

```
Voici ce que je vais sauvegarder :
- [résumé des changements]

Message de commit proposé : "[message]"

Ça te va, ou tu préfères reformuler ?
```

### Étape 4 : Exécuter

Une fois validé :
1. `git add -A` (sauf ce qui est dans `.gitignore`)
2. `git commit -m "[message validé]"`

### Étape 5 : Confirmer

```
C'est sauvegardé. Commit : [hash court] "[message]"
```

---

## Règles importantes

- Ne jamais committer le contenu de `secrets/` (seul `.gitignore` doit y être suivi)
- Ne jamais faire de `push` sans que je le demande explicitement
- Ne jamais utiliser `git config`, `git reset --hard`, ou toute commande destructive
- Toujours me montrer le message de commit avant de l'exécuter, jamais de commit silencieux
- Pas de tirets longs (em dashes) dans les écritures
- Communication en français systématique
