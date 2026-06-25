import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Upload, RotateCcw, ExternalLink, ChevronRight, Clock } from 'lucide-react'
import { ADMIN_NAV } from '@/lib/adminNav'
import { useContentStore } from '@/store/contentStore'
import { useToast } from '@/components/ui/Toast'
import { cn, formatDateTime } from '@/lib/utils'
import type { SiteContent } from '@/types/content'
import { EditorCard } from '@/components/admin/EditorPage'

/**
 * Admin home. Shows when content was last saved, quick links to every section
 * editor, and data-management actions (export / import / reset) that operate on
 * the whole content object.
 */
export function Dashboard() {
  const content = useContentStore((s) => s.content)
  const setContent = useContentStore((s) => s.setContent)
  const reset = useContentStore((s) => s.reset)
  const toast = useToast()
  const importRef = useRef<HTMLInputElement>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  // Section links (skip the dashboard itself).
  const sections = ADMIN_NAV.filter((n) => n.to !== '')

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kazargrad-content-${content.lastSaved.slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Контент экспортирован')
  }

  const handleImport = async (file: File | undefined) => {
    if (!file) return
    try {
      const text = await file.text()
      const parsed = JSON.parse(text) as SiteContent
      if (!parsed || typeof parsed !== 'object' || !parsed.settings || !parsed.hero) {
        throw new Error('Файл не похож на контент Казарьграда.')
      }
      await setContent(parsed)
      toast.success('Контент импортирован')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Не удалось прочитать файл')
    } finally {
      if (importRef.current) importRef.current.value = ''
    }
  }

  const handleReset = async () => {
    if (!confirmReset) {
      setConfirmReset(true)
      return
    }
    try {
      await reset()
      toast.success('Контент сброшен к исходному')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Ошибка сброса')
    } finally {
      setConfirmReset(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-wood-dark sm:text-3xl">Панель управления</h1>
        <p className="text-sm text-graphite/70">
          Управляйте содержимым сайта. Изменения сразу применяются на публичной странице.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-wood-dark/10 bg-white px-5 py-4 shadow-sm">
        <span className="flex items-center gap-2 text-sm text-graphite/70">
          <Clock className="h-4 w-4 text-pine" />
          Последнее сохранение: <strong className="text-wood-dark">{formatDateTime(content.lastSaved)}</strong>
        </span>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-pine px-4 py-2 text-sm font-semibold text-milk shadow-soft transition-colors hover:bg-[#34492f]"
        >
          <ExternalLink className="h-4 w-4" />
          Открыть сайт
        </a>
      </div>

      {/* Section quick links */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="group flex items-center gap-3 rounded-2xl border border-wood-dark/10 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-pine/30 hover:shadow-card"
          >
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine/10 text-pine">
              <s.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="flex-1 text-sm font-semibold text-wood-dark">{s.label}</span>
            <ChevronRight className="h-4 w-4 text-graphite/30 transition-transform group-hover:translate-x-0.5 group-hover:text-pine" />
          </Link>
        ))}
      </div>

      {/* Data management */}
      <EditorCard
        title="Управление данными"
        description="Резервное копирование и восстановление содержимого сайта."
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-full border border-wood-dark/15 px-4 py-2 text-sm font-semibold text-graphite transition-colors hover:bg-wood-dark/5"
          >
            <Download className="h-4 w-4" />
            Экспорт (JSON)
          </button>

          <input
            ref={importRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => handleImport(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => importRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-full border border-wood-dark/15 px-4 py-2 text-sm font-semibold text-graphite transition-colors hover:bg-wood-dark/5"
          >
            <Upload className="h-4 w-4" />
            Импорт (JSON)
          </button>

          <button
            type="button"
            onClick={handleReset}
            onBlur={() => setConfirmReset(false)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
              confirmReset
                ? 'border-brick bg-brick text-white'
                : 'border-brick/40 text-brick hover:bg-brick/10',
            )}
          >
            <RotateCcw className="h-4 w-4" />
            {confirmReset ? 'Точно сбросить? Нажмите ещё раз' : 'Сбросить к исходному'}
          </button>
        </div>
        <p className="mt-3 text-xs text-graphite/55">
          Сброс заменит весь контент сайта на исходный (заводской). Отменить это действие нельзя —
          сначала сделайте экспорт.
        </p>
      </EditorCard>
    </div>
  )
}
