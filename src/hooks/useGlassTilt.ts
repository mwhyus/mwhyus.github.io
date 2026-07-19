// ============================================================
// useGlassTilt.ts — 3D Tilt Hook (SKILL.md §3.2 — Logic Separation)
// DESIGN.md §3: interaction spring { stiffness: 400, damping: 25 }
// Updated: reduced-motion guard, correct spring config
// ============================================================
import { useRef, useCallback } from 'react'
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

interface GlassTiltReturn<T extends HTMLElement = HTMLDivElement> {
  rotateX:        MotionValue<number>
  rotateY:        MotionValue<number>
  glowX:          MotionValue<string>
  glowY:          MotionValue<string>
  handleMouseMove:  (e: React.MouseEvent<T>) => void
  handleMouseLeave: () => void
  cardRef:          React.RefObject<T | null>
}

// DESIGN.md §3: interaction preset — stiffness 400, damping 25
const SPRING_CONFIG = { stiffness: 400, damping: 25 }

export function useGlassTilt<T extends HTMLElement = HTMLDivElement>(): GlassTiltReturn<T> {
  const cardRef      = useRef<T | null>(null)
  const shouldReduce = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring physics for "weighted" feel
  const springX = useSpring(rawX, SPRING_CONFIG)
  const springY = useSpring(rawY, SPRING_CONFIG)

  // Map mouse offset → rotation degrees (zeroed if reduced-motion)
  const maxDeg  = shouldReduce ? 0 : 12
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxDeg, -maxDeg])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxDeg, maxDeg])

  // Glow highlight position (follows mouse)
  const glowX = useTransform(springX, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(springY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!cardRef.current || shouldReduce) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5
      rawX.set(x)
      rawY.set(y)
    },
    [rawX, rawY, shouldReduce]
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { rotateX, rotateY, glowX, glowY, handleMouseMove, handleMouseLeave, cardRef }
}
