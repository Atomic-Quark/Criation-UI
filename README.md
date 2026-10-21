# 🚀 Criation UI

**Criation UI** is a modular, high-performance React + TypeScript UI foundation and design system designed to make building new websites faster, standardized, and visually stunning.

> 📖 **Official Architecture & User Manual**: Read the complete [Criation UI Specification & Developer User Manual](docs/CRIATION-UI-SPECIFICATION-AND-USER-MANUAL.md) for deep technical architecture, complete component catalogs, practical code recipes, and migration guidelines.

---

## 🌟 Key Features

- **Ultra-Simple 1-Line Component Calling**: Write UI elements directly in 1 line without writing `<tags> </tags>`! Call `Button(...)`, `Input(...)`, `Heading(...)`, `Text(...)`, `Badge(...)`, `Card(...)`, `Link(...)`, `Image(...)`.
- **100% Optional Parameters**: Every single slot is optional — works whether you provide 1 parameter, 2 parameters, skip slots, or provide all slots!
- **Clean Architectural Separation**: Pure UI styling (`class`, `size`, `color`, `position`, `pointer`) separated cleanly from decoupled **Routing** (`to`, `href`, `direction`) and **Authentication** (`AuthProvider`, `AuthGuard`, `ProtectedRoute`).
- **Complete Component Suite**: 40+ production-grade components covering buttons, inputs, layouts, typography, navigation, feedback, overlays, and page templates.
- **Modern Design System**: Dynamic light and dark modes with glassmorphism, tailored HSL color tokens, silky micro-animations, and fluid typography.
- **First-Class TypeScript Support**: 100% strongly typed with full autocompletion and `.d.ts` declaration generation.
- **Zero Heavy Dependencies**: Built with React and Lucide icons; no bulky CSS runtime or vendor lock-in.

---

## ✨ Just Like Writing English: Fluent Chaining & Natural Sentences

Criation UI makes writing user interfaces as natural and effortless as writing English. You have 3 expressive ways to build components:

### 1. Fluent Dot-Chaining (Reads Literally Like a Sentence)
Chain properties directly onto components. It renders immediately as a native React element:

```tsx
// Buttons
Button("Go to cart").red().link("/cart").auth()
Button("Proceed to Checkout").green().link("/checkout").large()
Button("Back to Catalog").outline().back()

// Headings & Text
Heading("Welcome to Our Store").gradient().center().level(1)
Text("Handcrafted goods delivered right to your door").muted().center()

// Inputs & Badges
Input("Search catalog...").search().width("350px")
Input("Your email address").email().label("Email")
Badge("HOT SALE").red().small()

// Cards & Links
Card("Order Confirmed!").glass().width("400px")
Link("Read Documentation").to("/docs").external()
```

### 2. Natural English Phrases in Strings
Prefer writing sentences? Pass English phrases directly:

```tsx
Button("Go to cart, colored red, go to /cart, auth required")
Heading("Welcome to Store, level 1, centered, with gradient")
Text("Handcrafted with pride, centered, muted, size large")
Badge("50% DISCOUNT, in green, small")
Link("Documentation, to /docs, open in new tab")
```

### 3. Whole Website in 3 Lines with `Website(...)`
Mount a full website with themes, routing, toasts, responsive container, and zero HTML tags:

```tsx
import { Website, Heading, Text, Button } from "@criation/ui";

Website("My Store", [
  Heading("Welcome to My Store").gradient().center(),
  Text("The fastest way to build web apps").muted().center(),
  Button("Shop All Products").green().link("/shop")
]);
```

---

## ⚡ 1-Line Ultra-Simple Component Shorthands

Criation UI also supports direct unordered arguments or classic 8-slot positional calls without writing `<tags> </tags>`:

```tsx
import { Heading, Text, Input, Button, Card, Badge, Link, Image } from "@criation/ui";

export default function CartPage() {
  return (
    <div>
      {/* 1. Heading(text, level/size, id, color, align, position) */}
      {Heading("Shopping_Cart", 1, "title", "gradient")}

      {/* 2. Text(content, size, id, color, align, position) */}
      {Text("Review your selected items before checkout", "md", "desc", "muted")}

      {/* 3. Badge(label, size, id, color, position) */}
      {Badge("2_ITEMS_IN_CART", "sm", "", "success")}

      {/* 4. Input(placeholder, boxSize, id, type, label, color, position, pointer) */}
      {Input("Enter voucher code...", "320px", "voucher_input")}

      {/* 5. Button(class/label, boxSize, id, auth, path, color, position, pointer) */}
      {Button("Proceed_to_Payment", "12px 24px", "btn-pay", "user", "/payment", "green")}

      {/* 6. Link(label, href, id, color, isExternal, position) */}
      {Link("Return to Store Catalog", "/products")}

      {/* 7. Image(src, boxSize, id, alt, rounded, position) */}
      {Image("https://picsum.photos/300/200", "300px 200px", "img_1", "Product", "lg")}

      {/* 8. Card(content, boxSize, id, variant, color, position, pointer) */}
      {Card("Order confirmed! Your parcel will arrive in 2 days.", "360px", "card_1", "glass")}
    </div>
  );
}
```

### 🧩 Positional Slots Reference (All 100% Optional!)

| Component | Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 | Slot 6 | Slot 7 | Slot 8 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`Button(...)`** | `class/label` | `box size` | `ID` | `Auth` | `path_direction` | `color` | `position` | `pointer` |
| **`Input(...)`** | `placeholder` | `box size` | `ID` | `type` | `label` | `color` | `position` | `pointer` |
| **`Heading(...)`** | `text` | `level/size` | `ID` | `color` | `align` | `position` | — | — |
| **`Text(...)`** | `content` | `size` | `ID` | `color` | `align` | `position` | — | — |
| **`Badge(...)`** | `label` | `size` | `ID` | `color` | `position` | — | — | — |
| **`Card(...)`** | `content` | `box size` | `ID` | `variant` | `color` | `position` | `pointer` | — |
| **`Link(...)`** | `label` | `href/path` | `ID` | `color` | `isExternal` | `position` | — | — |
| **`Image(...)`** | `src` | `box size` | `ID` | `alt` | `rounded` | `position` | — | — |

> **Skipping parameters:** You can call `Button("Go_to_cart")` with just 1 argument, or skip middle slots with empty strings: `Button("Go_to_cart", "", "", "", "/cart", "red")`.

---

## 📦 Installation & Setup

In your project repository:

```bash
npm install @criation/ui
```

Import styles in your main entry file (`main.tsx` or `App.tsx`):

```tsx
import "@criation/ui/styles.css";
```

---

## 💻 Standard JSX Quick Start

If you prefer standard JSX tags, the traditional syntax is 100% supported too:

```tsx
import React from "react";
import {
  Button,
  TextInput,
  Card,
  ThemeProvider,
} from "@criation/ui";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Card variant="glass" padding="lg">
        <h2>Welcome to My Website</h2>
        <TextInput placeholder="Enter your email" />
        <Button variant="primary" onClick={() => alert("Ready!")}>
          Get Started
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```


---

## 📐 Standard Properties System

Criation UI standardizes component properties across clear functional groups:

| Property Group | Properties | Description |
| :--- | :--- | :--- |
| **Identity** | `id`, `name`, `data-testid` | Identifies elements and supports testing |
| **Styling** | `className`, `style`, `variant` | Visual appearance and component variants |
| **Dimensions** | `width`, `height`, `size`, `minWidth`, `maxWidth` | Layout dimensions (`xs`, `sm`, `md`, `lg`, `xl`) |
| **Color** | `color`, `background`, `borderColor` | Dynamic color styling and CSS variable overrides |
| **Layout** | `display`, `position`, `direction`, `align`, `justify`, `gap` | Flex and Grid layout controls |
| **Interaction** | `onClick`, `disabled`, `loading`, `tabIndex` | User interaction and states |
| **Pointer** | `cursor` | Explicit pointer / cursor behavior |
| **Accessibility**| `aria-label`, `aria-describedby`, `role` | Screen-reader and ARIA compliance |
| **Routing** | `to`, `href`, `target` | Navigation destinations (separated under routing) |
| **Authentication** | `requiredRole`, `allowedRoles`, `fallback` | Protected access guards (separated under auth) |

---

## 🧩 Comprehensive Production Component Catalog

Criation UI includes 50+ modular components and 13 reactive hooks:

### Core & Typography
- `Button`, `IconButton`, `ButtonGroup`
- `Heading`, `Text`, `Link`, `Code`, `Label`

### Inputs & Forms
- `Input`, `TextInput`, `PasswordInput`, `EmailInput`, `NumberInput`, `TextArea`
- `SearchInput`, `OTPInput`, `Rating`, `Combobox`, `MultiSelect`, `ColorPicker`
- `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `DatePicker`, `FileUpload`
- `Form`, `FormField`, `FormLabel`, `FormError`, `FormProvider`, `validation`

### Layout & Containers
- `Box`, `Container`, `Stack`, `Grid`, `Flex`, `Spacer`, `Divider`
- `AspectRatio`, `ScrollArea`, `Collapsible`, `Card`

### Feedback & Overlays
- `Alert`, `Toast`, `Spinner`, `Skeleton`, `Progress`, `EmptyState`, `ErrorState`
- `ErrorBoundary`, `Modal`, `Drawer`, `Popover`, `Tooltip`, `ContextMenu`, `AlertDialog`

### Navigation & Templates
- `Navbar`, `Footer`, `Sidebar`, `Stepper`, `Timeline`, `Tabs`, `Breadcrumbs`, `Pagination`, `DropdownMenu`
- `LandingLayout`, `DashboardLayout`, `AuthLayout`, `SettingsLayout`, `Result`, `NotFoundPage`

### Reactive Hooks
- `useTheme`, `useDisclosure`, `useClipboard`, `useDebounce`, `useLocalStorage`, `useClickOutside`, `useMediaQuery`
- `useWindowSize`, `useOnlineStatus`, `useIntersectionObserver`, `usePrevious`, `useEventListener`, `useKeyPress`

---

## 🛠️ Available Scripts

- `npm run dev`: Starts the interactive component showcase studio on `http://localhost:3000`.
- `npm run build:lib`: Builds the distributable package bundle and TypeScript declarations into `dist/`.
- `npm test`: Runs the automated unit, integration, and rendering test suite (36 tests).
- `npm run build`: Builds the showcase application for hosting.
- `npx tsc --noEmit`: Runs full TypeScript type-checking across the entire codebase.

---

## 📄 License

**Criation UI — Iron Seal Proprietary & Exclusive License**  
Copyright © 2026 **Divyanshu Kumar**. All Rights Reserved.

This software, its architecture, fluent chaining engine, design systems, and components are the sole and exclusive intellectual property of **Divyanshu Kumar**. Any unauthorized reproduction, modification, redistribution, execution, deployment, or commercial/non-commercial use without explicit prior written permission from Divyanshu Kumar is strictly prohibited. For licensing inquiries, see the [LICENSE](LICENSE) file.
