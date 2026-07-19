# DESIGN.md: The Initial Project

## 1. Core Philosophy
- **Aesthetic:** "Golden Hour Ambiance" (Warm, tropical-modern, high-contrast).
- **Architecture:** Atomic Design (Atoms/Molecules/Organisms).
- **Interactivity:** Fluid, weightless, physics-based (Framer Motion).

## 2. Visual System
- **Palette:** 
  - Background: `#0A0A0B` (Deep shade)
  - Accent: `#DAA520` (Amber) / `#D4AF37` (Soft Gold)
  - Text: Primary `#FDF6E3`, Secondary `rgba(255, 255, 255, 0.6)`
- **Typography:** 
  - Headings: 'Inter', sans-serif.
  - Body: 'Lato', sans-serif.
- **Glassmorphism (The "Glass" Mixin):**
  - All interactive containers must use `@mixin glass-card` defined in `styles/_mixins.scss`.
  - Properties: `backdrop-filter: blur(20px)`, `background: rgba(255, 255, 255, 0.08)`, `border: 1px solid rgba(255, 255, 255, 0.15)`.

## 3. Motion Style Guide (Framer Motion)
- **Presets:** 
  - `entrance`: `{ type: "spring", stiffness: 80, damping: 20, mass: 1 }`
  - `interaction`: `{ type: "spring", stiffness: 400, damping: 25 }`
- **Rule:** Never use default `ease`. Always use `spring` physics.
- **Accessibility:** Respect `prefers-reduced-motion`. Disable non-essential movement for users who request it.

## 4. 3D Style Guide (React Three Fiber)
- **Material:** `MeshPhysicalMaterial` (high roughness, high transmission).
- **Performance:** Mandatory use of `PerformanceMonitor` (`drei`).
- **Mobile Constraint:** Reduce complexity (primitive shapes) on viewports < 768px.
- **Scroll-Jack Prevention:** No `OrbitControls` on mobile. Objects must be static or follow simple `useFrame` animation only.

## 5. Layout & Responsiveness
- **Breakpoint Logic:**
  - Mobile: < 768px (Stacking layout, 16px gutter).
  - Desktop: >= 768px (Grid layout, 32px gutter).
- **Z-Index Layering:**
  - `-1`: 3D Background.
  - `0`: Global Layout/Content.
  - `10`: Navbars/Fixed Overlays.
  - `100`: Modals/High-priority interaction.

## 6. Implementation Rule for Agents
Whenever modifying code, the agent MUST:
1. Scope styles using `.module.scss` (SCSS Modules).
2. Adhere to TypeScript `strict` mode (no `any`).
3. Apply animation/motion classes/props based on Section 3.
4. Verify responsive behavior for both mobile (Samsung A15 test) and desktop.