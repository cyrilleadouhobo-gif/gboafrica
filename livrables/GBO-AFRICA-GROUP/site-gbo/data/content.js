export const VALUES = [
  { n: '01', title: 'Accessibilité', desc: 'Le sport pour tous, partout, à chaque étape de la vie.' },
  { n: '02', title: 'Excellence', desc: 'Un référentiel qualité exigeant sur chaque prestation.' },
  { n: '03', title: 'Inclusion', desc: 'Des programmes adaptés à chaque profil et chaque besoin.' },
  { n: '04', title: 'Proximité', desc: 'Un accompagnement humain, à domicile, en salle ou en entreprise.' },
  { n: '05', title: 'Impact', desc: "Un mode de vie plus actif, plus sain, durablement." },
  { n: '06', title: 'Communauté', desc: 'Un collectif qui motive, soutient et fait progresser.' },
];

export const METHOD_STEPS = [
  { n: '1', title: 'Évaluation', desc: "Bilan des objectifs, de la condition physique, des habitudes et de l'éligibilité aux programmes spécifiques." },
  { n: '2', title: 'Programme personnalisé', desc: 'Un plan adapté au profil, aux objectifs, au niveau et au lieu de pratique.' },
  { n: '3', title: 'Coaching', desc: 'Mise en œuvre avec un coach GBÔ sélectionné selon expertise et zone.' },
  { n: '4', title: 'Suivi', desc: "Évaluation régulière des progrès, ajustement et accompagnement motivationnel." },
  { n: '5', title: 'Transformation', desc: "Atteinte progressive des objectifs et adoption durable d'un mode de vie plus sain." },
];

export const TRANSFORMATIONS = [
  { id: 'tr1', name: 'Awa, 34 ans', detail: 'Remise en forme · 4 mois', ph: 'Avant / après (avec consentement)' },
  { id: 'tr2', name: 'Serge, 41 ans', detail: 'Prise de masse · 6 mois', ph: 'Avant / après (avec consentement)' },
  { id: 'tr3', name: 'Fatou, 29 ans', detail: 'Postnatal · 3 mois', ph: 'Avant / après (avec consentement)' },
  { id: 'tr4', name: 'Ismaël, 63 ans', detail: 'Mobilité senior · 5 mois', ph: 'Avant / après (avec consentement)' },
];

export const TESTIMONIALS = [
  { id: 'ts1', quote: "« J'ai retrouvé de l'énergie et une vraie régularité. Le coach s'adapte à mon emploi du temps chargé. »", name: 'Awa K.', role: 'Membre · Cocody' },
  { id: 'ts2', quote: "« Le programme entreprise a changé l'ambiance de nos équipes. Moins d'absentéisme, plus de cohésion. »", name: 'Mme Koffi', role: 'DRH · Plateau' },
  { id: 'ts3', quote: '« Être coach GBÔ, c\'est un cadre exigeant et une vraie communauté de professionnels. »', name: 'Coach Grace', role: 'Coach partenaire' },
];

export const PARTNERS = ['PARTENAIRE', 'PARTENAIRE', 'PARTENAIRE', 'PARTENAIRE', 'PARTENAIRE', 'PARTENAIRE'];
export const SOCIALS = ['IG', 'FB', 'in', 'YT'];

export const ARTICLES = [
  { id: 'a1', cat: 'Nutrition', read: '5 min', title: 'Bien manger à Abidjan : 7 réflexes simples', excerpt: 'Des choix concrets, adaptés au marché local, pour soutenir vos objectifs.' },
  { id: 'a2', cat: 'Prénatal', read: '6 min', title: 'Bouger enceinte, en toute sécurité', excerpt: 'Ce que dit la prudence et comment un coach adapte chaque séance.' },
  { id: 'a3', cat: 'Entreprise', read: '4 min', title: 'Le sport en entreprise, vrai levier de performance', excerpt: 'Pourquoi les organisations investissent dans le bien-être des équipes.' },
  { id: 'a4', cat: 'Senior', read: '5 min', title: 'Rester actif après 60 ans : par où commencer', excerpt: "Mobilité, équilibre, force : les priorités d'un programme senior." },
  { id: 'a5', cat: 'Fitness', read: '7 min', title: 'Débuter la musculation sans se blesser', excerpt: 'Les fondamentaux pour progresser durablement et sereinement.' },
  { id: 'a6', cat: 'Bien-être', read: '4 min', title: 'Gérer le stress par le mouvement', excerpt: "Comment l'activité physique régule l'humeur et le sommeil." },
];
export const BLOG_PREVIEW = ARTICLES.slice(0, 3).map(({ id, cat, read, title, excerpt }) => ({ id: 'bp-' + id, cat, read, title, excerpt }));
export const BLOG_CATS = ['Tous', 'Fitness', 'Nutrition', 'Santé', 'Lifestyle', 'Entreprise', 'Prénatal', 'Senior'];

export const NEWS_ITEMS = [
  { id: 'n1', date: 'Août 2026', tag: 'Marque', title: 'GBÔ AFRICA GROUP dévoile sa plateforme digitale officielle' },
  { id: 'n2', date: 'Juillet 2026', tag: 'Pôle', title: 'GBÔ Fitness ouvre les inscriptions à Abidjan' },
  { id: 'n3', date: 'Juin 2026', tag: 'Communauté', title: 'Lancement du Club GBÔ et de son programme de points' },
];

export const JOBS = [
  { t: 'Coach sportif certifié', loc: 'Abidjan · Terrain', type: 'Réseau partenaire' },
  { t: 'Conseiller relation client', loc: 'Plateau · Bureau', type: 'Temps plein' },
  { t: 'Coach prénatal / postnatal', loc: 'Cocody · Terrain', type: 'Réseau partenaire' },
  { t: 'Community manager', loc: 'Abidjan · Hybride', type: 'Temps plein' },
];

export const GYM_ECOSYSTEM_ADVANTAGES = [
  { icon: '💻', t: 'Digitalisation', d: 'Accédez à une offre préférentielle sur E-Gym, sous réserve des conditions négociées avec le partenaire.' },
  { icon: '👥', t: 'Nouveaux clients', d: 'GBÔ peut orienter vers votre salle des personnes recherchant une solution de fitness dans votre zone.' },
  { icon: '📍', t: 'Visibilité', d: 'Votre salle peut être référencée dans le réseau de partenaires GBÔ et être valorisée auprès de notre communauté.' },
  { icon: '🤝', t: 'Opportunités commerciales', d: 'Participez aux campagnes, challenges et événements organisés par GBÔ.' },
  { icon: '🏆', t: 'Communauté', d: "Intégrez un réseau de salles partageant une ambition commune autour du développement du fitness en Côte d'Ivoire." },
];

export const GYM_MANAGER_BENEFITS = [
  { n: '1', t: 'Des prospects', d: 'Des clients recherchant une solution de fitness peuvent être orientés vers votre établissement.' },
  { n: '2', t: 'Une solution de gestion', d: 'Bénéficiez de conditions préférentielles négociées sur E-Gym.' },
  { n: '3', t: 'De la visibilité', d: 'Votre salle peut être intégrée au réseau GBÔ et présentée à notre communauté.' },
  { n: '4', t: 'Des opportunités', d: 'Participez à des événements, challenges et opérations communes.' },
];

export const GYM_CHALLENGES = [
  { t: 'Attirer', d: 'Générer de la visibilité et attirer de nouveaux prospects.' },
  { t: 'Convertir', d: "Transformer l'intérêt en nouveaux adhérents." },
  { t: 'Gérer', d: 'Structurer les adhérents, abonnements, paiements et activité.' },
  { t: 'Fidéliser', d: 'Créer une expérience qui donne envie de rester.' },
  { t: 'Renforcer', d: 'Disposer des bonnes compétences et ressources humaines.' },
  { t: 'Développer', d: 'Créer de nouvelles opportunités de croissance.' },
];

export const GYM_PILLARS = [
  {
    n: '01',
    lever: 'Gérer',
    title: 'Pilotez votre salle avec plus de visibilité.',
    product: 'E-Gym',
    detail: 'Gestion des adhérents · Abonnements · Paiements · Dépenses · Stock · Statistiques',
    cta: 'Découvrir E-Gym',
    href: '/devenir-salle-partenaire',
  },
  {
    n: '02',
    lever: 'Renforcer',
    title: 'Les bonnes ressources au bon moment.',
    product: 'GBÔ Talent',
    detail: 'Accédez à un réseau de coachs et de talents pour renforcer les capacités de votre salle.',
    cta: 'Découvrir GBÔ Talent',
    href: '/poles/talent',
  },
  {
    n: '03',
    lever: 'Développer',
    title: 'Donnez plus de visibilité à votre salle.',
    product: null,
    detail: "Visibilité · Acquisition · Orientation de clients · Développement commercial — GBÔ vous aide à accroître votre visibilité, créer des opportunités d'acquisition et orienter des prospects vers les salles partenaires lorsque cela correspond à leur besoin.",
    cta: 'Développer ma salle',
    href: '/devenir-salle-partenaire',
  },
  {
    n: '04',
    lever: 'Animer',
    title: "Créez une salle où l'on a envie de revenir.",
    product: null,
    detail: "Challenges · Événements · Animations · Communauté — Créez des expériences qui renforcent l'engagement de vos adhérents et donnent vie à votre communauté.",
    cta: 'Découvrir GBÔ Events',
    href: '/poles/events',
  },
];

export const GYM_COMPLEMENTARY_SERVICES = [
  { t: 'Formation', d: 'Développez les compétences de vos équipes.' },
  { t: 'Marketing', d: 'Renforcez votre communication et votre visibilité.' },
  { t: 'Nutrition', d: 'Ajoutez une dimension nutritionnelle à votre offre.' },
  { t: 'Conseil', d: 'Bénéficiez d\'un accompagnement adapté à vos problématiques.' },
  { t: 'Shop', d: 'Équipez votre salle et développez votre offre produits.' },
];

export const GYM_HOW_IT_WORKS = [
  { n: '01', t: 'Vous nous parlez de votre besoin' },
  { n: '02', t: 'Nous identifions les leviers à activer' },
  { n: '03', t: 'Nous mobilisons les solutions GBÔ' },
  { n: '04', t: 'Nous vous accompagnons dans leur mise en œuvre' },
];

export const PARTNER_TYPES = [
  { t: 'Salles & espaces', d: 'Mettez vos infrastructures au service de la communauté GBÔ.' },
  { t: 'Marques & nutrition', d: 'Distribuez vos produits via le futur GBÔ Shop.' },
  { t: 'Entreprises & institutions', d: 'Programmes bien-être et événements sur mesure.' },
  { t: 'Professionnels de santé', d: 'Nutritionnistes et praticiens partenaires du parcours.' },
];

export const CORPORATE_SOLUTIONS = [
  { t: 'Coaching en entreprise', d: 'Séances individuelles & collectives, sur site ou à distance.' },
  { t: 'Team building sportif', d: 'Renforcer la cohésion par le mouvement et le défi partagé.' },
  { t: 'Challenges inter-équipes', d: 'Compétitions internes et inter-entreprises motivantes.' },
  { t: 'Prévention santé', d: 'Lutte contre la sédentarité, gestion du stress, prévention des TMS.' },
  { t: 'Fitness en entreprise', d: 'Sessions régulières intégrées au rythme de vos équipes.' },
  { t: 'Événements corporate', d: 'Journées bien-être et temps forts sur mesure.' },
];

export const FAQ_GROUPS = [
  {
    cat: 'Fitness',
    items: [
      { q: 'Faut-il créer un compte pour commencer ?', a: 'Non. Le tunnel Particulier ne demande aucun compte : vous laissez vos coordonnées et un conseiller vous rappelle.' },
      { q: 'Où se déroulent les séances ?', a: 'À domicile, en salle partenaire, en entreprise ou en extérieur, selon votre programme.' },
      { q: 'Le premier bilan est-il payant ?', a: 'Le premier bilan permet d\'évaluer vos objectifs et votre condition. Les modalités vous sont précisées par votre conseiller.' },
    ],
  },
  {
    cat: 'Club & Premium',
    items: [
      { q: 'Combien coûte le Club Premium ?', a: '2 000 FCFA / mois. Résiliable à tout moment, effet à l\'échéance en cours.' },
      { q: "Qu'apporte le niveau gratuit ?", a: 'Accès à la communauté et à des contenus sélectionnés, sans engagement.' },
    ],
  },
  {
    cat: 'Paiement',
    items: [
      { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Mobile money (Wave, Orange Money, MTN MoMo, Moov Money) et carte bancaire, via un prestataire agréé.' },
      { q: 'Le paiement est-il sécurisé ?', a: 'Oui. Les paiements sont confirmés côté serveur via des webhooks signés ; devise XOF (FCFA).' },
    ],
  },
  {
    cat: 'Données',
    items: [
      { q: 'Que faites-vous de mes données ?', a: 'Elles servent uniquement à traiter votre demande. Conformité Loi n° 2013-450 / ARTCI, minimisation et droit à la suppression.' },
      { q: 'Comment exercer mes droits ?', a: "Écrivez à privacy@gboafrica.com pour l'accès, la rectification ou la suppression." },
    ],
  },
];

export const NEXT_STEPS = [
  { n: '5', t: 'Création du prospect', d: 'Votre demande entre automatiquement dans le CRM GBÔ (statut : Nouveau).' },
  { n: '6', t: 'Qualification', d: 'Un conseiller vous rappelle pour affiner votre besoin et votre éligibilité.' },
  { n: '7', t: 'Attribution du coach', d: 'Un coach est sélectionné selon sa compétence, sa zone et ses disponibilités.' },
  { n: '8', t: 'Présentation du coach', d: 'Vous recevez la présentation et les coordonnées de votre coach.' },
  { n: '9', t: 'Premier bilan', d: "Votre première séance / bilan a lieu, et l'accompagnement démarre." },
];

export const PROFILE_CARDS = [
  { key: 'adulte', label: 'Adulte', desc: 'Pour toute personne souhaitant améliorer sa condition physique, sa santé ou ses performances.' },
  { key: 'femme', label: 'Femme', desc: 'Des programmes adaptés aux besoins spécifiques des femmes.' },
  { key: 'enceinte', label: 'Femme enceinte', desc: 'Des séances conçues pour accompagner la grossesse en toute sécurité.' },
  { key: 'maman', label: 'Nouvelle maman', desc: "Reprenez progressivement une activité physique après l'accouchement." },
  { key: 'senior', label: 'Senior', desc: 'Restez actif, autonome et en bonne santé à chaque étape de la vie.' },
];

const PROFILE_LABELS = { adulte: 'Adulte', femme: 'Femme', enceinte: 'Femme enceinte', maman: 'Nouvelle maman', senior: 'Senior' };
export function profileLabel(k) {
  return PROFILE_LABELS[k] || k;
}

const OBJECTIVES_BY_PROFILE = {
  adulte: ['Perdre du poids', 'Prendre du muscle', 'Se remettre en forme', 'Renforcer son corps', 'Améliorer ses performances', 'Être en meilleure santé', 'Autre'],
  femme: ['Perdre du poids', 'Tonifier et sculpter sa silhouette', 'Se remettre en forme', 'Renforcer son corps', 'Améliorer son bien-être', 'Être en meilleure santé', 'Autre'],
  enceinte: ['Rester active pendant la grossesse', 'Soulager les douleurs liées à la grossesse', 'Améliorer sa mobilité', 'Préparer son corps à l\'accouchement', 'Se détendre et mieux gérer son stress', 'Autre'],
  maman: ['Reprendre une activité physique en douceur', 'Retrouver ma condition physique', 'Tonifier mon corps', 'Perdre du poids progressivement', 'Renforcer mon corps après l\'accouchement', 'Retrouver mon bien-être et mon énergie', 'Autre'],
  senior: ['Retrouver la forme', 'Renforcer son corps', 'Préserver sa mobilité', 'Améliorer son équilibre', 'Rester autonome et actif', 'Être en meilleure santé', 'Autre'],
};
export function objectivesFor(profile) {
  return OBJECTIVES_BY_PROFILE[profile] || [];
}

export const NUTRITION_OBJECTIVES = ['Perdre du poids', 'Prendre de la masse musculaire', 'Rééquilibrer mon alimentation', 'Améliorer mes performances sportives', 'Nutrition prénatale / postnatale', 'Autre'];
