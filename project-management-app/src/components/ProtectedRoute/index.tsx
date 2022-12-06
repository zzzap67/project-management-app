import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Preloader from '../Preloader';
import { useAuth } from '../../hooks/useAuth';

function ProtectedRoute({ redirectPath = '/' }) {
  const { isAuth, loading } = useAuth();

  if (isAuth) {
    return <Outlet />;
  }

  if (loading) {
    return <Preloader />;
  }

  return <Navigate to={redirectPath} replace />;
}

export default ProtectedRoute;
