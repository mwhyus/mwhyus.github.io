// ============================================================
// Projects.tsx — Organism: Project gallery with spring hover
// DESIGN.md §C: Card gallery, scale-up spring on hover
// ============================================================
import React from 'react'
import { motion } from 'framer-motion'
import { RiGithubLine, RiExternalLinkLine } from 'react-icons/ri'
import { SectionTitle } from '../../atoms/SectionTitle'
import styles from './Projects.module.scss'

interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  gradient: string
}

const PROJECTS: Project[] = [
  {
    title: 'SayurHub — Farm-to-Table App',
    description: 'A full-stack marketplace connecting local farmers with consumers. Built with React (web) and React Native (mobile) with Node.js backend.',
    tags: ['React', 'React Native', 'Node.js', 'Agile'],
    github: 'https://github.com/mwhyus',
    live: 'https://drive.google.com/drive/folders/1eon5gSELTBj3yrmSbL7aYn3bHlD_8iOm?usp=sharing',
    gradient: 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)',
  },
  {
    title: 'Portfolio Website v2',
    description: 'This very portfolio — built with React, TypeScript, Vite, SCSS Modules, Framer Motion, and React Three Fiber. Golden Hour Glassmorphism design.',
    tags: ['React', 'TypeScript', 'Three.js', 'Framer Motion'],
    github: 'https://github.com/mwhyus/mwhyus.github.io',
    live: 'https://mwhyus.github.io',
    gradient: 'linear-gradient(135deg, #DAA520 0%, #8B4513 100%)',
  },
  {
    title: 'Agile Dev Bootcamp Projects',
    description: 'A collection of sprint-based projects developed during the Agile Development Bootcamp, showcasing collaborative full-stack development.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Agile'],
    github: 'https://github.com/mwhyus',
    live: 'https://drive.google.com/drive/folders/1VFHGBzI83wlfsw3t_Jykmzic8z426QlS?usp=sharing',
    gradient: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
  },
]

const ProjectCard: React.FC<{ project: Project; index: number }> = React.memo(({ project, index }) => {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 }}
      // DESIGN.md §C: Spring scale on hover
      whileHover={{ scale: 1.03, y: -6 }}
    >
      {/* Gradient thumbnail */}
      <div className={styles.thumbnail} style={{ background: project.gradient }}>
        <div className={styles.thumbnailInner}>
          <span className={styles.thumbnailText}>{project.title.split('—')[0].trim()}</span>
        </div>
      </div>

      {/* Card body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.tags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.links}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="View on GitHub">
              <RiGithubLine size={18} />
              GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="View live project">
              <RiExternalLinkLine size={18} />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
})

ProjectCard.displayName = 'ProjectCard'

export const Projects: React.FC = React.memo(() => {
  return (
    <section id="projects" className={styles.section} aria-label="Projects section">
      <div className={styles.container}>
        <SectionTitle subtitle="A selection of work I've built and am proud of.">
          Projects
        </SectionTitle>
        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
})

Projects.displayName = 'Projects'
