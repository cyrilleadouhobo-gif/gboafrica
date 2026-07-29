import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useApp, formatPrice } from '../context/AppContext.jsx';

const fieldStyle = { width: '100%', padding: '0.75rem', border: '1px solid #DDD', borderRadius: '4px', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#1A1A1A' };

const emptyForm = { startDate: '', endDate: '', firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zipCode: '' };

function calculateDuration(startDate, endDate) {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, days);
}

export default function RentalCheckout() {
  const { id } = useParams();
  const { vehicles, addRental } = useApp();
  const vehicle = vehicles.find((v) => v.id === id) || {};
  const [formData, setFormData] = useState(emptyForm);
  const [rentalConfirmed, setRentalConfirmed] = useState(false);
  const [reservationId, setReservationId] = useState(null);

  const duration = useMemo(() => calculateDuration(formData.startDate, formData.endDate), [formData.startDate, formData.endDate]);
  const subtotal = (vehicle.rentalPricePerDay || 0) * duration;
  const taxes = subtotal * 0.2;
  const total = subtotal + taxes;

  const updateForm = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservationId = 'RES-' + Date.now();
    addRental({
      id: newReservationId,
      vehicleId: id,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalPrice: total,
      status: 'confirmée',
      customer: formData,
      createdAt: new Date().toISOString()
    });
    setReservationId(newReservationId);
    setRentalConfirmed(true);
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Réserver une location</h1>

        {!rentalConfirmed ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", marginTop: 0 }}>Véhicule</h2>
              <div style={{ padding: '1rem', background: '#F5F5F5', borderRadius: '4px', marginBottom: '2rem' }}>
                <p style={{ margin: 0, fontWeight: 600, color: '#1A1A1A' }}>{vehicle.brand ? `${vehicle.brand} ${vehicle.model}` : 'Véhicule'}</p>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#666' }}>Tarif : {formatPrice(vehicle.rentalPricePerDay)}/jour</p>
              </div>

              <h2 style={{ fontFamily: "'Poppins', sans-serif", marginTop: '2rem' }}>Dates</h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Date de début</label>
                <input type="date" value={formData.startDate} onChange={(e) => updateForm('startDate', e.target.value)} required style={fieldStyle} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Date de fin</label>
                <input type="date" value={formData.endDate} onChange={(e) => updateForm('endDate', e.target.value)} required style={fieldStyle} />
              </div>

              <div style={{ padding: '1rem', background: '#E3F2FD', borderRadius: '4px', marginBottom: '2rem' }}>
                <p style={{ margin: 0, color: '#1976D2', fontWeight: 600 }}>Durée : {duration} jour(s)</p>
              </div>

              <h2 style={{ fontFamily: "'Poppins', sans-serif", marginTop: '2rem' }}>Vos informations</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Prénom</label>
                  <input type="text" value={formData.firstName} onChange={(e) => updateForm('firstName', e.target.value)} required style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nom</label>
                  <input type="text" value={formData.lastName} onChange={(e) => updateForm('lastName', e.target.value)} required style={fieldStyle} />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Email</label>
                <input type="email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} required style={fieldStyle} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Téléphone</label>
                <input type="tel" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} required style={fieldStyle} />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={labelStyle}>Adresse</label>
                <input type="text" value={formData.address} onChange={(e) => updateForm('address', e.target.value)} required style={fieldStyle} />
              </div>

              <button
                type="submit"
                style={{ width: '100%', padding: '1rem', background: '#1976D2', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
              >
                Confirmer la réservation
              </button>
            </form>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", marginTop: 0 }}>Récapitulatif</h3>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #DDD' }}>
                <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.9rem' }}>Véhicule</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{vehicle.brand ? `${vehicle.brand} ${vehicle.model}` : 'Véhicule'}</p>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#666' }}>{formData.startDate} → {formData.endDate}</p>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#666' }}>{duration} jour(s)</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #DDD' }}>
                <span style={{ fontSize: '0.9rem' }}>Sous-total</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #DDD' }}>
                <span style={{ fontSize: '0.9rem' }}>Taxes (20%)</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(taxes)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ color: '#1976D2', fontWeight: 700 }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#4CAF50', marginTop: 0 }}>Réservation confirmée !</h2>
            <p style={{ color: '#666', fontSize: '1.1rem', margin: '1rem 0' }}>
              Numéro de réservation : <strong>{reservationId}</strong>
            </p>
            <p style={{ color: '#666', margin: '1rem 0' }}>
              Un email de confirmation a été envoyé à <strong>{formData.email}</strong>
            </p>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Votre réservation est confirmée du {formData.startDate} au {formData.endDate}.
            </p>
            <Link to="/my-account" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#1976D2', color: 'white', borderRadius: '4px', fontWeight: 600 }}>
              Voir mes réservations
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
