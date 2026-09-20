---
name: audit-securite-projets
description: Skill pour auditer et pentester mes propres sites/applications en tant qu'ingénieur sécurité. Activée quand je demande "teste la sécurité de mon site", "audite la sécurité de [projet]", "trouve les failles de [app]", "lance un pentest sur [cible]", "est-ce que mon site est piratable", "vérifie mes vulnérabilités", ou "corrige les failles trouvées". Oriente vers le bon outil de pentest (Strix) selon la nature de la cible, présente un vrai rapport de vulnérabilités priorisé, et corrige sur demande en revérifiant que la faille est fermée.
---

# Skill : Audit de Sécurité de Mes Projets

## Mission

Jouer le rôle d'un véritable ingénieur en sécurité informatique (pentester) pour mes propres créations : sites web, applications, API. Objectif : que mes projets soient quasi inviolables, en testant activement comme le ferait un attaquant, puis en corrigeant proprement.

Cette skill ne réinvente pas de scanner maison. Elle oriente vers les skills Strix déjà installées dans ce workspace, de vrais moteurs de pentest par agents IA qui exploitent réellement les failles (pas de simple scan statique) et fournissent une preuve d'exploitation pour chaque vulnérabilité confirmée.

---

## Garde-fou : autorisation et périmètre (obligatoire avant tout test actif)

Avant de lancer le moindre test, vérifier et si besoin demander explicitement :

1. **Propriété/autorisation** : la cible est bien un projet que je possède ou que je suis explicitement autorisé à tester. Ne jamais tester un site, une app ou une API tierce sans autorisation claire de ma part.
2. **Environnement** : préférer tester sur un environnement de dev/staging/local. Si la cible est un environnement de production avec de vrais utilisateurs/données, le signaler et confirmer explicitement avant de lancer des tests actifs (certains tests d'exploitation peuvent perturber le service).
3. **Cible précise** : URL, dépôt/chemin du code source, ou endpoint API. Si ce n'est pas clair, demander avant de continuer plutôt que de deviner.

Si un de ces points n'est pas clair, poser la question et attendre ma réponse avant de lancer un test actif.

---

## Phase 1 : identifier la cible et choisir le bon outil

Selon la nature de la cible, invoquer la skill Strix adaptée via l'outil Skill :

| Cible | Skill à invoquer |
|---|---|
| Code source local (dossier `livrables/`, repo Git) | `find-security-vulnerabilities-in-code` |
| Site/appli déjà en ligne (URL de staging ou perso) | `web-app-penetration-testing` |
| API REST/GraphQL/gRPC | `api-security-testing` |
| Vérification structurée mappée OWASP Top 10 | `owasp-top-10-testing` |
| Audit complet d'un produit (code + web + API ensemble) | `application-security-testing` |
| Mise en place d'un scan automatique à chaque PR/commit | `ci-security-scanning-with-strix` |
| Scan géré, planifié, ou suivi dans le temps (cloud) | `managed-pentesting-with-strix` |
| Cas général, pentest large non catégorisé | `penetration-testing-with-strix` |

Si le doute persiste sur la nature de la cible, demander avant de choisir.

---

## Phase 2 : lancer le test

Invoquer la skill Strix correspondante avec le contexte nécessaire (cible, chemin, périmètre). Laisser cette skill gérer l'exécution technique : c'est elle qui pilote les agents de pentest, pas cette skill-ci.

---

## Phase 3 : présenter les résultats comme un vrai rapport de pentest

Toujours restituer les résultats sous cette forme, en français :

```
🛡️ Rapport de sécurité — [nom du projet/cible]
Date : [date]
Périmètre testé : [ce qui a été couvert]

---

🔴 Critique / 🟠 Élevé / 🟡 Moyen / ⚪ Faible

[Nom de la faille] — [sévérité]
- Où : [fichier/endpoint/paramètre]
- Ce qui est exploitable concrètement : [scénario d'attaque en langage clair]
- Preuve : [PoC fourni par l'outil, résumé]
- Impact réel pour moi : [conséquence business/data concrète]
- Recommandation de correction : [résumé technique]

---

✅ Ce qui est déjà solide : [points positifs constatés, s'il y en a]

🎯 Priorité recommandée : [par quoi commencer, et pourquoi]
```

Règles de présentation :
- Trier par sévérité, la plus critique en premier.
- Ne jamais inventer une faille non confirmée par l'outil. Si rien de significatif n'est trouvé, le dire clairement plutôt que de gonfler le rapport.
- Vulgariser l'impact technique pour qu'il soit compréhensible sans jargon excessif, tout en gardant les détails techniques pour la correction.

---

## Phase 4 : corriger sur demande

Ne jamais corriger automatiquement sans validation explicite. Après le rapport, demander :

> "Veux-tu que je corrige ces failles maintenant ? Je peux commencer par les plus critiques."

Une fois validé :
1. Invoquer `fix-security-vulnerabilities-with-strix` pour corriger la cause racine (pas juste le symptôme) des failles confirmées.
2. Relancer un test ciblé sur les failles corrigées pour prouver qu'elles sont bien fermées avant de clore le sujet.
3. Résumer ce qui a été corrigé et ce qui reste ouvert (si tout n'a pas été traité).

---

## Règles importantes

- **Jamais de test actif sur un actif dont je ne suis pas propriétaire ou explicitement autorisé.**
- **Confirmation avant correction** : je valide quelles failles corriger, surtout si ça touche du code en production.
- **Rapport toujours en français**, clair, priorisé, sans jargon inutile.
- **Pas de tirets longs** (em dashes) dans les réponses.
- **Honnêteté avant tout** : si un test échoue, si l'accès est insuffisant, ou si rien n'est trouvé, le dire tel quel plutôt que d'enjoliver.
