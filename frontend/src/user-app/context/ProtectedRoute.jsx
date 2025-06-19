// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoggedIn, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // While loading auth state, render nothing or a loading spinner
    return null;
  }

  // Store the attempted URL and check authentication
  if (!isLoggedIn || !user) {
    return <Navigate to="/AuthPage" state={{ from: location }} replace />;
  }

  // Check if user has required role
  const hasRequiredRole = allowedRoles.includes(user.role.toLowerCase());

  if (!hasRequiredRole) {
    // Redirect to appropriate dashboard based on role
    const redirectPath =
      user.role.toLowerCase() === "doctor" ? "/admin/dashboard" : "/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
