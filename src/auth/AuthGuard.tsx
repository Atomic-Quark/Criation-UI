import React, { type ReactNode } from "react";
import { useAuth } from "./useAuth";
import { Spinner } from "../components/feedback/Spinner";

/**
 * ============================================================================
 * SECURITY NOTICE:
 * <AuthGuard> is a client-side visual presentation helper.
 * It conditionally hides or displays UI components based on local client state.
 *
 * THIS IS NOT A SECURITY BOUNDARY.
 * Frontend components can be inspected or bypassed by any user in their browser.
 * Sensitive data and operations MUST be protected by authenticated backend API
 * endpoints that validate session tokens independently on every request.
 * ============================================================================
 */

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
