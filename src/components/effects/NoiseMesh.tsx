import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Clean light backdrop — a warm off-white field with two very soft accent
 * washes that drift gently on scroll. Calm, premium, content-first.
 */
export function NoiseMesh() {
  const { scrollYProgress } = useScroll()

  const washA = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const washB = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {/* Base — warm off-white */}
      <div className="absolute inset-0" style={{ background: 'var(--color-ink)' }} />

      {/* Soft top warmth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -10%, rgba(212,99,29,0.05) 0%, transparent 55%)',
        }}
      />

      {/* Two faint accent washes — gentle parallax */}
      <motion.div
        style={{ y: washA, willChange: 'transform' }}
        className="absolute -top-40 -left-32 w-[820px] h-[820px] rounded-full blur-3xl opacity-60"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(212,99,29,0.10) 0%, transparent 65%)',
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: washB, willChange: 'transform' }}
        className="absolute top-1/2 -right-48 w-[900px] h-[900px] rounded-full blur-3xl opacity-50"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(180,78,16,0.07) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* Bottom soft vignette to seat content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(140% 100% at 50% 110%, rgba(26,22,20,0.05) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}
