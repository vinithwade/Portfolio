import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'
import { site } from '../../data/content'

export function Contact() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="contact" className="section">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={reduceMotion ? reducedTransition : { duration: 0.55, ease: 'easeOut' }}
      >
        <div className="meta mb-2">ONE LAST THING</div>

        <h2 className="display max-w-[18ch]">If this feels like your sky too.</h2>

        <p className="prose mt-5 max-w-[52ch]">
          I read every message with care. If you are chasing something that feels true, or you just need a fellow traveler to talk through the beautiful mess — I am here.
        </p>

        <a href={`mailto:${site.email}`} className="contact-email mt-6 sm:mt-7 block hover:underline touch-target py-1">
          {site.email}
        </a>

        <div className="mt-4 sm:mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono tracking-[0.04em]">
          <motion.a 
            href={site.github} 
            target="_blank" 
            rel="noreferrer" 
            className="link touch-target py-1"
            whileHover={reduceMotion ? {} : { x: 1 }}
            transition={{ duration: 0.15 }}
          >GitHub</motion.a>
          <motion.a 
            href={site.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="link touch-target py-1"
            whileHover={reduceMotion ? {} : { x: 1 }}
            transition={{ duration: 0.15 }}
          >LinkedIn</motion.a>
          <motion.a 
            href={site.x} 
            target="_blank" 
            rel="noreferrer" 
            className="link touch-target py-1"
            whileHover={reduceMotion ? {} : { x: 1 }}
            transition={{ duration: 0.15 }}
          >X</motion.a>
          <motion.a 
            href={site.instagram} 
            target="_blank" 
            rel="noreferrer" 
            className="link touch-target py-1"
            whileHover={reduceMotion ? {} : { x: 1 }}
            transition={{ duration: 0.15 }}
          >Instagram</motion.a>
        </div>

        <div className="text-sm mt-1.5 sm:mt-2 text-white/50">{site.location}</div>
      </motion.div>
    </section>
  )
}
