import React from 'react'
import { motion } from 'framer-motion'
import { interactionTransition } from '../../hooks/motionVariants'
import styles from './Button.module.scss'

type ButtonVariant = 'gold' | 'glass' | 'outline'

interface ButtonProps {
  children:   React.ReactNode
  variant?:   ButtonVariant
  href?:      string
  onClick?:   () => void
  target?:    string
  rel?:       string
  className?: string
  ariaLabel?: string
  type?:      'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = React.memo((
  { children, variant = 'gold', href, onClick, target, rel, className, ariaLabel, type = 'button' }
) => {
  const cls = `${styles.btn} ${styles[variant]} ${className ?? ''}`

  const motionProps = {
    whileHover:  { scale: 1.04, y: -2 },
    whileTap:    { scale: 0.97 },
    transition:  interactionTransition,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={cls}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={cls}
      onClick={onClick}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'
