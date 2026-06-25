import type { BookingContent } from '@/types/content'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'

interface BookingStepsProps {
  booking: BookingContent
}

/**
 * Booking timeline. Horizontal (numbered) on desktop, vertical on mobile.
 */
export function BookingSteps({ booking }: BookingStepsProps) {
  const steps = booking.steps.filter((s) => s.visible)

  return (
    <section id="booking" className="bg-milk py-20 sm:py-28">
      <div className="container-px">
        <SectionTitle eyebrow="Бронирование" title={booking.title} subtitle={booking.description} />

        <ol className="relative mt-14 grid gap-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {/* Connecting line on desktop */}
          <span
            className="absolute left-0 right-0 top-7 hidden h-0.5 bg-pine/20 lg:block"
            aria-hidden
          />
          {steps.map((step, i) => (
            <Reveal as="li" key={step.id} delay={i * 0.07} className="relative flex gap-4 lg:flex-col lg:gap-0">
              {/* Number + icon node */}
              <div className="relative flex flex-col items-center lg:items-start">
                <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pine text-milk shadow-soft">
                  <Icon name={step.icon} className="h-6 w-6" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-sun text-xs font-bold text-wood-dark">
                    {i + 1}
                  </span>
                </span>
                {/* Vertical connector on mobile */}
                {i < steps.length - 1 && (
                  <span className="mt-2 h-full w-0.5 grow bg-pine/20 lg:hidden" aria-hidden />
                )}
              </div>

              <div className="pb-2 lg:mt-5">
                <h3 className="text-xl text-wood-dark">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-graphite/75">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
