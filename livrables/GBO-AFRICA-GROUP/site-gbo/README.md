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

## Espace partenaire nutrition

Le Centre Médico Nutrition (partenaire externe pour le suivi nutritionnel) a son propre
espace, cloisonné du back-office GBÔ :

- `/partenaires/nutrition/login` puis `/partenaires/nutrition` — un seul compte partagé
  (`NUTRITION_PARTNER_EMAIL` / `NUTRITION_PARTNER_PASSWORD` dans `.env`, créé par
  `npm run db:seed`, décision prise avec Cyrille de ne pas gérer plusieurs comptes pour
  l'instant).
- Réutilise l'infrastructure d'authentification existante (`AdminUser`, sessions,
  bcrypt) via un `role` (`admin` vs `nutrition_partner`) — voir `getCurrentStaffAdmin()`
  et `getCurrentNutritionPartner()` dans `lib/auth.js`. **Toute route `/api/admin/*` doit
  utiliser `getCurrentStaffAdmin()`, jamais `getCurrentAdmin()` seul**, sous peine de
  laisser une session partenaire atteindre le CRM complet.
- Le partenaire ne voit jamais les prospects `Lead` directement : un admin doit d'abord
  transmettre explicitement (`POST /api/admin/leads/[id]/nutrition-handoff`, bouton
  « Transmettre au Centre Médico Nutrition » dans le détail prospect), ce qui crée un
  `NutritionFollowUp` — c'est cette table, pas `Lead`, que l'espace partenaire interroge.
  Seuls nom, contact et objectif nutritionnel sont exposés (minimisation des données).

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

## Version de Next.js

Le projet tourne sur **Next.js 16.3.0 / React 19.2.8** (migré depuis la 14.2, `npm audit`
à 0 vulnérabilité). Points à connaître pour qui reprend ce code :

- `params`, `cookies()` et `headers()` sont désormais asynchrones (`await params`,
  `await cookies()`) — voir `lib/auth.js`, `app/layout.js`, les routes API sous
  `app/api/admin/leads/[id]/*` et les pages `app/legal/[slug]`, `app/poles/[slug]`
  (cette dernière étant un composant client, l'unwrap se fait via `React.use(params)`).
- Le fichier `middleware.js` a été renommé `proxy.js` (convention Next 16) ; la fonction
  exportée s'appelle `proxy` au lieu de `middleware`.
- `AGENTS.md` / `CLAUDE.md` à la racine du projet sont générés automatiquement par
  `next dev` (convention officielle pour les agents IA) — ne pas les modifier à la main,
  ils sont recréés à chaque démarrage du serveur de dev.

## SEO technique & cookies

- `app/sitemap.js` et `app/robots.js` génèrent `/sitemap.xml` et `/robots.txt`
  automatiquement (routes statiques + `/poles/[slug]` + `/legal/[slug]`), `/admin` et
  `/api` sont exclus du crawl.
- Données structurées Schema.org (`Organization`) injectées dans `app/layout.js`.
- Bandeau cookies (`components/CookieBanner.js`) : le site ne dépose aujourd'hui que le
  cookie de session admin (strictement nécessaire, pas de consentement légalement requis),
  le bandeau et le flag `localStorage` (`gbo_cookie_consent`) sont en place par
  anticipation, pour pouvoir conditionner de futurs scripts d'audience/marketing.
- Tout cela dépend de `SITE_URL` (voir `.env.example`) pour générer des URLs absolues
  correctes — à renseigner avant le déploiement, sans quoi ça retombe sur
  `http://localhost:5300`.

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
6. Domaine décidé : **gboafrica.com** (sans accent — `gbôafrica.com` nécessiterait un
   encodage IDN/punycode mal supporté par certains clients mail/navigateurs, et le code
   utilise déjà la forme sans accent pour les adresses e-mail). Reste à faire : enregistrer
   le nom de domaine, puis définir `SITE_URL=https://www.gboafrica.com` en production
   (déjà en exemple dans `.env.example`).
