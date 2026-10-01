import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'
import { skillGroups } from '../../data/content'

export function Skills() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="skills" className="section">
      <div className="meta mb-3">SKILLS</div>
      <h2 className="heading">Technical skills.</h2>
      <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-black/60">
        The languages, systems, and tools behind my projects.
      </p>

      <ul className="skills-grid mt-7 sm:mt-8">
        {skillGroups.map((group, index) => (
          <motion.li
            key={group.label}
            className="skills-card"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={reduceMotion ? reducedTransition : { duration: 0.4, delay: index * 0.04, ease: 'easeOut' }}
          >
            <div className="skills-card-heading">
              <h3>{group.label}</h3>
              <span className="skills-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <ul className="skills-tags" aria-label={`${group.label} skills`}>
              {group.items.map((skill) => <li key={skill} className="skills-tag">{skill}</li>)}
            </ul>
          </motion.li>
        ))}
      </ul>

      <a href="#projects" className="link touch-target inline-flex mt-6 text-sm">See these skills in my projects →</a>
    </section>
  )
}
