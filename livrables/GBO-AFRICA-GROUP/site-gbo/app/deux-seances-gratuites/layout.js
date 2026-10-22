// page.js est un composant client (formulaire avec état) et ne peut donc pas exporter
// `metadata` — ce layout, lui, reste un composant serveur et porte le titre de l'onglet.
export const metadata = {
  title: 'Deux séances gratuites — GBÔ AFRICA GROUP',
  description: "Complétez vos coordonnées, votre commune et votre objectif : un conseiller vous offre deux premières séances avec un bilan complet.",
};

export default function DeuxSeancesGratuitesLayout({ children }) {
  return children;
}
