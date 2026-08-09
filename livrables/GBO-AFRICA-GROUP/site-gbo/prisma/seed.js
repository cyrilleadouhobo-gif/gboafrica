const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const COACHES = [
  { name: 'Coach Awa', spec: 'Prénatal / Postnatal', zones: 'Cocody, Plateau', dispo: 'DISPONIBLE', clients: 8 },
  { name: 'Coach Yao', spec: 'Perte de poids, Renfo', zones: 'Marcory, Treichville', dispo: 'COMPLET', clients: 12 },
  { name: 'Coach Grace', spec: 'Senior, Sport santé', zones: 'Cocody, Riviera', dispo: 'DISPONIBLE', clients: 6 },
  { name: 'Coach Ibrahim', spec: 'Prise de masse, Perf', zones: 'Yopougon, Abobo', dispo: 'DISPONIBLE', clients: 9 },
];

// Données de démo pour tester le flux de modération admin en local — volontairement
// PENDING (jamais visibles publiquement tant qu'un admin ne les valide pas). À ne pas
// reproduire sur la base de production : les vrais avis viennent du formulaire /avis.
const DEMO_REVIEWS = [
  { authorName: 'Aïcha B.', context: 'Membre · Yopougon', rating: 5, comment: "Coach au top, très à l'écoute. Je recommande vivement.", status: 'PENDING' },
  { authorName: 'Kader T.', context: 'Membre · Marcory', rating: 4, comment: 'Bon accompagnement, les créneaux pourraient être un peu plus flexibles.', status: 'PENDING' },
];

async function main() {
  for (const coach of COACHES) {
    await prisma.coach.upsert({ where: { name: coach.name }, update: coach, create: coach });
  }
  console.log(`Coachs : ${COACHES.length} enregistrés.`);

  if ((await prisma.review.count()) === 0) {
    await prisma.review.createMany({ data: DEMO_REVIEWS });
    console.log(`Avis de démo : ${DEMO_REVIEWS.length} créés (en attente de modération).`);
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn(
      "\n[seed] ADMIN_EMAIL / ADMIN_PASSWORD absents de l'environnement — aucun compte admin créé.\n" +
        '        Ajoute-les à .env puis relance `npm run db:seed` pour créer le premier compte back-office.\n'
    );
    return;
  }
  if (password.length < 12) {
    throw new Error('[seed] ADMIN_PASSWORD doit faire au moins 12 caractères.');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, role: 'admin' },
  });
  console.log(`Compte admin prêt : ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
