# Changelog
All notable changes to **Criation UI** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1-dev] - 2026-10-22

### 📦 Packaging & Tree-Shaking Exports (PR 18)
- **Subpath Package Exports**:
  - Configured granular subpath exports in `package.json` for `./button`, `./input`, `./card`, and `./core` with exact typing declarations.
  - Added `"sideEffects": ["*.css"]` to inform bundlers (Webpack, Rollup, Vite) that unused JS modules are tree-shakeable.
  - Formally updated package manifest license to `MIT`.

### 🛡️ Presentation & Security Decoupling (PR 17)
- **Decoupled UI Presentation from Client-Side Auth Assumptions**:
  - Replaced hardcoded, intrusive browser `alert()` triggers on unauthenticated button clicks with non-blocking `CustomEvent("criation:auth-required")`.
  - Enforced that UI components render purely based on explicit boolean props (`disabled`, `loading`) rather than string heuristics.

### 🎛️ API Ergonomics & Options Objects (PR 16)
- **Typed Options Objects for Builders**:
  - Enhanced `ui.navbar` and `ui.footer` to accept structured, typed options objects (`{ brand, links, actions, sticky, glass }`) alongside existing positional parameters.
  - Added automated tests verifying structured option parameters across layout and navigation builders.

### 📜 Licensing & Natural-Language Parsing (PR 15)
- **Adopted MIT Open Source License**:
  - Replaced restrictive Iron Seal proprietary clause with standard permissive MIT License (Copyright © 2026 Divyanshu Kumar), unblocking broad developer adoption and commercial application integration.
- **Natural-Language DSL Fault Tolerance & Isolation**:
  - Added explicit opt-in helpers `describe()` and `parseDSL()` in `src/core/dslParser.tsx`.
  - Added safe error boundaries returning `<div className="criation-dsl-error">` warning elements on unrecognized syntax rather than throwing unhandled exceptions.
  - Added automated regression tests in `scripts/test-suite.js` (total 61/61 tests passing).

### 🏗️ Architecture & Fluent Builder (PR 14)
- **Decoupled React Components from Fluent Builders**:
  - Introduced the dedicated `ui` builder namespace (`import { ui } from "@criation/ui"`) providing explicit, chainable methods (`ui.button()`, `ui.heading()`, `ui.card()`, `ui.stack()`, `ui.grid()`, etc.) with terminal `.build(): ReactElement` compilation.
  - Kept native React components (`Button`, `Heading`, `Stack`, etc.) as pure, idiomatic JSX components without overloading component function invocations.
  - Added `.build()` method across all chainable interfaces (`ButtonChainable`, `HeadingChainable`, `TextChainable`, `CardChainable`, `BadgeChainable`, `LinkChainable`, `ImageChainable`, `StackChainable`, `GridChainable`, `NavbarChainable`).
  - Added `.variant()`, `.disabled()`, and `.loading()` chainable methods to `ButtonChainable`.
  - Maintained 100% backward compatibility for existing shorthand usage while providing a clean architectural separation.

---

## [0.2.0] - 2026-10-21

### 🛠️ Bug Fixes & Resiliency
- **`Input` & `TextArea` Error Text Rendering**:
  - Fixed an issue where string errors (`error="Invalid value"`) were not displayed on screen. A dedicated `<span className="cr-input__error-message" role="alert">` element is now rendered below the field with proper `aria-describedby` linking.
- **`TextArea` Auto-Resize**:
  - Implemented dynamic auto-resizing via `autoResize` prop calculating `scrollHeight` on mount, input, and controlled value updates.
- **`Select` React DOM Warning**:
  - Replaced non-standard `selected` attribute on `<option>` with React-compliant `defaultValue=""` on `<select>`.
- **`Tooltip` Memory Leak Prevention**:
  - Moved timer tracking into `useRef` with cleanup on unmount to eliminate stale timer leaks.
- **`useClipboard` Rapid Copy Flickering**:
  - Added timer reference tracking to clear pending timeouts on consecutive copy calls, preventing premature reset.
- **`OTPInput` Dynamic Length Sync**:
  - Added synchronization hook to dynamically update digit count when `length` prop changes.
- **`useLocalStorage` Cross-Tab Sync & SSR Resilience**:
  - Added `storage` event listener for multi-tab synchronization and wrapped all storage operations in defensive try/catch blocks for private browsing mode.

### ♿ Accessibility & Focus Management
- **Focus Trapping & Restoration (`Modal`, `Drawer`, `AlertDialog`)**:
  - Dialogs now mount via `ReactDOM.createPortal(..., document.body)` with SSR safety.
  - Added focus trapping via `useFocusTrap` to keep <kbd>Tab</kbd> navigation inside the open dialog.
  - Automatically captures the previously focused element on open and restores focus back to it on close.
  - Added `initialFocusRef` and `finalFocusRef` props for custom focus management.
- **`Popover` Keyboard Navigation**:
  - Non-button triggers now include `role="button"`, `tabIndex={0}`, and handle <kbd>Enter</kbd> / <kbd>Space</kbd> key presses. Pressing <kbd>Escape</kbd> closes the popover.
- **`Tabs` WAI-ARIA Relationships**:
  - Added arrow key cycling (<kbd>ArrowLeft</kbd> / <kbd>ArrowRight</kbd> / <kbd>Home</kbd> / <kbd>End</kbd>) across tabs.
  - Proper ARIA linking with `aria-controls="cr-tabpanel-[id]"` and `aria-labelledby="cr-tab-[id]"`.

### 🚀 Core Builders & Layouts
- **React Key Warning Elimination**:
  - `renderWebsite`, `createWebsiteLayout`, and `Page` now automatically provide stable keys when mapping arrays of children, eliminating React list key console warnings.
- **Layout Customization**:
  - `createWebsiteLayout` and `renderWebsite` now support `maxWidth`, `padding`, `gap`, `header`, `footer`, and custom `style` props.

### 🧩 Component Enhancements
- **`Combobox` & `MultiSelect` Asynchronous Remote Search**:
  - Added `onSearch?: (query: string) => Promise<Option[]>` prop with 150ms debouncing.
  - Built-in loading spinners, error message display, and stale request cancellation via request tracking.
- **Controlled `Accordion`**:
  - Added `expandedIds?: string[]` and `onChange?: (ids: string[]) => void` for programmatic control alongside existing `defaultExpanded`.
- **Declarative `Table`**:
  - Added support for declarative `columns` and `data` props (`<Table columns={cols} data={data} emptyText="No items" />`) with custom cell renderers while maintaining full backward compatibility with raw children.

### 📋 Form Management
- **`useForm` Hook**:
  - Introduced a typed hook for managing form state: `values`, `errors`, `touched`, `isValid`, `isDirty`, `isSubmitting`, `handleChange`, `handleBlur`, `handleSubmit`, `reset`, and input helper `register(name)`.

### ⚡ Next.js App Router Compatibility
- Added `"use client";` preservation banner in Rollup bundle output and configured `react/jsx-runtime` global to guarantee zero-config compatibility in Next.js Server Components.

---

### 📖 Migration Notes
- **Zero Breaking Changes**: All existing APIs continue to function as before.
- **Table**: If you are currently passing raw `<thead>`/`<tbody>` as children to `<Table>`, that pattern continues to work 100%. The new `columns` and `data` props are purely additive.
- **Modal / Drawer / AlertDialog**: Because these components now render into `document.body` via `createPortal`, ensure your application root has access to standard `document.body` (standard in all browsers; during SSR, fallback markup is rendered inline).
