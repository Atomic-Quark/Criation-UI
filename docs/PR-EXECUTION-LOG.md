
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
