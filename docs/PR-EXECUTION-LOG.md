
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
