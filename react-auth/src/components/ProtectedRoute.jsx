// src/components/ProtectedRoute.jsx

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="route-loading">
        <div className="spinner" />
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;