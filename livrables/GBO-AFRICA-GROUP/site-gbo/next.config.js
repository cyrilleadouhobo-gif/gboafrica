/** @type {import('next').NextConfig} */
const nextConfig = {
  // Évite de révéler inutilement la techno via l'en-tête X-Powered-By (audit du 23/11/2026).
  poweredByHeader: false,
  async redirects() {
    return [
      // Page fusionnée dans /devenir-salle-partenaire (avantages + réseau + candidature réunis).
      { source: '/fitness/salles-partenaires', destination: '/devenir-salle-partenaire', permanent: true },
      // POLES (data/poles.js) traite fitness comme le pôle actif et pointe déjà /fitness
      // depuis le header/footer, mais POLE_DETAIL n'a pas d'entrée 'fitness' — sans ce
      // redirect, un lien direct vers /poles/fitness (ancien partage, moteur de recherche)
      // tombe sur un 404 au lieu d'atterrir sur la vraie page du pôle.
      { source: '/poles/fitness', destination: '/fitness', permanent: true },
    ];
  },
};

module.exports = nextConfig;
