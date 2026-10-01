import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
}

export function Button({ children, href, onClick, className = '', external }: ButtonProps) {
  const cls = `inline-flex items-center gap-2 rounded-full border border-ink/40 px-5 py-2 text-sm hover:bg-ink hover:text-paper transition ${className}`

  if (href) {
    return <a href={href} className={cls} target={external ? '_blank' : undefined}>{children}{external && <span className="ml-1 text-xs">↗</span>}</a>
  }
  return <button onClick={onClick} className={cls}>{children}</button>
}
