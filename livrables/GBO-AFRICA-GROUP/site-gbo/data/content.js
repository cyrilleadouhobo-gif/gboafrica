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
    // Photo fournie par Cyrille — logo Nike (débardeur) et t-shirt "EFFECT" (marque tierce)
    // visibles, assumés sur demande explicite (voir échange du 19/10).
    photo: '/images/blog/sport-levier-afrique.jpg',
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
  {
    id: 'a9',
    slug: 'pourquoi-pratiquer-activite-physique-regulierement',
    cat: 'Sport & Société',
    pillar: 'Sport & Société',
    read: '7 min',
    title: 'Pourquoi pratiquer une activité physique régulièrement ?',
    excerpt: "Les bienfaits de l'activité physique sur la santé physique et mentale, les recommandations de l'OMS et des conseils pratiques pour passer à l'action.",
    // Photo fournie par Cyrille — logo Jordan et marquage "Bismack Biyombo Foundation"
    // (événement hors GBÔ) visibles, assumés sur demande explicite (voir échange du 19/10).
    photo: '/images/blog/activite-physique-reguliere.jpeg',
    body: [
      {
        p: "Marcher, courir, nager, danser ou simplement monter un escalier : l'activité physique fait partie de notre quotidien. Pourtant, selon l'Organisation mondiale de la santé (OMS), près de 1,8 milliard d'adultes dans le monde n'en pratiquent pas suffisamment pour protéger leur santé. En Afrique, la sédentarité progresse, notamment en milieu urbain, alors que les maladies non transmissibles (diabète, hypertension, maladies cardiovasculaires) ne cessent de gagner du terrain. Pratiquer une activité physique régulière n'est donc pas un luxe : c'est un investissement accessible dans sa propre santé.",
      },
      {
        h: "Qu'est-ce que l'activité physique ?",
        p: "L'OMS la définit comme tout mouvement corporel produit par la contraction des muscles squelettiques, entraînant une dépense d'énergie supérieure à celle du repos. Contrairement à une idée reçue, elle ne se limite pas au sport : les déplacements à pied, les tâches domestiques, le jardinage ou le jeu comptent également. On distingue quatre grands domaines (loisirs et sport, déplacements actifs, activité professionnelle et tâches domestiques) qui contribuent tous au volume quotidien. À l'inverse, la sédentarité désigne le temps passé assis ou allongé éveillé (écran, transport, bureau) : on peut être actif et pourtant trop sédentaire.",
      },
      {
        h: 'Un cœur plus fort, une tension mieux régulée',
        p: "L'activité d'endurance (marche rapide, course, natation, vélo) renforce le cœur et améliore la circulation sanguine. Selon l'OMS, une pratique régulière réduit le risque de maladies cardiaques d'environ 30 % et aide à réguler la pression artérielle, un enjeu important en Côte d'Ivoire où la prévalence de l'hypertension chez les adultes de 25 ans et plus atteint 33,4 %.",
      },
      {
        h: 'Un rempart contre le diabète',
        p: "L'exercice améliore la sensibilité à l'insuline et aide l'organisme à mieux réguler le taux de sucre dans le sang : l'OMS estime qu'une activité physique régulière réduit le risque de diabète de type 2 d'environ 27 %. En Afrique subsaharienne, où la prévalence du diabète progresse rapidement, ce levier de prévention est particulièrement pertinent.",
      },
      {
        h: 'Une protection contre certains cancers',
        p: "Selon l'OMS, la pratique régulière d'une activité physique réduit le risque de cancer du sein et du côlon de 21 à 25 %, via la régulation hormonale, le renforcement du système immunitaire et la réduction de l'inflammation chronique.",
      },
      {
        h: 'Un poids maîtrisé, des muscles et des os renforcés',
        p: "L'activité physique contribue à l'équilibre énergétique et à la maîtrise du poids corporel, tout en renforçant muscles, articulations et capital osseux. L'OMS souligne qu'une activité d'intensité élevée au moins trois fois par semaine consolide le système musculaire et osseux, utile pour prévenir l'ostéoporose à long terme.",
      },
      {
        h: 'Moins de douleurs, plus de mobilité',
        p: "Le mouvement stimule les mécanorécepteurs articulaires et active la circulation sanguine, ce qui contribue à réduire l'inflammation et les gênes musculosquelettiques. Pour les personnes âgées, l'OMS recommande des exercices d'équilibre au moins trois jours par semaine pour prévenir les chutes.",
      },
      {
        h: 'Moins de stress, moins d’anxiété',
        p: "L'OMS souligne le rôle de l'activité physique dans la réduction du stress, de l'anxiété et des symptômes dépressifs : l'exercice déclenche la libération d'endorphines et aide à interrompre les pensées négatives liées au stress. Une pratique régulière peut avoir des effets comparables, dans certains cas, à une prise en charge médicamenteuse légère pour des troubles émotionnels modérés.",
      },
      {
        h: 'Un sommeil de meilleure qualité',
        p: "Les personnes physiquement actives dorment généralement mieux : l'effort favorise un endormissement plus rapide et un sommeil plus profond, à condition d'éviter une activité intense juste avant le coucher.",
      },
      {
        h: 'Estime de soi et lien social',
        p: "Atteindre ses objectifs sportifs, même modestes, renforce le sentiment de compétence et l'estime de soi. Les bienfaits sur la santé mentale sont encore plus marqués lorsque l'activité est pratiquée en groupe : le cadre collectif élargit le réseau social, réduit l'isolement et offre un espace de soutien mutuel.",
      },
      {
        h: 'Mémoire et concentration',
        p: "L'activité physique régulière contribue à la santé cérébrale à tout âge : elle améliore la mémoire, la concentration et les performances cognitives, et joue un rôle dans la prévention du déclin cognitif et de certaines maladies neurodégénératives.",
      },
      {
        h: "Un enjeu de santé publique en Côte d'Ivoire et en Afrique",
        p: "L'Afrique subsaharienne connaît une transition épidémiologique : les maladies non transmissibles augmentent rapidement, alors que les systèmes de santé restent encore organisés autour des maladies infectieuses. En Côte d'Ivoire, les maladies cardiovasculaires sont la première cause de mortalité liée à ces maladies. Selon le Pr Jacko Abodo, chef du service d'endocrinologie et diabétologie du CHU de Yopougon, la sédentarité croissante de la population ivoirienne, combinée à une transition alimentaire vers des produits plus gras, salés et sucrés, alimente une véritable épidémie de maladies métaboliques. Chez les jeunes, la situation est tout aussi préoccupante : selon l'OMS, environ quatre adolescents scolarisés sur cinq en Afrique n'atteignent pas le niveau d'activité physique recommandé pour leur santé.",
      },
      {
        h: "Les recommandations de l'OMS par tranche d'âge",
        p: "L'OMS a publié en 2020 ses dernières lignes directrices sur l'activité physique. L'essentiel à retenir par tranche d'âge :",
        list: [
          "Enfants et adolescents (5-17 ans) : au moins 60 minutes par jour d'activité modérée à élevée, avec du renforcement musculaire et osseux au moins 3 fois par semaine.",
          "Adultes (18-64 ans) : 150 à 300 minutes par semaine d'activité aérobie modérée (ou 75 à 150 minutes d'intensité élevée), et du renforcement musculaire 2 jours ou plus par semaine.",
          "Personnes âgées (65 ans et plus) : les mêmes recommandations que les adultes, avec des exercices d'équilibre et de prévention des chutes au moins 3 jours par semaine.",
        ],
      },
      {
        p: "L'OMS insiste sur un point essentiel : chaque mouvement compte. Même en dessous de ces seuils, toute activité physique apporte déjà des bénéfices pour la santé par rapport à l'inactivité totale.",
      },
      {
        h: 'Comment commencer ? Conseils pratiques pour passer à l’action',
        p: "Inutile d'être un athlète pour bénéficier des bienfaits de l'activité physique. Quelques principes pour démarrer ou reprendre en toute sérénité :",
        list: [
          "Choisir une activité qui plaît comme la marche, la course, la danse, la natation, le football, la musculation… le meilleur sport est celui qu'on a envie de pratiquer.",
          "Commencer progressivement, 30 minutes de marche rapide, deux à trois fois par semaine, sont un excellent point de départ.",
          "Intégrer le mouvement au quotidien, escaliers, trajets courts à pied, pauses debout au bureau : chaque occasion compte.",
          "Éviter plus de deux jours consécutifs sans activité, pour maintenir les bénéfices dans la durée.",
          "Consulter un professionnel si besoin. Un bilan avec un coach qualifié permet de définir un programme adapté, surtout après une longue période d'inactivité.",
          "S'entourer, pratiquer à plusieurs augmente la motivation et les chances de tenir dans la durée.",
        ],
      },
      {
        p: "Pratiquer une activité physique régulière reste l'un des gestes les plus simples et les plus efficaces pour protéger sa santé, prévenir les maladies chroniques et améliorer sa qualité de vie. En Côte d'Ivoire comme partout en Afrique, face à la progression des maladies non transmissibles et de la sédentarité, chaque mouvement compte. Il n'est jamais trop tard pour commencer : l'essentiel est de choisir une activité adaptée, de démarrer à son rythme, et de s'inscrire dans la durée.",
      },
    ],
  },
  {
    id: 'a10',
    slug: 'sport-emploi-du-temps-charge',
    cat: 'Entraînement & Éducation',
    pillar: 'Entraînement & Éducation',
    read: '8 min',
    title: 'Comment faire du sport régulièrement avec un emploi du temps chargé ?',
    excerpt: "Des stratégies concrètes pour construire une routine sportive qui tient, même avec les contraintes du quotidien à Abidjan.",
    // Photo fournie par Cyrille (blog2.jpeg).
    photo: '/images/blog/sport-emploi-du-temps-charge.jpeg',
    body: [
      {
        p: "On connaît tous cette phrase : « Je commencerai lundi. » Et lundi arrive, la journée déborde, et tout est reporté à la semaine suivante. À Abidjan, où un trajet Plateau-Cocody peut prendre deux heures aux heures de pointe, trouver du temps pour bouger n'a rien d'évident.",
      },
      {
        quote: "31 % des adultes dans le monde n'atteignaient pas les niveaux d'activité physique recommandés en 2022 selon l'OMS, soit environ 1,8 milliard de personnes, un chiffre en hausse de 5 points en douze ans.",
      },
      {
        p: "Mais la solution ne passe pas par des séances de deux heures en salle. Elle passe par de petits ajustements réguliers, adaptés à votre vie telle qu'elle est, pas telle qu'elle devrait être.",
      },
      {
        h: 'Peu et souvent vaut mieux que beaucoup et rarement',
        p: "Les recommandations de l'OMS sont claires : pas besoin de s'épuiser une heure pour en tirer des bénéfices.",
        list: [
          "150 à 300 minutes par semaine d'activité modérée (marche rapide, vélo, danse), ou 75 à 150 minutes d'intensité soutenue.",
          "Du renforcement musculaire au moins deux jours par semaine (squats, pompes, gainage, port de charges).",
        ],
      },
      {
        p: "Cela revient à environ 22 minutes par jour en moyenne, un objectif accessible même avec un emploi du temps serré. Et l'OMS le rappelle : chaque mouvement compte, les courtes périodes d'activité s'additionnent au total de la semaine.",
      },
      {
        p: "Côté régularité, une étude de l'University College London a suivi 96 volontaires adoptant de nouveaux comportements quotidiens : il fallait en moyenne 66 jours pour qu'un geste devienne automatique, avec de fortes variations selon les personnes (de 18 à 254 jours). Il n'y a donc pas de délai magique. Un jour manqué n'efface pas les progrès : c'est la tendance qui compte, pas la perfection.",
      },
      {
        h: 'Les freins bien réels du quotidien à Abidjan',
        p: 'Avant de parler solutions, autant regarder les obstacles en face.',
      },
      {
        h: 'Les embouteillages',
        p: "C'est le frein numéro un. Les trajets domicile-travail comptent parmi les plus longs d'Afrique de l'Ouest, et le temps de transport grignote directement les créneaux disponibles pour soi.",
      },
      {
        h: 'Les journées à rallonge',
        p: "Dans le formel comme l'informel, les journées dépassent souvent huit heures. Ajoutez les responsabilités familiales, et il reste peu de marge pour une activité structurée. C'est humain de renoncer quand on est fatigué.",
      },
      {
        h: 'Un accès aux infrastructures encore inégal',
        p: "Les salles de fitness se multiplient à Cocody, Marcory ou Zone 4, et des initiatives publiques émergent comme l'Agora d'Abobo, un complexe multisport de 1,6 hectare. Mais l'offre reste inégale selon les communes.",
      },
      {
        h: 'Le coût perçu',
        p: "Abonnement, tenue, coach : le sport est souvent vu comme réservé à ceux qui en ont les moyens. C'est un frein psychologique réel, alors que de nombreuses formes d'activité efficaces ne coûtent rien du tout.",
      },
      {
        h: '1. Traiter ses séances comme des rendez-vous',
        p: "Ce qui n'est pas dans l'agenda a peu de chances d'arriver. Bloquer deux à trois créneaux par semaine, au même titre qu'une réunion, change la donne.",
        list: [
          "Tôt le matin (5h30-6h30), avant les embouteillages : le créneau préféré de beaucoup d'Abidjanais actifs.",
          'La pause déjeuner, pour une marche rapide ou un circuit court.',
          'Le soir, si le trajet de retour le permet.',
        ],
      },
      {
        h: '2. Commencer petit, mais commencer',
        p: "Les courtes périodes d'activité s'additionnent et comptent pour le total hebdomadaire. L'erreur classique, c'est d'attendre d'avoir une heure libre pour s'y mettre.",
        list: [
          '10 minutes de renforcement au réveil, sans matériel ni déplacement.',
          '15 minutes de marche rapide pendant la pause déjeuner.',
          'Un circuit de 20 minutes à la maison en fin de journée.',
        ],
      },
      {
        p: "Dix minutes aujourd'hui valent mieux qu'une heure qui n'arrivera jamais.",
      },
      {
        h: '3. Choisir une activité qui fait plaisir',
        p: "On ne tient pas longtemps dans une activité qu'on fait par obligation. À Abidjan, les options ne manquent pas : marche ou jogging à la Corniche, football ou basketball dans les agoras, danse, ou exercices au poids du corps à domicile. Le meilleur sport, c'est celui qu'on pratique réellement.",
      },
      {
        h: '4. Ne pas rester seul',
        p: "Pratiquer à deux ou en groupe crée un engagement mutuel : quand la motivation faiblit, c'est le rendez-vous avec l'autre qui fait bouger quand même. Un partenaire d'entraînement, un groupe de quartier, ou un coach qui structure le programme et maintient la dynamique dans le temps : à Abidjan, le coaching à domicile se développe rapidement. C'est l'approche de GBÔ FITNESS, un accompagnement adapté à votre emploi du temps pour que la régularité ne repose pas uniquement sur votre volonté.",
      },
      {
        h: '5. Glisser le mouvement dans les gestes du quotidien',
        p: "Il ne s'agit pas toujours de « faire une séance ».",
        list: [
          "Prendre les escaliers plutôt que l'ascenseur.",
          'Descendre un arrêt plus tôt du bus ou du wôrô-wôrô et finir à pied.',
          'Marcher pour les courses de proximité.',
          "Se lever et s'étirer toutes les heures au bureau.",
        ],
      },
      {
        p: "Chaque geste semble insignifiant, mais cumulés sur une semaine, ils comptent dans le volume total recommandé.",
      },
      {
        h: '6. Se fixer des objectifs progressifs',
        p: 'Un objectif flou a peu de chances de tenir. Un objectif précis donne un cap.',
        list: [
          'Semaines 1-2 : trois marches rapides de 15 minutes.',
          'Semaines 3-4 : deux séances de 30 minutes (marche et renforcement).',
          'Mois 2 : trois séances structurées par semaine.',
        ],
      },
      {
        p: "Tenir un journal sportif permet de visualiser ses progrès, l'un des moteurs de motivation les plus puissants. Et si construire ce programme seul est difficile, un coach peut aider à définir un plan adapté à vos contraintes : un investissement dans votre santé, pas un luxe.",
      },
      {
        h: 'Le sport en entreprise, un levier encore sous-exploité',
        p: "En France, des études menées par Gymlib et relayées par Generali montrent que la pratique sportive en entreprise améliore la productivité (de 2,5 % à 9,1 % selon les conditions) et que 8 salariés sur 10 rapportent de meilleures relations avec leurs collègues. Ces résultats restent à confirmer en contexte africain, mais la tendance est parlante. En Côte d'Ivoire, cette dimension reste largement inexploitée, alors que des actions simples suffisent : un espace pour les étirements, des challenges entre équipes, des pauses actives de 10 à 15 minutes, ou un coach sportif une à deux fois par semaine. C'est précisément ce que propose GBÔ CORPORATE, l'offre de GBÔ AFRICA GROUP dédiée au bien-être en entreprise.",
      },
      {
        h: 'Un exemple de semaine type à Abidjan',
        p: 'Un planning à adapter selon vos contraintes, pas un programme figé :',
        list: [
          'Lundi, 6h00-6h30 : renforcement au poids du corps à domicile (30 min).',
          'Mercredi, 12h30-13h00 : marche rapide pendant la pause déjeuner (30 min).',
          'Vendredi, 6h00-6h45 : jogging ou séance collective en extérieur (45 min).',
          'Samedi, 8h00-9h00 : football, danse, natation ou activité en groupe (1h).',
          'Au quotidien : escaliers, marche, étirements au bureau.',
        ],
      },
      {
        p: "Soit environ 165 minutes d'activité structurée par semaine, auxquelles s'ajoutent les micro-activités. L'essentiel est de progresser vers une intensité au moins modérée, à son rythme.",
      },
      {
        p: "La régularité sportive n'est pas une question de temps disponible, c'est une question de choix et d'organisation. Avec des séances courtes, des activités qui font plaisir, un entourage qui motive et des objectifs à sa mesure, une routine durable est possible, même à Abidjan, même avec un emploi du temps chargé.",
      },
      {
        p: "Les premières semaines sont les plus difficiles, c'est normal. Mais avec la répétition, le geste devient naturel. N'attendez pas d'avoir le planning parfait : le meilleur moment pour commencer, c'est maintenant.",
      },
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
    photo: '/images/news/bodje-fitness-card.jpeg',
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
    cat: 'Particuliers',
    items: [
      { q: 'Faut-il créer un compte pour commencer ?', a: 'Non. Le formulaire Particulier ne demande aucun compte : vous laissez vos coordonnées et un conseiller vous rappelle.' },
      { q: 'Où se déroulent les séances ?', a: 'À domicile, en salle partenaire ou en extérieur, selon le programme choisi.' },
      { q: 'Qui peut suivre un programme GBÔ ?', a: "Nos accompagnements s'adressent aux adultes, aux femmes, aux femmes enceintes, aux nouvelles mamans et aux seniors, avec un programme adapté à chaque profil." },
      { q: 'Puis-je ajouter un suivi nutritionnel ?', a: 'Oui, un accompagnement nutritionnel peut être ajouté en option lors de votre demande.' },
      { q: 'Le premier bilan est-il payant ?', a: 'Le premier bilan permet d\'évaluer vos objectifs et votre condition. Les modalités vous sont précisées par votre conseiller.' },
    ],
  },
  {
    cat: 'Entreprises',
    items: [
      { q: 'Quels programmes proposez-vous aux entreprises ?', a: "Des séances collectives encadrées, adaptées à la taille de vos équipes, pour intégrer davantage d'activité physique dans le quotidien de vos collaborateurs." },
      { q: 'Où se déroulent les séances entreprise ?', a: 'Dans vos locaux, dans un autre lieu de votre choix, ou à définir avec votre conseiller.' },
      { q: 'Comment obtenir une proposition ?', a: 'Remplissez le formulaire dédié sur la page Entreprise : un conseiller GBÔ vous recontacte pour construire une offre sur mesure.' },
    ],
  },
  {
    cat: 'Salles de sport',
    items: [
      { q: 'Quelles solutions proposez-vous aux salles de sport ?', a: 'Deux solutions complémentaires : E-Gym, notre plateforme de gestion (clients, abonnements, paiements, stocks, indicateurs), et la mise à disposition de personnel qualifié.' },
      { q: 'Faites-vous aussi de la mise à disposition de personnel ?', a: 'Oui. Nous recrutons, sélectionnons et mettons à votre disposition des profils qualifiés (coachs sportifs, gérants de salle), et prenons en charge leur gestion contractuelle et administrative.' },
      { q: 'Comment devenir salle partenaire GBÔ ?', a: 'Faites votre demande depuis la page dédiée aux salles partenaires : vous rejoignez un réseau qui renforce votre visibilité et votre activité.' },
    ],
  },
  {
    cat: 'Recrutement',
    items: [
      { q: 'Comment postuler à une offre chez GBÔ ?', a: 'Consultez les postes ouverts sur la page Recrutement et envoyez votre candidature directement en ligne.' },
      { q: 'Aucun poste ne correspond, puis-je postuler quand même ?', a: 'Oui. Envoyez une candidature spontanée, nous la conservons pour de futures opportunités.' },
    ],
  },
  {
    cat: 'Paiement',
    items: [
      { q: 'Combien coûte un accompagnement GBÔ ?', a: 'Le tarif dépend du programme choisi (particulier, entreprise, salle partenaire). Il vous est communiqué par votre conseiller une fois votre besoin précisé.' },
      { q: 'Quels moyens de paiement acceptez-vous ?', a: "Le site ne propose pas encore de paiement en ligne. Le règlement se fait directement auprès de GBÔ, par mobile money (Wave, Orange Money, MTN MoMo, Moov Money) ou virement, selon les modalités communiquées par votre conseiller." },
    ],
  },
  {
    cat: 'Données personnelles',
    items: [
      { q: 'Que faites-vous de mes données ?', a: 'Elles servent uniquement à traiter votre demande. Conformité Loi n° 2013-450 / ARTCI, minimisation et droit à la suppression.' },
      { q: 'Comment exercer mes droits ?', a: "Écrivez à contact@gboafricagroup.com pour l'accès, la rectification ou la suppression." },
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
