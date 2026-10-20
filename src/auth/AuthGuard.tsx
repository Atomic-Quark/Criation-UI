import React, { type ReactNode } from "react";
import { useAuth } from "./useAuth";
import { Spinner } from "../components/feedback/Spinner";

export interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requiredRole?: string | string[];
  requiredPermission?: string;
  unauthorizedFallback?: ReactNode;
}

export function AuthGuard({
  children,
  fallback = null,
  requiredRole,
  requiredPermission,
  unauthorizedFallback = null,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, hasRole, hasPermission } = useAuth();

  if (isLoading) {
    return (
      <div className="cr-auth-guard-loading">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <>{unauthorizedFallback}</>;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{unauthorizedFallback}</>;
  }

  return <>{children}</>;
}
