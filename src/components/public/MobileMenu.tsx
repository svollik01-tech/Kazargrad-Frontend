import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import { scrollToId } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/nav'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { useContent } from '@/store/contentStore'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/** Full-screen mobile navigation drawer. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { contacts } = useContent()

  // Lock body scroll while the menu is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [open])

  const go = (target: string) => {
    onClose()
    // Wait for the drawer to start closing before scrolling.
    setTimeout(() => scrollToId(target), 120)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-wood-dark/60 backdrop-blur-sm"
            aria-label="Закрыть меню"
            onClick={onClose}
          />
          <motion.div
            className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-milk p-6 shadow-lift"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <Logo theme="dark" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть меню"
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-wood-dark hover:bg-wood-dark/5"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1" aria-label="Мобильная навигация">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.target}
                  type="button"
                  onClick={() => go(link.target)}
                  className="cursor-pointer rounded-xl px-4 py-3 text-left font-heading text-2xl text-wood-dark transition-colors hover:bg-pine/10 hover:text-pine"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-6">
              <Button fullWidth size="lg" onClick={() => go('booking')}>
                Забронировать
              </Button>
              <Button
                as="a"
                href={`tel:${contacts.phone.replace(/[^+\d]/g, '')}`}
                variant="outline"
                fullWidth
                size="lg"
                icon={<Phone className="h-5 w-5" />}
              >
                {contacts.phone}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
