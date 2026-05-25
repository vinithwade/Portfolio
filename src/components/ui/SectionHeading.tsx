import { motion } from 'framer-motion'

type SectionHeadingProps = {
  index: string
  label: string
  title: string
  italic?: string
  subtitle?: string
  accent?: string
}

export function SectionHeading({
  index,
  label,
  title,
  italic,
  subtitle,
  accent = 'var(--lavender-d)',
}: SectionHeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="relative mb-14 sm:mb-20"
    >
      <div className="flex flex-wrap items-baseline gap-3 mb-5">
        <span
          className="sticker"
          style={{ background: 'white', color: 'var(--color-ink)' }}
        >
          {index}
        </span>
        <span className="label-mono" style={{ color: accent }}>
          {label}
        </span>
      </div>
      <h2
        className="fr-display text-4xl sm:text-6xl lg:text-7xl xl:text-[6rem] leading-[0.95] tracking-[-0.025em] text-ink"
        style={{ fontWeight: 300 }}
      >
        {title}
        {italic && (
          <>
            {' '}
            <span className="fr-italic-soft" style={{ color: accent }}>
              {italic}
            </span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="mt-6 text-base sm:text-lg text-dim leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.header>
  )
}
