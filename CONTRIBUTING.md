# Contributing to Criation UI

Thank you for your interest in contributing to **Criation UI**!

## How to Contribute

1. **Fork the Repository**: Create your personal fork on GitHub.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/Atomic-Quark/Criation-UI.git
   cd Criation-UI
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Create a Feature Branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```
5. **Run Dev Server & Tests**:
   ```bash
   npm run dev
   npx tsc --noEmit
   npm run build:lib
   ```
6. **Submit a Pull Request**: Push your branch and open a PR against `main`.

## Coding Guidelines

- **Simplicity First**: Every component should support both JSX `<Component />` and the 1-line shorthand `Component(...)`.
- **Smart Parameters**: Ensure new properties can be auto-detected gracefully.
- **TypeScript**: All components must be 100% strongly typed with `.d.ts` declaration generation.
