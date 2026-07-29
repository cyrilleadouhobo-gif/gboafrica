import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { Link } from 'react-router-dom';

export default function AdminLogin() {
  const { adminLoggedIn, adminLogin, adminLogout, currentUser } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = adminLogin(username, password);
    if (!success) {
      setLoginError('Identifiants incorrects');
    } else {
      setLoginError('');
    }
  };

  const handleLogout = () => {
    adminLogout();
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: 'linear-gradient(135deg, #D32F2F 0%, #1976D2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", textAlign: 'center', color: '#1A1A1A', marginTop: 0 }}>Espace Admin</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Identifiants : admin / admin123</p>

        {!adminLoggedIn ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#1A1A1A' }}>Identifiant</label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setLoginError(''); }}
                required
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #DDD', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#1A1A1A' }}>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                required
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #DDD', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>
            {loginError && (
              <div style={{ background: '#FFEBEE', color: '#C62828', padding: '0.75rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                {loginError}
              </div>
            )}
            <button type="submit" style={{ padding: '0.75rem', background: '#D32F2F', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>
              Connexion
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#4CAF50', fontWeight: 600, marginBottom: '1rem' }}>✓ Connecté en tant que {currentUser?.username}</p>
            <Link
              to="/admin/dashboard"
              style={{ display: 'block', padding: '0.75rem', background: '#1976D2', color: 'white', borderRadius: '4px', fontWeight: 600, textAlign: 'center', marginBottom: '0.75rem' }}
            >
              Accéder au tableau de bord
            </Link>
            <button onClick={handleLogout} style={{ width: '100%', padding: '0.75rem', background: '#F0F0F0', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
