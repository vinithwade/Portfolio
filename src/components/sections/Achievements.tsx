import { motion } from 'framer-motion'

const notes = [
  {
    text: 'Selected as an E-Cell member — 25 students across 4 years — for leadership and entrepreneurial potential.',
  },
  {
    text: 'Participated in Smart India Hackathon 2024.',
  },
  {
    text: 'Certified in Python and Problem Solving on HackerRank.',
  },
  {
    text: 'Certified in Generative AI and Large Language Models by Google Cloud.',
  },
  {
    text: 'Solved 73+ problems on LeetCode.',
  },
]

export function Achievements() {
  return (
    <section
      id="achievements"
      className="scene reading h-full flex flex-col justify-center py-16"
    >
      <p className="caption mb-8">Notes &amp; Recognitions</p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="display text-3xl sm:text-4xl lg:text-5xl text-paper mb-12 leading-[1.1]"
      >
        Small things, <span className="display-italic text-accent">noted</span>.
      </motion.h2>

      <ul className="space-y-6">
        {notes.map((n, i) => (
          <motion.li
            key={n.text.slice(0, 24)}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="grid grid-cols-12 gap-6 border-b border-black/10 pb-6"
          >
            <span className="col-span-2 md:col-span-1 caption text-faint tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="col-span-10 md:col-span-11 prose-body text-ivory">
              {n.text}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
