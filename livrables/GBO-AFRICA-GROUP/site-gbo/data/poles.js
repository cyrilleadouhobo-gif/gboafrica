export const POLES = [
  { key: 'fitness', name: 'GBÔ Fitness', mono: 'F', tagline: 'Coaching personnalisé, sport santé, entreprise.', status: 'op', cta: 'Commencer' },
  { key: 'academy', name: 'GBÔ Academy', mono: 'A', tagline: 'Formation & certification des métiers du sport.', status: 'soon', cta: "Rejoindre la liste" },
  { key: 'events', name: 'GBÔ Events', mono: 'E', tagline: 'Événementiel sportif & bien-être.', status: 'soon', cta: "Rejoindre la liste" },
  { key: 'security', name: 'GBÔ Security', mono: 'Se', tagline: 'Sécurité & encadrement des événements.', status: 'soon', cta: "Rejoindre la liste" },
];

// Icônes des lignes de fonctionnalités (voir POLE_DETAIL[*].features) — style cohérent avec
// les icônes SVG déjà utilisées sur l'accueil et la page Fitness (trait, viewBox 24x24).
const ICONS = {
  book: (
    <>
      <path d="M2 9l10-5 10 5-10 5-10-5z" />
      <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
      <path d="M16.5 15.2c2.6.5 4.5 2.7 4.5 5.8" />
    </>
  ),
  chart: <path d="M4 19V9M11 19V4M18 19v-7" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 01-10 0V4z" />
      <path d="M5 4H3v2a4 4 0 004 4M19 4h2v2a4 4 0 01-4 4" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.5 2.4 15.5 0 18M12 3c-2.4 2.5-2.4 15.5 0 18" />
    </>
  ),
  shield: <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />,
  building: (
    <>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15a7.97 7.97 0 000-6l2-1.7-2-3.4-2.3.9a8 8 0 00-2-1.2L14.6 1H9.4l-.5 2.6a8 8 0 00-2 1.2l-2.3-.9-2 3.4L4.6 9a7.97 7.97 0 000 6l-2 1.7 2 3.4 2.3-.9c.6.5 1.3.9 2 1.2l.5 2.6h5.2l.5-2.6a8 8 0 002-1.2l2.3.9 2-3.4-2-1.7z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h2l2.6 13.2a2 2 0 002 1.8h8.8a2 2 0 002-1.6L21 7H6" />
    </>
  ),
};

export const POLE_DETAIL = {
  academy: {
    name: 'GBÔ Academy',
    headline: ['SE FORMER', 'POUR FAIRE', 'AVANCER LE SPORT.'],
    heroText:
      'GBÔ Academy développe des formations destinées aux professionnels, futurs professionnels et acteurs du secteur sportif, avec une approche orientée vers les compétences et la pratique.',
    corner: ['PLUS DE COMPÉTENCES', 'POUR UN SPORT', 'PLUS FORT.'],
    photo: 'https://images.pexels.com/photos/6740171/pexels-photo-6740171.jpeg?auto=compress&cs=tinysrgb&w=1600',
    features: [
      { label: 'Formations professionnelles', icon: ICONS.book },
      { label: 'Développement des compétences', icon: ICONS.people },
      { label: 'Une expertise de terrain', icon: ICONS.chart },
      { label: "Un impact durable sur l'écosystème", icon: ICONS.globe },
    ],
  },
  talent: {
    name: 'GBÔ Talent',
    headline: ['DÉTECTER ET FAIRE', 'GRANDIR LES TALENTS', 'SPORTIFS DE DEMAIN.'],
    heroText:
      "GBÔ Talent identifiera et accompagnera les jeunes talents à fort potentiel, avec un suivi sportif, mental et éducatif structuré.",
    photo: stockPhotoUrl('team', 'talent-hero'),
    features: [
      { label: 'Détection de potentiel', icon: ICONS.target },
      { label: 'Accompagnement individualisé', icon: ICONS.people },
      { label: 'Suivi sportif et éducatif', icon: ICONS.chart },
      { label: 'Mise en relation avec clubs', icon: ICONS.globe },
    ],
  },
  events: {
    name: 'GBÔ Events',
    headline: ['DES EXPÉRIENCES QUI', 'RASSEMBLENT ET FONT', 'AVANCER LE SPORT.'],
    heroText:
      'GBÔ Events conçoit et organise des événements sportifs, des challenges et des expériences qui rassemblent les communautés et valorisent la pratique sportive en Afrique.',
    photo: 'https://images.pexels.com/photos/30278406/pexels-photo-30278406.jpeg?auto=compress&cs=tinysrgb&w=1600',
    features: [
      { label: 'Événements sportifs', icon: ICONS.calendar },
      { label: 'Communautés et challenges', icon: ICONS.people },
      { label: 'Des expériences uniques', icon: ICONS.trophy },
      { label: 'Un sport plus dynamique en Afrique', icon: ICONS.globe },
    ],
  },
  shop: {
    name: 'GBÔ Shop',
    headline: ['DES PRODUITS PENSÉS', 'POUR VOTRE', 'PRATIQUE SPORTIVE.'],
    heroText:
      "GBÔ Shop proposera une sélection rigoureuse de produits de nutrition, d'équipements et de textile sportif, choisie par nos coachs.",
    photo: stockPhotoUrl('gymInterior', 'shop-hero'),
    features: [
      { label: 'Nutrition sportive', icon: ICONS.cart },
      { label: "Équipements d'entraînement", icon: ICONS.gear },
      { label: 'Textile & accessoires GBÔ', icon: ICONS.trophy },
      { label: 'Sélection experte par nos coachs', icon: ICONS.people },
    ],
  },
  security: {
    name: 'GBÔ Security',
    headline: ['DES SOLUTIONS', 'DE SÉCURITÉ POUR', 'UN SPORT PLUS SÛR.'],
    heroText:
      'GBÔ Security développe des solutions de sécurité adaptées aux événements, infrastructures et activités liées au sport, pour des environnements plus sûrs et plus sereins.',
    corner: ['DES ESPACES', 'PLUS SÛRS', 'POUR UN SPORT', 'PLUS FORT.'],
    photo: 'https://images.pexels.com/photos/34585117/pexels-photo-34585117.jpeg?auto=compress&cs=tinysrgb&w=1600',
    features: [
      { label: "Sécurité d'événements", icon: ICONS.shield },
      { label: "Protection d'infrastructures", icon: ICONS.building },
      { label: 'Encadrement des activités', icon: ICONS.people },
      { label: 'Des solutions adaptées au secteur sportif', icon: ICONS.gear },
    ],
  },
};

// Petit relais local vers stockPhoto() pour les pôles sans photo Pexels dédiée déjà
// vérifiée (Talent, Shop) — évite d'importer stockPhoto ici juste pour deux entrées.
function stockPhotoUrl(category, seed) {
  const BANK = {
    team: ['photo-1573164574511-73c773193279', 'photo-1573164574397-dd250bc8a598', 'photo-1584365132623-e273491c69d2'],
    gymInterior: ['photo-1534438327276-14e5300c3a48'],
  };
  const pool = BANK[category] || BANK.team;
  let h = 0;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  const id = pool[h % pool.length];
  return `https://images.unsplash.com/${id}?w=1600&h=900&q=75&auto=format&fit=crop`;
}

export function badgeStyle(status) {
  if (status === 'op') {
    return 'display:inline-block;margin-top:8px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.3px;background:var(--lime,#C6F202);color:#000';
  }
  return 'display:inline-block;margin-top:8px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.3px;background:var(--surface2,#222);color:var(--muted,#8a8a8a);border:1px solid var(--border,rgba(255,255,255,.14))';
}
