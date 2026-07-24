import { Outlet, Navigate } from "react-router-dom";
import { LoadingSpinner } from "../common/LoadingSpinner.jsx";
import { useAuth } from "../../hooks/useAuth.js";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner label="Checking session" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
