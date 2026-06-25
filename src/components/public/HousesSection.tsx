import { Check, Bath, Home, ArrowRight } from 'lucide-react'
import type { HousesContent } from '@/types/content'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { scrollToId } from '@/lib/utils'

interface HousesSectionProps {
  houses: HousesContent
}

/** Two (or more) house types with specs, features and a CTA each. */
export function HousesSection({ houses }: HousesSectionProps) {
  const items = houses.items.filter((h) => h.visible)

  return (
    <section id="houses" className="bg-sand/40 py-20 sm:py-28">
      <div className="container-px">
        <SectionTitle eyebrow="Дома" title={houses.title} subtitle={houses.intro} />

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {items.map((house, i) => (
            <Reveal key={house.id} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-wood-dark/10 bg-white shadow-card transition-all duration-300 hover:shadow-lift">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={house.image}
                    alt={`${house.name} в гостевом комплексе Казарьград`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-sun px-4 py-1.5 text-sm font-bold text-wood-dark shadow-soft">
                    {house.priceLabel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-3xl text-wood-dark">{house.name}</h3>
                  <p className="mt-2 leading-relaxed text-graphite/75">{house.description}</p>

                  {/* Specs */}
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    <li className="inline-flex items-center gap-2 rounded-full bg-pine/10 px-3.5 py-1.5 text-sm font-semibold text-pine">
                      <Home className="h-4 w-4" /> {house.housesCount} дома
                    </li>
                    {house.bathrooms > 0 && (
                      <li className="inline-flex items-center gap-2 rounded-full bg-pine/10 px-3.5 py-1.5 text-sm font-semibold text-pine">
                        <Bath className="h-4 w-4" /> {house.bathrooms} санузел{house.bathrooms > 1 ? 'а' : ''}
                      </li>
                    )}
                  </ul>

                  {/* Features */}
                  {house.features.length > 0 && (
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {house.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-graphite/80">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-pine" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {house.suitableFor && (
                    <p className="mt-5 rounded-2xl bg-sand/60 px-4 py-3 text-sm text-wood-pine">
                      <span className="font-semibold">Подходит:</span> {house.suitableFor}
                    </p>
                  )}

                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <div>
                      <span className="block text-xs uppercase tracking-wide text-graphite/50">
                        Стоимость
                      </span>
                      <span className="font-heading text-2xl font-semibold text-wood-dark">
                        {house.priceLabel}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="mt-5"
                    fullWidth
                    onClick={() => scrollToId('booking')}
                    iconRight={<ArrowRight className="h-5 w-5" />}
                  >
                    {house.ctaText}
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {houses.footnote && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-3xl rounded-3xl border border-pine/20 bg-white px-6 py-5 text-center leading-relaxed text-graphite/80">
              {houses.footnote}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
