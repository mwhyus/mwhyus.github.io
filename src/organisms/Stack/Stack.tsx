import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiReactjsLine, RiJavascriptLine, RiGithubLine
} from 'react-icons/ri'
import {
  SiTypescript, SiJest, SiStorybook, SiJenkins, SiFlutter, SiDart
} from 'react-icons/si'
import { SectionTitle } from '../../atoms/SectionTitle'
import { TabFilter } from '../../molecules/TabFilter'
import { useGlassTilt } from '../../hooks/useGlassTilt'
import { entranceTransition, staggerContainer, fadeInUp } from '../../hooks/motionVariants'
import styles from './Stack.module.scss'

const AntigravityLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '1em', height: '1em' }}>
    <path d="M12 2C12 7.52 16.48 12 22 12C16.48 12 12 16.48 12 22C12 16.48 7.52 12 2 12C7.52 12 12 7.52 12 2Z" fill="currentColor" />
  </svg>
)

const FlowLogo = () => (
  <svg viewBox="0 0 225 252" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '1em', height: '1em' }}>
    <g fill="currentColor">
      <path opacity=".7" d="M224.74 109l-84.11-84.1h84.11z"/>
      <path opacity=".7" d="M81.72 0h47.68l36.44 36.43H81.72z"/>
      <path opacity=".9" d="M84.45 84.12L.34 0h101.13v84.11zm73.89 84.1l84.11 84.11h-84.11z"/>
      <path opacity=".7" d="M101.47 168.23l-84.1-84.12h84.11v84.11zm90.58-42.57L125 58.57h67.08zm7.84 118.84l-76.28-76.27h76.28z"/>
      <path opacity=".9" d="M101.47 67l-67-67h67z"/>
      <path opacity=".8" d="M123.95 168.22l84.11 84.11h-84.11z"/>
      <path opacity=".7" d="M209.08 201.8l-84-84h84z"/>
      <path opacity=".9" d="M125 58.57l83.09 83.09H125z"/>
      <path opacity=".7" d="M101.47 252L0 150.51h101.47V252z"/>
    </g>
  </svg>
)

interface SkillItem {
  icon:     React.ReactNode
  name:     string
  level:    'Expert' | 'Advanced' | 'Intermediate' | 'Learning'
  color:    string
  category: 'AI Tools' | 'Dev Tech'
}

const CATEGORY_TABS = ['All', 'AI Tools', 'Dev Tech'] as const
type CategoryTab = typeof CATEGORY_TABS[number]

const SKILLS: SkillItem[] = [
  { icon: <AntigravityLogo />, name: 'Antigravity', level: 'Advanced',     color: '#A78BFA', category: 'AI Tools' },
  { icon: <RiGithubLine />,    name: 'GitHub Copilot', level: 'Advanced',  color: '#F0F6FF', category: 'AI Tools' },
  { icon: <RiReactjsLine />,   name: 'React',         level: 'Advanced',   color: '#61DAFB', category: 'Dev Tech' },
  { icon: <RiReactjsLine />,   name: 'React Native',  level: 'Advanced',   color: '#61DAFB', category: 'Dev Tech' },
  { icon: <SiFlutter />,       name: 'Flutter',       level: 'Intermediate', color: '#02569B', category: 'Dev Tech' },
  { icon: <RiJavascriptLine />, name: 'JavaScript',   level: 'Advanced',   color: '#F7DF1E', category: 'Dev Tech' },
  { icon: <SiTypescript />,    name: 'TypeScript',    level: 'Advanced',   color: '#3178C6', category: 'Dev Tech' },
  { icon: <SiDart />,          name: 'Dart',          level: 'Intermediate', color: '#0175C2', category: 'Dev Tech' },
  { icon: <SiJest />,          name: 'Jest',          level: 'Intermediate', color: '#C21325', category: 'Dev Tech' },
  { icon: <FlowLogo />,        name: 'Flow',          level: 'Intermediate', color: '#E66F00', category: 'Dev Tech' },
  { icon: <SiJenkins />,       name: 'Jenkins',       level: 'Intermediate', color: '#D33834', category: 'Dev Tech' },
  { icon: <SiStorybook />,     name: 'Storybook',     level: 'Intermediate', color: '#FF4785', category: 'Dev Tech' },
]

const LEVEL_COLORS: Record<SkillItem['level'], string> = {
  Expert:       '#DAA520',
  Advanced:     '#D4AF37',
  Intermediate: '#C9A227',
  Learning:     '#8B6914',
}

const SkillCard: React.FC<{ skill: SkillItem; index: number }> = React.memo(
  ({ skill, index }) => {
    const { rotateX, rotateY, glowX, glowY, handleMouseMove, handleMouseLeave, cardRef } =
      useGlassTilt()

    return (
      <motion.div
        layout
        role="listitem"
        className={styles.cardWrapper}
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, scale: 0.88, y: 10 }}
        transition={{ ...entranceTransition, delay: index * 0.04 }}
      >
        <motion.div
          ref={cardRef}
          className={styles.card}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className={styles.glow}
            style={{ '--glow-x': glowX, '--glow-y': glowY } as React.CSSProperties}
            aria-hidden="true"
          />

          <div className={styles.cardInner} style={{ transform: 'translateZ(24px)' }}>
            <div className={styles.icon} style={{ color: skill.color }}>
              {skill.icon}
            </div>
            <div className={styles.name}>{skill.name}</div>
            <div className={styles.level} style={{ color: LEVEL_COLORS[skill.level] }}>
              {skill.level}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }
)
SkillCard.displayName = 'SkillCard'

export const Stack: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('All')

  const filtered = activeTab === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeTab)

  return (
    <section id="stack" className={styles.section} aria-label="Technical skills section">
      <div className={styles.container}>
        <SectionTitle subtitle="Technologies and tools I work with daily.">
          My Stack
        </SectionTitle>

        <TabFilter tabs={CATEGORY_TABS} active={activeTab} onChange={setActiveTab} />

        <motion.div
          layout
          className={styles.grid}
          role="list"
          aria-label="Skill cards"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
})
Stack.displayName = 'Stack'
