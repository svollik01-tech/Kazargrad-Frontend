import { cn } from '@/lib/utils'
import { useContent } from '@/store/contentStore'

interface LogoProps {
  /** Color theme: 'dark' for light backgrounds, 'light' for dark/hero/footer. */
  theme?: 'dark' | 'light'
  className?: string
  /** Hide the "гостевой комплекс" subtitle (e.g. in tight spaces). */
  hideSubtitle?: boolean
}

/**
 * Brand logo for «КАЗАРЬГРАД».
 *
 * If `settings.logoImage` is set in the admin panel, the uploaded image is used.
 * Otherwise this text placeholder renders. To drop in a real SVG logo, either
 * upload it via Admin → Site Settings, or replace the markup below.
 */
export function Logo({ theme = 'dark', className, hideSubtitle }: LogoProps) {
  const { settings } = useContent()
  const wordmark = theme === 'light' ? 'text-milk' : 'text-wood-dark'
  const subtitle = theme === 'light' ? 'text-milk/70' : 'text-pine'

  if (settings.logoImage) {
    return (
      <img
        src={settings.logoImage}
        alt="Казарьград — гостевой комплекс"
        className={cn('h-10 w-auto object-contain', className)}
      />
    )
  }

  return (
    <span className={cn('flex flex-col leading-none', className)}>
      {/* === Replace this text block with a real <svg> logo when available === */}
      <span
        className={cn(
          'font-heading text-2xl font-bold tracking-[0.14em] sm:text-[1.7rem]',
          wordmark,
        )}
      >
        КАЗАРЬГРАД
      </span>
      {!hideSubtitle && (
        <span
          className={cn(
            'mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.34em]',
            subtitle,
          )}
        >
          гостевой комплекс
        </span>
      )}
    </span>
  )
}
