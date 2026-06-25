import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'

const groups = [
  { label: 'Languages', items: 'Python · JavaScript · TypeScript · Java · C · SQL' },
  { label: 'Frontend', items: 'React · Tailwind · Framer Motion' },
  { label: 'Backend & Data', items: 'Node · Express · Supabase · MongoDB · MySQL' },
  { label: 'AI & Tools', items: 'Claude · OpenAI · LangChain · PyTorch · Git · Figma · Docker' },
]

export function Skills() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="skills" className="section">
      <div className="meta mb-3">THE QUIET TOOLS</div>
      <h2 className="heading">What I reach for.</h2>

      <div className="mt-7 sm:mt-8 max-w-[62ch] space-y-6 sm:space-y-7">
        {groups.map((g, i) => (
          <motion.div 
            key={i} 
            className="skills-group"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={reduceMotion ? reducedTransition : { duration: 0.4, delay: i * 0.04, ease: 'easeOut' }}
          >
            <div className="font-mono text-xs tracking-[0.2em] text-white/50">{g.label}</div>
            <div className="mt-1.5 sm:mt-2 text-[15.5px] sm:text-[17px] leading-tight tracking-[-0.005em]">{g.items}</div>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 sm:mt-7 text-xs font-mono tracking-[0.08em] text-white/50">A handful of quiet companions.</p>
    </section>
  )
}
