// ============================================================
// Stack.tsx — Organism: Tech Stack Grid with 3D Tilt Cards
// DESIGN.md §B: CSS Grid, 3D tilt via useGlassTilt hook
// Organized into two categories: AI Tools & Dev Technologies
// ============================================================
import React from 'react'
import { motion } from 'framer-motion'
import {
  RiReactjsLine, RiJavascriptLine, RiGithubLine
} from 'react-icons/ri'
import {
  SiTypescript, SiJest, SiStorybook, SiJenkins, SiFlutter, SiDart
} from 'react-icons/si'
import { TbBrandMeta } from 'react-icons/tb'
import { SectionTitle } from '../../atoms/SectionTitle'
import { useGlassTilt } from '../../hooks/useGlassTilt'
import styles from './Stack.module.scss'

const AntigravityLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '1em', height: '1em' }}>
    <path d="M12 2C12 7.52 16.48 12 22 12C16.48 12 12 16.48 12 22C12 16.48 7.52 12 2 12C7.52 12 12 7.52 12 2Z" fill="currentColor" />
  </svg>
)

interface SkillItem {
  icon: React.ReactNode
  name: string
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Learning'
  color: string
}

interface SkillCategory {
  label: string
  subtitle: string
  items: SkillItem[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: 'AI Tools',
    subtitle: 'Tools that supercharge my workflow',
    items: [
      { icon: <AntigravityLogo />, name: 'Antigravity', level: 'Advanced', color: '#A78BFA' },
      { icon: <RiGithubLine />, name: 'GitHub Copilot', level: 'Advanced', color: '#F0F6FF' },
    ],
  },
  {
    label: 'Development Technologies',
    subtitle: 'Languages, frameworks, and toolchains',
    items: [
      { icon: <RiReactjsLine />, name: 'React', level: 'Advanced', color: '#61DAFB' },
      { icon: <RiReactjsLine />, name: 'React Native', level: 'Advanced', color: '#61DAFB' },
      { icon: <SiFlutter />, name: 'Flutter', level: 'Intermediate', color: '#02569B' },
      { icon: <RiJavascriptLine />, name: 'JavaScript', level: 'Intermediate', color: '#F7DF1E' },
      { icon: <SiTypescript />, name: 'TypeScript', level: 'Intermediate', color: '#3178C6' },
      { icon: <SiDart />, name: 'Dart', level: 'Intermediate', color: '#0175C2' },
      { icon: <SiJest />, name: 'Jest', level: 'Intermediate', color: '#C21325' },
      { icon: <TbBrandMeta />, name: 'Flow', level: 'Intermediate', color: '#E66F00' },
      { icon: <SiJenkins />, name: 'Jenkins', level: 'Intermediate', color: '#D33834' },
      { icon: <SiStorybook />, name: 'Storybook', level: 'Intermediate', color: '#FF4785' },
    ],
  },
]

const LEVEL_COLORS: Record<SkillItem['level'], string> = {
  Expert: '#DAA520',
  Advanced: '#D4AF37',
  Intermediate: '#C9A227',
  Learning: '#8B6914',
}

// Individual tilt card — isolated hook per card
const SkillCard: React.FC<{ skill: SkillItem; index: number }> = React.memo(({ skill, index }) => {
  const { rotateX, rotateY, glowX, glowY, handleMouseMove, handleMouseLeave, cardRef } = useGlassTilt()

  return (
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.06 }}
    >
      <motion.div
        ref={cardRef}
        className={styles.card}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glow highlight following mouse */}
        <motion.div
          className={styles.glow}
          style={{ '--glow-x': glowX, '--glow-y': glowY } as React.CSSProperties}
          aria-hidden="true"
        />

        {/* Card inner — translateZ for depth (DESIGN.md §4) */}
        <div className={styles.cardInner} style={{ transform: 'translateZ(30px)' }}>
          <div className={styles.icon} style={{ color: skill.color }}>
            {skill.icon}
          </div>
          <div className={styles.name}>{skill.name}</div>
          <div
            className={styles.level}
            style={{ color: LEVEL_COLORS[skill.level] }}
          >
            {skill.level}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
})

SkillCard.displayName = 'SkillCard'

export const Stack: React.FC = React.memo(() => {
  return (
    <section id="stack" className={styles.section} aria-label="Technical skills section">
      <div className={styles.container}>
        <SectionTitle subtitle="Technologies and tools I work with daily.">
          My Stack
        </SectionTitle>

        {SKILL_CATEGORIES.map((category) => (
          <div key={category.label} className={styles.category}>
            {/* Category heading */}
            <motion.div
              className={styles.categoryHeader}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <h3 className={styles.categoryLabel}>{category.label}</h3>
              <p className={styles.categorySubtitle}>{category.subtitle}</p>
            </motion.div>

            {/* Skills grid for this category */}
            <div className={styles.grid} role="list" aria-label={`${category.label} skill cards`}>
              {category.items.map((skill, i) => (
                <div key={skill.name} role="listitem">
                  <SkillCard skill={skill} index={i} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
})

Stack.displayName = 'Stack'
