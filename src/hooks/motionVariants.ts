import type { Variants, Transition } from 'framer-motion'

export const entranceTransition: Transition = {
  type:      'spring',
  stiffness: 80,
  damping:   20,
  mass:      1,
}

export const interactionTransition: Transition = {
  type:      'spring',
  stiffness: 400,
  damping:   25,
}

export const snappyTransition: Transition = {
  type:      'spring',
  stiffness: 300,
  damping:   28,
}

export const instantTransition: Transition = {
  duration: 0,
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren:  0.08,
      delayChildren:    0.1,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.05,
    },
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: entranceTransition,
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: entranceTransition,
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: entranceTransition,
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: entranceTransition,
  },
}

export const charVariant: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -45 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 120, damping: 22 },
  },
}

export const wordVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: entranceTransition,
  },
}

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
