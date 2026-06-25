import type { EventsContent } from '@/types/content'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { scrollToId } from '@/lib/utils'

interface EventsSectionProps {
  events: EventsContent
}

/** Celebrations & events — scenarios + atmospheric photos + CTA. */
export function EventsSection({ events }: EventsSectionProps) {
  const scenarios = events.scenarios.filter((s) => s.visible)

  return (
    <section id="events" className="relative overflow-hidden bg-wood-dark py-20 text-milk sm:py-28">
      {/* Background photo, dimmed */}
      {events.images[0] && (
        <img
          src={events.images[0]}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-wood-dark/80 to-wood-dark" />

      <div className="container-px relative">
        <SectionTitle
          theme="light"
          eyebrow="Праздники"
          title={events.title}
          subtitle={events.description}
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {scenarios.map((sc, i) => (
            <Reveal key={sc.id} delay={i * 0.05}>
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-milk/15 bg-milk/5 p-5 text-center backdrop-blur transition-colors hover:border-sun/50 hover:bg-milk/10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sun/20 text-sun">
                  <Icon name={sc.icon} className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold leading-snug text-milk">{sc.title}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button size="lg" variant="accent" onClick={() => scrollToId('contacts')}>
            {events.ctaText}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
