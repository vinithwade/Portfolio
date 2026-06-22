import type { ReactNode } from 'react'
import { Magnetic } from './Magnetic'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost'
  onClick?: () => void
  className?: string
  external?: boolean
}

export function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  className = '',
  external = false,
}: ButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'bg-[color:var(--color-paper)] text-[color:var(--color-ink)] hover:bg-[color:var(--accent)] hover:text-white'
      : 'bg-transparent text-paper border border-[color:var(--color-line-2)] hover:bg-black/5'

  const wrapperClasses = `inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm tracking-tight transition-colors duration-300 ${variantClass} ${className}`

  if (href) {
    return (
      <Magnetic
        as="a"
        href={href}
        className={wrapperClasses}
      >
        <>
          {children}
          {external && (
            <span className="ml-1 text-[10px] opacity-70">↗</span>
          )}
        </>
      </Magnetic>
    )
  }

  return (
    <Magnetic as="button" onClick={onClick} className={wrapperClasses}>
      <>{children}</>
    </Magnetic>
  )
}
