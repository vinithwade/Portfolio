import { motion, useReducedMotion } from 'framer-motion'
import { reducedTransition } from '../../lib/motion'

export function WhatIDo() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="work" className="section">
      <div className="meta mb-3">WHAT I REACH FOR</div>
      <h2 className="heading max-w-[18ch]">Four quiet ways I try to leave the work better than I found it.</h2>

      <div className="mt-7 sm:mt-8 space-y-6 sm:space-y-7">
        {[
          { num: '01', title: 'Weaving the whole thing', text: 'I begin with how it feels in someone\'s hands. The warmth of a button that knows what comes next. The calm of something that never gets in the way.' },
          { num: '02', title: 'Catching the right spark', text: 'The moment an idea clicks into something that surprises. I chase that with careful companions that listen and remember the shape of things.' },
          { num: '03', title: 'Moments that invite you in', text: 'Design is not pixels. It is the tiny relief when something just works. The delight of a flow that feels generous.' },
          { num: '04', title: 'Foundations you trust', text: 'The quiet parts that hold everything up. When the ground feels solid under your feet, the surface can hold wonder.' },
        ].map((item, idx) => (
          <motion.div 
            key={item.num} 
            className="flex flex-col sm:flex-row gap-3 sm:gap-6"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={reduceMotion ? reducedTransition : { duration: 0.45, delay: idx * 0.06, ease: 'easeOut' }}
          >
            <div className="font-mono text-[12px] sm:text-[13px] text-white/50 w-6 pt-0.5 sm:pt-1 tracking-[2px] shrink-0">{item.num}</div>
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
