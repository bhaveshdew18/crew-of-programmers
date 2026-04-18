import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { normalizeRole } from '../utils/roles';

const ProtectedRoute = ({ element, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && normalizeRole(user?.role) !== normalizeRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
