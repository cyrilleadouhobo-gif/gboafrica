const { PrismaClient } = require('@prisma/client');
const { PrismaLibSQL } = require('@prisma/adapter-libsql');
const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');

// Même adaptateur que lib/db.js : sans lui, ce script écrirait dans le fichier SQLite
// local (DATABASE_URL) au lieu de la vraie base Turso utilisée par l'app en dev et prod.
const libsql = createClient({ url: process.env.TURSO_DATABASE_URL });
const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

// Pas de coachs ni d'avis de démo ici : ce script écrit directement sur la vraie base
// Turso (voir l'adaptateur ci-dessus), jamais sur un fichier local — toute donnée
// placeholder ajoutée ici finit en production. Les coachs et avis réels se gèrent depuis
// le back-office.

async function main() {
  await seedAdminUser({
    label: 'admin',
    role: 'admin',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    emailVar: 'ADMIN_EMAIL',
    passwordVar: 'ADMIN_PASSWORD',
  });

  // Le Cabinet Médico-Nutrition : un seul compte partagé côté partenaire (décidé avec
  // Cyrille — à eux de gérer en interne qui l'utilise), scope limité par role dans
  // lib/auth.js (getCurrentNutritionPartner) à /partenaires/nutrition et /api/partner/*.
  await seedAdminUser({
    label: 'partenaire nutrition',
    role: 'nutrition_partner',
    email: process.env.NUTRITION_PARTNER_EMAIL,
    password: process.env.NUTRITION_PARTNER_PASSWORD,
    emailVar: 'NUTRITION_PARTNER_EMAIL',
    passwordVar: 'NUTRITION_PARTNER_PASSWORD',
  });
}

async function seedAdminUser({ label, role, email, password, emailVar, passwordVar }) {
  if (!email || !password) {
    console.warn(
      `\n[seed] ${emailVar} / ${passwordVar} absents de l'environnement — aucun compte ${label} créé.\n` +
        `        Ajoute-les à .env puis relance \`npm run db:seed\` pour créer ce compte.\n`
    );
    return;
  }
  if (password.length < 12) {
    throw new Error(`[seed] ${passwordVar} doit faire au moins 12 caractères.`);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, role },
    create: { email, passwordHash, role },
  });
  console.log(`Compte ${label} prêt : ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
