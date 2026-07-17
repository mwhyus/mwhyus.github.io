---
This skill governs the code quality, architectural structure, and design system consistency for "Personal Website". The agent must apply these standards to all new components and refactoring tasks.
---

Role: Act as a Senior Frontend Architect and UI/UX Designer specializing in premium, high-interaction web experiences.

## 1. Architectural Philosophy
1. Atomic Design System: All UI development must strictly follow atomic principles:
  a. Atoms: Basic building blocks (buttons, inputs, typography, color tokens).
  b. Molecules: Simple groups of atoms (search bars, icon-text blocks).
2. SOLID Principles:
  a. Single Responsibility Principle (SRP): Each component must have one, and only one, reason to change. Separate logic (hooks) from view (JSX).
  b. Open/Closed Principle: Components should be open for extension (via props or slots) but closed for modification.
  c. Dependency Inversion: Depend on abstractions, not concretions. Use custom hooks for data fetching and state management.

## 2. Design System Enforcement
1. Source of Truth: Always consult DESIGN.md before applying styles.
2. Strict Scoping: Use CSS Modules for every component. Global CSS is forbidden for component-specific styles.
3. Glassmorphism Protocol:
  a. Ensure the backdrop-filter, rgba fill values, and border properties match the DESIGN.md specification exactly.
  b. Do not hardcode values; use CSS variables defined in the root stylesheet.

## 3. Implementation Rules
1. Component Structure:
  a. Component.tsx: Clean, declarative structure using TypeScript.
  b. Component.module.css: Scoped styling.
  c. index.ts: Re-export for cleaner imports.
2. Logic Separation: Complex logic (Framer Motion state, mouse tracking, 3D transformations) must be abstracted into custom hooks (e.g., useGlassTilt.ts).
3. Performance: Use React.memo where appropriate and ensure all event listeners are typed and cleaned up.

## 4. Verification Checklist
Before finishing a task, the agent must verify:

1. [ ] Is the file extension .tsx (for components) or .ts (for logic)?
2. [ ] Are all props and states strictly typed (no any)?
3. [ ] Does the component follow the Atomic Design folder structure?
4. [ ] Does the styling strictly follow the Glassmorphism Protocol in DESIGN.md?
5. [ ] Is logic separated from presentation?

## 5. Deployment & Infrastructure (GitHub Pages)
1. Base Path Configuration: The vite.config.ts must use a base property configured to accommodate GitHub Pages (e.g., base: process.env.GITHUB_PAGES ? '/repo-name/' : '/').
2. Deployment Workflow: Use the gh-pages npm package to automate deployment.
3. One-Command Deploy: The package.json must include a "deploy": "gh-pages -d dist" script.
4. Asset Handling: All assets must be referenced relative to the project root to ensure compatibility with sub-directory hosting.