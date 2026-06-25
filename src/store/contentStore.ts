import { create } from 'zustand'
import type { SiteContent, SectionKey } from '@/types/content'
import { defaultContent } from '@/data/defaultContent'
import { fetchContent, saveContent, resetContent } from '@/services/contentService'

/**
 * Реактивное хранилище контента.
 *
 * И публичный сайт, и админка подписаны на этот стор, поэтому сохранение в
 * админке тут же перерисовывает публичные компоненты. Вся персистентность
 * делегирована `contentService` (слой работы с бэкендом).
 *
 * Старт: инициализируемся заводскими дефолтами (синхронно, чтобы UI отрисовался
 * сразу), а затем подтягиваем актуальный контент с сервера через `reload()`.
 */
function clone<T>(value: T): T {
  if (typeof structuredClone === 'function') return structuredClone(value)
  return JSON.parse(JSON.stringify(value)) as T
}

interface ContentState {
  content: SiteContent
  /** true, пока идёт первая загрузка контента с сервера. */
  loading: boolean
  /** Заменить одну секцию и сохранить. Используется редакторами админки на «Сохранить». */
  updateSection: <K extends SectionKey>(key: K, data: SiteContent[K]) => Promise<void>
  /** Заменить весь объект контента и сохранить. */
  setContent: (content: SiteContent) => Promise<void>
  /** Сбросить к заводским дефолтам. */
  reset: () => Promise<SiteContent>
  /** Перечитать контент с сервера. */
  reload: () => Promise<void>
}

export const useContentStore = create<ContentState>((set, get) => ({
  content: clone(defaultContent),
  loading: true,

  updateSection: async (key, data) => {
    const next = await saveContent({ ...get().content, [key]: data })
    set({ content: next })
  },

  setContent: async (content) => {
    const next = await saveContent(content)
    set({ content: next })
  },

  reset: async () => {
    const next = await resetContent()
    set({ content: next })
    return next
  },

  reload: async () => {
    const content = await fetchContent()
    set({ content, loading: false })
  },
}))

// Подтягиваем актуальный контент с сервера при старте приложения.
void useContentStore.getState().reload()

/** Удобный хук: прочитать весь объект контента. */
export const useContent = () => useContentStore((s) => s.content)
