import { vehiclePhoto } from '../utils/vehicleImage.js';

const rawVehicles = [
  { id: 'v1', brand: 'BMW', model: '320i', type: 'sedan', year: 2023, fuel: 'essence', transmission: 'automatique', status: 'disponible', salePrice: 35000, rentalPricePerDay: 120, mileage: 15000, description: 'Berline sportive et élégante, très fiable.', features: ['Climatisation', 'Sièges cuir', 'Toit ouvrant', 'Navigation GPS'], forSale: true, forRent: true },
  { id: 'v2', brand: 'Tesla', model: 'Model 3', type: 'sedan', year: 2024, fuel: 'electrique', transmission: 'automatique', status: 'disponible', salePrice: 55000, rentalPricePerDay: 150, mileage: 5000, description: 'Véhicule électrique haut de gamme, autonomie 500km.', features: ['Autopilot', 'Batterie 75kWh', 'Supercharging', 'Intérieur minimaliste'], forSale: true, forRent: true },
  { id: 'v3', brand: 'Mercedes', model: 'C-Class', type: 'sedan', year: 2022, fuel: 'diesel', transmission: 'automatique', status: 'disponible', salePrice: 42000, rentalPricePerDay: 130, mileage: 45000, description: 'Luxe et confort, moteur diesel économe.', features: ['Cuir premium', 'Système audio Burmester', 'Toit panoramique', 'Sièges massants'], forSale: true, forRent: true },
  { id: 'v4', brand: 'Audi', model: 'Q5', type: 'suv', year: 2023, fuel: 'essence', transmission: 'automatique', status: 'disponible', salePrice: 48000, rentalPricePerDay: 140, mileage: 20000, description: 'SUV premium avec traction intégrale.', features: ['Quattro AWD', 'Cockpit digital', 'Sièges chauffants', 'Aide au stationnement'], forSale: true, forRent: true },
  { id: 'v5', brand: 'Range Rover', model: 'Evoque', type: 'suv', year: 2024, fuel: 'hybride', transmission: 'automatique', status: 'disponible', salePrice: 65000, rentalPricePerDay: 180, mileage: 8000, description: 'SUV compact luxueux avec moteur hybride.', features: ['Moteur hybride', 'Toit panoramique', 'Sièges ventilés', 'Système audio premium'], forSale: true, forRent: true },
  { id: 'v6', brand: 'Porsche', model: '911 Carrera', type: 'coupe', year: 2023, fuel: 'essence', transmission: 'automatique', status: 'disponible', salePrice: 120000, rentalPricePerDay: 300, mileage: 12000, description: 'Voiture de sport iconique, performances exceptionnelles.', features: ['Moteur 6-cylindre 450cv', 'Freins sport', 'Suspension pneumatique', 'Intérieur cuir'], forSale: true, forRent: true },
  { id: 'v7', brand: 'Toyota', model: 'Corolla', type: 'sedan', year: 2022, fuel: 'essence', transmission: 'manuel', status: 'disponible', salePrice: 22000, rentalPricePerDay: 80, mileage: 55000, description: 'Voiture fiable et économique, idéale pour tous les jours.', features: ['Consommation faible', 'Climatisation', 'Airbags multiples', 'ABS'], forSale: true, forRent: true },
  { id: 'v8', brand: 'Volkswagen', model: 'Golf', type: 'coupe', year: 2023, fuel: 'essence', transmission: 'automatique', status: 'disponible', salePrice: 28000, rentalPricePerDay: 95, mileage: 18000, description: 'Voiture compacte dynamique, très agile en ville.', features: ['Boîte automatique 7 vitesses', 'Climatisation', 'Aide au parking', 'USB'], forSale: true, forRent: true },
  { id: 'v9', brand: 'Honda', model: 'CR-V', type: 'suv', year: 2023, fuel: 'essence', transmission: 'automatique', status: 'disponible', salePrice: 38000, rentalPricePerDay: 110, mileage: 25000, description: 'SUV fiable avec grand coffre, parfait pour les familles.', features: ['7 places', 'Traction intégrale', 'Sièges rabattables', 'Caméra de recul'], forSale: true, forRent: true },
  { id: 'v10', brand: 'Hyundai', model: 'i30', type: 'coupe', year: 2022, fuel: 'diesel', transmission: 'manuel', status: 'disponible', salePrice: 20000, rentalPricePerDay: 75, mileage: 60000, description: 'Citadine pratique avec bon rapport qualité-prix.', features: ['Moteur économe', 'Climatisation', 'Vitres électriques', 'Ceintures de sécurité 3 points'], forSale: true, forRent: true },
  { id: 'v11', brand: 'Ford', model: 'F-150', type: 'truck', year: 2023, fuel: 'essence', transmission: 'automatique', status: 'disponible', salePrice: 52000, rentalPricePerDay: 160, mileage: 30000, description: 'Pickup robuste pour travail ou loisirs.', features: ['Capacité de remorquage 5000kg', 'Benne 4x4', 'Suspension sport', 'Intérieur spacieux'], forSale: true, forRent: true },
  { id: 'v12', brand: 'Chevrolet', model: 'Silverado', type: 'truck', year: 2022, fuel: 'essence', transmission: 'automatique', status: 'disponible', salePrice: 48000, rentalPricePerDay: 150, mileage: 35000, description: 'Camion américain avec grand confort.', features: ['Moteur V8', 'Intérieur moderne', 'Sièges chauffants', 'Écran tactile 8 pouces'], forSale: true, forRent: true },
  { id: 'v13', brand: 'Kia', model: 'Niro', type: 'suv', year: 2024, fuel: 'hybride', transmission: 'automatique', status: 'disponible', salePrice: 35000, rentalPricePerDay: 105, mileage: 3000, description: 'SUV compact écologique avec moteur hybride.', features: ['Moteur hybride', 'Consommation réduite', 'Toit panoramique', 'Système hybride avancé'], forSale: true, forRent: true },
  { id: 'v14', brand: 'Renault', model: 'Espace', type: 'minivan', year: 2023, fuel: 'diesel', transmission: 'automatique', status: 'disponible', salePrice: 32000, rentalPricePerDay: 100, mileage: 22000, description: 'Monospace 7 places pour toute la famille.', features: ['7 places', 'Portes coulissantes', 'Climatisation zones multiples', 'Boîte 6 vitesses'], forSale: true, forRent: true },
  { id: 'v15', brand: 'Nissan', model: 'Leaf', type: 'coupe', year: 2024, fuel: 'electrique', transmission: 'automatique', status: 'disponible', salePrice: 40000, rentalPricePerDay: 125, mileage: 2000, description: 'Voiture électrique écologique et silencieuse.', features: ['Batterie 62kWh', 'Autonomie 400km', 'Recharge rapide', 'Intérieur écologique'], forSale: true, forRent: true }
];

export const initialVehicles = rawVehicles.map((v) => ({
  ...v,
  images: [vehiclePhoto(v.brand, parseInt(v.id.replace(/[^0-9]/g, ''), 10) || 1)]
}));

export const initialPurchases = [
  { id: 'order1', items: [{ vehicleId: 'v1', price: 35000 }], totalPrice: 35000, status: 'confirmée', customer: { firstName: 'Jean', lastName: 'Dupont', email: 'jean@example.com', phone: '06123456', address: '10 rue de Paris', city: 'Paris', zipCode: '75001' }, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'order2', items: [{ vehicleId: 'v7', price: 22000 }], totalPrice: 22000, status: 'en_attente', customer: { firstName: 'Marie', lastName: 'Martin', email: 'marie@example.com', phone: '06234567', address: '20 rue Lyon', city: 'Lyon', zipCode: '69001' }, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }
];

export const initialRentals = [
  { id: 'rental1', vehicleId: 'v2', startDate: '2026-08-05', endDate: '2026-08-12', totalPrice: 1050, status: 'confirmée', customer: { firstName: 'Pierre', lastName: 'Bernard', email: 'pierre@example.com', phone: '06345678', address: '30 avenue Nice', city: 'Nice', zipCode: '06000' }, createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'rental2', vehicleId: 'v4', startDate: '2026-08-10', endDate: '2026-08-15', totalPrice: 700, status: 'en_attente', customer: { firstName: 'Sophie', lastName: 'Leclerc', email: 'sophie@example.com', phone: '06456789', address: '40 boulevard Marseille', city: 'Marseille', zipCode: '13000' }, createdAt: new Date().toISOString() }
];

export const VEHICLE_TYPE_LABELS = {
  sedan: 'Berline',
  suv: 'SUV',
  coupe: 'Coupé',
  minivan: 'Monospace',
  truck: 'Pickup'
};
