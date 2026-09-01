/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Page fusionnée dans /devenir-salle-partenaire (avantages + réseau + candidature réunis).
      { source: '/fitness/salles-partenaires', destination: '/devenir-salle-partenaire', permanent: true },
    ];
  },
};

module.exports = nextConfig;
