import React, { useEffect, type ReactNode } from "react";
import { useAuth } from "../auth/useAuth";

export interface PublicRouteProps {
  children: ReactNode;
  restricted?: boolean; // If true, authenticated users are redirected away (e.g. login page)
  redirectTo?: string;
}

export function PublicRoute({
  children,
  restricted = false,
  redirectTo = "/dashboard",
}: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && restricted && typeof window !== "undefined") {
      window.history.pushState(null, "", redirectTo);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, [isLoading, isAuthenticated, restricted, redirectTo]);

  return <>{children}</>;
}
