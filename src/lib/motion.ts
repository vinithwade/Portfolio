/**
 * Thoughtful Modern Craft — tuned motion primitives
 * Based on research + premium vertical portfolio patterns.
 * Always respect reduced-motion.
 */

import { type Spring, type Transition } from 'framer-motion'

export const springs = {
  gentle: {
    type: 'spring',
    stiffness: 80,
    damping: 25,
    mass: 0.6,
    restDelta: 0.001,
  } as Spring,

  snappy: {
    type: 'spring',
    stiffness: 260,
    damping: 22,
    mass: 0.5,
  } as Spring,

  scroll: {
    type: 'spring',
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  } as Spring,
}

/** Minimal transition for reduced motion (near-instant but avoids hard cuts) */
export const reducedTransition: Transition = { duration: 0.12, ease: 'easeOut' }

/**
 * Returns the appropriate transition respecting reduced motion.
 * Usage inside components: const reduce = useReducedMotion(); transition={transition(reduce, springs.gentle)}
 */
export const transition = (reduceMotion: boolean | null, spring: Spring | Transition): Transition => {
  if (reduceMotion) return reducedTransition
  return spring as Transition
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.gentle,
  },
}

export const fadeUp = (delay = 0, reduceMotion: boolean | null = false) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: reduceMotion ? reducedTransition : { ...springs.gentle, delay },
})
