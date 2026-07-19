// ============================================================
// TabFilter.tsx — Molecule: Glassmorphic Floating Filter Chips
// DESIGN.md §3: layoutId pill animation, spring physics
// User feedback: horizontal-scrollable mobile, centered desktop
// Capability-based labels, client-side filtering only
// ============================================================
import { useId } from 'react'
import { motion } from 'framer-motion'
import { interactionTransition } from '../../hooks/motionVariants'
import styles from './TabFilter.module.scss'

interface TabFilterProps<T extends string> {
  tabs:      readonly T[]
  active:    T
  onChange:  (tab: T) => void
  className?: string
}

// Generic component — infer the tab type from the `tabs` prop
function TabFilterInner<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: TabFilterProps<T>) {
  // Stable layoutId per instance (avoids collisions when used multiple times)
  const uid = useId()
  const pillId = `${uid}-activeChip`

  return (
    <div
      className={`${styles.track} ${className ?? ''}`}
      role="tablist"
      aria-label="Filter options"
    >
      {tabs.map((tab) => {
        const isActive = tab === active
        return (
          <motion.button
            key={tab}
            role="tab"
            aria-selected={isActive}
            className={`${styles.chip} ${isActive ? styles.active : ''}`}
            onClick={() => onChange(tab)}
            whileTap={{ scale: 0.94 }}
            transition={interactionTransition}
          >
            {/* Sliding pill background (DESIGN.md §3: layoutId) */}
            {isActive && (
              <motion.span
                layoutId={pillId}
                className={styles.pill}
                transition={interactionTransition}
              />
            )}
            <span className={styles.label}>{tab}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

// Assign displayName for dev tools
TabFilterInner.displayName = 'TabFilter'

// Re-export with generic type preserved
export const TabFilter = TabFilterInner as typeof TabFilterInner
