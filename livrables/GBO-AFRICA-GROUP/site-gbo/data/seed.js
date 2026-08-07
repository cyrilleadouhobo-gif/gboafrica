export const STATUSES = ['Nouveau', 'À contacter', 'Qualifié', 'Coach attribué', 'Client', 'Perdu / En pause'];

export function seedLeads() {
  return [
    { id: 'L-1042', name: 'Awa Koné', type: 'Particulier', objective: 'Perdre du poids', profile: 'Femme', source: 'Tunnel Particulier', status: 'Nouveau', commune: 'Cocody', date: '07/08', coach: null },
    { id: 'L-1041', name: 'Ismaël Traoré', type: 'Particulier', objective: 'Rester autonome et actif', profile: 'Senior', source: 'Tunnel Particulier', status: 'À contacter', commune: 'Marcory', date: '06/08', coach: null },
    { id: 'L-1040', name: 'Fatou Diallo', type: 'Particulier', objective: 'Rester active pendant la grossesse', profile: 'Femme enceinte', source: 'Tunnel Particulier', status: 'Qualifié', commune: 'Plateau', date: '05/08', coach: null },
    { id: 'L-1039', name: 'SUNU Assurances', type: 'Entreprise', objective: 'Fitness en entreprise', profile: '—', source: 'Corporate', status: 'Coach attribué', commune: 'Plateau', date: '04/08', coach: 'Coach Grace', contact: 'Mme Koffi' },
    { id: 'L-1038', name: 'Jordan M.', type: "Liste d'attente", objective: 'GBÔ Academy', profile: '—', source: "Liste d'attente", status: 'Nouveau', commune: 'Yopougon', date: '04/08', coach: null, pole: 'Academy' },
    { id: 'L-1037', name: 'Serge Bamba', type: 'Particulier', objective: 'Prendre du muscle', profile: 'Adulte', source: 'Tunnel Particulier', status: 'Client', commune: 'Cocody', date: '01/08', coach: 'Coach Ibrahim' },
    { id: 'L-1036', name: 'Orange CI', type: 'Entreprise', objective: 'Team building sportif', profile: '—', source: 'Corporate', status: 'Qualifié', commune: 'Plateau', date: '30/07', coach: null, contact: "R. N'Guessan" },
    { id: 'L-1035', name: 'Mariam S.', type: "Liste d'attente", objective: 'GBÔ Shop', profile: '—', source: "Liste d'attente", status: 'Nouveau', commune: 'Abobo', date: '29/07', coach: null, pole: 'Shop' },
  ];
}

export function seedCoaches() {
  return [
    { name: 'Coach Awa', spec: 'Prénatal / Postnatal', zones: 'Cocody, Plateau', dispo: 'Disponible', clients: 8 },
    { name: 'Coach Yao', spec: 'Perte de poids, Renfo', zones: 'Marcory, Treichville', dispo: 'Complet', clients: 12 },
    { name: 'Coach Grace', spec: 'Senior, Sport santé', zones: 'Cocody, Riviera', dispo: 'Disponible', clients: 6 },
    { name: 'Coach Ibrahim', spec: 'Prise de masse, Perf', zones: 'Yopougon, Abobo', dispo: 'Disponible', clients: 9 },
  ];
}
