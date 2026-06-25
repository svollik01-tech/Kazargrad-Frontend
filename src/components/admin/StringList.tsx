import { useRef, useState } from 'react'
import { Plus, X, Upload } from 'lucide-react'
import { uploadImage } from '@/services/imageService'
import { useToast } from '@/components/ui/Toast'
import { cn, moveItem } from '@/lib/utils'
import { Field } from './fields'

/**
 * Editor for a plain `string[]` (e.g. a house's feature bullets). Each line is a
 * removable text input; reordering is via up/down isn't needed here so we keep
 * it simple — add at the end, delete inline.
 */
interface StringListFieldProps {
  label?: string
  values: string[]
  onChange: (values: string[]) => void
  hint?: string
  placeholder?: string
  addLabel?: string
}

export function StringListField({
  label,
  values,
  onChange,
  hint,
  placeholder,
  addLabel = 'Добавить пункт',
}: StringListFieldProps) {
  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-2">
        {values.map((val, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={val}
              placeholder={placeholder}
              onChange={(e) => onChange(values.map((v, j) => (j === i ? e.target.value : v)))}
              className="w-full rounded-xl border border-wood-dark/15 bg-white px-3.5 py-2 text-sm outline-none focus:border-pine focus:ring-2 focus:ring-pine/20"
            />
            <button
              type="button"
              title="Удалить"
              aria-label="Удалить пункт"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-graphite/60 transition-colors hover:bg-brick/10 hover:text-brick"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ''])}
          className="inline-flex items-center gap-1.5 self-start rounded-full border-2 border-dashed border-pine/30 px-4 py-2 text-sm font-semibold text-pine transition-colors hover:bg-pine/10"
        >
          <Plus className="h-4 w-4" />
          {addLabel}
        </button>
      </div>
    </Field>
  )
}

/**
 * Editor for an array of image URLs (galleries: houses, kids, events). Shows a
 * thumbnail grid with delete + reorder, plus upload / paste-URL to add.
 */
interface ImageListFieldProps {
  label?: string
  values: string[]
  onChange: (values: string[]) => void
  hint?: string
}

export function ImageListField({ label, values, onChange, hint }: ImageListFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [url, setUrl] = useState('')
  const toast = useToast()

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setBusy(true)
    try {
      const uploaded: string[] = []
      for (const file of Array.from(files)) {
        const { src } = await uploadImage(file)
        uploaded.push(src)
      }
      onChange([...values, ...uploaded])
      toast.success(uploaded.length > 1 ? 'Изображения загружены' : 'Изображение загружено')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Ошибка загрузки')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-3">
        {values.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {values.map((src, i) => (
              <div
                key={i}
                className="group relative aspect-video overflow-hidden rounded-xl border border-wood-dark/12 bg-sand/40"
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-x-1 top-1 flex justify-between opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex gap-1">
                    <ThumbBtn title="Влево" disabled={i === 0} onClick={() => onChange(moveItem(values, i, i - 1))}>
                      ‹
                    </ThumbBtn>
                    <ThumbBtn
                      title="Вправо"
                      disabled={i === values.length - 1}
                      onClick={() => onChange(moveItem(values, i, i + 1))}
                    >
                      ›
                    </ThumbBtn>
                  </div>
                  <ThumbBtn title="Удалить" danger onClick={() => onChange(values.filter((_, j) => j !== i))}>
                    <X className="h-3.5 w-3.5" />
                  </ThumbBtn>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-full bg-pine px-4 py-2 text-sm font-semibold text-milk shadow-soft transition-colors hover:bg-[#34492f] disabled:opacity-60"
          >
            <Upload className="h-4 w-4" />
            {busy ? 'Загрузка…' : 'Загрузить'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="url"
            value={url}
            placeholder="…или вставьте ссылку на изображение"
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-xl border border-wood-dark/15 bg-white px-3.5 py-2 text-sm outline-none focus:border-pine focus:ring-2 focus:ring-pine/20"
          />
          <button
            type="button"
            disabled={!url.trim()}
            onClick={() => {
              onChange([...values, url.trim()])
              setUrl('')
            }}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-wood-dark/15 px-3 text-sm font-semibold text-graphite transition-colors hover:bg-wood-dark/5 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Field>
  )
}

function ThumbBtn({
  children,
  onClick,
  title,
  disabled,
  danger,
}: {
  children: React.ReactNode
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
        'inline-flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold leading-none text-white shadow transition-colors disabled:cursor-not-allowed disabled:opacity-30',
        danger ? 'bg-brick/90 hover:bg-brick' : 'bg-wood-dark/70 hover:bg-wood-dark',
      )}
    >
      {children}
    </button>
  )
}
