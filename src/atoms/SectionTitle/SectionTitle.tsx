import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '../AnimatedText'
import { entranceTransition, fadeInUp } from '../../hooks/motionVariants'
import styles from './SectionTitle.module.scss'

interface SectionTitleProps {
  children:   string
  subtitle?:  string
  align?:     'left' | 'center'
}

export const SectionTitle: React.FC<SectionTitleProps> = React.memo(({
  children,
  subtitle,
  align = 'center',
}) => {
  return (
    <div className={`${styles.wrapper} ${styles[align]}`}>
      <h2 className={styles.title} aria-label={children}>
        <AnimatedText splitBy="words" delay={0}>
          {children}
        </AnimatedText>
        <motion.span
          className={styles.accent}
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ ...entranceTransition, delay: 0.2 }}
          style={{ transformOrigin: align === 'center' ? 'center' : 'left' }}
        />
      </h2>
      {subtitle && (
        <motion.p
          className={styles.subtitle}
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ ...entranceTransition, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
})

SectionTitle.displayName = 'SectionTitle'
