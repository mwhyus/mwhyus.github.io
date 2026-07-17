// ============================================================
// Button.tsx — Atom: Gold CTA & Glass variants
// DESIGN.md: Amber #DAA520 CTA, border-radius 8px
// SKILL.md §1: Atom — single responsibility, extendable via props
// ============================================================
import React from 'react'
import { motion } from 'framer-motion'
import styles from './Button.module.scss'

type ButtonVariant = 'gold' | 'glass' | 'outline'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  className?: string
}

export const Button: React.FC<ButtonProps> = React.memo(({
  children,
  variant = 'gold',
  href,
  onClick,
  target,
  rel,
  className,
}) => {
  const cls = `${styles.btn} ${styles[variant]} ${className ?? ''}`

  const motionProps = {
    whileHover: { scale: 1.04, y: -2 },
    whileTap:   { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={cls}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={cls}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'
