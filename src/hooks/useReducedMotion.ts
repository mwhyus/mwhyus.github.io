// ============================================================
// useReducedMotion.ts — Global Reduced Motion Hook
// DESIGN.md §3: "Respect prefers-reduced-motion."
// SKILL.md §3.2: Logic separated from presentation.
// ============================================================
import { useEffect, useState } from 'react'

/**
 * Returns `true` when the user has requested reduced motion via OS settings.
 * Use this to conditionally disable non-essential Framer Motion animations.
 *
 * @example
 *   const shouldReduce = useReducedMotion()
 *   const transition = shouldReduce ? { duration: 0 } : entranceTransition
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
