import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import { useApp } from '../context/AppContext.jsx';

const FEATURES = [
  { icon: '✓', title: 'Sélection rigoureuse', text: 'Tous nos véhicules sont inspectés et certifiés pour garantir votre sécurité.' },
  { icon: '💰', title: 'Meilleurs tarifs', text: 'Prix compétitifs et transparents, sans frais cachés.' },
  { icon: '🚗', title: 'Vente et location', text: 'Achetez ou louez selon vos besoins, avec flexibilité totale.' }
];

export default function Home() {
  const { vehicles } = useApp();
  const featured = vehicles.filter((v) => v.forSale || v.forRent).slice(0, 6);

  return (
    <>
      <Navbar />

      <section
        style={{
          background: 'linear-gradient(135deg, #D32F2F 0%, #1976D2 100%)',
          color: 'white',
          padding: '6rem 2rem',
          textAlign: 'center',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '3.5rem', margin: '0 0 1rem', fontWeight: 700, letterSpacing: '-1px' }}>
          Bienvenue chez Phénix
        </h1>
        <p style={{ fontSize: '1.3rem', margin: '0 0 2rem', opacity: 0.95, maxWidth: '600px' }}>
          Vente et location de véhicules premium. Trouvez votre prochaine voiture dès aujourd'hui.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/catalog-sale" style={{ background: 'white', color: '#D32F2F', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 600 }}>
            Acheter
          </Link>
          <Link
            to="/catalog-rent"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 600, border: '2px solid white' }}
          >
            Louer
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", textAlign: 'center', fontSize: '2.2rem', marginBottom: '3rem', color: '#1A1A1A' }}>
          Nos véhicules en vedette
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      <section style={{ background: 'white', padding: '4rem 2rem', marginTop: '4rem' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '2.5rem', color: '#D32F2F', fontWeight: 700 }}>{vehicles.length}</div>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>Véhicules disponibles</p>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#1976D2', fontWeight: 700 }}>15</div>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>Années d'expérience</p>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#4CAF50', fontWeight: 700 }}>2400</div>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>Clients satisfaits</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#F5F5F5', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", textAlign: 'center', fontSize: '2.2rem', marginBottom: '3rem', color: '#1A1A1A' }}>
            Pourquoi choisir Phénix ?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", color: '#1A1A1A', marginTop: 0 }}>{f.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
