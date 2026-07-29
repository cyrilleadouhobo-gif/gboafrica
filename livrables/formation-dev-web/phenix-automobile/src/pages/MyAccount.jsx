import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useApp, formatPrice } from '../context/AppContext.jsx';

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('fr-FR');
}

export default function MyAccount() {
  const { vehicles, purchases, rentals } = useApp();

  const getVehicleName = (vehicleId) => {
    const v = vehicles.find((veh) => veh.id === vehicleId);
    return v ? `${v.brand} ${v.model}` : 'N/A';
  };

  const totalSpent = [...purchases, ...rentals].reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Mon compte</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.9rem' }}>Achats totaux</p>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#D32F2F' }}>{purchases.length}</p>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.9rem' }}>Réservations actives</p>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#1976D2' }}>{rentals.filter((r) => r.status === 'confirmée').length}</p>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.9rem' }}>Montant dépensé</p>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#4CAF50' }}>{formatPrice(totalSpent)}</p>
          </div>
        </div>

        <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Mes achats</h2>
        {purchases.length > 0 ? (
          <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', marginBottom: '3rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F5F5F5', borderBottom: '1px solid #DDD' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Numéro</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Véhicules</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Montant</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.id} style={{ borderBottom: '1px solid #EEE' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{purchase.id}</td>
                    <td style={{ padding: '1rem' }}>
                      {purchase.items.map((item) => (
                        <div key={item.vehicleId} style={{ fontSize: '0.9rem', color: '#666' }}>{getVehicleName(item.vehicleId)}</div>
                      ))}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#D32F2F', fontWeight: 600 }}>{formatPrice(purchase.totalPrice)}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>{formatDate(purchase.createdAt)}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <StatusBadge status={purchase.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#666' }}>Aucun achat enregistré.</p>
          </div>
        )}

        <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Mes réservations</h2>
        {rentals.length > 0 ? (
          <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', marginBottom: '3rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F5F5F5', borderBottom: '1px solid #DDD' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Numéro</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Véhicule</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Du - Au</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Montant</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((rental) => (
                  <tr key={rental.id} style={{ borderBottom: '1px solid #EEE' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{rental.id}</td>
                    <td style={{ padding: '1rem' }}>{getVehicleName(rental.vehicleId)}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>{rental.startDate} - {rental.endDate}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#1976D2', fontWeight: 600 }}>{formatPrice(rental.totalPrice)}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <StatusBadge status={rental.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: '#666' }}>Aucune réservation enregistrée.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
