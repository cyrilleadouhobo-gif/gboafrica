export const VALUES = [
  { n: '01', title: 'Accessibilité', desc: 'Le sport pour tous, partout, à chaque étape de la vie.' },
  { n: '02', title: 'Excellence', desc: 'Un référentiel qualité exigeant sur chaque prestation.' },
  { n: '03', title: 'Inclusion', desc: 'Des programmes adaptés à chaque profil et chaque besoin.' },
  { n: '04', title: 'Proximité', desc: 'Un accompagnement humain, à domicile, en salle ou en entreprise.' },
  { n: '05', title: 'Impact', desc: "Un mode de vie plus actif, plus sain, durablement." },
  { n: '06', title: 'Communauté', desc: 'Un collectif qui motive, soutient et fait progresser.' },
];

export const METHOD_STEPS = [
  { n: '01', title: 'Évaluer', desc: 'Comprendre vos objectifs, votre niveau et vos besoins.' },
  { n: '02', title: 'Construire', desc: 'Définir un programme adapté à votre situation.' },
  { n: '03', title: 'Accompagner', desc: 'Mettre en œuvre les séances avec un coach sélectionné.' },
  { n: '04', title: 'Suivre', desc: "Mesurer votre progression et ajuster l'accompagnement." },
];

// `photo` = id Unsplash choisi à la main pour correspondre au profil (âge/genre/contexte),
// plutôt que la sélection par hash de stockPhoto() qui pouvait retomber sur une photo hors
// sujet (ex : une photo de petit-déjeuner) ou dupliquer la même image sur deux profils.
export const TRANSFORMATIONS = [
  { id: 'tr1', name: 'Awa, 34 ans', detail: 'Remise en forme · 4 mois', ph: 'Avant / après (avec consentement)', photo: 'photo-1603503363848-6952525df449' },
  { id: 'tr2', name: 'Serge, 41 ans', detail: 'Prise de masse · 6 mois', ph: 'Avant / après (avec consentement)', photo: 'photo-1572459815549-873917ec8c0a' },
  { id: 'tr3', name: 'Fatou, 29 ans', detail: 'Postnatal · 3 mois', ph: 'Avant / après (avec consentement)', photo: 'photo-1651525764791-3ae6ce60094c' },
  { id: 'tr4', name: 'Ismaël, 63 ans', detail: 'Mobilité senior · 5 mois', ph: 'Avant / après (avec consentement)', photo: 'photo-1590697442615-a381b5b557c7' },
];

export const TESTIMONIALS = [
  { id: 'ts1', quote: "« J'ai retrouvé de l'énergie et une vraie régularité. Le coach s'adapte à mon emploi du temps chargé. »", name: 'Awa K.', role: 'Membre · Cocody' },
  { id: 'ts2', quote: "« Le programme entreprise a changé l'ambiance de nos équipes. Moins d'absentéisme, plus de cohésion. »", name: 'Mme Koffi', role: 'DRH · Plateau' },
  { id: 'ts3', quote: '« Être coach GBÔ, c\'est un cadre exigeant et une vraie communauté de professionnels. »', name: 'Coach Grace', role: 'Coach partenaire' },
];

export const PARTNERS = [
  { name: 'Cabinet Médico-Nutrition SARL', logo: '/images/logos/cabinet-medico-nutrition.jpg' },
  { name: 'IREF', logo: '/images/logos/iref.jpg' },
  { name: 'AutoPhile Parts Company', logo: '/images/logos/autophile-parts.jpg' },
  { name: 'Scoops Blêblê de Tanguelan', logo: '/images/logos/scoops-blebe.jpg' },
  { name: 'Servo Africa Group', logo: '/images/logos/servo-africa-group.jpg' },
];
export const SOCIALS = [
  { label: 'FB', name: 'Facebook', href: 'https://www.facebook.com/share/18FUm2fkS1/?mibextid=wwXIfr' },
  { label: 'IG', name: 'Instagram', href: 'https://www.instagram.com/gbo_africa?igsi=MTE3YWMyeWI4c3V1aQ%3D%3D&utm_source=qr' },
  { label: 'TT', name: 'TikTok', href: 'https://www.tiktok.com/@gbo.africa?_r=1&_t=ZS-999IW8QPldE' },
  { label: 'in', name: 'LinkedIn', href: 'https://www.linkedin.com/company/gb%C3%B4-officiel/' },
];

// `pillar` : regroupement large utilisé par les filtres de la page /blog (moins nombreux
// que les catégories affichées sur chaque carte, ex. Nutrition, Prénatal, Senior et
// Bien-être se rangent tous sous le pilier Nutrition & Bien-être) — voir BLOG_CATS.
// `body` : brouillon rédigé pour lancer les pages /blog/[slug] (voir la page elle-même) —
// à relire et corriger par Cyrille avant de considérer ce contenu comme définitif.
export const ARTICLES = [
  {
    id: 'a1',
    slug: 'bien-manger-a-abidjan',
    cat: 'Nutrition & Bien-être',
    pillar: 'Nutrition & Bien-être',
    read: '5 min',
    title: '7 habitudes simples pour mieux manger au quotidien',
    excerpt: 'Des habitudes accessibles pour améliorer son alimentation au quotidien.',
    // Photo fournie par Cyrille (salade).
    photo: '/images/blog/nutrition-salade.jpg',
    body: [
      { p: "Bien manger ne veut pas dire suivre un régime importé, coupé de ce qu'on trouve réellement sur nos marchés. Voici sept réflexes simples, pensés pour le quotidien à Abidjan." },
      { h: '1. Partez du marché, pas du supermarché', p: "Attiéké, igname, banane plantain, poisson frais, légumes de saison : la base locale est déjà équilibrée si on surveille les quantités et les modes de cuisson. Pas besoin de produits importés pour bien manger." },
      { h: '2. Rééquilibrez l’assiette sans la vider', p: "L'objectif n'est pas de manger moins, mais de mieux répartir : une portion de protéines, une bonne part de légumes, et un féculent en quantité raisonnable plutôt que dominante." },
      { h: '3. Surveillez les sauces et les fritures', p: "C'est souvent là que se cache l'excès, pas dans le plat de base. Une sauce graine ou un attiéké-poisson restent équilibrés si l'huile est maîtrisée à la cuisson." },
      { h: '4. Hydratez-vous avant d’avoir soif', p: "Avec la chaleur et l'humidité, les besoins en eau sont plus élevés qu'on ne le pense. La soif est déjà un signe de retard, surtout les jours d'entraînement." },
      { h: '5. Repérez le sucre caché', p: "Sodas, jus industriels, biscuits : ce sont souvent les premières sources de sucre à réduire, avant même les repas eux-mêmes." },
      { h: '6. Mangez selon votre activité', p: "Un repas plus consistant avant une séance exigeante, plus léger un jour de repos : ajuster selon l'effort du jour fait souvent plus de différence qu'un plan figé." },
      { h: '7. Un accompagnement change la trajectoire', p: "Ces réflexes donnent une base solide, mais un suivi nutritionnel personnalisé permet d'aller plus loin en tenant compte de votre objectif et de votre rythme. C'est l'option que GBÔ propose en complément du coaching sportif." },
    ],
  },
  {
    id: 'a2',
    slug: 'bouger-enceinte-en-securite',
    cat: 'Entraînement & Éducation',
    pillar: 'Entraînement & Éducation',
    read: '6 min',
    title: 'Sport et grossesse : les bons réflexes pour rester active',
    excerpt: 'Ce que dit la prudence et comment un coach adapte chaque séance.',
    photo: '/images/blog/prenatal.jpg',
    body: [
      { p: "La grossesse n'est pas une raison de tout arrêter. Bien encadrée, l'activité physique reste bénéfique à chaque trimestre, à condition d'adapter l'intensité et les mouvements." },
      { h: 'Pourquoi continuer à bouger', p: "Un corps actif pendant la grossesse dort souvent mieux, gère mieux les tensions du dos et du bassin, et arrive plus préparé physiquement au jour de l'accouchement. Le mouvement reste aussi un vrai soutien pour le moral." },
      { h: 'Ce qu’on écarte', p: "Les sports à choc ou à risque de chute, les positions prolongées à plat ventre après le premier trimestre, les efforts en apnée : ce sont les grandes précautions à connaître, en plus de tout ce que votre suivi médical vous indique." },
      { h: 'Un programme qui évolue avec chaque trimestre', p: "Ce qui est confortable au premier trimestre ne l'est plus au troisième. Un bon accompagnement ajuste les exercices séance après séance, en écoutant les retours du corps plutôt qu'en suivant un plan figé." },
      { h: 'Toujours en lien avec le suivi médical', p: "Aucun programme sportif ne remplace l'avis de votre médecin ou de votre sage-femme. Avant de commencer ou de poursuivre une activité pendant la grossesse, leur feu vert reste la première étape." },
      { h: 'Ce que propose GBÔ', p: "Les coachs GBÔ formés à l'accompagnement prénatal adaptent chaque séance à votre trimestre et à votre ressenti, en coordination avec les recommandations de votre suivi médical." },
    ],
  },
  {
    id: 'a3',
    slug: 'sport-en-entreprise-investissement',
    cat: 'Sport & Société',
    pillar: 'Sport & Société',
    read: '4 min',
    title: 'Faire bouger ses équipes : pourquoi le sport a sa place en entreprise',
    excerpt: 'Les bénéfices et les clés pour intégrer davantage d’activité physique dans la vie professionnelle.',
    // Photo fournie par Cyrille — logo "alto giro" (marque tierce) visible sur les sacs et
    // tapis au sol, signalé avant intégration ; gardée sur demande explicite.
    photo: '/images/blog/entreprise.jpg',
    body: [
      { p: "La sédentarité au bureau a un coût réel, même s'il est rarement visible sur une feuille de calcul : fatigue, tensions, désengagement progressif des équipes." },
      { h: 'Le coût caché de l’inactivité', p: "Une équipe qui bouge peu accumule plus de fatigue physique et de tensions, ce qui se traduit à terme par plus d'absentéisme et moins d'énergie collective, même quand tout semble fonctionner normalement." },
      { h: 'Ce qu’une vraie politique sport change', p: "Au-delà de l'image, une politique sport bien pensée améliore mesurablement le moral, la cohésion entre collègues, et la capacité de concentration sur la durée d'une journée de travail." },
      { h: 'Pas besoin d’une salle sur site', p: "Séances collectives régulières, coaching individuel ponctuel, ateliers thématiques : plusieurs formats existent pour intégrer le sport sans bouleverser l'organisation ni investir dans des infrastructures lourdes." },
      { h: 'Comment démarrer sans tout changer', p: "La meilleure approche reste souvent de tester un format simple sur quelques semaines, mesurer l'adhésion réelle des équipes, puis ajuster avant d'engager un programme plus large." },
      { h: 'Ce que propose GBÔ Entreprise', p: "GBÔ accompagne les organisations avec des programmes sur mesure, du coaching collectif aux séances individuelles, pensés pour s'intégrer au rythme réel de l'entreprise." },
    ],
  },
  {
    id: 'a4',
    slug: 'rester-actif-apres-60-ans',
    cat: 'Transformation',
    pillar: 'Transformation',
    read: '5 min',
    title: 'Après 60 ans : comment rester actif et en forme ?',
    excerpt: 'Mobilité, force et régularité : les clés pour continuer à bouger.',
    photo: '/images/blog/senior-actif.jpg',
    body: [
      { p: "Rester actif après 60 ans ne demande pas de viser la performance. Trois priorités suffisent pour construire un programme utile et sûr : l'équilibre, la force, la mobilité." },
      { h: 'Pourquoi ces trois priorités', p: "Les chutes restent le premier risque à cet âge. Travailler l'équilibre et la force des jambes réduit ce risque directement, tandis que la mobilité articulaire garde les gestes du quotidien plus faciles." },
      { h: 'Commencer petit, avancer sûr', p: "Il n'y a aucun intérêt à viser l'intensité dès les premières séances. Progresser par petits paliers, bien exécutés, donne de meilleurs résultats sur la durée qu'un départ trop ambitieux." },
      { h: 'Ce qu’un coach change à cet âge', p: "Un accompagnement adapté sait repérer les mouvements à éviter, ajuster le rythme selon la forme du jour, et donner confiance pour progresser sans appréhension." },
      { h: 'Un rythme, pas un sprint', p: "L'objectif n'est pas de rattraper une forme passée en quelques semaines, mais de construire une routine tenable, semaine après semaine, qui s'inscrit durablement dans le quotidien." },
    ],
  },
  {
    id: 'a5',
    slug: 'debuter-musculation-sans-se-blesser',
    cat: 'Entraînement & Éducation',
    pillar: 'Entraînement & Éducation',
    read: '7 min',
    title: 'Débuter la musculation sans se blesser',
    excerpt: 'Les fondamentaux pour progresser durablement et sereinement.',
    photo: '/images/blog/musculation-debutant.jpg',
    body: [
      { p: "La musculation progresse vite quand les bases sont posées correctement dès le début. Voici les fondamentaux qui évitent les blessures et les faux départs." },
      { h: 'La technique avant la charge', p: "Ajouter du poids sur un mouvement mal maîtrisé ne fait qu'accélérer le risque de blessure. Le bon ordre est toujours : d'abord le mouvement propre, ensuite la charge." },
      { h: 'Progresser par paliers', p: "Augmenter la charge ou le volume trop vite est l'une des premières causes de blessure chez les débutants. Une progression régulière, même lente, construit une base plus solide." },
      { h: 'L’échauffement et la récupération, souvent négligés', p: "Un échauffement bien fait prépare les articulations à l'effort, et un temps de récupération suffisant entre les séances permet aux muscles de vraiment progresser plutôt que de s'épuiser." },
      { h: 'Pourquoi un premier accompagnement change la trajectoire', p: "Les mauvaises habitudes prises au début sont les plus difficiles à corriger ensuite. Un coach présent dès les premières séances aide à construire de bons réflexes plutôt qu'à les corriger après coup." },
    ],
  },
  {
    id: 'a6',
    slug: 'gerer-stress-par-le-mouvement',
    cat: 'Nutrition & Bien-être',
    pillar: 'Nutrition & Bien-être',
    read: '4 min',
    title: 'Gérer le stress par le mouvement',
    excerpt: "Comment l'activité physique régule l'humeur et le sommeil.",
    photo: '/images/blog/gestion-stress.jpg',
    body: [
      { p: "Le stress chronique s'installe souvent en silence, entre fatigue persistante et sommeil de moins bonne qualité. Le mouvement reste l'un des leviers les plus accessibles pour le réguler." },
      { h: 'Ce qui se passe sous stress prolongé', p: "Un corps sous tension continue mobilise de l'énergie en permanence, ce qui affecte peu à peu le sommeil, la concentration et l'humeur générale." },
      { h: 'Le mouvement comme régulateur', p: "Pas besoin d'un effort intense pour ressentir les effets : une activité régulière, même modérée, aide le corps à mieux réguler les tensions accumulées dans la journée." },
      { h: 'Trouver le bon format', p: "Certains se vident la tête sur un effort cardio soutenu, d'autres sur un mouvement plus lent et contrôlé. Il n'y a pas une seule bonne réponse, seulement celle qui convient à chacun." },
      { h: 'Construire une routine tenable', p: "L'effet vient de la régularité, pas de l'intensité ponctuelle. Deux ou trois séances courtes mais régulières valent souvent mieux qu'une séance intense isolée." },
    ],
  },
  {
    id: 'a7',
    slug: 'sport-levier-majeur-afrique',
    cat: 'Sport & Société',
    pillar: 'Sport & Société',
    read: '6 min',
    title: 'Pourquoi le sport doit devenir un levier majeur en Afrique ?',
    excerpt: "Une analyse des opportunités, des défis et des solutions pour faire du sport un véritable moteur de développement.",
    body: [
      { p: "Le potentiel sportif africain reste largement sous-exploité, malgré une démographie jeune et une culture du mouvement déjà bien présente au quotidien." },
      { h: 'Un potentiel sous-exploité', p: "Une population jeune, une énergie collective réelle autour du sport, et une demande croissante pour des solutions de bien-être structurées : les ingrédients sont là, mais encore trop peu organisés." },
      { h: 'Les obstacles structurels', p: "Manque d'infrastructures accessibles, offre de formation encore limitée pour les professionnels du secteur, financement difficile à trouver pour les initiatives locales : ce sont les principaux freins au développement du secteur." },
      { h: 'Ce qui commence à changer', p: "De nouvelles initiatives privées émergent, portées par des entrepreneurs qui misent sur le sport comme secteur d'avenir plutôt que comme simple loisir. GBÔ s'inscrit dans ce mouvement." },
      { h: 'Le rôle des acteurs privés', p: "Là où les infrastructures publiques manquent, les acteurs privés peuvent structurer une offre accessible : coaching, formation des professionnels, mise en réseau des salles et des pratiquants. C'est le pari que fait GBÔ AFRICA GROUP." },
    ],
  },
  {
    id: 'a8',
    slug: 'role-coach-sportif-afrique',
    cat: 'Métiers du Sport',
    pillar: 'Métiers du Sport',
    read: '5 min',
    title: 'Travailler dans le sport : quels métiers pour construire sa carrière ?',
    excerpt: 'Coaching, management, événementiel : découvrez les métiers qui font vivre l’écosystème sportif.',
    body: [
      { p: "Le métier de coach sportif est en train de se structurer en Afrique, porté par une demande croissante pour un accompagnement encadré plutôt qu'improvisé." },
      { h: 'Un métier en pleine structuration', p: "Longtemps informel, le coaching sportif gagne en reconnaissance à mesure que la demande pour un accompagnement sérieux et suivi progresse, notamment dans les grandes villes." },
      { h: 'Les compétences qui font la différence', p: "Savoir faire bouger ne suffit pas : écouter l'objectif réel de la personne, adapter chaque séance, et assurer un suivi dans la durée sont ce qui distingue un bon coach d'une simple séance de sport." },
      { h: 'Des débouchés qui s’élargissent', p: "Entreprises, salles partenaires, particuliers, plateformes de mise en relation comme GBÔ : les opportunités pour les coachs qualifiés se multiplient, à condition d'avoir la formation et le cadre pour en profiter." },
      { h: 'Comment GBÔ accompagne les coachs', p: "Via son pôle Academy, GBÔ forme et structure les compétences des coachs, puis les met en relation avec des clients et des salles partenaires pour un revenu plus régulier et un vrai cadre professionnel." },
    ],
  },
];
export const BLOG_PREVIEW = ARTICLES.slice(0, 3).map(({ id, cat, read, title, excerpt }) => ({ id: 'bp-' + id, cat, read, title, excerpt }));
export const BLOG_CATS = ['Tous', 'Transformation', 'Entraînement & Éducation', 'Nutrition & Bien-être', 'Sport & Société', 'Métiers du Sport'];

// Catégorie d'article -> catégorie stockPhoto correspondante. Centralisé ici pour que la
// page blog et l'aperçu blog de l'accueil affichent toujours un visuel cohérent avec le
// sujet de l'article (au lieu d'une seule catégorie fixe pour tous les articles).
export const ARTICLE_CAT_PHOTO = {
  'Nutrition & Bien-être': 'nutrition',
  'Entraînement & Éducation': 'fitnessMen',
  'Sport & Société': 'team',
  Transformation: 'senior',
  'Métiers du Sport': 'fitnessMen',
};

// Contenu (lede/body/facts) rédigé comme brouillon, à valider par Cyrille avant publication
// finale, même statut que le corps des articles de ARTICLES ci-dessus.
export const NEWS_ITEMS = [
  {
    id: 'n1',
    slug: 'plateforme-digitale-officielle',
    date: 'Août 2026',
    tag: 'Marque',
    // Même photo que le bloc "À la une" (au-dessus), pour rester cohérent quand cette
    // actualité réapparaît dans la grille "Dernières actualités".
    photo: '/images/news-featured.jpg',
    // Recadrage vers le haut pour garder les visages visibles (photo portrait, recadrée en
    // format large ailleurs sur la page).
    photoPosition: 'center 32%',
    title: 'GBÔ AFRICA GROUP dévoile sa plateforme digitale officielle',
    excerpt: 'Une nouvelle étape dans le développement de l’écosystème GBÔ. Plus de services, plus de connexions, plus d’opportunités pour faire avancer le sport en Afrique.',
    facts: [
      { label: 'Statut', value: 'En ligne' },
      { label: 'Portée', value: 'Tout l’écosystème GBÔ' },
    ],
    body: [
      {
        h: 'Un accès direct à tout l’écosystème GBÔ',
        p: 'Fitness, Academy, Events, Security : chaque pôle du groupe est désormais réuni au même endroit, avec des parcours pensés pour chaque profil, du particulier qui cherche un coach à l’entreprise qui veut sécuriser un événement.',
      },
      {
        h: 'Réserver en quelques clics',
        p: 'Les formulaires de contact, de candidature et de prise de rendez-vous sont désormais en ligne. Chaque demande arrive directement à l’équipe concernée, sans passer par plusieurs intermédiaires.',
      },
      {
        h: 'Une base pour la suite',
        p: 'Cette plateforme est un point de départ. Elle évoluera avec de nouveaux contenus et de nouvelles fonctionnalités au fil de la croissance du groupe.',
      },
    ],
    cta: { label: 'Explorer la plateforme', href: '/' },
  },
  {
    id: 'n2',
    slug: 'ouverture-inscriptions-fitness-abidjan',
    date: 'Octobre 2026',
    tag: 'Fitness',
    // Photo fournie par Cyrille — logos Nike (débardeur, chaussures) et MATRIX (appareil de
    // musculation en fond) visibles, signalés avant intégration ; gardée sur demande explicite.
    photo: '/images/news-fitness-card.jpg',
    // Recadrage vers le haut pour garder le visage visible (photo portrait, recadrée en
    // format large sur la carte).
    photoPosition: 'center 25%',
    title: 'GBÔ Fitness ouvre les inscriptions à Abidjan',
    excerpt: 'Des programmes adaptés à tous les niveaux, encadrés par des coachs professionnels.',
    facts: [
      { label: 'Lieu', value: 'Abidjan' },
      { label: 'Formule découverte', value: '2 séances gratuites' },
    ],
    body: [
      {
        h: 'Des programmes pour chaque profil',
        p: 'Adultes, femmes, femmes enceintes, jeunes mamans, seniors : chaque parcours est construit autour d’un objectif précis, avec un accompagnement encadré par des coachs professionnels.',
      },
      {
        h: 'À domicile, en salle partenaire ou en extérieur',
        p: 'Les séances s’organisent selon vos disponibilités et votre lieu de préférence à Abidjan, avec la possibilité d’un suivi nutritionnel en complément.',
      },
      {
        h: 'Commencer sans engagement',
        p: 'Les deux premières séances sont gratuites. L’occasion de rencontrer un coach et de définir un objectif clair avant toute décision.',
      },
    ],
    cta: { label: 'Réserver mes deux séances gratuites', href: '/deux-seances-gratuites' },
  },
];
// Regroupement utilisé par les filtres de /news, limité aux tags réellement présents
// dans NEWS_ITEMS ci-dessus.
export const NEWS_CATS = ['Tous', 'Marque', 'Fitness'];
export const NEWS_CAT_PHOTO = {
  Marque: 'gymInterior',
  Fitness: 'fitnessWomen',
};

// pole : clé de filtre (correspond aux pôles de data/poles.js + 'groupe' pour les postes
// transverses non rattachés à un pôle en particulier). icon : voir JOB_ICONS (app/careers/page.js).
export const JOBS = [
  { t: 'Coach sportif certifié', pole: 'fitness', loc: 'Abidjan', mode: 'Terrain · Réseau partenaire', icon: 'person' },
  { t: 'Conseiller relation client', pole: 'groupe', loc: 'Plateau', mode: 'Bureau · Temps plein', icon: 'headset' },
  { t: 'Community manager', pole: 'groupe', loc: 'Abidjan', mode: 'Hybride · Temps plein', icon: 'megaphone' },
  { t: 'Chargé de partenariats & sponsoring', pole: 'events', loc: 'Abidjan', mode: 'Hybride · Temps plein', icon: 'handshake' },
  { t: 'Formateur Musculation & Fitness', pole: 'academy', loc: 'Abidjan', mode: 'Terrain · Temps plein', icon: 'graduation' },
  { t: 'Agent de sécurité', pole: 'security', loc: 'Abidjan', mode: 'Terrain · Temps plein', icon: 'shield' },
  { t: 'Commercial / Business Developer', pole: 'groupe', loc: 'Abidjan', mode: 'Terrain · Temps plein', icon: 'chart' },
];

export const GYM_ECOSYSTEM_ADVANTAGES = [
  { icon: '💻', t: 'Digitalisation', d: 'Accédez à une offre préférentielle sur E-Gym, sous réserve des conditions négociées avec le partenaire.' },
  { icon: '👥', t: 'Nouveaux clients', d: 'GBÔ peut orienter vers votre salle des personnes recherchant une solution de fitness dans votre zone.' },
  { icon: '📍', t: 'Visibilité', d: 'Votre salle peut être référencée dans le réseau de partenaires GBÔ et être valorisée auprès de notre communauté.' },
  { icon: '🤝', t: 'Opportunités commerciales', d: 'Participez aux campagnes, challenges et événements organisés par GBÔ.' },
  { icon: '🏆', t: 'Communauté', d: "Intégrez un réseau de salles partageant une ambition commune autour du développement du fitness en Côte d'Ivoire." },
];

// Salles déjà partenaires, affichées publiquement (repris de l'ancien site). Un seul
// partenaire actif pour l'instant — tableau pensé pour en accueillir d'autres.
export const PARTNER_GYMS = [
  {
    id: 'best-gym',
    name: 'BEST-GYM',
    logo: '/images/best-gym-mark.png',
    tagline: 'Réseau de salles de sport premium',
    rating: 4.8,
    location: 'Avocatier Carrefour, Niamkey',
    services: ['Fitness', 'Musculation', 'Boxe', 'Rééducation'],
    phones: ['07 08 03 24 41', '05 05 27 80 70'],
    hours: '06h - 21h, ouvert 7j/7',
    video: '/videos/best-gym.mp4',
  },
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
  { t: 'Salles de sport & espaces', d: 'Mettez vos infrastructures et vos services au service de l’écosystème GBÔ.' },
  { t: 'Marques & équipements', d: 'Associez votre marque à nos activités, événements et communautés sportives.' },
  { t: 'Entreprises & institutions', d: 'Construisons des programmes sportifs, bien-être et des initiatives adaptées à vos enjeux.' },
  { t: 'Professionnels & experts', d: 'Intégrez notre réseau de professionnels et contribuez à l’accompagnement de notre communauté.' },
];

export const FAQ_GROUPS = [
  {
    cat: 'Fitness',
    items: [
      { q: 'Faut-il créer un compte pour commencer ?', a: 'Non. Le formulaire Particulier ne demande aucun compte : vous laissez vos coordonnées et un conseiller vous rappelle.' },
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
      { q: 'Comment exercer mes droits ?', a: "Écrivez à privacy@gboafricagroup.com pour l'accès, la rectification ou la suppression." },
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
