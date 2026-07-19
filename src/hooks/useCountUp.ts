// ============================================================
// useCountUp.ts — Animated Counter Hook
// SKILL.md §3.2: Logic separated from presentation
// Triggers on viewport entry, respects reduced-motion
// ============================================================
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface CountUpOptions {
  end: number
  duration?: number   // ms
  start?: number
  suffix?: string
}

interface CountUpReturn {
  count: string
  ref: React.RefObject<HTMLElement | null>
}

/**
 * Animates a number from `start` to `end` when the target element
 * enters the viewport. Instantly shows final value if reduced-motion.
 */
export function useCountUp({
  end,
  duration = 1800,
  start = 0,
  suffix = '',
}: CountUpOptions): CountUpReturn {
  const ref = useRef<HTMLElement | null>(null)
  const [count, setCount] = useState<string>(`${start}${suffix}`)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (shouldReduce) {
      setCount(`${end}${suffix}`)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()

        const startTime = performance.now()
        const range = end - start

        const tick = (now: number) => {
          const elapsed  = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = Math.round(start + range * eased)
          setCount(`${current}${suffix}`)
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, start, duration, suffix, shouldReduce])

  return { count, ref }
}
