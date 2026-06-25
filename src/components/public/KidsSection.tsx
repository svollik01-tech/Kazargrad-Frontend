import { Check, Sparkles } from 'lucide-react'
import type { KidsContent } from '@/types/content'
import { Reveal } from '@/components/ui/Reveal'

interface KidsSectionProps {
  kids: KidsContent
}

/** Bright, family-friendly kids section with a highlight banner and photo. */
export function KidsSection({ kids }: KidsSectionProps) {
  const items = kids.items.filter((i) => i.visible)

  return (
    <section id="kids" className="bg-gradient-to-br from-sky/20 via-milk to-sand/40 py-20 sm:py-28">
      <div className="container-px grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-sun/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-wood-pine">
              <Sparkles className="h-4 w-4 text-sun" /> Детям
            </span>
            <h2 className="mt-4 text-4xl text-wood-dark sm:text-[2.75rem]">{kids.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-graphite/80">{kids.description}</p>

            <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item.id} className="flex items-start gap-2.5 text-graphite/85">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky/30 text-sky">
                    <Check className="h-3.5 w-3.5 text-[#2f6f96]" />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>

            {kids.highlight && (
              <p className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-sun px-5 py-4 font-semibold text-wood-dark shadow-soft">
                <Sparkles className="h-5 w-5 shrink-0" />
                {kids.highlight}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            {kids.images.slice(0, 2).map((src, i) => (
              <div
                key={i}
                className={
                  'overflow-hidden rounded-3xl shadow-card ' +
                  (i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square')
                }
              >
                <img
                  src={src}
                  alt="Детский отдых и развлечения в Казарьграде"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
