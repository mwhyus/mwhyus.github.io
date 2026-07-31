import { useEffect, useRef } from 'react'

/**
 * Tracks normalized mouse coordinates in the range [-0.5, 0.5].
 * Returns a stable ref object so consumers can read the current value
 * inside useFrame / rAF loops without causing React re-renders.
 */
export function useMouseParallax(): React.RefObject<{ x: number; y: number }> {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5
      mouse.current.y = e.clientY / window.innerHeight - 0.5
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return mouse
}
