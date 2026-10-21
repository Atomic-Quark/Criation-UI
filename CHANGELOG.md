# Changelog
All notable changes to **Criation UI** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2026-10-21

### Added
- **New Core Components**:
  - `Label`: Accessible standalone label component with required indicator and English chaining.
  - `SearchInput`: Dedicated search bar with clear button, debounce support, and keyboard shortcut badge.
  - `OTPInput`: Numeric one-time password inputs with auto-focus, paste distribution, and masked PIN support.
  - `Rating`: Interactive and read-only star rating component with half-star support and keyboard controls.
  - `AlertDialog`: Accessible confirmation modal with focus trapping, destructive variants, and escape key listener.
  - `AspectRatio`: Layout container preventing layout shift for images, videos, and embedded media.
  - `ScrollArea`: Sleek cross-browser custom scrollbar wrapper.
  - `Stepper`: Multi-step progress tracker for checkout, onboarding, and multi-step forms.
  - `Timeline`: Activity and order status tracking timeline with status nodes and connecting lines.
  - `Collapsible`: Standalone collapsible expand/collapse panel with smooth transition.
  - `Combobox`: Autocomplete dropdown with search filter and keyboard navigation.
  - `MultiSelect`: Multiple tag selector with removable chips and option filter.
  - `ColorPicker`: Color swatch trigger with hex input, native picker, and preset palettes.
  - `Result`: Status result template for success, error, warning, 404, and 403 pages.
  - `NotFoundPage`: Pre-built 404 template with navigation recovery button.
  - `ErrorBoundary`: React error boundary with fallback UI and reset capabilities.

- **New Reactive Hooks**:
  - `useWindowSize()`: Tracks responsive viewport width and height.
  - `useOnlineStatus()`: Detects browser network connectivity changes.
  - `useIntersectionObserver()`: Tracks element viewport visibility.
  - `usePrevious()`: Retains previous prop or state value across renders.
  - `useEventListener()`: Safe DOM event listener management with automatic cleanup.
  - `useKeyPress()`: Detects target keyboard key presses.

- **Utilities & Design Tokens**:
  - `formatFileSize`: Converts byte values into human-readable strings (KB, MB, GB).
  - `validateEmail`, `validateRequired`, `validateMinLength`, `validateUrl`: Standalone validator functions.
  - `mediaQueryUp`, `mediaQueryDown`: Breakpoint query generators.
  - `useFocusTrap`: Accessible focus trapping inside dialogs.
  - `.cr-sr-only`, `.cr-scrollbar`, and responsive layout classes (`.cr-hide-sm`, `.cr-hide-md`, etc.).
  - `@media (prefers-reduced-motion: reduce)` accessibility normalization.

- **Automated Testing Suite**:
  - Added `scripts/test-suite.js` with 36 automated unit, integration, and rendering tests.
  - Added `npm test` script.

### Changed
- Refactored `src/index.ts` to export all 50+ components, 13 hooks, and utilities.
- Hardened SSR safety in `renderWebsite` and `Website`.
