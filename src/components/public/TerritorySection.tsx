import type { TerritoryContent } from '@/types/content'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

interface TerritorySectionProps {
  territory: TerritoryContent
}

/** Territory showcase as a modern photo grid (first card spans 2 cols). */
export function TerritorySection({ territory }: TerritorySectionProps) {
  const cards = territory.cards.filter((c) => c.visible)

  return (
    <section id="territory" className="bg-milk py-20 sm:py-28">
      <div className="container-px">
        <SectionTitle eyebrow="Территория" title={territory.title} subtitle={territory.description} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal
              key={card.id}
              delay={i * 0.05}
              className={cn(i === 0 && 'sm:col-span-2 lg:row-span-2')}
            >
              <article
                className={cn(
                  'group relative h-full min-h-[220px] overflow-hidden rounded-3xl shadow-card',
                  i === 0 && 'lg:min-h-[460px]',
                )}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wood-dark/85 via-wood-dark/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-milk/20 text-milk backdrop-blur">
                    <Icon name={card.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 text-2xl text-milk">{card.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-milk/85">{card.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
