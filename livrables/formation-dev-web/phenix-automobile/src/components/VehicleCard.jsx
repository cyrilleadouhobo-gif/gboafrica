import { Link } from 'react-router-dom';
import { formatPrice } from '../context/AppContext.jsx';

const STATUS_MAP = {
  disponible: { label: 'Disponible', color: '#4CAF50' },
  vendu: { label: 'Vendu', color: '#999' },
  loué: { label: 'Loué', color: '#FF9800' }
};

export default function VehicleCard({ vehicle }) {
  const status = STATUS_MAP[vehicle.status] || { label: 'N/A', color: '#999' };

  return (
    <Link to={`/vehicle/${vehicle.id}`} style={{ display: 'block' }}>
      <div
        style={{
          background: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer'
        }}
      >
        <img src={vehicle.images[0]} alt={`${vehicle.brand} ${vehicle.model}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <div style={{ padding: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontFamily: "'Poppins', sans-serif", fontSize: '1.1rem', color: '#1A1A1A' }}>
            {vehicle.brand} {vehicle.model}
          </h3>
          <p style={{ margin: '0 0 0.75rem', color: '#666', fontSize: '0.9rem' }}>
            {vehicle.year} • {vehicle.fuel} • {vehicle.transmission}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ background: status.color, color: 'white', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>
              {status.label}
            </span>
            <span style={{ background: '#E3F2FD', color: '#1976D2', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem' }}>
              {vehicle.type}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {vehicle.forSale && (
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#1A1A1A' }}>
                  <strong>{formatPrice(vehicle.salePrice)}</strong>
                </p>
              )}
              {vehicle.forRent && (
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{formatPrice(vehicle.rentalPricePerDay)}/jour</p>
              )}
            </div>
            <span style={{ background: '#D32F2F', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
              Voir
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
