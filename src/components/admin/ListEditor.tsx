import { type ReactNode } from 'react'
import { ChevronUp, ChevronDown, Trash2, Eye, EyeOff, Plus } from 'lucide-react'
import type { BaseItem } from '@/types/content'
import { cn, moveItem } from '@/lib/utils'

/**
 * Generic editor for a repeatable list of `BaseItem`s.
 *
 * Handles the boilerplate every list section needs — add, delete, reorder
 * (up/down), and show/hide (the `visible` flag) — and delegates the per-item
 * fields to `renderItem`. `update` merges a partial patch into the item; the
 * editor's draft is the single source of truth.
 */
interface ListEditorHelpers<T> {
  update: (patch: Partial<T>) => void
  index: number
}

interface ListEditorProps<T extends BaseItem> {
  items: T[]
  onChange: (items: T[]) => void
  createItem: () => T
  renderItem: (item: T, helpers: ListEditorHelpers<T>) => ReactNode
  /** Short title shown in each item's header (defaults to "Элемент N"). */
  itemTitle?: (item: T, index: number) => string
  addLabel?: string
  emptyHint?: string
}

export function ListEditor<T extends BaseItem>({
  items,
  onChange,
  createItem,
  renderItem,
  itemTitle,
  addLabel = 'Добавить',
  emptyHint = 'Пока нет элементов.',
}: ListEditorProps<T>) {
  const patchAt = (index: number, patch: Partial<T>) =>
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)))

  const removeAt = (index: number) =>
    onChange(items.filter((_, i) => i !== index))

  const move = (from: number, to: number) => onChange(moveItem(items, from, to))

  const add = () => onChange([...items, createItem()])

  return (
    <div className="flex flex-col gap-4">
      {items.length === 0 && (
        <p className="rounded-xl border border-dashed border-wood-dark/20 bg-white/50 px-4 py-6 text-center text-sm text-graphite/55">
          {emptyHint}
        </p>
      )}

      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            'rounded-2xl border bg-white shadow-sm transition-opacity',
            item.visible ? 'border-wood-dark/12' : 'border-wood-dark/12 opacity-60',
          )}
        >
          <div className="flex items-center justify-between gap-2 border-b border-wood-dark/10 px-4 py-2.5">
            <span className="truncate text-sm font-semibold text-wood-dark">
              {itemTitle ? itemTitle(item, index) : `Элемент ${index + 1}`}
            </span>
            <div className="flex items-center gap-1">
              <IconBtn
                title="Поднять"
                disabled={index === 0}
                onClick={() => move(index, index - 1)}
              >
                <ChevronUp className="h-4 w-4" />
              </IconBtn>
              <IconBtn
                title="Опустить"
                disabled={index === items.length - 1}
                onClick={() => move(index, index + 1)}
              >
                <ChevronDown className="h-4 w-4" />
              </IconBtn>
              <IconBtn
                title={item.visible ? 'Скрыть на сайте' : 'Показать на сайте'}
                onClick={() => patchAt(index, { visible: !item.visible } as Partial<T>)}
              >
                {item.visible ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4 text-brick" />
                )}
              </IconBtn>
              <IconBtn title="Удалить" danger onClick={() => removeAt(index)}>
                <Trash2 className="h-4 w-4" />
              </IconBtn>
            </div>
          </div>

          <div className="p-4">
            {renderItem(item, {
              index,
              update: (patch) => patchAt(index, patch),
            })}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center justify-center gap-2 self-start rounded-full border-2 border-dashed border-pine/30 px-5 py-2.5 text-sm font-semibold text-pine transition-colors hover:bg-pine/10"
      >
        <Plus className="h-4 w-4" />
        {addLabel}
      </button>
    </div>
  )
}

function IconBtn({
  children,
  onClick,
  title,
  disabled,
  danger,
}: {
  children: ReactNode
  onClick: () => void
  title: string
  disabled?: boolean
  danger?: boolean
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-lg text-graphite/70 transition-colors disabled:cursor-not-allowed disabled:opacity-30',
        danger ? 'hover:bg-brick/10 hover:text-brick' : 'hover:bg-wood-dark/5 hover:text-wood-dark',
      )}
    >
      {children}
    </button>
  )
}
