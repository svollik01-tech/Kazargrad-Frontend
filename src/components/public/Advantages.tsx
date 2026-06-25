import type { Advantage, HousesContent } from '@/types/content'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import { Counter } from '@/components/ui/Counter'
import { SectionTitle } from '@/components/ui/SectionTitle'

interface AdvantagesProps {
  advantages: Advantage[]
  houses: HousesContent
}

/** "Why Kazargrad" — animated stat counters + advantage cards. */
export function Advantages({ advantages, houses }: AdvantagesProps) {
  const visibleHouses = houses.items.filter((h) => h.visible)
  const totalHouses = visibleHouses.reduce((sum, h) => sum + (h.housesCount || 0), 0)

  // Counters: total houses + each house type's count.
  const stats = [
    { value: totalHouses, label: 'гостевых домов' },
    ...visibleHouses.map((h) => ({ value: h.housesCount, label: h.name })),
  ]

  const cards = advantages.filter((a) => a.visible)

  return (
    <section id="advantages" className="bg-milk py-20 sm:py-28">
      <div className="container-px">
        {/* Stat strip */}
        <Reveal>
          <dl className="grid grid-cols-1 gap-4 rounded-4xl bg-pine px-6 py-8 text-center text-milk sm:grid-cols-3 sm:px-10">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <dd className="font-heading text-4xl font-bold text-sun sm:text-5xl">
                  <Counter to={s.value} />
                </dd>
                <dt className="text-sm font-medium text-milk/85">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <SectionTitle
          className="mt-16"
          eyebrow="Почему Казарьград"
          title="Всё для спокойного и насыщенного отдыха"
          subtitle="Приватные дома, развлечения для детей и взрослых и атмосфера загородного уюта."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((adv, i) => (
            <Reveal key={adv.id} delay={i * 0.06}>
              <article className="group h-full cursor-default rounded-3xl border border-wood-dark/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pine/10 text-pine transition-colors group-hover:bg-pine group-hover:text-milk">
                  <Icon name={adv.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-2xl text-wood-dark">{adv.title}</h3>
                <p className="mt-2 leading-relaxed text-graphite/75">{adv.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
