import { Check } from 'lucide-react'
import type { ServicesContent } from '@/types/content'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

interface ServicesPricingProps {
  services: ServicesContent
}

/** Additional services with price cards. "Included in stay" cards are accented. */
export function ServicesPricing({ services }: ServicesPricingProps) {
  const items = services.items.filter((s) => s.visible)

  return (
    <section id="services" className="bg-sand/40 py-20 sm:py-28">
      <div className="container-px">
        <SectionTitle eyebrow="Цены" title={services.title} subtitle={services.description} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 0.06}>
              <article
                className={cn(
                  'flex h-full flex-col rounded-3xl border p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
                  service.includedInStay
                    ? 'border-sun bg-gradient-to-br from-sun/15 to-white'
                    : 'border-wood-dark/10 bg-white',
                )}
              >
                <span
                  className={cn(
                    'inline-flex h-12 w-12 items-center justify-center rounded-2xl p-3',
                    service.includedInStay ? 'bg-sun text-wood-dark' : 'bg-pine/10 text-pine',
                  )}
                >
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>

                <h3 className="mt-4 text-2xl text-wood-dark">{service.name}</h3>
                {service.description && (
                  <p className="mt-2 text-sm leading-relaxed text-graphite/75">
                    {service.description}
                  </p>
                )}

                <div className="mt-auto pt-5">
                  {service.includedInStay ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-bold text-wood-dark">
                      <Check className="h-4 w-4" /> {service.priceLabel}
                    </span>
                  ) : (
                    <span className="font-heading text-2xl font-semibold text-pine">
                      {service.priceLabel}
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
