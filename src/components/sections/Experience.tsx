import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'
import { experience } from '../../data/content'

export function Experience() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="experience" className="section">
      <div className="meta mb-3">CHAPTERS</div>
      <h2 className="heading">Where the work has taken me.</h2>

      <div className="mt-6 sm:mt-7 space-y-6 sm:space-y-7">
        {experience.map((e, idx) => (
          <motion.div 
            key={idx} 
            className="exp-block"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={reduceMotion ? reducedTransition : { duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
          >
            <div className="font-mono text-xs tracking-[3px] text-black/50">{e.period}</div>
            <div className="mt-1.5 sm:mt-2 text-[16px] sm:text-[17px] font-medium">{e.role}</div>
            <div className="text-black/70 text-[14.5px] sm:text-[15px]">{e.place}</div>
            <p className="prose mt-2.5 sm:mt-3 text-[14.5px] sm:text-[15px]">{e.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
