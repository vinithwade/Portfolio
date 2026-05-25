import { motion } from 'framer-motion'
import { site } from '../../data/content'

export function About() {
  return (
    <section id="about" className="scene reading h-full flex flex-col justify-center py-16">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="caption mb-8"
      >
        About
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="display text-3xl sm:text-4xl lg:text-5xl text-paper mb-10 leading-[1.1]"
      >
        Builder, in <span className="display-italic text-accent">the long sense</span>.
      </motion.h2>

      <div className="grid grid-cols-12 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="col-span-12 md:col-span-4"
        >
          <div className="w-full max-w-xs aspect-[4/5] overflow-hidden rounded-sm border border-white/15">
            <img
              src={site.photo}
              alt={site.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="caption mt-4 text-faint">
            Fig. 01 — <em className="text-dim">The builder</em>, 2026.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-12 md:col-span-8 prose-body"
        >
          <p>
            I started writing code when I was 16 — first some sloppy HTML, then
            React, then a long stretch of Node and Python. Somewhere around
            2024, I drifted into AI &amp; product, and I never quite came back.
          </p>
          <p>
            Today I work across the seam: a smooth React interface, a tuned
            API, a Claude pipeline, a product from zero. I want to be in the
            <em> whole </em>build — the part where you talk to the user, the
            part where you design the thing, the part where you ship it.
          </p>
          <p>
            I&apos;m based in Hyderabad, I read more than I should, I write
            late at night, and I prefer to ship over polish. If any of that
            sounds like the kind of person you want to work with —{' '}
            <a href="#contact">say hi</a>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
