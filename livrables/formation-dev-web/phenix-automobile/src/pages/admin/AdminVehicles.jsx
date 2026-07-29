import { useState } from 'react';
import AdminNav from '../../components/AdminNav.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { useApp, formatPrice } from '../../context/AppContext.jsx';
import { vehiclePhoto } from '../../utils/vehicleImage.js';

const fieldStyle = { width: '100%', padding: '0.75rem', border: '1px solid #DDD', borderRadius: '4px', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontWeight: 500, marginBottom: '0.5rem' };

const emptyVehicle = {
  brand: '',
  model: '',
  year: 2024,
  type: 'sedan',
  fuel: 'essence',
  transmission: 'automatique',
  mileage: 0,
  salePrice: 0,
  rentalPricePerDay: 0,
  description: '',
  imageUrl: '',
  forSale: true,
  forRent: true
};

export default function AdminVehicles() {
  const { vehicles, addVehicle, deleteVehicle } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState(emptyVehicle);

  const updateNewVehicle = (key, value) => setNewVehicle((prev) => ({ ...prev, [key]: value }));

  const handleAddVehicle = (e) => {
    e.preventDefault();
    addVehicle({
      ...newVehicle,
      status: 'disponible',
      images: [newVehicle.imageUrl || vehiclePhoto(newVehicle.brand, Date.now())],
      features: ['Caractéristique standard']
    });
    setShowForm(false);
    setNewVehicle(emptyVehicle);
    alert('Véhicule ajouté avec succès !');
  };

  const handleDelete = (vehicleId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      deleteVehicle(vehicleId);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F5F5F5', minHeight: '100vh' }}>
      <AdminNav />
      <div style={{ maxWidth: '1400px', margin: '2rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A', margin: 0 }}>Gestion des véhicules</h1>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            style={{ padding: '0.75rem 1.5rem', background: '#D32F2F', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
          >
            {showForm ? 'Annuler' : '+ Ajouter un véhicule'}
          </button>
        </div>

        {showForm && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", marginTop: 0 }}>Nouveau véhicule</h2>
            <form onSubmit={handleAddVehicle} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Marque</label>
                <input type="text" value={newVehicle.brand} onChange={(e) => updateNewVehicle('brand', e.target.value)} required style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>Modèle</label>
                <input type="text" value={newVehicle.model} onChange={(e) => updateNewVehicle('model', e.target.value)} required style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>Année</label>
                <input type="number" value={newVehicle.year} onChange={(e) => updateNewVehicle('year', parseInt(e.target.value) || 0)} required style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>Type</label>
                <select value={newVehicle.type} onChange={(e) => updateNewVehicle('type', e.target.value)} style={fieldStyle}>
                  <option value="sedan">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="coupe">Coupé</option>
                  <option value="minivan">Monospace</option>
                  <option value="truck">Pickup</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Carburant</label>
                <select value={newVehicle.fuel} onChange={(e) => updateNewVehicle('fuel', e.target.value)} style={fieldStyle}>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="electrique">Électrique</option>
                  <option value="hybride">Hybride</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Boîte</label>
                <select value={newVehicle.transmission} onChange={(e) => updateNewVehicle('transmission', e.target.value)} style={fieldStyle}>
                  <option value="manuel">Manuel</option>
                  <option value="automatique">Automatique</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Kilométrage</label>
                <input type="number" value={newVehicle.mileage} onChange={(e) => updateNewVehicle('mileage', parseInt(e.target.value) || 0)} required style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>Prix vente (€)</label>
                <input type="number" value={newVehicle.salePrice} onChange={(e) => updateNewVehicle('salePrice', parseInt(e.target.value) || 0)} style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>Tarif location/jour (€)</label>
                <input type="number" value={newVehicle.rentalPricePerDay} onChange={(e) => updateNewVehicle('rentalPricePerDay', parseInt(e.target.value) || 0)} style={fieldStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>URL Image (optionnel)</label>
                <input type="url" placeholder="Laisser vide pour générer une image automatiquement" value={newVehicle.imageUrl} onChange={(e) => updateNewVehicle('imageUrl', e.target.value)} style={fieldStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Description</label>
                <textarea value={newVehicle.description} onChange={(e) => updateNewVehicle('description', e.target.value)} style={{ ...fieldStyle, minHeight: '80px' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={newVehicle.forSale} onChange={(e) => updateNewVehicle('forSale', e.target.checked)} />
                  <span>À vendre</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                  <input type="checkbox" checked={newVehicle.forRent} onChange={(e) => updateNewVehicle('forRent', e.target.checked)} />
                  <span>À louer</span>
                </label>
              </div>
              <button
                type="submit"
                style={{ gridColumn: '1 / -1', padding: '1rem', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
              >
                Ajouter le véhicule
              </button>
            </form>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F5F5F5', borderBottom: '1px solid #DDD' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Marque / Modèle</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Année</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Prix vente</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Tarif location</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Statut</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} style={{ borderBottom: '1px solid #EEE' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{vehicle.brand} {vehicle.model}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{vehicle.year}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{vehicle.type}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{vehicle.salePrice ? formatPrice(vehicle.salePrice) : '-'}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{vehicle.rentalPricePerDay ? formatPrice(vehicle.rentalPricePerDay) : '-'}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <StatusBadge status={vehicle.status} />
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      style={{ background: 'none', border: 'none', color: '#D32F2F', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
