export const POLES = [
  { key: 'fitness', name: 'GBÔ Fitness', mono: 'F', tagline: 'Coaching personnalisé, sport santé, entreprise.', status: 'op', cta: 'Commencer' },
  { key: 'academy', name: 'GBÔ Academy', mono: 'A', tagline: 'Formation & certification des métiers du sport.', status: 'soon', cta: "Rejoindre la liste" },
  { key: 'talent', name: 'GBÔ Talent', mono: 'T', tagline: 'Détection & développement des talents.', status: 'soon', cta: "Rejoindre la liste" },
  { key: 'events', name: 'GBÔ Events', mono: 'E', tagline: 'Événementiel sportif & bien-être.', status: 'soon', cta: "Rejoindre la liste" },
  { key: 'shop', name: 'GBÔ Shop', mono: 'S', tagline: 'Nutrition, équipements & textile.', status: 'soon', cta: "Rejoindre la liste" },
  { key: 'security', name: 'GBÔ Security', mono: 'Se', tagline: 'Sécurité & encadrement des événements.', status: 'soon', cta: "Rejoindre la liste" },
];

export const POLE_DETAIL = {
  academy: {
    name: 'GBÔ Academy',
    tagline: 'Former et certifier les métiers du sport et du bien-être en Afrique.',
    intro: "GBÔ Academy sera l'organisme de formation et de certification de l'écosystème GBÔ : coachs sportifs, éducateurs, spécialistes du sport santé. Un référentiel qualité exigeant, des parcours reconnus, une passerelle directe vers le réseau de coachs GBÔ.",
    vision: "Faire émerger une génération de professionnels du sport certifiés selon un standard africain d'excellence.",
    services: ['Certification Coach GBÔ', 'Formations spécialisées (prénatal, senior, sport santé)', 'E-learning & sessions présentielles', 'Passerelle vers le réseau de coachs GBÔ', 'Formation continue & mise à niveau'],
    faqs: [
      { q: 'Quand la formation ouvrira-t-elle ?', a: "Le calendrier est en cours de finalisation. Inscrivez-vous à la liste d'attente pour être prévenu en priorité." },
      { q: "À qui s'adresse GBÔ Academy ?", a: 'Aux futurs coachs, éducateurs sportifs et professionnels du bien-être souhaitant une certification reconnue.' },
      { q: 'Les certifications seront-elles reconnues ?', a: 'Le référentiel qualité et les partenariats de reconnaissance sont en cours de structuration.' },
    ],
  },
  talent: {
    name: 'GBÔ Talent',
    tagline: 'Détecter, accompagner et révéler les talents sportifs de demain.',
    intro: 'GBÔ Talent identifiera et accompagnera les jeunes talents à fort potentiel, avec un suivi sportif, mental et éducatif structuré.',
    vision: "Offrir à chaque talent africain une chance réelle de vivre son potentiel jusqu'au plus haut niveau.",
    services: ['Détection & évaluation de potentiel', "Programme d'accompagnement individualisé", 'Suivi sportif, mental & nutritionnel', 'Mise en relation avec clubs & structures', 'Bourses & soutien aux talents'],
    faqs: [
      { q: 'Comment un talent est-il détecté ?', a: "Via des sessions d'évaluation et des partenariats avec clubs et écoles. Détails à venir." },
      { q: 'Quels sports seront concernés ?', a: 'Le périmètre précis est en cours de définition par la direction.' },
    ],
  },
  events: {
    name: 'GBÔ Events',
    tagline: "Créer les rendez-vous du sport et du bien-être en Côte d'Ivoire.",
    intro: 'GBÔ Events concevra et produira des événements fédérateurs : Fitness Day, challenges inter-entreprises, masterclass et rassemblements communautaires.',
    vision: "Devenir le créateur des grands rendez-vous du mouvement en Afrique de l'Ouest.",
    services: ['GBÔ Fitness Day', 'Challenges inter-entreprises & inter-équipes', 'Masterclass & bootcamps', 'Événements corporate sur mesure', 'Rassemblements communautaires'],
    faqs: [
      { q: 'Quand aura lieu le premier événement ?', a: "La programmation est en préparation. La liste d'attente sera notifiée en priorité." },
      { q: 'Peut-on privatiser un événement ?', a: "Oui, les formats corporate seront proposés dès l'ouverture du pôle." },
    ],
  },
  shop: {
    name: 'GBÔ Shop',
    tagline: 'Nutrition, équipements et textile aux standards GBÔ.',
    intro: "GBÔ Shop proposera une sélection rigoureuse de produits de nutrition, d'équipements et de textile sportif. L'infrastructure e-commerce est préparée structurellement et sera activée ultérieurement.",
    vision: 'Rendre accessible un équipement de qualité, pensé pour le contexte et les besoins locaux.',
    services: ['Compléments & nutrition sportive', "Équipements de training", 'Textile & accessoires GBÔ', 'Sélection experte par nos coachs', 'Livraison Abidjan & environs'],
    faqs: [
      { q: 'Peut-on déjà commander ?', a: "Non. L'e-commerce est préparé mais non activé. Rejoignez la liste pour l'ouverture." },
      { q: 'Les produits seront-ils certifiés ?', a: 'La sélection suivra un cahier des charges qualité strict.' },
    ],
  },
  security: {
    name: 'GBÔ Security',
    tagline: 'Encadrement et sécurité des personnes et des événements.',
    intro: "GBÔ Security proposera des prestations de sécurité et d'encadrement, en cohérence avec les valeurs de rigueur et de professionnalisme de la marque.",
    vision: 'Assurer un cadre sûr et professionnel pour les personnes, les structures et les événements.',
    services: ['Sécurité événementielle', 'Encadrement & gardiennage', 'Formation aux gestes de premiers secours', 'Prévention & gestion des risques', 'Conseil en sûreté'],
    faqs: [
      { q: 'Quel est le périmètre exact ?', a: 'Le périmètre de GBÔ Security est en cours de définition par la direction.' },
      { q: 'Proposez-vous des formations ?', a: 'Des modules de formation sont envisagés. Détails à venir.' },
    ],
  },
};

export function badgeStyle(status) {
  if (status === 'op') {
    return 'display:inline-block;margin-top:8px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.3px;background:var(--lime,#C6F202);color:#000';
  }
  return 'display:inline-block;margin-top:8px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.3px;background:var(--surface2,#222);color:var(--muted,#8a8a8a);border:1px solid var(--border,rgba(255,255,255,.14))';
}
