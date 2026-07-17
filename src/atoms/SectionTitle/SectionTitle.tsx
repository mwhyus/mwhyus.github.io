// ============================================================
// SectionTitle.tsx — Atom: Section heading with gold accent
// ============================================================
import React from 'react'
import { motion } from 'framer-motion'
import styles from './SectionTitle.module.scss'

interface SectionTitleProps {
  children: React.ReactNode
  subtitle?: string
  align?: 'left' | 'center'
}

export const SectionTitle: React.FC<SectionTitleProps> = React.memo(({
  children,
  subtitle,
  align = 'center',
}) => {
  return (
    <div className={`${styles.wrapper} ${styles[align]}`}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
        <span className={styles.accent} aria-hidden="true" />
      </motion.h2>
      {subtitle && (
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
})

SectionTitle.displayName = 'SectionTitle'
