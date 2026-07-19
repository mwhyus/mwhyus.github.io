import React, { useMemo } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  charVariant,
  wordVariant,
  instantTransition,
} from '../../hooks/motionVariants'

interface AnimatedTextProps {
  children:   string
  
  splitBy?:   'chars' | 'words'
  className?: string
  
  as?:        'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  delay?:     number
}

export const AnimatedText: React.FC<AnimatedTextProps> = React.memo(({
  children,
  splitBy    = 'chars',
  className,
  as:   Tag   = 'span',
  delay = 0,
}) => {
  const shouldReduce = useReducedMotion()

  const containerVariants: Variants = useMemo(() => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduce ? 0 : (splitBy === 'chars' ? 0.03 : 0.06),
        delayChildren:   delay,
      },
    },
  }), [splitBy, delay, shouldReduce])

  const itemVariants: Variants = useMemo(() => {
    if (shouldReduce) {
      return {
        hidden: { opacity: 1, y: 0 },
        show:   { opacity: 1, y: 0, transition: instantTransition },
      }
    }
    return splitBy === 'chars' ? charVariant : wordVariant
  }, [splitBy, shouldReduce])

  const parts = useMemo(() => {
    if (splitBy === 'words') return children.split(' ')
    return children.split('')
  }, [children, splitBy])

  const MotionTag = motion[Tag] as typeof motion.span

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      aria-label={children}
      style={{ display: 'inline-block', perspective: 800 }}
    >
      {parts.map((part, i) => (
        <motion.span
          key={`${part}-${i}`}
          variants={itemVariants}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
          aria-hidden="true"
        >
          {part === ' ' ? '\u00A0' : part}
          {splitBy === 'words' && i < parts.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </MotionTag>
  )
})

AnimatedText.displayName = 'AnimatedText'
