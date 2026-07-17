// ============================================================
// Footer.tsx — Organism: Minimal amber-accented footer
// ============================================================
import React from 'react'
import { motion } from 'framer-motion'
import { RiLinkedinBoxLine, RiGithubLine, RiGitlabLine } from 'react-icons/ri'
import styles from './Footer.module.scss'

const SOCIAL_ICONS = [
  { icon: <RiLinkedinBoxLine />, href: 'https://www.linkedin.com/in/mwhyus/', label: 'LinkedIn' },
  { icon: <RiGithubLine />,      href: 'https://github.com/mwhyus',            label: 'GitHub'   },
  { icon: <RiGitlabLine />,      href: 'https://gitlab.com/mwhyus',            label: 'GitLab'   },
]

export const Footer: React.FC = React.memo(() => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <motion.div
          className={styles.logo}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          mwhyus<span className={styles.dot}>.</span>
        </motion.div>

        <div className={styles.socials}>
          {SOCIAL_ICONS.map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label={s.label}
              whileHover={{ scale: 1.2, color: '#DAA520' }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        <p className={styles.copy}>
          © {new Date().getFullYear()} Muhammad Wahyu Santoso — Crafted with React, Framer Motion & TypeScript
        </p>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
