<p align="center">
  <img src="assets/criation-banner.svg" alt="Criation UI — Modular React Component Foundation and Workflows" width="100%" />
</p>

<p align="center">
  <a href="#quick-start"><img src="https://img.shields.io/badge/Release-v0.3.0--beta-4f46e5?style=flat-square" alt="Version" /></a>
  <a href="#automated-testing"><img src="https://img.shields.io/badge/Tests-142%20Passed-10b981?style=flat-square" alt="Test Status" /></a>
  <a href="#bundle-performance"><img src="https://img.shields.io/badge/Button%20Chunk-2.54%20kB-0284c7?style=flat-square" alt="Bundle Size" /></a>
  <a href="#accessibility--wcag"><img src="https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA-059669?style=flat-square" alt="WCAG 2.2 AA" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-64748b?style=flat-square" alt="License" /></a>
</p>

---

## Overview

**Criation UI** is a modular, high-performance UI foundation and developer workflow toolkit for **React 18 and 19** applications written in TypeScript. 

The library provides 40+ production-ready components, complete data-management hooks, and an integrated project scaffolding CLI. It is engineered with a strict **Conventional JSX First** architecture, subpath tree-shaking exports, and verified WCAG 2.2 AA accessibility standards.

### Core Architecture Principles

1. **Standard React JSX by Default**: Predictable, strongly typed React components that integrate seamlessly with existing toolchains without proprietary lock-in.
2. **High-Level Workflows over Raw Boilerplate**: Pre-engineered hooks for complete CRUD synchronization, form validation, and reactive queries eliminate hundreds of lines of repetitive code.
3. **Zero CSS-in-JS Runtime Overhead**: Precompiled stylesheets (~34.7 kB total / 6.8 kB gzip) with zero runtime evaluation penalties.
4. **Granular Subpath Tree-Shaking**: Import only what is rendered. Importing an individual button component contributes just **2.54 kB** to production bundles.

---

## System Requirements

Before setting up Criation UI, ensure your development environment satisfies the following prerequisites:

| Requirement | Supported Versions | Notes |
| :--- | :--- | :--- |
| **Node.js** | `>= 18.0.0` (LTS 20.x or 22.x recommended) | Required for bundling and CLI operations |
| **Package Manager** | `npm` (`>= 9.0`), `pnpm` (`>= 8.0`), or `yarn` (`>= 1.22`) | Standard package installation |
| **React** | `^18.0.0` or `^19.0.0` | Peer dependency for all UI components |
| **TypeScript** | `>= 5.0.0` (Optional but recommended) | Full type definitions included in package |

---

## Setup & Quick Start

You can install Criation UI into an existing project or scaffold a complete application from scratch using the integrated CLI.

### Option A: Install into an Existing React Project

#### 1. Install Dependencies
Install the core library along with its icon peer dependency:

```bash
# Using npm
npm install @criation/ui lucide-react

# Using pnpm
pnpm add @criation/ui lucide-react

# Using yarn
yarn add @criation/ui lucide-react
```

#### 2. Import the Stylesheet
Include the precompiled stylesheet once in your application root (`src/main.tsx` for Vite, or `pages/_app.tsx` / `app/layout.tsx` for Next.js):

```tsx
// src/main.tsx or src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import the precompiled Criation UI styles
import "@criation/ui/dist/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### 3. Render Your First Component
Import and use components with standard React JSX:

```tsx
// src/App.tsx
import { Button, Card, Stack, Heading, Text } from "@criation/ui";

export default function App() {
  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: "0 16px" }}>
      <Card variant="outline" padding="lg">
        <Stack direction="column" gap="1rem">
          <Heading level={2}>Account Setup</Heading>
          <Text color="muted">
            Configure your development environment and verify component integration.
          </Text>
          <Button 
            variant="primary" 
            size="md" 
            onClick={() => alert("Criation UI is successfully connected!")}
          >
            Confirm &amp; Continue
          </Button>
        </Stack>
      </Card>
    </div>
  );
}
```

---

### Option B: Scaffold a Brand New Project via CLI

Criation UI includes an automatic scaffolding binary (`criation`) that initializes a fully configured Vite + React + TypeScript project in seconds:

```bash
# 1. Initialize a new project directory
npx @criation/ui init my-dashboard

# 2. Navigate into the generated project
cd my-dashboard

# 3. Start the local development server
npm run dev
```

The CLI automatically configures TypeScript paths, imports the stylesheet, and sets up a working component layout.

---

## Component Evolution: What Changed & Why

To understand how Criation UI simplifies development, review the side-by-side comparisons below. Each section contrasts the traditional boilerplate approach (or early prototypes) with the modern Criation UI implementation.

### 1. Button Component (`Button`)

*Earlier Challenge:* Building an interactive button previously required manually wiring CSS classes, managing loading spinner elements, and writing custom `aria-busy` attributes to prevent screen readers from reading raw SVG icons.

```tsx
// =========================================================================
// BEFORE: Traditional React Boilerplate (18 lines of repetitive code)
// =========================================================================
function SubmitButton({ isLoading, onClick }: { isLoading: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`btn btn-primary ${isLoading ? "btn-loading" : ""}`}
      disabled={isLoading}
      aria-busy={isLoading} // Easy to forget; risks screen-reader confusion
      onClick={onClick}
    >
      {isLoading ? (
        <span className="spinner-wrapper" aria-hidden="true">
          <svg className="animate-spin" viewBox="0 0 24 24">...</svg>
        </span>
      ) : null}
      <span>{isLoading ? "Saving..." : "Save Record"}</span>
    </button>
  );
}

// =========================================================================
// NOW: Criation UI Implementation (1 line, fully accessible)
// =========================================================================
import { Button } from "@criation/ui";

function ModernSubmit({ isPending, onClick }: { isPending: boolean; onClick: () => void }) {
  // Built-in loading state automatically injects the spinner, disables clicks,
  // and hides visual animations from screen readers via aria-busy="true".
  return (
    <Button variant="primary" size="md" loading={isPending} onClick={onClick}>
      Save Record
    </Button>
  );
}
```

---

### 2. Form Input with Validation (`Input`)

*Earlier Challenge:* Connecting an input to an accessible error message traditionally required generating unique IDs, manually managing `aria-invalid`, and binding `aria-describedby` so assistive technologies could detect validation failures.

```tsx
// =========================================================================
// BEFORE: Traditional Manual Field Binding (22 lines)
// =========================================================================
function EmailField({ value, onChange, error }: any) {
  const errorId = "email-error-msg-101"; // Manual collision-prone ID

  return (
    <div className="form-group">
      <label htmlFor="email-input">Work Email</label>
      <input
        id="email-input"
        type="email"
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined} // Manual linkage
        className={error ? "input-border-error" : "input-border-normal"}
      />
      {error && (
        <p id={errorId} role="alert" className="error-text">
          {error}
        </p>
      )}
    </div>
  );
}

// =========================================================================
// NOW: Criation UI Implementation (Automatic Accessible Linkage)
// =========================================================================
import { Input } from "@criation/ui";

function ModernEmailField({ value, onChange, error }: any) {
  // Automatically generates unique element IDs, binds aria-describedby to
  // the dedicated error container, and sets aria-invalid for WCAG compliance.
  return (
    <Input
      label="Work Email"
      type="email"
      value={value}
      onChange={onChange}
      error={error}
      fullWidth
    />
  );
}
```

---

### 3. Accessible Modal Dialogs (`Modal`)

*Earlier Challenge:* Standard modal dialogs require complex keyboard event listeners for the `Escape` key, focus trapping loops so keyboard `Tab` keys do not focus elements behind the modal, and document body scroll locking with scrollbar width compensation to avoid jarring layout shifts.

```tsx
// =========================================================================
// BEFORE: Traditional Custom Modal Implementation (45+ lines)
// =========================================================================
function LegacyModal({ isOpen, onClose, children }: any) {
  useEffect(() => {
    if (!isOpen) return;
    
    // 1. Manual escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // 2. Manual body scroll lock (causes layout shifts on Windows)
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// =========================================================================
// NOW: Criation UI Implementation (Zero-Config WAI-ARIA Focus Trap)
// =========================================================================
import { Modal, Button, Text } from "@criation/ui";

function ModernModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Built-in useFocusTrap keeps keyboard Tab focus inside the dialog.
  // Escape key closes automatically. Body scroll locking compensates for scrollbar width.
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deployment" size="md">
      <Text>Are you ready to promote this build to production?</Text>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onClose}>Confirm</Button>
      </div>
    </Modal>
  );
}
```

---

### 4. Form State & Validation (`useForm`)

*Earlier Challenge:* Form handling typically required declaring multiple `useState` instances, writing custom validation logic, and manually setting touched and error states.

```tsx
// =========================================================================
// BEFORE: Traditional Multi-State Form Handling (35+ lines)
// =========================================================================
function LegacyForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!email.includes("@")) newErrors.email = "Invalid email format";
    if (password.length < 8) newErrors.password = "Password must be >= 8 chars";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Process submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {errors.email && <span>{errors.email}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

// =========================================================================
// NOW: Criation UI Declarative Form Hook
// =========================================================================
import { useForm, Input, Button, Stack } from "@criation/ui";

function ModernForm() {
  // Single hook manages state, validation schemas, dirty tracking, and submission.
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    initialValues: { email: "", password: "" },
    validate: (vals) => {
      const errs: Record<string, string> = {};
      if (!vals.email.includes("@")) errs.email = "Please enter a valid email address.";
      if (vals.password.length < 8) errs.password = "Must contain at least 8 characters.";
      return errs;
    },
    onSubmit: async (data) => {
      await fetch("/api/register", { method: "POST", body: JSON.stringify(data) });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" gap="1rem">
        <Input 
          label="Email Address" 
          value={values.email} 
          onChange={handleChange("email")} 
          error={errors.email} 
        />
        <Button type="submit" variant="primary" loading={isSubmitting}>
          Create Account
        </Button>
      </Stack>
    </form>
  );
}
```

---

### 5. Full Data Management Workflow (`useCrudWorkflow`)

*Earlier Challenge:* Building an administrative table with Create, Read, Update, and Delete capabilities previously required over 100 lines of state management for search filters, modal open/close toggles, active item tracking, and delete confirmations.

```tsx
// =========================================================================
// NOW: Criation UI Complete CRUD Synchronization (Under 30 lines)
// =========================================================================
import { useCrudWorkflow, Button, Input, Modal, Stack } from "@criation/ui";

interface Member {
  id: string;
  name: string;
  role: string;
}

export function TeamDirectory() {
  // useCrudWorkflow handles:
  // 1. Filtered data synchronization based on search queries
  // 2. Add Item modal state and form creation
  // 3. Edit Item modal state and entity population
  // 4. Safe delete confirmation workflows
  const {
    items,
    searchQuery,
    setSearchQuery,
    isCreateOpen,
    openCreate,
    closeCreate,
    isEditOpen,
    activeItem,
    openEdit,
    closeEdit,
    deleteItem
  } = useCrudWorkflow<Member>({
    initialItems: [
      { id: "1", name: "Sarah Connor", role: "Engineering Lead" },
      { id: "2", name: "Marcus Wright", role: "Systems Architect" }
    ],
    searchFields: ["name", "role"]
  });

  return (
    <Stack direction="column" gap="1.5rem">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <Input
          placeholder="Filter team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={openCreate}>Add Member</Button>
      </div>

      <ul>
        {items.map((member) => (
          <li key={member.id} style={{ display: "flex", justifyContent: "space-between", padding: 8 }}>
            <span>{member.name} — {member.role}</span>
            <div>
              <Button size="sm" variant="outline" onClick={() => openEdit(member)}>Edit</Button>
              <Button size="sm" variant="danger" onClick={() => deleteItem(member.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </Stack>
  );
}
```

---

## Expressive Modalities

Criation UI provides multiple syntax modalities to suit different programming preferences:

### 1. Conventional JSX (Recommended Default)
The standard, declarative way to write React:
```tsx
import { Button, Card } from "@criation/ui";

export const ActionCard = () => (
  <Card variant="elevated" padding="md">
    <Button variant="primary">Proceed</Button>
  </Card>
);
```

### 2. Decoupled Fluent Builder (`ui.*`)
Method chaining that produces an immutable React element via `.build()`:
```tsx
import { ui } from "@criation/ui";

const CheckoutButton = ui.button("Complete Order")
  .primary()
  .large()
  .onClick(() => processPayment())
  .build();
```

### 3. Strongly-Typed Options Objects
Replaces ambiguous positional arguments with self-documenting option structures:
```tsx
import { ui } from "@criation/ui";

const NavigationBar = ui.navbar({
  brand: "Company Portal",
  links: ["Dashboard", "Analytics", "Settings"]
});
```

---

## Component Catalog

Criation UI includes 40+ modular components and 15 reactive utilities:

| Category | Available Components & Hooks |
| :--- | :--- |
| **Buttons & Actions** | `Button`, `IconButton`, `ButtonGroup` |
| **Inputs & Forms** | `Input`, `TextInput`, `PasswordInput`, `EmailInput`, `NumberInput`, `TextArea`, `SearchInput`, `OTPInput`, `Rating`, `Combobox`, `MultiSelect`, `ColorPicker`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `DatePicker`, `FileUpload` |
| **Layout & Structure** | `Box`, `Container`, `Stack`, `Grid`, `Flex`, `Spacer`, `Divider`, `AspectRatio`, `ScrollArea`, `Collapsible`, `Card` |
| **Feedback & Overlays** | `Alert`, `AlertDialog`, `Toast`, `Spinner`, `Skeleton`, `Progress`, `EmptyState`, `ErrorState`, `ErrorBoundary`, `Modal`, `Drawer`, `Popover`, `Tooltip`, `ContextMenu` |
| **Navigation & Data** | `Navbar`, `Footer`, `Sidebar`, `Stepper`, `Timeline`, `Tabs`, `Breadcrumbs`, `Pagination`, `DropdownMenu`, `Result`, `NotFoundPage` |
| **Hooks & Workflows** | `useDataQuery`, `useCrudWorkflow`, `useForm`, `useTheme`, `useDisclosure`, `useClipboard`, `useDebounce`, `useLocalStorage`, `useClickOutside`, `useMediaQuery`, `useFocusTrap` |

---

## Security & Architecture Boundary Notice

> [!IMPORTANT]
> **Client-Side Presentation Scope:**  
> Criation UI is a frontend component library. The included `<AuthProvider>` and `<AuthGuard>` helpers manage client-side UI visibility and navigation transitions only.
> 
> Client-side route guards, hidden buttons, or disabled inputs do not secure backend data. All sensitive operations, database mutations, and authorization policies **must be validated and enforced on an authoritative backend server** for every request. An `AuthAdapter` contract is provided for integrating external identity providers (OAuth/OIDC, Supabase, Firebase, Auth0).

---

## Developer Scripts & Verification

All project capabilities are verified through reproducible automated scripts:

```bash
# 1. Start the interactive component studio & playground
npm run dev

# 2. Run the automated test suite (88 unit tests across 9 categories)
npm test

# 3. Run browser behavioral accessibility tests (focus trap & keyboard navigation)
node scripts/browser-behavior-tests.js

# 4. Run consumer package verification (subpath exports & bundle checks)
node scripts/verify-consumer-package.js

# 5. Measure empirical build performance & micro-operations/second
npm run benchmark

# 6. Build the production library bundle into dist/
npm run build:lib
```

---

## License & Attribution

Criation UI is distributed under the permissive **[MIT License](LICENSE)**.  
Copyright © 2026 **Divyanshu Kumar** ([@Atomic-Quark](https://github.com/Atomic-Quark)).

Permission is granted, free of charge, to any person obtaining a copy of this software and associated documentation files to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies in both commercial and open-source applications.
