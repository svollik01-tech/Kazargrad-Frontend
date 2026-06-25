import { type ReactNode } from 'react'
import { Save, Undo2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Standard shell for every section editor: a page header (title + description)
 * and a sticky action bar that surfaces unsaved-changes state with Save / Cancel.
 * Editors wire `dirty`, `onSave`, `onCancel` from `useSectionEditor`.
 */
interface EditorPageProps {
  title: string
  description?: string
  dirty: boolean
  onSave: () => void
  onCancel: () => void
  children: ReactNode
}

export function EditorPage({
  title,
  description,
  dirty,
  onSave,
  onCancel,
  children,
}: EditorPageProps) {
  return (
    <div className="flex flex-col gap-6 pb-28">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-wood-dark sm:text-3xl">{title}</h1>
        {description && (
          <p className="max-w-2xl text-sm leading-relaxed text-graphite/70">{description}</p>
        )}
      </header>

      <div className="flex flex-col gap-6">{children}</div>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-wood-dark/10 bg-milk/95 backdrop-blur lg:left-72">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <span
            className={cn(
              'flex items-center gap-2 text-sm font-medium transition-colors',
              dirty ? 'text-brick' : 'text-graphite/45',
            )}
          >
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                dirty ? 'bg-brick' : 'bg-pine/50',
              )}
            />
            {dirty ? 'Есть несохранённые изменения' : 'Все изменения сохранены'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={!dirty}
              className="inline-flex items-center gap-1.5 rounded-full border border-wood-dark/15 px-4 py-2 text-sm font-semibold text-graphite transition-colors hover:bg-wood-dark/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Undo2 className="h-4 w-4" />
              Отменить
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={!dirty}
              className="inline-flex items-center gap-1.5 rounded-full bg-pine px-5 py-2 text-sm font-semibold text-milk shadow-soft transition-colors hover:bg-[#34492f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Save className="h-4 w-4" />
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * A titled card used to group related fields within an editor. Most editors
 * stack a few of these.
 */
export function EditorCard({
  title,
  description,
  children,
  className,
}: {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-wood-dark/10 bg-white p-5 shadow-sm sm:p-6',
        className,
      )}
    >
      {(title || description) && (
        <div className="mb-4 flex flex-col gap-0.5">
          {title && <h2 className="text-lg font-semibold text-wood-dark">{title}</h2>}
          {description && <p className="text-sm text-graphite/65">{description}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
