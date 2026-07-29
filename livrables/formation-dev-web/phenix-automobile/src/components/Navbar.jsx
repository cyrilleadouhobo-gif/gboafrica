import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Navbar() {
  const { cart } = useApp();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      style={{
        background: '#1A1A1A',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
    >
      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
        <Link to="/" style={{ color: '#D32F2F' }}>Phénix</Link>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/catalog-sale" style={{ fontSize: '0.95rem' }}>À vendre</Link>
        <Link to="/catalog-rent" style={{ fontSize: '0.95rem' }}>À louer</Link>
        <Link to="/my-account" style={{ fontSize: '0.95rem' }}>Mon compte</Link>
        <Link to="/cart" style={{ fontSize: '0.95rem', position: 'relative' }}>
          🛒
          <span
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#D32F2F',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem'
            }}
          >
            {cartCount}
          </span>
        </Link>
        <Link to="/admin/login" style={{ fontSize: '0.95rem', padding: '0.5rem 1rem', background: '#D32F2F', borderRadius: '4px' }}>
          Admin
        </Link>
      </div>
    </nav>
  );
}
