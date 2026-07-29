import AdminNav from '../../components/AdminNav.jsx';
import { useApp, formatPrice } from '../../context/AppContext.jsx';

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('fr-FR');
}

const selectStyle = { padding: '0.5rem', border: '1px solid #DDD', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' };

export default function AdminOrders() {
  const { vehicles, purchases, rentals, updatePurchaseStatus, updateRentalStatus, deletePurchase, deleteRental } = useApp();

  const getVehicleName = (vehicleId) => {
    const v = vehicles.find((veh) => veh.id === vehicleId);
    return v ? `${v.brand} ${v.model}` : 'N/A';
  };

  const handleDeletePurchase = (id) => {
    if (confirm('Êtes-vous sûr ?')) deletePurchase(id);
  };

  const handleDeleteRental = (id) => {
    if (confirm('Êtes-vous sûr ?')) deleteRental(id);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F5F5F5', minHeight: '100vh' }}>
      <AdminNav />
      <div style={{ maxWidth: '1400px', margin: '2rem auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Gestion des commandes et réservations</h1>

        <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A', marginTop: '3rem' }}>Achats</h2>
        <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', marginBottom: '3rem' }}>
          {purchases.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F5F5F5', borderBottom: '1px solid #DDD' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Numéro</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Client</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Véhicules</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Montant</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Statut</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.id} style={{ borderBottom: '1px solid #EEE' }}>
                    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{purchase.id}</td>
                    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{purchase.customer.firstName} {purchase.customer.lastName}</td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                      {purchase.items.map((item) => (
                        <div key={item.vehicleId}>{getVehicleName(item.vehicleId)}</div>
                      ))}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>{formatPrice(purchase.totalPrice)}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem' }}>{formatDate(purchase.createdAt)}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <select value={purchase.status} onChange={(e) => updatePurchaseStatus(purchase.id, e.target.value)} style={selectStyle}>
                        <option value="en_attente">En attente</option>
                        <option value="confirmée">Confirmée</option>
                        <option value="annulée">Annulée</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button onClick={() => handleDeletePurchase(purchase.id)} style={{ background: 'none', border: 'none', color: '#D32F2F', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}>
                        Suppr.
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Aucun achat enregistré.</div>
          )}
        </div>

        <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Réservations</h2>
        <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
          {rentals.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F5F5F5', borderBottom: '1px solid #DDD' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Numéro</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Client</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Véhicule</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Dates</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Montant</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Statut</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((rental) => (
                  <tr key={rental.id} style={{ borderBottom: '1px solid #EEE' }}>
                    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{rental.id}</td>
                    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{rental.customer.firstName} {rental.customer.lastName}</td>
                    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{getVehicleName(rental.vehicleId)}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem' }}>{rental.startDate} → {rental.endDate}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>{formatPrice(rental.totalPrice)}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <select value={rental.status} onChange={(e) => updateRentalStatus(rental.id, e.target.value)} style={selectStyle}>
                        <option value="en_attente">En attente</option>
                        <option value="confirmée">Confirmée</option>
                        <option value="annulée">Annulée</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button onClick={() => handleDeleteRental(rental.id)} style={{ background: 'none', border: 'none', color: '#D32F2F', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}>
                        Suppr.
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Aucune réservation enregistrée.</div>
          )}
        </div>
      </div>
    </div>
  );
}
