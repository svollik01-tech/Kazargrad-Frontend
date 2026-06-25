import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sun, Snowflake } from 'lucide-react'
import type { ActivitiesContent, Season } from '@/types/content'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

interface ActivitiesSectionProps {
  activities: ActivitiesContent
}

/** Seasonal activities shown as an icon grid behind Summer / Winter tabs. */
export function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  const [season, setSeason] = useState<Season>('summer')
  const items = activities.items.filter((a) => a.visible && a.season === season)

  const tabs: { key: Season; label: string; icon: typeof Sun }[] = [
    { key: 'summer', label: activities.summerLabel, icon: Sun },
    { key: 'winter', label: activities.winterLabel, icon: Snowflake },
  ]

  return (
    <section id="activities" className="bg-sand/40 py-20 sm:py-28">
      <div className="container-px">
        <SectionTitle eyebrow="Развлечения" title={activities.title} subtitle={activities.description} />

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div
            className="inline-flex rounded-full border border-wood-dark/10 bg-white p-1.5 shadow-soft"
            role="tablist"
            aria-label="Сезон"
          >
            {tabs.map((tab) => {
              const active = season === tab.key
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSeason(tab.key)}
                  className={cn(
                    'inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors',
                    active ? 'bg-pine text-milk shadow-soft' : 'text-graphite/70 hover:text-pine',
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Icon grid */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={season}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            {items.map((act) => (
              <li
                key={act.id}
                className="group flex items-center gap-3 rounded-2xl border border-wood-dark/10 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-pine/30 hover:shadow-lift"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine/10 text-pine transition-colors group-hover:bg-pine group-hover:text-milk">
                  <Icon name={act.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <span className="block text-sm font-semibold leading-snug text-wood-dark">
                    {act.title}
                  </span>
                  {act.price && <span className="text-xs text-pine">{act.price}</span>}
                </div>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {items.length === 0 && (
          <p className="mt-10 text-center text-graphite/60">Развлечения скоро появятся.</p>
        )}
      </div>
    </section>
  )
}
