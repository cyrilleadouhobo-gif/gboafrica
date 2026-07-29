import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useApp, formatPrice } from '../context/AppContext.jsx';

export default function Cart() {
  const { vehicles, cart, removeFromCart } = useApp();

  const cartItems = cart.map((item) => {
    const vehicle = vehicles.find((v) => v.id === item.vehicleId) || {};
    return { ...item, vehicle };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.vehicle.salePrice || 0) * item.quantity, 0);
  const taxes = subtotal * 0.2;
  const total = subtotal + taxes;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A' }}>Mon panier</h1>

        {cartItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F5F5F5', borderBottom: '1px solid #DDD' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#1A1A1A' }}>Véhicule</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#1A1A1A' }}>Prix</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#1A1A1A' }}>Qty</th>
                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#1A1A1A' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.vehicleId} style={{ borderBottom: '1px solid #EEE' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600, color: '#1A1A1A' }}>{item.vehicle.brand} {item.vehicle.model}</div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{item.vehicle.year}</div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#D32F2F', fontWeight: 600 }}>{formatPrice(item.vehicle.salePrice)}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => removeFromCart(item.vehicleId)}
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

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", marginTop: 0 }}>Récapitulatif</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #DDD' }}>
                <span>Sous-total</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #DDD' }}>
                <span>Taxes (20%)</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(taxes)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem' }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ color: '#D32F2F', fontWeight: 700 }}>{formatPrice(total)}</span>
              </div>
              <Link
                to="/checkout"
                style={{ display: 'block', padding: '1rem', background: '#D32F2F', color: 'white', textAlign: 'center', borderRadius: '4px', fontWeight: 600, marginBottom: '1rem' }}
              >
                Procéder au paiement
              </Link>
              <Link to="/catalog-sale" style={{ display: 'block', padding: '1rem', background: '#F0F0F0', textAlign: 'center', borderRadius: '4px', fontWeight: 600 }}>
                Continuer les achats
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ background: 'white', padding: '3rem', textAlign: 'center', borderRadius: '8px', marginTop: '2rem' }}>
            <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>Votre panier est vide.</p>
            <Link to="/catalog-sale" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#D32F2F', color: 'white', borderRadius: '4px', fontWeight: 600 }}>
              Commencer à magasiner
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
