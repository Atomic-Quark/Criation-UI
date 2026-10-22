# 🔐 Authentication & Routing Integration Guide

> [!IMPORTANT]
> **CRITICAL SECURITY BOUNDARY NOTICE:**
> Frontend authentication helpers do not secure backend APIs. Authentication and authorization must be enforced by the actual application and identity provider on the server side. `<AuthProvider />`, `<AuthGuard />`, and `<ProtectedRoute />` manage client-side UI visibility, disabled states, and navigation transitions only. Never rely on frontend helpers to protect sensitive data or privileged operations.

In Criation UI, UI styling is strictly decoupled from authentication and routing logic. This prevents vendor lock-in and allows you to use Criation UI components with any backend or routing solution.

---

## Architecture Overview

```
UI Layer:           <Button />, <TextInput />, <Card />, <Modal />
                     ▲
                     │ (Decoupled)
                     ▼
Auth Layer:         <AuthProvider />, useAuth(), <AuthGuard />
                     ▲
                     │ (Decoupled)
                     ▼
Routing Layer:      <ProtectedRoute />, <PublicRoute />, navigation
```

---

## 1. Using with Custom Backend / Supabase / Firebase / NextAuth

Wrap your application in `AuthProvider` and supply an `onLogin` callback:

```tsx
import { AuthProvider } from "@criation/ui";

function App() {
  return (
    <AuthProvider
      onLogin={async (credentials) => {
        // Replace with your real API or Supabase / Firebase call
        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
        });
        const data = await response.json();
        return {
          user: data.user,
          token: data.token,
        };
      }}
      onLogout={async () => {
        await fetch("/api/auth/logout");
      }}
    >
      <Routes />
    </AuthProvider>
  );
}
```

---

## 2. Protecting Routes with `ProtectedRoute`

```tsx
import { ProtectedRoute } from "@criation/ui";

function Dashboard() {
  return (
    <ProtectedRoute
      redirectTo="/login"
      allowedRoles={["admin", "member"]}
      fallback={<p>Redirecting to login...</p>}
    >
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
```

---

## 3. Inline Conditional Rendering with `AuthGuard`

```tsx
import { AuthGuard, Button } from "@criation/ui";

function ActionPanel() {
  return (
    <div>
      <Button variant="outline">View Report</Button>

      {/* Only visible to administrators */}
      <AuthGuard requiredRole="admin">
        <Button variant="danger">Delete Database</Button>
      </AuthGuard>
    </div>
  );
}
```
