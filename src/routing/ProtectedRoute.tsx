import React, { useEffect, type ReactNode } from "react";
import { useAuth } from "../auth/useAuth";
import { Spinner } from "../components/feedback/Spinner";

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
  allowedRoles,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && typeof window !== "undefined") {
      // In SSR or non-browser this is safe
      if (redirectTo && window.location.pathname !== redirectTo) {
        // Soft navigation / redirect hook
        window.history.pushState(null, "", redirectTo);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    }
  }, [isLoading, isAuthenticated, redirectTo]);

  if (isLoading) {
    return (
      <div className="cr-route-loading">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <>{fallback || null}</>;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return (
      <div className="cr-route-unauthorized">
        <h3>Access Denied</h3>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
