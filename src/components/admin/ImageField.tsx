import { useRef, useState } from 'react'
import { Upload, Link2, X, ImageOff } from 'lucide-react'
import { uploadImage } from '@/services/imageService'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/utils'
import { Field } from './fields'

/**
 * Image input with a live preview. Supports two sources:
 *   1. Upload a file from the computer (sent to the backend via `uploadImage`,
 *      which returns a `/uploads/…` URL shared across all devices).
 *   2. Paste a remote image URL.
 *
 * Either way the field just stores a URL string in the content.
 */
interface ImageFieldProps {
  label?: string
  value: string
  onChange: (src: string) => void
  hint?: string
  className?: string
  /** Aspect ratio of the preview box. */
  aspect?: 'video' | 'square'
}

export function ImageField({
  label,
  value,
  onChange,
  hint,
  className,
  aspect = 'video',
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showUrl, setShowUrl] = useState(false)
  const [busy, setBusy] = useState(false)
  const toast = useToast()

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    setBusy(true)
    try {
      const { src } = await uploadImage(file)
      onChange(src)
      toast.success('Изображение загружено')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Ошибка загрузки')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <Field label={label} hint={hint} className={className}>
      <div className="flex flex-col gap-3">
        <div
          className={cn(
            'relative overflow-hidden rounded-xl border border-wood-dark/12 bg-sand/40',
            aspect === 'video' ? 'aspect-video' : 'aspect-square',
          )}
        >
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-graphite/40">
              <ImageOff className="h-7 w-7" />
              <span className="text-xs">Нет изображения</span>
            </div>
          )}
          {value && (
            <button
              type="button"
              title="Убрать изображение"
              aria-label="Убрать изображение"
              onClick={() => onChange('')}
              className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-graphite shadow transition-colors hover:bg-brick hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
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
          <button
            type="button"
            onClick={() => setShowUrl((s) => !s)}
            className="inline-flex items-center gap-1.5 rounded-full border border-wood-dark/15 px-4 py-2 text-sm font-semibold text-graphite transition-colors hover:bg-wood-dark/5"
          >
            <Link2 className="h-4 w-4" />
            По ссылке
          </button>
        </div>

        {showUrl && (
          <input
            type="url"
            value={value}
            placeholder="https://…"
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-wood-dark/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-pine focus:ring-2 focus:ring-pine/20"
          />
        )}
      </div>
    </Field>
  )
}
