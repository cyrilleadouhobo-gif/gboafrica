import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CatalogSale from './pages/CatalogSale.jsx';
import CatalogRent from './pages/CatalogRent.jsx';
import VehicleDetail from './pages/VehicleDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import RentalCheckout from './pages/RentalCheckout.jsx';
import MyAccount from './pages/MyAccount.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminVehicles from './pages/admin/AdminVehicles.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog-sale" element={<CatalogSale />} />
      <Route path="/catalog-rent" element={<CatalogRent />} />
      <Route path="/vehicle/:id" element={<VehicleDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/rental/:id" element={<RentalCheckout />} />
      <Route path="/my-account" element={<MyAccount />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/vehicles"
        element={
          <ProtectedAdminRoute>
            <AdminVehicles />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedAdminRoute>
            <AdminOrders />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
}
