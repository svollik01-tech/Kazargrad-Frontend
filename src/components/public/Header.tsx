import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { cn, scrollToId } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/nav'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'

/**
 * Sticky header. Transparent over the hero, turns solid (milk + shadow) after
 * the user scrolls down. Includes the booking CTA and the mobile burger menu.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkColor = scrolled ? 'text-graphite/80 hover:text-pine' : 'text-milk/90 hover:text-milk'

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          scrolled
            ? 'border-b border-wood-dark/10 bg-milk/95 py-3 shadow-soft backdrop-blur'
            : 'bg-transparent py-5',
        )}
      >
        <div className="container-px flex items-center justify-between gap-4">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            aria-label="Казарьград — на главную"
            className="shrink-0"
          >
            <Logo theme={scrolled ? 'dark' : 'light'} />
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => (
              <button
                key={link.target}
                type="button"
                onClick={() => scrollToId(link.target)}
                className={cn(
                  'cursor-pointer rounded-full px-3 py-2 text-sm font-semibold transition-colors',
                  linkColor,
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={scrolled ? 'primary' : 'accent'}
              className="hidden sm:inline-flex"
              onClick={() => scrollToId('booking')}
            >
              Забронировать
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              className={cn(
                'inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors lg:hidden',
                scrolled ? 'text-wood-dark hover:bg-wood-dark/5' : 'text-milk hover:bg-white/10',
              )}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
