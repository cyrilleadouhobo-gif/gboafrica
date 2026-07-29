import React, { createContext, useContext, useState } from 'react';
import { initialVehicles, initialPurchases, initialRentals } from '../data/vehicles.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [cart, setCart] = useState([]);
  const [purchases, setPurchases] = useState(initialPurchases);
  const [rentals, setRentals] = useState(initialRentals);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const addToCart = (vehicleId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.vehicleId === vehicleId);
      if (existing) {
        return prev.map((item) =>
          item.vehicleId === vehicleId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { vehicleId, quantity: 1 }];
    });
  };

  const removeFromCart = (vehicleId) => {
    setCart((prev) => prev.filter((item) => item.vehicleId !== vehicleId));
  };

  const clearCart = () => setCart([]);

  const addPurchase = (purchase) => setPurchases((prev) => [...prev, purchase]);

  const addRental = (rental) => setRentals((prev) => [...prev, rental]);

  const updateVehicle = (vehicleId, updates) => {
    setVehicles((prev) => prev.map((v) => (v.id === vehicleId ? { ...v, ...updates } : v)));
  };

  const deleteVehicle = (vehicleId) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
  };

  const addVehicle = (vehicle) => {
    const newVehicle = { ...vehicle, id: 'v' + Date.now() };
    setVehicles((prev) => [...prev, newVehicle]);
    return newVehicle;
  };

  const adminLogin = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setAdminLoggedIn(true);
      setCurrentUser({ role: 'admin', username });
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdminLoggedIn(false);
    setCurrentUser(null);
  };

  const updatePurchaseStatus = (purchaseId, status) => {
    setPurchases((prev) => prev.map((p) => (p.id === purchaseId ? { ...p, status } : p)));
  };

  const updateRentalStatus = (rentalId, status) => {
    setRentals((prev) => prev.map((r) => (r.id === rentalId ? { ...r, status } : r)));
  };

  const deletePurchase = (purchaseId) => {
    setPurchases((prev) => prev.filter((p) => p.id !== purchaseId));
  };

  const deleteRental = (rentalId) => {
    setRentals((prev) => prev.filter((r) => r.id !== rentalId));
  };

  const value = {
    vehicles,
    cart,
    purchases,
    rentals,
    adminLoggedIn,
    currentUser,
    addToCart,
    removeFromCart,
    clearCart,
    addPurchase,
    addRental,
    updateVehicle,
    deleteVehicle,
    addVehicle,
    adminLogin,
    adminLogout,
    updatePurchaseStatus,
    updateRentalStatus,
    deletePurchase,
    deleteRental
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp doit être utilisé à l\'intérieur de AppProvider');
  return ctx;
}

export function formatPrice(amount) {
  return (amount || 0).toLocaleString('fr-FR') + ' €';
}
