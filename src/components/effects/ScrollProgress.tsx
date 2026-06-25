import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()
  const springed = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.4,
  })
  const scaleX = reduceMotion ? scrollYProgress : springed
  return <motion.div className="progress-bar" style={{ scaleX, width: '100%' }} />
}
