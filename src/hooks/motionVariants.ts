// ============================================================
// motionVariants.ts — Centralized Framer Motion Presets
// DESIGN.md §3: Spring physics, entrance + interaction presets
// SKILL.md §3.2: Logic abstracted into shared module
// ============================================================
import type { Variants, Transition } from 'framer-motion'

// ─── Transition Presets (DESIGN.md §3) ───────────────────────

/** entrance: stiffness 80, damping 20, mass 1 */
export const entranceTransition: Transition = {
  type:      'spring',
  stiffness: 80,
  damping:   20,
  mass:      1,
}

/** interaction: stiffness 400, damping 25 (hover/tap states) */
export const interactionTransition: Transition = {
  type:      'spring',
  stiffness: 400,
  damping:   25,
}

/** snappy spring for layout/tab transitions */
export const snappyTransition: Transition = {
  type:      'spring',
  stiffness: 300,
  damping:   28,
}

/** Instant (used when prefers-reduced-motion: reduce) */
export const instantTransition: Transition = {
  duration: 0,
}

// ─── Container Variants ──────────────────────────────────────

/** Stagger container — wraps staggered children */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren:  0.08,
      delayChildren:    0.1,
    },
  },
}

/** Longer stagger for large grids */
export const staggerContainerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.05,
    },
  },
}

// ─── Item Variants ───────────────────────────────────────────

/** Fade in + slide up (primary entrance animation) */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: entranceTransition,
  },
}

/** Fade in + slide left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: entranceTransition,
  },
}

/** Fade in + slide right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: entranceTransition,
  },
}

/** Scale in from center */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: entranceTransition,
  },
}

/** Character-level text animation (for AnimatedText) */
export const charVariant: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -45 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 120, damping: 22 },
  },
}

/** Word-level text animation */
export const wordVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: entranceTransition,
  },
}

// ─── Helpers ─────────────────────────────────────────────────

/**
 * Returns variants with all transitions set to instant duration.
 * Use when `useReducedMotion()` returns true.
 */
export function reduceVariants(variants: Variants): Variants {
  return Object.fromEntries(
    Object.entries(variants).map(([key, val]) => [
      key,
      typeof val === 'object' && val !== null
        ? { ...val, transition: instantTransition }
        : val,
    ])
  )
}
