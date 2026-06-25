import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

interface SectionTitleProps {
  /** Small eyebrow label above the title. */
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  theme?: 'dark' | 'light'
  className?: string
}

/** Consistent section heading block used across the public site. */
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'dark',
  className,
}: SectionTitleProps) {
  const titleColor = theme === 'light' ? 'text-milk' : 'text-wood-dark'
  const subColor = theme === 'light' ? 'text-milk/80' : 'text-graphite/75'

  return (
    <Reveal
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-pine/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-pine">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'max-w-3xl text-balance text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]',
          titleColor,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('max-w-2xl text-base leading-relaxed sm:text-lg', subColor)}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
