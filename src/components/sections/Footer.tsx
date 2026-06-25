import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../../data/content'

export function Footer() {
  const reduceMotion = useReducedMotion()

  const year = new Date().getFullYear()
  return (
    <footer className="py-10 text-sm text-white/60 border-t border-white/10">
      <div className="container-page flex flex-col sm:flex-row justify-between gap-y-3 sm:gap-y-2 pt-1">
        <div>© {year} Vinith Wade</div>
        <div className="flex gap-x-5">
          <motion.a href={`mailto:${site.email}`} className="link touch-target py-0.5" whileHover={reduceMotion ? {} : { x: 0.5 }} transition={{ duration: 0.15 }}>Email</motion.a>
          <motion.a href={site.github} target="_blank" rel="noreferrer" className="link touch-target py-0.5" whileHover={reduceMotion ? {} : { x: 0.5 }} transition={{ duration: 0.15 }}>GitHub</motion.a>
          <motion.a href="#hero" className="link touch-target py-0.5" whileHover={reduceMotion ? {} : { x: 0.5 }} transition={{ duration: 0.15 }}>Top</motion.a>
        </div>
      </div>
    </footer>
  )
}
