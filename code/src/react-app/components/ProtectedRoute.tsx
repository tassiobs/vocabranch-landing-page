import { Navigate } from "react-router";
import { useAuth } from "@/react-app/lib/authContext";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/signin" replace />;
  return <>{children}</>;
}
