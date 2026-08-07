# GBÔ AFRICA GROUP — Plateforme digitale

Implémentation Next.js du prototype Claude Design, avec un vrai back-end (Prisma +
SQLite), une authentification admin sécurisée, et les protections listées ci-dessous.

## Démarrer en local

```bash
npm install
cp .env.example .env   # puis renseigner SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run db:migrate      # crée la base SQLite locale
npm run db:seed         # crée les coachs + le premier compte admin
npm run dev
```

Le back-office est sur `/admin` (redirige vers `/admin/login` si non connecté).

## Sécurité — ce qui est en place

- **Authentification admin** : mot de passe hashé (bcrypt, coût 12), session signée
  stockée en base (révocable), cookie `httpOnly` + `Secure` (en production) +
  `SameSite=Strict`, expiration 12h.
- **Autorisation en profondeur** : le middleware (Edge) ne fait qu'un contrôle rapide
  de présence du cookie ; la vérification cryptographique réelle contre la base a
  toujours lieu côté serveur (Node.js) dans `app/admin/(dashboard)/layout.js` et dans
  chaque route `/api/admin/*`. Ne jamais retirer ce deuxième contrôle.
- **En-têtes de sécurité** sur toutes les réponses : CSP stricte (nonce par requête,
  `strict-dynamic` sur les scripts), `X-Frame-Options: DENY`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.
- **Validation stricte** de toutes les entrées (zod) côté serveur — jamais uniquement
  côté client.
- **Anti-abus** : rate limiting par IP sur tous les endpoints publics (5 à 8 requêtes /
  10 min selon la sensibilité, 8 tentatives / 15 min sur le login), champ honeypot sur
  tous les formulaires publics.
- **Anti-CSRF** : vérification Origin/Host sur toutes les routes qui modifient des
  données.
- **Journal d'audit** (`AuditLog`) : connexions, échecs de connexion, changements de
  statut de prospect, attribution de coach.
- **Secrets** : jamais en dur dans le code, jamais commités (`.env` est gitignored).

## Point de vigilance : version de Next.js

`npm audit` remonte des failles connues (DoS, cache poisoning, XSS sur les nonces CSP)
sur la ligne Next.js 14 — nous sommes déjà sur la dernière version stable de la 14.x
(14.2.35), donc aucun correctif ne peut venir d'une simple mise à jour mineure. Les
corriger entièrement demande de passer à Next.js 15/16, ce qui change l'API de
`cookies()`/`headers()` (passage en asynchrone) dans plusieurs fichiers (`lib/auth.js`,
`app/layout.js`, `app/admin/(dashboard)/layout.js`) — une vraie migration, pas une
mise à jour anodine, donc volontairement pas faite sans validation explicite. Beaucoup
de ces failles visent des fonctionnalités non utilisées ici (Image Optimizer, i18n du
Pages Router, serveur personnalisé, WebSocket) donc le risque réel est réduit, mais ce
n'est pas nul. À planifier avant une mise en production sérieuse.

## Ce qui reste bloqué sur de vrais comptes externes (pas du code)

- **E-mails transactionnels** (`lib/email.js`) : sans `RESEND_API_KEY` + `EMAIL_FROM`,
  les e-mails sont journalisés côté serveur, pas envoyés. Créer un compte gratuit sur
  resend.com pour activer.
- **WhatsApp Business** (`lib/whatsapp.js`) : nécessite une vérification d'entreprise
  Meta et des templates de message approuvés. Non implémenté par nécessité.
- **Paiement mobile money** (Club Premium, CinetPay ou équivalent) : nécessite un
  compte marchand. Pas encore construit — le parcours d'abonnement n'existe pas dans
  cette V1.

## Avant un vrai déploiement en production

1. Générer un nouveau `SESSION_SECRET` et un mot de passe admin fort — ne jamais
   réutiliser les valeurs de `.env` de développement.
2. Passer la base de `sqlite` à `postgresql` dans `prisma/schema.prisma` (SQLite est un
   fichier local, incompatible avec un hébergement serverless comme Vercel) : provisionner
   un Postgres géré (Neon, Supabase…), définir `DATABASE_URL`, puis `npx prisma migrate deploy`.
3. Brancher un vrai fournisseur d'e-mail (voir ci-dessus).
4. Remplacer les visuels `ImageSlot` par les vraies photos GBÔ.
5. Faire relire les pages légales (`data/legal.js`) par un avocat inscrit au barreau —
   plusieurs sections portent encore la mention `[À COMPLÉTER]` du PRD.
