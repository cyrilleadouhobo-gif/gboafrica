import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function ProtectedAdminRoute({ children }) {
  const { adminLoggedIn } = useApp();
  if (!adminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
