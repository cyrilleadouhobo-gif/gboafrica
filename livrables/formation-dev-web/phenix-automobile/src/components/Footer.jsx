import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', color: '#CCC', padding: '3rem 2rem 1rem', marginTop: '4rem' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}
      >
        <div>
          <h4 style={{ color: '#D32F2F', fontFamily: "'Poppins', sans-serif", marginTop: 0 }}>Phénix</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>Votre agence de confiance pour l'achat et la location de véhicules.</p>
        </div>
        <div>
          <h4 style={{ color: 'white', fontFamily: "'Poppins', sans-serif", marginTop: 0 }}>Navigation</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
            <li><Link to="/catalog-sale">À vendre</Link></li>
            <li><Link to="/catalog-rent">À louer</Link></li>
            <li><Link to="/">Accueil</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'white', fontFamily: "'Poppins', sans-serif", marginTop: 0 }}>Contact</h4>
          <p style={{ fontSize: '0.9rem', margin: 0, lineHeight: 1.8 }}>
            📞 +33 1 23 45 67 89<br />
            📧 contact@phoenix-auto.fr<br />
            📍 Paris, France
          </p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #333', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#999' }}>
        © 2026 Phénix Automobile. Tous droits réservés.
      </div>
    </footer>
  );
}
