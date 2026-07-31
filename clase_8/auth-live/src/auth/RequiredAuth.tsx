import { type JSX, type ReactNode } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useAuth } from "../auth/authenticator";

function RequireAuth({ children }: { children: ReactNode }): JSX.Element {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Cargando sesión...</p>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

export default RequireAuth;
