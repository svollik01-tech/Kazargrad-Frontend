import type { AmenitiesContent } from '@/types/content'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'

interface AmenitiesSectionProps {
  amenities: AmenitiesContent
}

/** Grid of in-house amenities. */
export function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const items = amenities.items.filter((a) => a.visible)

  return (
    <section id="amenities" className="bg-milk py-20 sm:py-28">
      <div className="container-px">
        <SectionTitle eyebrow="Удобства" title={amenities.title} subtitle={amenities.description} />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.05}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-wood-dark/10 bg-white p-5 shadow-card transition-colors hover:border-pine/30">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand text-wood-pine">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg leading-snug text-wood-dark">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-graphite/70">{item.description}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
