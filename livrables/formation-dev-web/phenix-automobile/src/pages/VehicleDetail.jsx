import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import { useApp, formatPrice } from '../context/AppContext.jsx';
import { VEHICLE_TYPE_LABELS } from '../data/vehicles.js';

export default function VehicleDetail() {
  const { id } = useParams();
  const { vehicles, addToCart } = useApp();
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <>
        <Navbar />
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
          <p>Véhicule introuvable.</p>
          <Link to="/catalog-sale" style={{ color: '#1976D2' }}>Retour au catalogue</Link>
        </div>
        <Footer />
      </>
    );
  }

  const similar = vehicles.filter((v) => v.type === vehicle.type && v.id !== vehicle.id).slice(0, 3);
  const vehicleType = VEHICLE_TYPE_LABELS[vehicle.type] || vehicle.type;

  const handleAddToCart = () => {
    addToCart(vehicle.id);
    alert('Véhicule ajouté au panier !');
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
        <Link to="/catalog-sale" style={{ color: '#1976D2', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>
          ← Retour au catalogue
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', background: 'white', padding: '2rem', borderRadius: '8px' }}>
          <div>
            <img src={vehicle.images[0]} alt={`${vehicle.brand} ${vehicle.model}`} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {vehicle.images.map((img, i) => (
                <img key={i} src={img} alt="" style={{ height: '80px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', opacity: 0.7 }} />
              ))}
            </div>
          </div>

          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: '0 0 0.5rem', color: '#1A1A1A', fontSize: '2.5rem' }}>
              {vehicle.brand} {vehicle.model}
            </h1>
            <p style={{ color: '#666', margin: '0 0 1rem', fontSize: '1.1rem' }}>{vehicle.year} • {vehicle.mileage} km</p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <StatusBadge status={vehicle.status} />
              <span style={{ background: '#E3F2FD', color: '#1976D2', padding: '0.4rem 0.9rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 500 }}>
                {vehicleType}
              </span>
            </div>

            {vehicle.salePrice ? (
              <div style={{ background: '#F9F9F9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                <p style={{ margin: '0 0 1rem', color: '#666' }}>Prix d'achat</p>
                <h2 style={{ margin: '0 0 1rem', color: '#D32F2F', fontSize: '2rem' }}>{formatPrice(vehicle.salePrice)}</h2>
                <button
                  onClick={handleAddToCart}
                  style={{ width: '100%', padding: '1rem', background: '#D32F2F', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Ajouter au panier
                </button>
              </div>
            ) : null}

            {vehicle.rentalPricePerDay ? (
              <div style={{ background: '#F9F9F9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                <p style={{ margin: '0 0 1rem', color: '#666' }}>Tarif de location</p>
                <h2 style={{ margin: '0 0 1rem', color: '#1976D2', fontSize: '2rem' }}>{formatPrice(vehicle.rentalPricePerDay)}/jour</h2>
                <Link
                  to={`/rental/${vehicle.id}`}
                  style={{ display: 'block', padding: '1rem', background: '#1976D2', color: 'white', borderRadius: '4px', fontWeight: 600, textAlign: 'center' }}
                >
                  Réserver une location
                </Link>
              </div>
            ) : null}

            <div>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A', marginTop: 0 }}>Caractéristiques</h3>
              <dl style={{ margin: 0, fontSize: '0.95rem' }}>
                <dt style={{ fontWeight: 600, color: '#1A1A1A', marginTop: '0.75rem' }}>Carburant</dt>
                <dd style={{ margin: '0.25rem 0 0 0', color: '#666' }}>{vehicle.fuel}</dd>
                <dt style={{ fontWeight: 600, color: '#1A1A1A', marginTop: '0.75rem' }}>Boîte de vitesses</dt>
                <dd style={{ margin: '0.25rem 0 0 0', color: '#666' }}>{vehicle.transmission}</dd>
                <dt style={{ fontWeight: 600, color: '#1A1A1A', marginTop: '0.75rem' }}>Type</dt>
                <dd style={{ margin: '0.25rem 0 0 0', color: '#666' }}>{vehicleType}</dd>
                <dt style={{ fontWeight: 600, color: '#1A1A1A', marginTop: '0.75rem' }}>Kilométrage</dt>
                <dd style={{ margin: '0.25rem 0 0 0', color: '#666' }}>{vehicle.mileage} km</dd>
              </dl>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Description</h2>
          <p style={{ color: '#666', lineHeight: 1.8 }}>{vehicle.description}</p>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginTop: '2rem', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Équipements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {vehicle.features.map((feature) => (
              <div key={feature} style={{ padding: '1rem', background: '#F5F5F5', borderRadius: '4px', textAlign: 'center', fontSize: '0.9rem' }}>
                ✓ {feature}
              </div>
            ))}
          </div>
        </div>

        {similar.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Véhicules similaires</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {similar.map((sim) => (
                <VehicleCard key={sim.id} vehicle={sim} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
