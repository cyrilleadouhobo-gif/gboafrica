import AdminNav from '../../components/AdminNav.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { useApp, formatPrice } from '../../context/AppContext.jsx';

export default function AdminDashboard() {
  const { vehicles, purchases, rentals } = useApp();

  const getVehicleName = (vehicleId) => {
    const v = vehicles.find((veh) => veh.id === vehicleId);
    return v ? `${v.brand} ${v.model}` : 'N/A';
  };

  const vehiclesForSale = vehicles.filter((v) => v.forSale && v.status !== 'vendu').length;
  const vehiclesForRent = vehicles.filter((v) => v.forRent && v.status !== 'loué').length;
  const pendingOrders = purchases.filter((p) => p.status === 'en_attente').length;
  const activeRentals = rentals.filter((r) => r.status === 'confirmée').length;
  const recentPurchases = [...purchases].slice(-3).reverse();
  const recentRentals = [...rentals].slice(-3).reverse();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F5F5F5', minHeight: '100vh' }}>
      <AdminNav />
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Tableau de bord</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 0.75rem', color: '#666', fontSize: '0.9rem' }}>Véhicules en vente</p>
            <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700, color: '#D32F2F' }}>{vehiclesForSale}</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 0.75rem', color: '#666', fontSize: '0.9rem' }}>Véhicules à louer</p>
            <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700, color: '#1976D2' }}>{vehiclesForRent}</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 0.75rem', color: '#666', fontSize: '0.9rem' }}>Commandes en attente</p>
            <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700, color: '#FF9800' }}>{pendingOrders}</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 0.75rem', color: '#666', fontSize: '0.9rem' }}>Réservations actives</p>
            <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700, color: '#4CAF50' }}>{activeRentals}</p>
          </div>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A', marginTop: 0 }}>Commandes récentes</h2>
          {recentPurchases.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F5F5F5', borderBottom: '1px solid #DDD' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Numéro</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Client</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Montant</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map((purchase) => (
                  <tr key={purchase.id} style={{ borderBottom: '1px solid #EEE' }}>
                    <td style={{ padding: '0.75rem' }}>{purchase.id}</td>
                    <td style={{ padding: '0.75rem' }}>{purchase.customer.firstName} {purchase.customer.lastName}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>{formatPrice(purchase.totalPrice)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <StatusBadge status={purchase.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#666', margin: 0 }}>Aucune commande.</p>
          )}
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A', marginTop: 0 }}>Réservations récentes</h2>
          {recentRentals.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F5F5F5', borderBottom: '1px solid #DDD' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Numéro</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Véhicule</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Dates</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentRentals.map((rental) => (
                  <tr key={rental.id} style={{ borderBottom: '1px solid #EEE' }}>
                    <td style={{ padding: '0.75rem' }}>{rental.id}</td>
                    <td style={{ padding: '0.75rem' }}>{getVehicleName(rental.vehicleId)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.85rem' }}>{rental.startDate} - {rental.endDate}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <StatusBadge status={rental.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#666', margin: 0 }}>Aucune réservation.</p>
          )}
        </div>
      </div>
    </div>
  );
}
