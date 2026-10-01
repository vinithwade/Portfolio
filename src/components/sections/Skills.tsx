import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'
import { skillGroups } from '../../data/content'


export function Skills() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="skills" className="section">
      <div className="meta mb-3">SKILLS</div>
      <h2 className="heading">Technical skills.</h2>

      <div className="mt-7 sm:mt-8 max-w-[62ch] space-y-6 sm:space-y-7">
        {skillGroups.map((g, i) => (
          <motion.div 
            key={i} 
            className="skills-group"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={reduceMotion ? reducedTransition : { duration: 0.4, delay: i * 0.04, ease: 'easeOut' }}
          >
            <div className="font-mono text-xs tracking-[0.2em] text-black/50">{g.label}</div>
            <div className="mt-1.5 sm:mt-2 text-[15.5px] sm:text-[17px] leading-tight tracking-[-0.005em]">{g.items.join(' · ')}</div>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 sm:mt-7 text-xs font-mono tracking-[0.08em] text-black/50">The tools behind the work.</p>
    </section>
  )
}
