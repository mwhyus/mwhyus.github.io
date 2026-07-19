import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiGithubLine, RiExternalLinkLine } from 'react-icons/ri'
import { SectionTitle } from '../../atoms/SectionTitle'
import { TabFilter } from '../../molecules/TabFilter'
import { useGlassTilt } from '../../hooks/useGlassTilt'
import {
  staggerContainer,
  entranceTransition,
} from '../../hooks/motionVariants'
import styles from './Projects.module.scss'

const CAPABILITY_TABS = [
  'All',
  'Product Engineering',
  'Mobile Systems',
  'System Architecture',
] as const

type CapabilityTab = typeof CAPABILITY_TABS[number]

interface Project {
  title:        string
  description:  string
  tags:         string[]
  capabilities: CapabilityTab[]
  github?:      string
  live?:        string
  gradient:     string
  featured?:    boolean
}

const PROJECTS: Project[] = [
  {
    title:        'SayurHub — Farm-to-Table App',
    description:  'A full-stack marketplace connecting local farmers with consumers. Built with React (web) and React Native (mobile) with Node.js backend.',
    tags:         ['React', 'React Native', 'Node.js', 'Agile'],
    capabilities: ['Product Engineering', 'Mobile Systems'],
    github:       'https://github.com/mwhyus',
    live:         'https://drive.google.com/drive/folders/1eon5gSELTBj3yrmSbL7aYn3bHlD_8iOm?usp=sharing',
    gradient:     'linear-gradient(135deg, #134E5E 0%, #71B280 100%)',
    featured:     true,
  },
  {
    title:        'Portfolio Website v2',
    description:  'This very portfolio — built with React, TypeScript, Vite, SCSS Modules, Framer Motion, and React Three Fiber. Golden Hour Glassmorphism design.',
    tags:         ['React', 'TypeScript', 'Three.js', 'Framer Motion'],
    capabilities: ['Product Engineering', 'System Architecture'],
    github:       'https://github.com/mwhyus/mwhyus.github.io',
    live:         'https://mwhyus.github.io',
    gradient:     'linear-gradient(135deg, #DAA520 0%, #8B4513 100%)',
    featured:     true,
  },
  {
    title:        'Agile Dev Bootcamp Projects',
    description:  'A collection of sprint-based projects developed during the Agile Development Bootcamp, showcasing collaborative full-stack development.',
    tags:         ['HTML', 'CSS', 'JavaScript', 'Agile'],
    capabilities: ['System Architecture', 'Product Engineering'],
    github:       'https://github.com/mwhyus',
    live:         'https://drive.google.com/drive/folders/1VFHGBzI83wlfsw3t_Jykmzic8z426QlS?usp=sharing',
    gradient:     'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
  },
]

const ProjectCard: React.FC<{ project: Project; index: number }> = React.memo(
  ({ project, index }) => {
    const { rotateX, rotateY, glowX, glowY, handleMouseMove, handleMouseLeave, cardRef } =
      useGlassTilt()

    return (
      <motion.article
        layout
        className={styles.card}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.94 }}
        transition={{ ...entranceTransition, delay: index * 0.07 }}
      >
        <motion.div
          ref={cardRef}
          className={styles.cardInner}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ y: -6 }}
          transition={entranceTransition}
        >
          {}
          <motion.div
            className={styles.glow}
            style={{ '--glow-x': glowX, '--glow-y': glowY } as React.CSSProperties}
            aria-hidden="true"
          />

          {}
          <div className={styles.thumbnail} style={{ background: project.gradient }}>
            {project.featured && (
              <span className={styles.featuredBadge}>Featured</span>
            )}
            <div className={styles.thumbnailInner}>
              <span className={styles.thumbnailText}>
                {project.title.split('—')[0].trim()}
              </span>
            </div>
          </div>

          {}
          <div className={styles.body} style={{ transform: 'translateZ(16px)' }}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>

            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <div className={styles.links}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconLink}
                  aria-label="View on GitHub"
                >
                  <RiGithubLine size={16} />
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconLink}
                  aria-label="View live project"
                >
                  <RiExternalLinkLine size={16} />
                  Live
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.article>
    )
  }
)
ProjectCard.displayName = 'ProjectCard'

export const Projects: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<CapabilityTab>('All')

  const filtered = activeTab === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.capabilities.includes(activeTab))

  return (
    <section id="projects" className={styles.section} aria-label="Projects section">
      <div className={styles.container}>
        <SectionTitle subtitle="A selection of work I've built and am proud of.">
          Projects
        </SectionTitle>

        {}
        <TabFilter
          tabs={CAPABILITY_TABS}
          active={activeTab}
          onChange={setActiveTab}
        />

        {}
        <motion.div
          className={styles.grid}
          layout
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
})
Projects.displayName = 'Projects'
