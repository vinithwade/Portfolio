import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'
import { services } from '../../data/content'

export function WhatIDo() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="work" className="section">
      <div className="meta mb-3">EXPERTISE</div>
      <h2 className="heading max-w-[18ch]">How I apply my skills.</h2>

      <div className="mt-7 sm:mt-8 space-y-6 sm:space-y-7">
        {services.map((item, idx) => (
          <motion.div 
            key={item.num} 
            className="flex flex-col sm:flex-row gap-3 sm:gap-6"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={reduceMotion ? reducedTransition : { duration: 0.45, delay: idx * 0.06, ease: 'easeOut' }}
          >
            <div className="font-mono text-[12px] sm:text-[13px] text-black/50 w-6 pt-0.5 sm:pt-1 tracking-[2px] shrink-0">{item.num}</div>
            <div>
              <div className="font-serif text-[19px] sm:text-[21px] tracking-[-0.01em]">{item.title}</div>
              <p className="prose mt-1.5 sm:mt-2 text-[14.5px] sm:text-[15px]">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
