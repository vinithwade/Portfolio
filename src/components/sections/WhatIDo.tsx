import { motion } from 'framer-motion'

const items = [
  {
    title: 'Full-stack development',
    blurb:
      'Responsive, scalable web apps. End-to-end ownership from schema to UI. React, Node, Express, MongoDB, Firebase, Supabase.',
  },
  {
    title: 'AI product building',
    blurb:
      'Claude and GPT pipelines, Whisper transcription, agentic workflows — wired into real products and real users.',
  },
  {
    title: 'UI / UX & frontend systems',
    blurb:
      'Component systems, motion, and interfaces that respect the user’s next step. Tailwind, Framer Motion, shadcn.',
  },
  {
    title: 'Backend & API design',
    blurb:
      'Auth flows, optimized queries, clean architecture. Built to scale and survive. Express, JWT, REST, PostgreSQL, Docker.',
  },
]

export function WhatIDo() {
  return (
    <section id="work" className="scene reading h-full flex flex-col justify-center py-16">
      <p className="caption mb-8">Services</p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="display text-3xl sm:text-4xl lg:text-5xl text-paper mb-12 leading-[1.1]"
      >
        What I&apos;m good at, <span className="display-italic text-accent">briefly</span>.
      </motion.h2>

      <ol className="space-y-10">
        {items.map((it, i) => (
          <motion.li
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="grid grid-cols-12 gap-6 items-baseline"
          >
            <span className="col-span-2 caption text-faint tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="col-span-10">
              <h3 className="display text-2xl sm:text-3xl text-paper">{it.title}</h3>
              <p className="prose-body mt-2 max-w-2xl">{it.blurb}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
