import { useEffect, useRef, useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Icon, iconNames } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { Field } from './fields'

/**
 * Lets a non-technical admin pick a Lucide icon by sight. Content stores the
 * icon NAME (string); this control turns the curated `iconNames` list into a
 * searchable popover grid of previews.
 */
interface IconPickerProps {
  label?: string
  value: string
  onChange: (name: string) => void
  hint?: string
  className?: string
}

export function IconPicker({ label, value, onChange, hint, className }: IconPickerProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const filtered = query
    ? iconNames.filter((n) => n.toLowerCase().includes(query.toLowerCase()))
    : iconNames

  return (
    <Field label={label} hint={hint} className={className}>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-2 rounded-xl border border-wood-dark/15 bg-white px-3.5 py-2.5 text-sm text-graphite shadow-sm transition-colors hover:border-pine/40"
        >
          <span className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-pine/10 text-pine">
              <Icon name={value} className="h-4 w-4" />
            </span>
            <span className="font-medium">{value || 'Выбрать иконку'}</span>
          </span>
          <ChevronDown className={cn('h-4 w-4 text-graphite/50 transition-transform', open && 'rotate-180')} />
        </button>

        {open && (
          <div className="absolute z-20 mt-2 w-full rounded-2xl border border-wood-dark/12 bg-white p-3 shadow-lift">
            <div className="relative mb-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск иконки…"
                className="w-full rounded-lg border border-wood-dark/15 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-pine focus:ring-2 focus:ring-pine/20"
              />
            </div>
            <div className="grid max-h-56 grid-cols-6 gap-1 overflow-y-auto sm:grid-cols-8">
              {filtered.map((name) => (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => {
                    onChange(name)
                    setOpen(false)
                    setQuery('')
                  }}
                  className={cn(
                    'inline-flex aspect-square items-center justify-center rounded-lg transition-colors',
                    name === value
                      ? 'bg-pine text-milk'
                      : 'text-graphite/70 hover:bg-pine/10 hover:text-pine',
                  )}
                >
                  <Icon name={name} className="h-5 w-5" />
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full py-4 text-center text-sm text-graphite/50">
                  Ничего не найдено
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Field>
  )
}
