// ============================================================
// useGlassTilt.ts — 3D Tilt Hook (SKILL.md §3.2 — Logic Separation)
// DESIGN.md §4: useMotionValue + useTransform for 3D tilt
// ============================================================
import { useRef, useCallback } from 'react'
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

interface GlassTiltReturn<T extends HTMLElement = HTMLDivElement> {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  glowX: MotionValue<string>
  glowY: MotionValue<string>
  handleMouseMove: (e: React.MouseEvent<T>) => void
  handleMouseLeave: () => void
  cardRef: React.RefObject<T | null>
}

const SPRING_CONFIG = { stiffness: 300, damping: 20 } // DESIGN.md §4

export function useGlassTilt<T extends HTMLElement = HTMLDivElement>(): GlassTiltReturn<T> {
  const cardRef = useRef<T | null>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring physics for "weighted" feel
  const springX = useSpring(rawX, SPRING_CONFIG)
  const springY = useSpring(rawY, SPRING_CONFIG)

  // Map mouse offset → rotation degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12])

  // Glow highlight position (follows mouse)
  const glowX = useTransform(springX, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(springY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      rawX.set(x)
      rawY.set(y)
    },
    [rawX, rawY]
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { rotateX, rotateY, glowX, glowY, handleMouseMove, handleMouseLeave, cardRef }
}
