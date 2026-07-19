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

function TabFilterInner<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: TabFilterProps<T>) {

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
            {}
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

TabFilterInner.displayName = 'TabFilter'

export const TabFilter = TabFilterInner as typeof TabFilterInner
