import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost' | 'whatsapp' | 'glass'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-pine text-milk hover:bg-[#34492f] focus-visible:outline-pine shadow-soft',
  secondary:
    'bg-wood-dark text-milk hover:bg-[#3a2620] focus-visible:outline-wood-dark shadow-soft',
  outline:
    'border-2 border-pine/30 text-pine bg-transparent hover:bg-pine/10',
  accent:
    'bg-sun text-wood-dark hover:bg-[#e0a904] focus-visible:outline-sun shadow-soft',
  ghost: 'bg-transparent text-graphite hover:bg-wood-dark/5',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1da851] shadow-soft',
  // Frosted glass — for use over photos (hero). Bright border + blur so it
  // stands out against busy/dark backgrounds.
  glass:
    'border border-milk/70 bg-milk/20 text-milk backdrop-blur-md hover:bg-milk/30 hover:border-milk shadow-lift',
}

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-base sm:text-lg gap-2.5',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none'

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as?: 'button'
  }

type ButtonAsLink = CommonProps & {
  as: 'a'
  href: string
  target?: string
  rel?: string
  'aria-label'?: string
}

export type ButtonProps = ButtonAsButton | ButtonAsLink

/** Shared CTA button. Renders as <button> or <a> (for tel:/wa.me/maps links). */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    fullWidth,
    className,
    children,
  } = props

  const classes = cn(
    baseClasses,
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    className,
  )

  if (props.as === 'a') {
    const { href, target, rel } = props
    return (
      <a href={href} target={target} rel={rel} className={classes} aria-label={props['aria-label']}>
        {icon}
        {children}
        {iconRight}
      </a>
    )
  }

  // Strip the component's own props so only valid <button> attributes are spread
  // onto the DOM element (otherwise React warns about unknown attributes).
  const {
    as: _as,
    variant: _variant,
    size: _size,
    icon: _icon,
    iconRight: _iconRight,
    fullWidth: _fullWidth,
    className: _className,
    children: _children,
    ...rest
  } = props as ButtonAsButton
  return (
    <button ref={ref} className={classes} {...rest}>
      {icon}
      {children}
      {iconRight}
    </button>
  )
})
