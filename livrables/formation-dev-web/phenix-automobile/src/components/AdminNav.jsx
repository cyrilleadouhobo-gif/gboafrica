import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function AdminNav() {
  const { adminLogout } = useApp();

  return (
    <nav style={{ background: '#1A1A1A', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.5rem', fontWeight: 700 }}>Phénix Admin</div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/admin/dashboard" style={{ fontSize: '0.9rem' }}>Tableau de bord</Link>
        <Link to="/admin/vehicles" style={{ fontSize: '0.9rem' }}>Véhicules</Link>
        <Link to="/admin/orders" style={{ fontSize: '0.9rem' }}>Commandes</Link>
        <Link to="/admin/login" onClick={adminLogout} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', background: '#D32F2F', borderRadius: '4px' }}>
          Déconnexion
        </Link>
      </div>
    </nav>
  );
}
