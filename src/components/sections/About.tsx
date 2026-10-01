import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'
import { about, education } from '../../data/content'

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
          <div className="font-mono text-[10px] tracking-[0.2em] text-black/50 mb-3">THE BEGINNING</div>

          <div className="prose">
            {about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className="mt-7 pt-5 border-t border-black/10">
            <div className="meta text-black/50 mb-2">EDUCATION · {education.period}</div>
            <h2 className="font-serif text-[21px]">{education.institution}</h2>
            <p className="text-[15px] text-black/70 mt-1">{education.degree}</p>
            <p className="text-sm text-black/50 mt-1">{education.location}</p>
          </div>

          <a href="#contact" className="link inline-block mt-6 text-sm touch-target py-1">say hello</a>
        </motion.div>
      </div>
    </section>
  )
}
