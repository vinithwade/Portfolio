import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projects, site, type Project } from '../../data/content'
import { fadeUp } from '../../lib/motion'
import { ResumeLink } from '../ui/ResumeLink'

export function Projects() {
  const reduceMotion = useReducedMotion()
  const [selected, setSelected] = useState<Project | null>(null)
  const close = () => setSelected(null)

  return (
    <section id="projects" className="section">
      <div className="meta mb-2">PROJECTS</div>
      <h2 className="heading mb-6">Selected projects.</h2>
      <div className="mt-1">
        {projects.map((project, i) => (
          <motion.div key={project.title} className="constellation-card group" {...fadeUp(i * 0.018, !!reduceMotion)} whileHover={reduceMotion ? {} : { y: -1.5 }}>
            <div className="constellation-star" aria-hidden="true" />
            <div className="constellation-tag">{project.tag}</div>
            <h3 className="mt-2 font-serif text-[21px] leading-tight tracking-[-0.01em] pr-8">{project.title}</h3>
            <div className="mt-1 text-[14.5px] text-ink/75">{project.subtitle}</div>
            <p className="prose mt-3 text-[15px]">{project.description}</p>
            <p className="mt-3 text-[11px] font-mono leading-relaxed text-ink/50">{project.tech.join(' · ')}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
              <ProjectLinks project={project} />
              <button type="button" onClick={() => setSelected(project)} aria-label={`Explore ${project.title}`} className="touch-target font-mono text-[10px] tracking-[0.14em] text-ink/55 hover:text-ink underline decoration-ink/25 underline-offset-[3px] transition-colors">
                PROJECT DETAILS
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <a href={`${site.github}?tab=repositories`} target="_blank" rel="noreferrer" className="link touch-target inline-flex mt-5 text-sm">More work on GitHub →</a>
      <AnimatePresence>
        {selected && <Modal key={selected.title} project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.href && <a href={project.href} target="_blank" rel="noreferrer" className="link touch-target" aria-label={`View ${project.title} code`}>View code →</a>}
      {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="link touch-target" aria-label={`Visit ${project.title} site`}>Visit site ↗</a>}
    </>
  )
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduceMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  // Keep focus in the details and return it to the card's trigger on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    document.documentElement.classList.add('project-open')
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      document.documentElement.classList.remove('project-open')
      previous?.focus({ preventScroll: true })
    }
  }, [])

  return (
    <div className="constellation-modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${project.title} details`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') { event.stopPropagation(); onClose() }
        if (event.key !== 'Tab') return
        const focusable = cardRef.current?.querySelectorAll<HTMLElement>('button, a[href]')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }}>
      <motion.div ref={cardRef} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.988 }} transition={{ duration: reduceMotion ? 0.01 : 0.18 }} className="constellation-modal-card" onClick={(event) => event.stopPropagation()}>
        <button ref={closeRef} type="button" onClick={onClose} className="constellation-modal-close" aria-label="Close project details">CLOSE</button>
        <div className="constellation-tag pr-16">{project.tag}</div>
        <h3 className="mt-2 font-serif text-[22px] leading-tight tracking-[-0.015em] pr-10">{project.title}</h3>
        <div className="mt-1 text-[14.5px] text-ink/70">{project.subtitle}</div>
        <p className="prose mt-5 text-[15px]">{project.description}</p>
        <div className="mt-6 pt-5 border-t border-ink/10 space-y-4">
          {project.role && <div className="constellation-detail"><h4>My part</h4><div>{project.role}</div></div>}
          {project.problem && <div className="constellation-detail"><h4>The problem</h4><div>{project.problem}</div></div>}
          {project.process && <div className="constellation-detail"><h4>How it works</h4><ul>{project.process.map((step) => <li key={step}>{step}</li>)}</ul></div>}
          <div className="constellation-detail"><h4>The tools</h4><div>{project.tech.join(' · ')}</div></div>
          {project.detail && <p className="text-[13.5px] leading-relaxed text-ink/60">{project.detail}</p>}
        </div>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm"><ProjectLinks project={project} />{!project.href && <ResumeLink />}</div>
      </motion.div>
    </div>
  )
}
