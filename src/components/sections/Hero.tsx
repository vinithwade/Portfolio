import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="hero" className="section flex flex-col justify-center">
      {/* Typography block — stronger hierarchy, letter-focused, aligned with other sections' content via container-page */}
      <div className="max-w-[52ch]">
        <motion.h1
          className="display tracking-[-0.04em] leading-[0.88]"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? reducedTransition : { duration: 0.7, ease: [0.21, 0.92, 0.26, 1] }}
        >
          Vinith Wade
        </motion.h1>

        <motion.p
          className="mt-4 text-[15.5px] max-w-[34ch] text-white/90 leading-tight tracking-[-0.01em]"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? reducedTransition : { duration: 0.65, delay: 0.1, ease: [0.21, 0.92, 0.26, 1] }}
        >
          I make things that feel like they were always meant to exist.
        </motion.p>

        {/* Bio text — refined measure */}
        <div className="mt-6 max-w-[48ch] prose text-[14.8px] leading-[1.72]">
          <p>
            It began at sixteen with a few shaky lines. One honest attempt led to another — until the things I made started feeling like they had always belonged in the world.
          </p>
          <p className="mt-3.5">
            I shape quiet tools that listen closely, remember what matters, and help people finish the work that counts. The best of it feels generous. It slips into the day and leaves you lighter.
          </p>
        </div>

        {/* Bottom links — clean, perfectly spaced */}
        <motion.div
          className="mt-6 flex items-center gap-x-4 text-sm font-mono tracking-[0.08em]"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? reducedTransition : { duration: 0.6, delay: 0.22, ease: [0.21, 0.92, 0.26, 1] }}
        >
          <a href="#projects" className="link">marks</a>
          <span className="text-white/25">·</span>
          <a href="#contact" className="link">say hello</a>
        </motion.div>
      </div>
    </section>
  )
}
