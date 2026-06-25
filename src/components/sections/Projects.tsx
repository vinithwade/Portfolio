import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projects, type Project } from '../../data/content'
import { fadeUp } from '../../lib/motion'

export function Projects() {
  const reduceMotion = useReducedMotion()
  const [selected, setSelected] = useState<number | null>(null)

  const open = (index: number) => setSelected(index)
  const close = () => setSelected(null)

  // Close on Escape — respectful, keyboard-native detail view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    if (selected !== null) {
      window.addEventListener('keydown', onKey)
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <section id="projects" className="section">
      <div className="meta mb-2">CONSTELLATIONS</div>
      <h2 className="heading mb-6">Marks I have left.</h2>

      <div className="mt-1">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            className="constellation-card group"
            {...fadeUp(i * 0.018, !!reduceMotion)}
            whileHover={reduceMotion ? {} : { y: -1.5 }}
          >
            {/* A plotted star — constellation marker */}
            <div className="constellation-star" aria-hidden="true" />

            <div className="constellation-tag">{p.tag}</div>

            <h3 className="mt-2 font-serif text-[21px] leading-none tracking-[-0.01em] pr-8">
              {p.title}
            </h3>
            <div className="mt-1 text-[14.5px] text-white/75">{p.subtitle}</div>

            <p className="prose mt-3 text-[15px]">{p.description}</p>

            {p.highlight && (
              <p className="mt-2.5 text-[13.5px] italic text-white/60">{p.highlight}</p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="link"
                onClick={(e) => e.stopPropagation()}
              >
                See the mark →
              </a>
              <button
                type="button"
                onClick={() => open(i)}
                className="font-mono text-[10px] tracking-[0.14em] text-white/55 hover:text-white underline decoration-white/25 underline-offset-[3px] transition-colors"
              >
                TRACE THE LINES
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Minimal modal for expanded constellation view — uses rich data (role / problem / process) */}
      <AnimatePresence>
        {selected !== null && (
          <Modal project={projects[selected]} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  )
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduceMotion = useReducedMotion()
  return (
    <div
      className="constellation-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} constellation`}
    >
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.988 }}
        transition={reduceMotion ? { duration: 0.01 } : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="constellation-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="constellation-modal-close"
          aria-label="Close constellation view"
        >
          CLOSE
        </button>

        <div className="constellation-tag">{project.tag}</div>

        <h3 className="mt-1 font-serif text-[22px] leading-none tracking-[-0.015em] pr-10">
          {project.title}
        </h3>
        <div className="mt-0.5 text-[14.5px] text-white/70">{project.subtitle}</div>

        <p className="prose mt-5 text-[15px]">{project.description}</p>

        {project.highlight && (
          <p className="mt-3.5 text-[13.5px] italic text-white/65">{project.highlight}</p>
        )}

        {(project.role || project.problem || (project.process && project.process.length)) && (
          <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
            {project.role && (
              <div className="constellation-detail">
                <h4>My part</h4>
                <div>{project.role}</div>
              </div>
            )}
            {project.problem && (
              <div className="constellation-detail">
                <h4>The quiet problem</h4>
                <div>{project.problem}</div>
              </div>
            )}
            {project.process && project.process.length > 0 && (
              <div className="constellation-detail">
                <h4>Constellation lines</h4>
                <ul>
                  {project.process.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-7">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="link text-sm"
          >
            See the mark →
          </a>
        </div>
      </motion.div>
    </div>
  )
}
