This is a professional move. Defining a DESIGN.md in your project folder acts as your "Source of Truth," ensuring that as you iterate on your code or ask AI to add new features, it always adheres to your specific design language.

Here is a structured DESIGN.md template tailored to your "Golden Hour Ambiance" portfolio. You can copy this directly into your repository.

DESIGN.md: The Initial Project Portfolio
1. Design Vision
Concept: "Golden Hour Ambiance" – A premium, immersive portfolio experience that blends technical precision with a warm, inviting tropical atmosphere. It is minimalist, high-contrast, and tactile.

2. Visual Identity & Theme
Color Palette:

Primary Background: Deep, desaturated blue/black (simulating a shaded tropical evening).

Accent (CTA/Highlights): Warm Amber (#DAA520) or Soft Gold (#D4AF37).

Text: Off-white (#FDF6E3) for headings; soft gray (rgba(255, 255, 255, 0.6)) for body.

Atmosphere: Use blurred photography featuring "Golden Hour" lighting and bokeh string lights (refer to image_0.png for reference).

Typography:

Headings: Inter or DM Sans (Clean, modern, professional).

Body: Lato or Open Sans (Legible, neutral).

3. Glassmorphism System (The "Glass" Protocol)
All UI cards and interactive components MUST adhere to these CSS properties to ensure consistency:

Fill: background: rgba(255, 255, 255, 0.08);

Blur: backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);

Border: border: 1px solid rgba(255, 255, 255, 0.15);

Shadow: box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);

Border Radius: 16px for cards; 8px for buttons.

4. Animation & Interaction (Framer Motion)
Interactions must feel "weighted" and tactile.

Physics: Use spring transitions (stiffness: 300, damping: 20) for all hover and reveal animations.

3D Tilt: All skill/project cards will implement a 3D tilt effect using useMotionValue and useTransform to rotate on X and Y axes based on mouse position.

Depth: Inner content of cards must use transform: translateZ(50px) to create a parallax/floating effect.

Reveal: Components should enter the viewport with a subtle, staggered "fade-in-up" motion.

5. Component Logic
Responsiveness: Mobile-first approach. Cards should stack on mobile and form a grid on desktop.

CSS Architecture: Use CSS Modules ([name].module.css) to ensure component styles never conflict.

Icons: Use thin, modern icon sets (Feather or Heroicons). No bold or heavy iconography.

6. AI Interaction Instruction
Whenever you ask an AI to modify this site, provide this instruction:

"Update the component following the strict design rules in DESIGN.md. Ensure all styles are scoped in a CSS Module, use Framer Motion for the animation, and maintain the 'Golden Hour Ambiance' glassmorphism theme."

## 3D Style Guide (React Three Fiber)
To achieve a premium, Apple-like depth, the 3D background layer must adhere to these constraints:
1. Aesthetic Identity:
  a. Material: Use MeshPhysicalMaterial with high roughness (to simulate frosted glass/plastic) and high transmission (to allow background colors to bleed through).
  b. Motion: Organic, slow, and non-repetitive. Use drei's Float or Animated components for gentle, fluid movement (no sharp or mechanical rotations).
2. Lighting: Soft, warm, ambient lighting that matches the Golden Hour aesthetic (amber/soft gold hues).
3. Performance & Responsiveness:
  a. Performance: Use drei's PerformanceMonitor to automatically scale down the resolution on lower-end devices (like your Samsung A15) to maintain 60 FPS.
  b. Complexity: Maximize scene complexity on Desktop (large, high-refraction objects) and simplify to primitive, low-poly shapes on Mobile to preserve battery and maintain smooth scrolling.
4. Responsiveness (Global Layout):
  a. Desktop: Full 3D canvas (z-index: -1) behind the entire viewport.
  b. Tablet/Mobile: Render 3D objects with a smaller camera.fov (field of view) to keep objects centralized and prevent clipping.
  c. Touch Events: Disable interactive orbital controls on mobile to prevent "scroll-jacking" (where the page stops scrolling because the user is moving the 3D object).