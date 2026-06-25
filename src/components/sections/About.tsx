import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'

export function About() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="section">
      <div className="max-w-[62ch]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={reduceMotion ? reducedTransition : { duration: 0.5, ease: 'easeOut' }}
        >
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/50 mb-3">THE BEGINNING</div>

          <div className="prose">
            <p className="text-[16px] sm:text-[17px] leading-[1.65]">
              It began with awkward lines at sixteen. One became two, then a small page that felt as though it belonged to someone.
            </p>
            <p>
              Then came the strange, new feeling of shaping with something that seemed to grasp what I meant before the sentence was done.
            </p>
            <p>
              I do not chase polish for its own sake. I make things that are useful and kind. Hyderabad is home. I read more than I should. I believe the best work feels as if it was always waiting to be found.
            </p>
          </div>

          <a href="#contact" className="link inline-block mt-6 text-sm touch-target py-1">say hello</a>
        </motion.div>
      </div>
    </section>
  )
}
