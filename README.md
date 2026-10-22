# 🚀 Criation UI

**Criation UI** is a modular, high-performance React + TypeScript UI library and design system designed to streamline web development, eliminate boilerplate, and deliver consistent, accessible user experiences.

> 📖 **Official Architecture & User Manual**: Read the online [Criation UI Specification & Developer User Manual (Markdown)](docs/CRIATION-UI-SPECIFICATION-AND-USER-MANUAL.md), inspect the [100 PR Roadmap](docs/PR-ROADMAP-1-TO-100.md), or review the evidence-based [Technical Verification Report](Criation-UI-Verification-Report.md).

---

## 🌟 Key Features

- **Conventional JSX First**: Fully typed, accessible React 18+ components usable through standard JSX: `<Button variant="primary" size="lg">Save</Button>`.
- **Decoupled Fluent Builder (`ui.*`)**: Optional chainable builder API returning standard React elements via `.build()`: `ui.button("Save").primary().large().build()`.
- **Typed Options Ergonomics**: All builder and factory methods accept strongly-typed options objects (`ui.navbar({ brand, links })`) for rich IDE autocompletion.
- **Explicit Natural-Language DSL**: Optional string parsing isolated behind explicit, bounded `describe()` / `parseDSL()` calls with actionable syntax warnings.
- **WAI-ARIA Accessibility**: Modal and Drawer focus trapping (`useFocusTrap`), body scroll locking with scrollbar width compensation, `aria-controls` tab panel linking, and `aria-describedby` form error association.
- **40+ Production Components**: Complete component suite covering buttons, inputs, layouts, typography, navigation, feedback, overlays, and page templates.
- **Zero CSS-in-JS Runtime Overhead**: Precompiled CSS bundle (~38.7 kB / 7.2 kB gzip) with zero JavaScript runtime style evaluation overhead.
- **Subpath Package Exports**: Multi-entry tree-shaking support (`@criation/ui/button`, `@criation/ui/card`) with `sideEffects: false` optimization.
- **First-Class TypeScript Support**: 100% strongly typed with `.d.ts` declaration generation.

---

## 🎨 Four Expressive Modalities

Criation UI supports four distinct expression styles tailored to team preferences:

### 1. Conventional JSX Components (Recommended Default)
Standard, predictable React JSX code with full TypeScript prop validation:

```tsx
import { Button, Input, Modal, Stack } from "@criation/ui";

export function UserProfile() {
  return (
    <Stack direction="column" gap="1.5rem">
      <Input placeholder="Enter username..." fullWidth />
      <Button variant="primary" size="lg" onClick={() => console.log("Saved")}>
        Save Profile
      </Button>
    </Stack>
  );
}
```

### 2. Decoupled Fluent Builder (`ui.*` Namespace)
Fluent method chaining that terminates in `.build()` to generate an immutable React element:

```tsx
import { ui } from "@criation/ui";

const PrimaryButton = ui.button("Proceed to Checkout")
  .primary()
  .large()
  .onClick(() => navigate("/checkout"))
  .build();

const PageHeading = ui.heading("Welcome to Store")
  .level(1)
  .gradient()
  .center()
  .build();
```

### 3. Strongly-Typed Options Objects
Structured options API replacing ambiguous positional arguments:

```tsx
import { ui } from "@criation/ui";

const Navigation = ui.navbar({
  brand: "Criation Store",
  links: ["Products", "Pricing", "About", "Contact"]
});
```

### 4. Explicit Natural-Language DSL (`describe` / `parseDSL`)
Bounded, opt-in string parsing for rapid prototyping:

```tsx
import { describe } from "@criation/ui";

const QuickCTA = describe("button Start Free Trial primary large");
```

---

## 🔒 Security & Authentication Advisory

> [!IMPORTANT]
> **Client-Side Visual Presentation Notice:**
> Criation UI is a frontend component library. The included `<AuthProvider>` and `<AuthGuard>` primitives manage client-side UI visibility and state transitions only.
> 
> **They do NOT constitute a security boundary.** Client-side route guards, hidden elements, or disabled buttons can be inspected and bypassed in any web browser. Consuming applications MUST independently verify sessions, tokens, and authorization on a secure backend API server for every request. An abstract `AuthAdapter` interface is provided for integrating external identity providers (OAuth/OIDC, Supabase, Firebase, Auth0).

---

## 🌐 Framework Support Matrix

| Framework | Version | Support Status | Notes |
| :--- | :--- | :--- | :--- |
| **React** | 18.x, 19.x | Active Support | Supported via standard JSX & React Hooks |
| **Next.js** | 16.x | Active LTS | Supported with Server Components & `/client` entrypoint |
| **Next.js** | 15.x | Maintenance LTS | Fully supported with SSR hydration guards |
| **Vite** | 5.x, 6.x | Active Support | Default build and development tooling |

---

## 🧩 Production Component Catalog

Criation UI includes 40+ modular components and 13 reactive hooks:

- **Buttons:** `Button`, `IconButton`, `ButtonGroup`
- **Typography:** `Heading`, `Text`, `Link`, `Code`, `Label`
- **Inputs & Forms:** `Input`, `TextInput`, `PasswordInput`, `EmailInput`, `NumberInput`, `TextArea`, `SearchInput`, `OTPInput`, `Rating`, `Combobox`, `MultiSelect`, `ColorPicker`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `DatePicker`, `FileUpload`
- **Layout:** `Box`, `Container`, `Stack`, `Grid`, `Flex`, `Spacer`, `Divider`, `AspectRatio`, `ScrollArea`, `Collapsible`, `Card`
- **Feedback & Overlays:** `Alert`, `Toast`, `Spinner`, `Skeleton`, `Progress`, `EmptyState`, `ErrorState`, `ErrorBoundary`, `Modal`, `Drawer`, `Popover`, `Tooltip`, `ContextMenu`, `AlertDialog`
- **Navigation & Templates:** `Navbar`, `Footer`, `Sidebar`, `Stepper`, `Timeline`, `Tabs`, `Breadcrumbs`, `Pagination`, `DropdownMenu`, `Result`, `NotFoundPage`
- **Reactive Hooks:** `useForm`, `useTheme`, `useDisclosure`, `useClipboard`, `useDebounce`, `useLocalStorage`, `useClickOutside`, `useMediaQuery`, `useFocusTrap`

---

## 🛠️ Verification & Scripts

```bash
# Start interactive component showcase studio
npm run dev

# Run automated test suite (74/74 passing specs)
node scripts/test-suite.js

# Build production library bundle into dist/
npm run build:lib

# Run TypeScript typecheck with zero errors
npx tsc --noEmit
```

---

## 📄 License & Distribution

Criation UI is released under the **[MIT License](LICENSE)**.  
Copyright © 2026 **Divyanshu Kumar**.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software in commercial and non-commercial applications.
