import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  /** Adds hover lift + shadow (for interactive cards). */
  hover?: boolean
}

/** Rounded, soft-shadowed surface used for most content cards. */
export function Card({ children, className, hover }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-wood-dark/10 bg-white p-6 shadow-card transition-all duration-300',
        hover && 'hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
    >
      {children}
    </div>
  )
}
