
- **PR #15:** feat(dsl): isolate natural language parsing and enhance error boundaries (PR 15)
  - **Scope:** Isolate natural language DSL parser to explicit opt-in helpers and add fault-tolerant error boundaries.
  - **Executed & Merged:** 2026-10-22T10:53:48.801Z

- **PR #16:** API Ergonomics: Deprecate 8-Slot Positional Arguments for Typed Options
  - **Phase:** Phase 1
  - **Scope:** Replace multi-argument signatures (`Button(label, size, id)`) with options object
  - **Dependencies:** PR 14, PR 15
  - **Executed & Merged:** 2026-10-22T11:02:44.738Z

- **PR #17:** Security: Decouple UI Presentation from Client-Side Auth Assumptions
  - **Phase:** Phase 1
  - **Scope:** Remove \auth required\ string inference; use explicit boolean props
  - **Dependencies:** PR 14, PR 16
  - **Executed & Merged:** 2026-10-22T11:04:35.528Z

- **PR #18:** Packaging: Subpath Package Exports for Tree-Shaking (`@criation/ui/button`)
  - **Phase:** Phase 1
  - **Scope:** Multi-entry Rollup build and package.json subpath exports to reduce bundle size
  - **Dependencies:** PR 14
  - **Executed & Merged:** 2026-10-22T11:04:53.693Z

- **PR #19:** Forms: Fix Async Race Conditions & Unhandled Rejections in `useForm`
  - **Phase:** Phase 1
  - **Scope:** Abort tokens for async validations, form submission error lifecycle
  - **Dependencies:** PR 10
  - **Executed & Merged:** 2026-10-22T11:05:10.096Z

- **PR #20:** Overlays: WAI-ARIA Focus Trapping & Esc Dismissal in `Modal` / `AlertDialog`
  - **Phase:** Phase 1
  - **Scope:** Tab focus sentinels, return focus on close, Esc key handler
  - **Dependencies:** PR 07
  - **Executed & Merged:** 2026-10-22T11:05:26.679Z

- **PR #21:** Overlays: Accessible Drawer Primitives with Scroll Lock & Screen Reader Tags
  - **Phase:** Phase 1
  - **Scope:** Body scroll locking with scrollbar width compensation, `aria-modal=\true\`
  - **Dependencies:** PR 20
  - **Executed & Merged:** 2026-10-22T11:05:43.698Z

- **PR #22:** Inputs: Explicit Error Message Association Across All Input Primitives
  - **Phase:** Phase 1
  - **Scope:** Standardize `aria-invalid`, `aria-describedby` linking to error container
  - **Dependencies:** PR 10
  - **Executed & Merged:** 2026-10-22T11:06:00.895Z

- **PR #23:** Inputs: WAI-ARIA Combobox & MultiSelect Keyboard Navigation Pattern
  - **Phase:** Phase 1
  - **Scope:** Up/Down arrow selection, Home/End, Enter to select, `aria-activedescendant`
  - **Dependencies:** PR 07
  - **Executed & Merged:** 2026-10-22T11:06:17.955Z

- **PR #24:** Navigation: Accessible Tab Navigation with Arrow Keys and Panel Linking in `Tabs`
  - **Phase:** Phase 1
  - **Scope:** ArrowLeft/ArrowRight navigation, customizable automatic/manual activation
  - **Dependencies:** PR 07
  - **Executed & Merged:** 2026-10-22T11:06:35.145Z

- **PR #25:** Overlays: Accessible Popover & Tooltip Viewport Collision Repositioning
  - **Phase:** Phase 1
  - **Scope:** Boundary collision flipping/shifting, hover/focus reveal, Esc dismiss
  - **Dependencies:** PR 07
  - **Executed & Merged:** 2026-10-22T11:06:51.885Z

- **PR #26:** Testing: Playwright Automated Cross-Browser Component Test Matrix
  - **Phase:** Phase 1
  - **Scope:** Headless Chromium, Firefox, WebKit component interaction testing
  - **Dependencies:** PR 08
  - **Executed & Merged:** 2026-10-22T11:07:08.871Z

- **PR #27:** Data Display: Table Primitive Refactoring with Stable Row Identifiers
  - **Phase:** Phase 1
  - **Scope:** Unique row keys, horizontal overflow wrapper, loading skeletons
  - **Dependencies:** PR 07
  - **Executed & Merged:** 2026-10-22T11:07:25.589Z

- **PR #28:** Storage: Browser Storage Hygiene & SSR Hydration Guard in `useLocalStorage`
  - **Phase:** Phase 1
  - **Scope:** Safe JSON parse, quota error catching, in-memory SSR fallback
  - **Dependencies:** PR 07
  - **Executed & Merged:** 2026-10-22T11:07:41.812Z

- **PR #29:** Next.js: Modularize `@criation/ui` and `@criation/ui/client` Entrypoints
  - **Phase:** Phase 1
  - **Scope:** Explicit client-only export path for interactive components
  - **Dependencies:** PR 10, PR 28
  - **Executed & Merged:** 2026-10-22T11:07:58.705Z

- **PR #30:** Compatibility: Document and Validate React 18/19 & Next.js 15/16 Matrix
  - **Phase:** Phase 1
  - **Scope:** Automated peer dependency matrix verification in CI
  - **Dependencies:** PR 29
  - **Executed & Merged:** 2026-10-22T11:08:15.308Z

- **PR #31:** Governance: Consumer Installation & Commercial Developer Rights Guide
  - **Phase:** Phase 1
  - **Scope:** Document permitted usage, distribution, and enterprise support terms
  - **Dependencies:** PR 15
  - **Executed & Merged:** 2026-10-22T11:08:31.834Z

- **PR #32:** Governance: Third-Party License Audit & `NOTICE` Attribution File
  - **Phase:** Phase 1
  - **Scope:** Audit dependencies (Lucide, Marked), generate NOTICE file
  - **Dependencies:** PR 31
  - **Executed & Merged:** 2026-10-22T11:08:48.298Z

- **PR #33:** Docs: Replace Simulated Auth Demos with Real Form Validation Workflows
  - **Phase:** Phase 1
  - **Scope:** Clarify local mock nature of auth in documentation and README
  - **Dependencies:** PR 12, PR 13
  - **Executed & Merged:** 2026-10-22T11:09:06.439Z

- **PR #34:** Docs: Replace Simulated Deletion Demo with Real State Mutation Pattern
  - **Phase:** Phase 1
  - **Scope:** Update AlertDialog deletion example with pending and error states
  - **Dependencies:** PR 12, PR 13
  - **Executed & Merged:** 2026-10-22T11:09:22.613Z

- **PR #35:** Docs: Clarify Difference Between Debounce and Throttle in Utilities Guide
  - **Phase:** Phase 1
  - **Scope:** Timing diagrams and use case guide for `useDebounce` vs `throttle`
  - **Dependencies:** PR 12
  - **Executed & Merged:** 2026-10-22T11:09:39.261Z

- **PR #36:** Docs: Replace \0 KB CSS Runtime\ Assertion with Accurate Performance Language
  - **Phase:** Phase 1
  - **Scope:** Clarify static precompiled CSS (34 kB) has zero JS CSS-in-JS overhead
  - **Dependencies:** PR 12, PR 13
  - **Executed & Merged:** 2026-10-22T11:09:56.076Z

- **PR #37:** Docs: Reconcile \Four Expressive Modalities\ Section Numbering
  - **Phase:** Phase 1
  - **Scope:** Standardize documentation structure across all 4 modalities
  - **Dependencies:** PR 12, PR 13
  - **Executed & Merged:** 2026-10-22T11:10:12.162Z

- **PR #38:** Docs: Document Benchmark Methodology, Test Scope, and Hardware Specs
  - **Phase:** Phase 1
  - **Scope:** Add disclaimers and reproducible benchmark guidelines
  - **Dependencies:** PR 12, PR 13
  - **Executed & Merged:** 2026-10-22T11:10:28.911Z

- **PR #39:** Types: Strict Generic Parameter Checking & Zero `any` Leaks in Public API
  - **Phase:** Phase 1
  - **Scope:** TypeScript strict mode audit on all public component props
  - **Dependencies:** PR 14, PR 16
  - **Executed & Merged:** 2026-10-22T11:10:45.670Z

- **PR #40:** Testing: Unit Test Suite Expansion for Utility Functions & Token Formatters
  - **Phase:** Phase 1
  - **Scope:** Edge case tests for `formatDate`, `formatNumber`, `formatFileSize`
  - **Dependencies:** PR 08
  - **Executed & Merged:** 2026-10-22T11:11:03.386Z

- **PR #41:** Testing: Unit Test Suite Expansion for Layout Primitives (`Box`, `Flex`, `Grid`)
  - **Phase:** Phase 1
  - **Scope:** DOM snapshot and computed style assertions for layout components
  - **Dependencies:** PR 08
  - **Executed & Merged:** 2026-10-22T11:11:20.283Z
