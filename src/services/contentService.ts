import { defaultContent, CURRENT_VERSION } from '@/data/defaultContent'
import type { SiteContent } from '@/types/content'
import { authHeaders } from '@/services/authService'

/**
 * Слой персистентности контента (бэкенд: server/index.js).
 *
 * Это ЕДИНСТВЕННОЕ место, которое знает, КАК хранится контент. Чтение открыто
 * всем (публичный сайт), запись защищена токеном авторизации. Раньше здесь был
 * localStorage — теперь данные общие для всех посетителей и лежат на сервере.
 */

const API = '/api'

/** Глубокое копирование (structuredClone с JSON-фоллбэком). */
function clone<T>(value: T): T {
  if (typeof structuredClone === 'function') return structuredClone(value)
  return JSON.parse(JSON.stringify(value)) as T
}

/**
 * Накладываем сохранённый контент поверх дефолтов, чтобы поля, добавленные в
 * схему после последнего сохранения, получали разумные значения. (Полноценный
 * бэкенд решал бы это миграциями.)
 */
function withDefaults(stored: Partial<SiteContent>): SiteContent {
  const base = clone(defaultContent)
  return {
    ...base,
    ...stored,
    version: CURRENT_VERSION,
    settings: { ...base.settings, ...stored.settings },
    hero: { ...base.hero, ...stored.hero },
    houses: { ...base.houses, ...stored.houses },
    territory: { ...base.territory, ...stored.territory },
    kids: { ...base.kids, ...stored.kids },
    activities: { ...base.activities, ...stored.activities },
    amenities: { ...base.amenities, ...stored.amenities },
    services: { ...base.services, ...stored.services },
    events: { ...base.events, ...stored.events },
    booking: { ...base.booking, ...stored.booking },
    reviews: { ...base.reviews, ...stored.reviews },
    faq: { ...base.faq, ...stored.faq },
    contacts: { ...base.contacts, ...stored.contacts },
    footer: { ...base.footer, ...stored.footer },
  }
}

/** Прочитать контент с сервера. Если сохранений ещё не было (404) или сервер
 *  недоступен — отдаём заводские дефолты, чтобы сайт не падал. */
export async function fetchContent(): Promise<SiteContent> {
  try {
    const res = await fetch(`${API}/content`)
    if (res.status === 404) return clone(defaultContent)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const parsed = (await res.json()) as Partial<SiteContent>
    return withDefaults(parsed)
  } catch (err) {
    console.error('[contentService] Не удалось загрузить контент, используем дефолты.', err)
    return clone(defaultContent)
  }
}

/** Сохранить весь объект контента на сервер (требует авторизации). */
export async function saveContent(content: SiteContent): Promise<SiteContent> {
  const next: SiteContent = {
    ...content,
    version: CURRENT_VERSION,
    lastSaved: new Date().toISOString(),
  }
  const res = await fetch(`${API}/content`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(next),
  })
  if (res.status === 401) {
    throw new Error('Сессия истекла. Войдите в админку заново.')
  }
  if (!res.ok) {
    throw new Error('Не удалось сохранить данные на сервере.')
  }
  return next
}

/** Сбросить контент к заводскому (по сути — сохранить дефолты). */
export async function resetContent(): Promise<SiteContent> {
  return saveContent(clone(defaultContent))
}
