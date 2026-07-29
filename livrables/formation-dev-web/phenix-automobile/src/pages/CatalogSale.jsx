import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import { useApp } from '../context/AppContext.jsx';

const inputStyle = { width: '100%', padding: '0.5rem', border: '1px solid #DDD', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box' };

export default function CatalogSale() {
  const { vehicles } = useApp();
  const [brand, setBrand] = useState('');
  const [types, setTypes] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sortBy, setSortBy] = useState('newest');

  const forSale = useMemo(() => vehicles.filter((v) => v.forSale), [vehicles]);
  const allTypes = useMemo(() => [...new Set(forSale.map((v) => v.type))], [forSale]);
  const allFuels = useMemo(() => [...new Set(forSale.map((v) => v.fuel))], [forSale]);

  const filtered = useMemo(() => {
    let list = forSale;
    if (brand) list = list.filter((v) => v.brand.toLowerCase().includes(brand.toLowerCase()));
    if (types.length > 0) list = list.filter((v) => types.includes(v.type));
    if (fuels.length > 0) list = list.filter((v) => fuels.includes(v.fuel));
    list = list.filter((v) => v.salePrice >= minPrice && v.salePrice <= maxPrice);

    list = [...list];
    if (sortBy === 'price-asc') list.sort((a, b) => a.salePrice - b.salePrice);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.salePrice - a.salePrice);
    else list.sort((a, b) => b.year - a.year);

    return list;
  }, [forSale, brand, types, fuels, minPrice, maxPrice, sortBy]);

  const toggleType = (type, checked) => {
    setTypes((prev) => (checked ? [...prev, type] : prev.filter((t) => t !== type)));
  };

  const toggleFuel = (fuel, checked) => {
    setFuels((prev) => (checked ? [...prev, fuel] : prev.filter((f) => f !== fuel)));
  };

  const resetFilters = () => {
    setBrand('');
    setTypes([]);
    setFuels([]);
    setMinPrice(0);
    setMaxPrice(200000);
    setSortBy('newest');
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', maxWidth: '1400px', margin: '2rem auto', padding: '0 2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
          <h3 style={{ fontFamily: "'Poppins', sans-serif", marginTop: 0 }}>Filtres</h3>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#1A1A1A' }}>Marque</label>
            <input type="text" placeholder="Rechercher..." value={brand} onChange={(e) => setBrand(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#1A1A1A' }}>Type</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {allTypes.map((type) => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={types.includes(type)} onChange={(e) => toggleType(type, e.target.checked)} />
                  <span style={{ fontSize: '0.9rem' }}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#1A1A1A' }}>Carburant</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {allFuels.map((fuel) => (
                <label key={fuel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={fuels.includes(fuel)} onChange={(e) => toggleFuel(fuel, e.target.checked)} />
                  <span style={{ fontSize: '0.9rem' }}>{fuel}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#1A1A1A' }}>Prix</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)} style={{ ...inputStyle, width: '50%' }} />
              <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)} style={{ ...inputStyle, width: '50%' }} />
            </div>
          </div>

          <button onClick={resetFilters} style={{ width: '100%', padding: '0.75rem', background: '#F0F0F0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>
            Réinitialiser
          </button>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, color: '#1A1A1A' }}>Véhicules à vendre</h2>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #DDD', borderRadius: '4px', fontSize: '0.9rem', cursor: 'pointer' }}>
              <option value="newest">Plus récent</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>

          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {filtered.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'white', borderRadius: '8px' }}>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>Aucun véhicule ne correspond à vos filtres.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
