import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { FooterContent, SiteSettings } from '@/types/content'
import { Icon } from '@/lib/icons'
import { Logo } from '@/components/ui/Logo'
import { NAV_LINKS } from '@/lib/nav'
import { scrollToId } from '@/lib/utils'

interface FooterProps {
  footer: FooterContent
  settings: SiteSettings
}

/** Site footer: brand, navigation, contacts, socials, legal info and back-to-top. */
export function Footer({ footer, settings }: FooterProps) {
  const socials = footer.socialLinks.filter((s) => s.visible)
  const legal = footer.legalLinks.filter((l) => l.visible)

  return (
    <footer className="bg-wood-dark text-milk/80">
      <div className="container-px py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + address */}
          <div>
            <Logo theme="light" />
            <p className="mt-5 max-w-sm leading-relaxed">{footer.complexName}</p>
            <p className="mt-2 leading-relaxed">{footer.address}</p>
            <a
              href={`mailto:${footer.email}`}
              className="mt-2 inline-block text-milk transition-colors hover:text-sun"
            >
              {footer.email}
            </a>

            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-milk/10 text-milk transition-colors hover:bg-sun hover:text-wood-dark"
                  >
                    <Icon name={s.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav aria-label="Навигация в подвале">
            <h3 className="font-body text-sm font-bold uppercase tracking-wider text-milk">
              Разделы
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.target}>
                  <button
                    type="button"
                    onClick={() => scrollToId(link.target)}
                    className="cursor-pointer text-left transition-colors hover:text-sun"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <div>
            <h3 className="font-body text-sm font-bold uppercase tracking-wider text-milk">
              Реквизиты
            </h3>
            {settings.footerLegalEnabled ? (
              <ul className="mt-4 space-y-1.5 text-sm leading-relaxed">
                <li>{footer.legalEntity}</li>
                <li>{footer.entrepreneur}</li>
                <li>ИНН: {footer.inn}</li>
                <li>ОГРНИП: {footer.ogrnip}</li>
              </ul>
            ) : (
              <p className="mt-4 text-sm text-milk/50">Реквизиты скрыты.</p>
            )}

            {legal.length > 0 && (
              <ul className="mt-5 space-y-1.5 text-sm">
                {legal.map((l) => (
                  <li key={l.id}>
                    {l.url.startsWith('/') ? (
                      <Link to={l.url} className="underline-offset-2 transition-colors hover:text-sun hover:underline">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 transition-colors hover:text-sun hover:underline">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-milk/15 pt-6 sm:flex-row">
          <p className="text-sm text-milk/60">{footer.copyright}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-milk/20 px-4 py-2 text-sm font-semibold text-milk transition-colors hover:border-sun hover:text-sun"
          >
            <ArrowUp className="h-4 w-4" /> Наверх
          </button>
        </div>
      </div>
    </footer>
  )
}
