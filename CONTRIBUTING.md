# Contributing to Criation UI

Thank you for your interest in contributing to **Criation UI**!

## Authoritative Architectural Principles

All contributions to Criation UI must adhere to the following core design policies established in the architectural audit:

1. **Conventional JSX as Default API:** Every component must be fully usable as a standard, idiomatic React 18+ JSX component (e.g., `<Button variant="primary" size="lg">Save</Button>`). Components must never rely on direct function invocation or mutable class prototypes.
2. **Decoupled Fluent Builder (`ui.*`):** Fluent method chaining lives strictly within the separate `ui` builder namespace (e.g., `ui.button("Save").primary().large().build()`) and returns a valid, immutable React element via `.build()`.
3. **Structured Options Over Positional Arguments:** Multi-argument positional signatures (`Button(label, size, id, ...)`) are deprecated. All builder and component factory methods must accept strongly-typed options objects (`ui.button("Save", { size: "lg", color: "red" })`) for IDE autocomplete and type safety.
4. **Explicit, Bounded DSL Parsing:** Natural-language string parsing is never implicit or automatic. Parsing requires an explicit call to `describe()` or `parseDSL()` with defined grammar and actionable syntax warnings.
5. **No Presentation-Based Security Inference:** Never infer user authorization, permissions, or security roles from element labels (e.g., button text containing "admin" or "auth"). Authorization checks belong on the backend; UI elements must rely strictly on explicit boolean flags (`disabled`, `hidden`).
6. **Mandatory Verification for Public API Changes:** Every modification to the public API contract requires:
   - Strong TypeScript type definitions (`.d.ts`).
   - Automated unit and integration tests added to `scripts/test-suite.js`.
   - Complete documentation updates and backward-compatibility / migration notes.

## Development Workflow

1. **Fork & Clone**:
   ```bash
   git clone https://github.com/Atomic-Quark/Criation-UI.git
   cd Criation-UI
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create a Feature Branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

4. **Run Verification & Tests**:
   ```bash
   # Type check
   npx tsc --noEmit

   # Execute automated test suite (74+ test specs)
   node scripts/test-suite.js

   # Build library distribution
   npm run build:lib
   ```

5. **Submit a Pull Request**:
   - Ensure all 74+ test suite assertions pass with 0 errors.
   - Target the `main` branch.
   - Link any relevant issues from the Criation UI Issue Register.
