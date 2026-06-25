import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'
import { achievements } from '../../data/content'

export function Achievements() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="achievements" className="section">
      <div className="meta mb-3">LITTLE SPARKS</div>
      <h2 className="heading">Moments that stayed.</h2>

      <ul className="mt-6 sm:mt-7 mb-2 space-y-4 sm:space-y-5 text-[14.8px] sm:text-[15.5px] leading-[1.7] max-w-[64ch]">
        {achievements.map((a, i) => (
          <motion.li 
            key={i} 
            className="achieve-item pl-4 sm:pl-5 border-l border-white/20"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={reduceMotion ? reducedTransition : { duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
          >
            {a.text}
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
