// ============================================================
// GlassCard.tsx — Atom: Reusable Glass Container
// DESIGN.md §3 — Strict Glass Protocol enforcement
// SKILL.md §1a — Atom, single-responsibility
// ============================================================
import React from 'react'
import { motion } from 'framer-motion'
import styles from './GlassCard.module.scss'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  as?: 'div' | 'article' | 'section'
}

export const GlassCard: React.FC<GlassCardProps> = React.memo(({
  children,
  className,
  onClick,
  as: Tag = 'div',
}) => {
  return (
    <motion.div
      className={`${styles.card} ${className ?? ''}`}
      onClick={onClick}
      // DESIGN.md §4: Spring hover animation
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      role={Tag === 'article' ? 'article' : undefined}
    >
      {children}
    </motion.div>
  )
})

GlassCard.displayName = 'GlassCard'
