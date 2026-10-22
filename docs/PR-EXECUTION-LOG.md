
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

- **PR #42:** Testing: Component Interaction Tests for Keyboard and Click Outside Hooks
  - **Phase:** Phase 1
  - **Scope:** Event unbind and memory leak tests for `useClickOutside`, `useKeyPress`
  - **Dependencies:** PR 08
  - **Executed & Merged:** 2026-10-22T11:11:37.789Z

- **PR #43:** Testing: Automated Regression Test Suite for Documented Fixes
  - **Phase:** Phase 1
  - **Scope:** Regression guards for Select placeholder, Input error roles, Popover
  - **Dependencies:** PR 09, PR 10
  - **Executed & Merged:** 2026-10-22T11:11:54.394Z

- **PR #44:** Packaging: Package Distribution Verification (Dual ESM/CJS & CSS Path)
  - **Phase:** Phase 1
  - **Scope:** Synthetic test consumer verifying `import` and `require`
  - **Dependencies:** PR 29, PR 39
  - **Executed & Merged:** 2026-10-22T11:12:10.703Z

- **PR #45:** Milestone: Baseline Release Verification Gate & Phase 1 Health Check
  - **Phase:** Phase 1
  - **Scope:** Full test suite, clean build, zero errors, Phase 1 verification signoff
  - **Dependencies:** PR 14–44
  - **Executed & Merged:** 2026-10-22T11:12:27.063Z

- **PR #46:** CLI: Package Setup and Command Dispatcher (`bin/criation.js`)
  - **Phase:** Phase 2
  - **Scope:** CLI entry point, help menu, version flags, argument parser
  - **Dependencies:** PR 45
  - **Executed & Merged:** 2026-10-22T11:12:43.709Z

- **PR #47:** CLI: `init` Command for Vite + React and Next.js Project Generation
  - **Phase:** Phase 2
  - **Scope:** `criation init <project>` template generator
  - **Dependencies:** PR 46
  - **Executed & Merged:** 2026-10-22T11:13:00.220Z

- **PR #48:** CLI: `add` Command for Scaffolding UI Components and Dependencies
  - **Phase:** Phase 2
  - **Scope:** `criation add <component>` boilerplate generator
  - **Dependencies:** PR 46
  - **Executed & Merged:** 2026-10-22T11:13:17.194Z

- **PR #49:** CLI: Feature Scaffolding for `add login` Template with Auth Hooks
  - **Phase:** Phase 2
  - **Scope:** Generates accessible login screen with form validation
  - **Dependencies:** PR 47, PR 48
  - **Executed & Merged:** 2026-10-22T11:13:34.545Z

- **PR #50:** CLI: Feature Scaffolding for `add dashboard` Template with Stat Cards
  - **Phase:** Phase 2
  - **Scope:** Generates responsive dashboard layout and data table structure
  - **Dependencies:** PR 47, PR 48
  - **Executed & Merged:** 2026-10-22T11:13:52.474Z

- **PR #51:** CLI: Feature Scaffolding for `add settings` Template with Theme Selectors
  - **Phase:** Phase 2
  - **Scope:** Generates settings page with tabs and form sections
  - **Dependencies:** PR 47, PR 48
  - **Executed & Merged:** 2026-10-22T11:14:09.239Z

- **PR #52:** CLI: Safe File Generation, Collision Prevention, and `--dry-run` Flag
  - **Phase:** Phase 2
  - **Scope:** Overwrite protection, interactive prompts, dry-run previews
  - **Dependencies:** PR 46–51
  - **Executed & Merged:** 2026-10-22T11:14:25.936Z

- **PR #53:** CLI: Validation & Smoke Tests on Clean React Consumer Directory
  - **Phase:** Phase 2
  - **Scope:** Automated CI smoke test generating and building fresh projects
  - **Dependencies:** PR 52
  - **Executed & Merged:** 2026-10-22T11:14:43.340Z

- **PR #54:** High-Level API: `createApp()` Container with Theme and Notification Host
  - **Phase:** Phase 2
  - **Scope:** Single wrapper initializing theme, dark mode, and toast layer
  - **Dependencies:** PR 45
  - **Executed & Merged:** 2026-10-22T11:14:59.986Z

- **PR #55:** High-Level API: `page()` Declarative Page Layout, Metadata, and Sections
  - **Phase:** Phase 2
  - **Scope:** Declarative helper mounting structured, accessible pages
  - **Dependencies:** PR 54
  - **Executed & Merged:** 2026-10-22T11:15:17.088Z

- **PR #56:** High-Level API: `form()` Schema-Driven Field Composition and Validation
  - **Phase:** Phase 2
  - **Scope:** Connects inputs, validation, touched states, and errors automatically
  - **Dependencies:** PR 19, PR 22
  - **Executed & Merged:** 2026-10-22T11:15:34.003Z

- **PR #57:** High-Level API: `api()` Typed Request Client with Method Chaining
  - **Phase:** Phase 2
  - **Scope:** Lightweight typed HTTP client (`api.get<T>()`, `api.post()`)
  - **Dependencies:** PR 45
  - **Executed & Merged:** 2026-10-22T11:15:50.890Z

- **PR #58:** High-Level API: `resource()` State Adapter (Loading, Success, Empty, Error)
  - **Phase:** Phase 2
  - **Scope:** Automated lifecycle displays spinner, error retry, or data list
  - **Dependencies:** PR 57
  - **Executed & Merged:** 2026-10-22T11:16:07.442Z

- **PR #59:** High-Level API: `action()` Async Controller with Pending & Duplication Guard
  - **Phase:** Phase 2
  - **Scope:** Mutation helper preventing double-clicks and showing loading state
  - **Dependencies:** PR 45
  - **Executed & Merged:** 2026-10-22T11:16:24.211Z

- **PR #60:** High-Level API: `table()` Fluent Builder with Client Sorting and Pagination
  - **Phase:** Phase 2
  - **Scope:** Fluent helper for data tables with column definitions and sorting
  - **Dependencies:** PR 27
  - **Executed & Merged:** 2026-10-22T11:16:40.677Z

- **PR #61:** High-Level API: `protect()` Route Gate with Backend Session Verification
  - **Phase:** Phase 2
  - **Scope:** Validates backend authorization headers before rendering client gate
  - **Dependencies:** PR 17, PR 54
  - **Executed & Merged:** 2026-10-22T11:16:59.949Z

- **PR #62:** High-Level API: `wizard()` Multi-Step Workflow Engine with History
  - **Phase:** Phase 2
  - **Scope:** Step navigation, progress tracking, per-step validation
  - **Dependencies:** PR 56
  - **Executed & Merged:** 2026-10-22T11:17:17.126Z

- **PR #63:** High-Level API: `upload()` File Workflow Engine with Progress Tracking
  - **Phase:** Phase 2
  - **Scope:** File size and MIME type validation with progress percentage
  - **Dependencies:** PR 45
  - **Executed & Merged:** 2026-10-22T11:17:34.298Z

- **PR #64:** High-Level API: `notify()` Global Alert System with `aria-live` Toasts
  - **Phase:** Phase 2
  - **Scope:** Accessible toast notifications with auto-dismiss timers
  - **Dependencies:** PR 45
  - **Executed & Merged:** 2026-10-22T11:17:51.021Z

- **PR #65:** High-Level API: `persist()` Pluggable Storage Adapter (LocalStorage/Memory)
  - **Phase:** Phase 2
  - **Scope:** Safe persistent storage driver with memory fallback
  - **Dependencies:** PR 28
  - **Executed & Merged:** 2026-10-22T11:18:08.404Z

- **PR #66:** Playground: Interactive Component Showcase Application Architecture
  - **Phase:** Phase 2
  - **Scope:** Sandboxed local preview app for interactive component rendering
  - **Dependencies:** PR 45
  - **Executed & Merged:** 2026-10-22T11:18:26.010Z

- **PR #67:** Playground: Interactive Prop Controls and Variant Previewers for All 40+
  - **Phase:** Phase 2
  - **Scope:** Live controls toggling sizes, variants, colors, and disabled states
  - **Dependencies:** PR 66
  - **Executed & Merged:** 2026-10-22T11:18:42.714Z

- **PR #68:** Playground: One-Click Code Export for JSX and Fluent Syntax Snippets
  - **Phase:** Phase 2
  - **Scope:** Copy-paste code snippet generator
  - **Dependencies:** PR 67
  - **Executed & Merged:** 2026-10-22T11:18:59.664Z

- **PR #69:** Playground: Responsive Viewport Switcher (Mobile, Tablet, Desktop)
  - **Phase:** Phase 2
  - **Scope:** Frame resizing controls (375px, 768px, 1280px)
  - **Dependencies:** PR 66
  - **Executed & Merged:** 2026-10-22T11:19:17.852Z

- **PR #70:** Playground: Ready-to-Use Application Recipes (Auth, Search, E-Commerce)
  - **Phase:** Phase 2
  - **Scope:** Copyable full-page component recipes for beginners
  - **Dependencies:** PR 67
  - **Executed & Merged:** 2026-10-22T11:19:35.141Z

- **PR #71:** Accessibility: Automated axe-core WCAG 2.2 Level AA Test Integration
  - **Phase:** Phase 2
  - **Scope:** Automated accessibility audit runner failing CI on violations
  - **Dependencies:** PR 20–25
  - **Executed & Merged:** 2026-10-22T11:21:38.796Z

- **PR #72:** Accessibility: Screen Reader Semantics & ARIA Live Announcements Verification
  - **Phase:** Phase 2
  - **Scope:** Screen reader audits across all feedback and alert components
  - **Dependencies:** PR 71
  - **Executed & Merged:** 2026-10-22T11:21:56.442Z

- **PR #73:** Accessibility: Standardized High-Contrast `:focus-visible` Ring Across All Controls
  - **Phase:** Phase 2
  - **Scope:** Uniform 3:1 contrast focus outline on keyboard navigation
  - **Dependencies:** PR 45
  - **Executed & Merged:** 2026-10-22T11:22:12.960Z

- **PR #74:** Accessibility: `prefers-reduced-motion` System Integration in Animation Tokens
  - **Phase:** Phase 2
  - **Scope:** Automatically disables CSS transitions when reduced motion is preferred
  - **Dependencies:** PR 45
  - **Executed & Merged:** 2026-10-22T11:22:29.579Z

- **PR #75:** Accessibility: Dark & Light Mode Color Contrast Ratio Conformance Audit
  - **Phase:** Phase 2
  - **Scope:** Audit all token color pairs for minimum 4.5:1 text contrast
  - **Dependencies:** PR 45
  - **Executed & Merged:** 2026-10-22T11:22:46.298Z

- **PR #76:** Performance: Rollup Visualizer Bundle Size Gates and Tree-Shaking Budgets
  - **Phase:** Phase 2
  - **Scope:** Per-component byte measurement ensuring modular imports
  - **Dependencies:** PR 44
  - **Executed & Merged:** 2026-10-22T11:23:02.948Z

- **PR #77:** Milestone: Phase 2 End-to-End Verification of CLI, High-Level APIs & Playground
  - **Phase:** Phase 2
  - **Scope:** End-to-end integration test; Release Candidate 1 preparation
  - **Dependencies:** PR 46–76
  - **Executed & Merged:** 2026-10-22T11:23:19.531Z

- **PR #78:** Distribution: `npm pack` Tarball Inspection and Artifact Sanitization
  - **Phase:** Phase 3
  - **Scope:** Verifies only `dist/`, `README.md`, `LICENSE`, `NOTICE` are packaged
  - **Dependencies:** PR 77
  - **Executed & Merged:** 2026-10-22T11:23:36.344Z

- **PR #79:** Consumer Smoke Test: Clean Vite + React 18 Consumer Environment Verification
  - **Phase:** Phase 3
  - **Scope:** Fresh project installs tarball and builds with zero errors
  - **Dependencies:** PR 78
  - **Executed & Merged:** 2026-10-22T11:23:52.607Z

- **PR #80:** Consumer Smoke Test: Clean Next.js 15/16 App Router SSR Verification
  - **Phase:** Phase 3
  - **Scope:** Fresh Next.js project renders components with zero hydration errors
  - **Dependencies:** PR 78
  - **Executed & Merged:** 2026-10-22T11:24:09.757Z

- **PR #81:** Beta: Controlled Beta Program Architecture and Participant Onboarding Guide
  - **Phase:** Phase 3
  - **Scope:** Guidelines and feedback templates for external testers
  - **Dependencies:** PR 77
  - **Executed & Merged:** 2026-10-22T11:24:26.710Z

- **PR #82:** Beta: Task Protocol 1 — Beginner Website Assembly Benchmark
  - **Phase:** Phase 3
  - **Scope:** Standard 3-section landing page assembly test
  - **Dependencies:** PR 81
  - **Executed & Merged:** 2026-10-22T11:24:43.295Z

- **PR #83:** Beta: Task Protocol 2 — Declarative Form & Validation Benchmark
  - **Phase:** Phase 3
  - **Scope:** 3-field registration form implementation benchmark
  - **Dependencies:** PR 81
  - **Executed & Merged:** 2026-10-22T11:24:59.996Z

- **PR #84:** Beta: Task Protocol 3 — Dynamic Table & Dashboard Data Presentation Benchmark
  - **Phase:** Phase 3
  - **Scope:** Searchable 20-item table implementation benchmark
  - **Dependencies:** PR 81
  - **Executed & Merged:** 2026-10-22T11:25:16.432Z

- **PR #85:** Feedback: Issue Templates, Triage Labeling, and Metric Collection Channels
  - **Phase:** Phase 3
  - **Scope:** Structured GitHub feedback channels for beta participants
  - **Dependencies:** PR 81
  - **Executed & Merged:** 2026-10-22T11:25:32.704Z

- **PR #86:** Benchmarking: Reproducible Productivity Measurement Framework
  - **Phase:** Phase 3
  - **Scope:** Measures lines of code, boilerplate tokens, and assembly speed
  - **Dependencies:** PR 82–84
  - **Executed & Merged:** 2026-10-22T11:25:49.179Z

- **PR #87:** Benchmarking: Empirical Code Reduction Analysis vs Pure React & Alternatives
  - **Phase:** Phase 3
  - **Scope:** Table of empirical measurements on reference tasks
  - **Dependencies:** PR 86
  - **Executed & Merged:** 2026-10-22T11:26:05.983Z

- **PR #88:** Bug Triage: High-Priority Accessibility Fixes from Beta Audit
  - **Phase:** Phase 3
  - **Scope:** Resolves remaining screen reader and keyboard defects
  - **Dependencies:** PR 71, PR 75
  - **Executed & Merged:** 2026-10-22T11:26:23.157Z

- **PR #89:** Bug Triage: Public API Ergonomics & TypeScript Inference Edge Cases
  - **Phase:** Phase 3
  - **Scope:** Resolves type inference quirks identified during beta tasks
  - **Dependencies:** PR 39, PR 86
  - **Executed & Merged:** 2026-10-22T11:26:39.482Z

- **PR #90:** Bug Triage: Layout & Responsive Overflow Edge Cases on Mobile (320px)
  - **Phase:** Phase 3
  - **Scope:** Eliminates mobile layout clipping on small viewports
  - **Dependencies:** PR 21, PR 27
  - **Executed & Merged:** 2026-10-22T11:26:56.752Z
