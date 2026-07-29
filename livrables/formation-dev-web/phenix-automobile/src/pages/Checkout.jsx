import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useApp, formatPrice } from '../context/AppContext.jsx';

const fieldStyle = { width: '100%', padding: '0.75rem', border: '1px solid #DDD', borderRadius: '4px', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#1A1A1A' };

const emptyForm = { firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zipCode: '' };

export default function Checkout() {
  const { vehicles, cart, addPurchase, clearCart } = useApp();
  const [formData, setFormData] = useState(emptyForm);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const cartItems = cart.map((item) => ({
    ...item,
    vehicle: vehicles.find((v) => v.id === item.vehicleId) || {}
  }));

  const subtotal = cartItems.reduce((sum, item) => sum + (item.vehicle.salePrice || 0) * item.quantity, 0);
  const taxes = subtotal * 0.2;
  const total = subtotal + taxes;

  const updateForm = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderId = 'CMD-' + Date.now();
    addPurchase({
      id: newOrderId,
      items: cartItems.map((item) => ({ vehicleId: item.vehicleId, price: item.vehicle.salePrice || 0 })),
      totalPrice: total,
      status: 'confirmée',
      customer: formData,
      createdAt: new Date().toISOString()
    });
    clearCart();
    setOrderId(newOrderId);
    setOrderConfirmed(true);
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Finaliser votre achat</h1>

        {!orderConfirmed ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", marginTop: 0 }}>Informations personnelles</h2>

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

              <h2 style={{ fontFamily: "'Poppins', sans-serif", marginTop: '2rem' }}>Adresse de livraison</h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Adresse</label>
                <input type="text" value={formData.address} onChange={(e) => updateForm('address', e.target.value)} required style={fieldStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Ville</label>
                  <input type="text" value={formData.city} onChange={(e) => updateForm('city', e.target.value)} required style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Code postal</label>
                  <input type="text" value={formData.zipCode} onChange={(e) => updateForm('zipCode', e.target.value)} required style={fieldStyle} />
                </div>
              </div>

              <button
                type="submit"
                style={{ width: '100%', padding: '1rem', background: '#D32F2F', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
              >
                Confirmer la commande
              </button>
            </form>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", marginTop: 0 }}>Récapitulatif</h3>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #DDD' }}>
                {cartItems.map((item) => (
                  <div key={item.vehicleId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                    <span>{item.vehicle.brand} {item.vehicle.model}</span>
                    <span style={{ fontWeight: 600 }}>{formatPrice(item.vehicle.salePrice)}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #DDD' }}>
                <span>Taxes (20%)</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(taxes)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ color: '#D32F2F', fontWeight: 700 }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#4CAF50', marginTop: 0 }}>Commande confirmée !</h2>
            <p style={{ color: '#666', fontSize: '1.1rem', margin: '1rem 0' }}>
              Numéro de commande : <strong>{orderId}</strong>
            </p>
            <p style={{ color: '#666', margin: '1rem 0' }}>
              Un email de confirmation a été envoyé à <strong>{formData.email}</strong>
            </p>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Nous vous remercions de votre achat. Votre véhicule vous sera livré dans les délais convenus.
            </p>
            <Link to="/my-account" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#1976D2', color: 'white', borderRadius: '4px', fontWeight: 600 }}>
              Voir mes commandes
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
