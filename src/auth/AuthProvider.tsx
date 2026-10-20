import React, { useState, useCallback, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User, AuthState } from "./authTypes";

export interface AuthProviderProps {
  children: ReactNode;
  initialUser?: User | null;
  initialToken?: string | null;
  onLogin?: (credentials: Record<string, any>) => Promise<{ user: User; token: string }>;
  onLogout?: () => Promise<void>;
}

export function AuthProvider({
  children,
  initialUser = null,
  initialToken = null,
  onLogin,
  onLogout,
}: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: initialUser,
    token: initialToken,
    isAuthenticated: Boolean(initialUser || initialToken),
    isLoading: false,
  });

  const login = useCallback(
    async (credentials: Record<string, any>) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      try {
        if (onLogin) {
          const { user, token } = await onLogin(credentials);
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          // Default mock login behavior for rapid prototyping
          const dummyUser: User = {
            id: "user-1",
            email: credentials.email || "alex@example.com",
            name: credentials.name || "Alex Morgan",
            role: "admin",
          };
          setAuthState({
            user: dummyUser,
            token: "mock-jwt-token",
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } catch (err) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw err;
      }
    },
    [onLogin]
  );

  const logout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      if (onLogout) {
        await onLogout();
      }
    } finally {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [onLogout]);

  const hasRole = useCallback(
    (role: string | string[]) => {
      if (!authState.user || !authState.user.role) return false;
      const roles = Array.isArray(role) ? role : [role];
      return roles.includes(authState.user.role);
    },
    [authState.user]
  );

  const hasPermission = useCallback(
    (permission: string) => {
      if (!authState.user || !authState.user.permissions) return false;
      return authState.user.permissions.includes(permission);
    },
    [authState.user]
  );

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        hasRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
