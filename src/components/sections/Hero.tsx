import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'
import { introduction, site } from '../../data/content'
import { ResumeLink } from '../ui/ResumeLink'

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="hero" className="section hero-section flex flex-col justify-center">
      {/* Typography block — stronger hierarchy, letter-focused, aligned with other sections' content via container-page */}
      <div className="max-w-[52ch]">
        <motion.img
          src={site.photo}
          alt="Vinith Wade"
          width={144}
          height={160}
          fetchPriority="high"
          className="hero-portrait lg:hidden"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? reducedTransition : { duration: 0.5 }}
        />
        <motion.h1
          className="display hero-name tracking-[-0.04em]"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? reducedTransition : { duration: 0.7, ease: [0.21, 0.92, 0.26, 1] }}
        >
          {site.name}
        </motion.h1>

        <motion.p
          className="mt-4 text-[15.5px] max-w-[34ch] text-ink/90 leading-tight tracking-[-0.01em]"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? reducedTransition : { duration: 0.65, delay: 0.1, ease: [0.21, 0.92, 0.26, 1] }}
        >
          {introduction.headline}
        </motion.p>

        {/* Bio text — refined measure */}
        <div className="mt-6 max-w-[48ch] prose text-[14.8px] leading-[1.72]">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/50 mb-4">{site.role}</div>
          {introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        {/* Bottom links — clean, perfectly spaced */}
        <motion.div
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-mono tracking-[0.08em]"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? reducedTransition : { duration: 0.6, delay: 0.22, ease: [0.21, 0.92, 0.26, 1] }}
        >
          <a href="#projects" className="link touch-target">View projects</a>
          <span className="text-ink/25">·</span>
          <a href="#contact" className="link touch-target">Contact</a>
          <ResumeLink />
        </motion.div>
      </div>
    </section>
  )
}
