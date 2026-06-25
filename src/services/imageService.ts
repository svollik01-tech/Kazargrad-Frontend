/**
 * Загрузка изображений на бэкенд (см. server/index.js).
 *
 * Картинка читается в браузере, при возможности уменьшается и пережимается в
 * JPEG (canvas) — чтобы не гонять на сервер десятки мегабайт, — после чего
 * отправляется на `/api/images`. Сервер сохраняет файл и возвращает его URL
 * вида `/uploads/<id>.jpg`. Именно этот URL сохраняется в контенте, поэтому
 * картинку видят все посетители с любого устройства.
 */
import { authHeaders } from '@/services/authService'

export interface UploadedImage {
  id: string
  src: string
  name: string
}

const API = '/api'
/** Отклоняем слишком большие файлы сразу, не пытаясь их декодировать. */
const MAX_INPUT_BYTES = 25 * 1024 * 1024 // 25MB
/** Длинная сторона сохранённого изображения, в пикселях. */
const MAX_DIMENSION = 1920
/** Качество JPEG при пережатии (0–1). */
const JPEG_QUALITY = 0.82

/** Загрузить data URL в HTMLImageElement. */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Не удалось открыть изображение.'))
    image.src = src
  })
}

/** Прочитать File в base64 data URL. */
function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Не удалось прочитать файл.'))
    reader.readAsDataURL(file)
  })
}

/**
 * Уменьшить (если нужно) и пережать изображение в JPEG-Blob.
 * Возвращает null, если canvas недоступен — тогда грузим оригинал как есть.
 */
async function compressToBlob(file: File): Promise<Blob | null> {
  if (typeof document === 'undefined') return null

  const image = await loadImage(await readAsDataURL(file))
  const { width, height } = image
  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height))
  const targetW = Math.round(width * scale)
  const targetH = Math.round(height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = targetW
  canvas.height = targetH
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // Белая подложка, чтобы прозрачные PNG не стали чёрными при сведении в JPEG.
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, targetW, targetH)
  ctx.drawImage(image, 0, 0, targetW, targetH)

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', JPEG_QUALITY)
  })
}

/** Заменить расширение в имени файла (для пережатого JPEG). */
function withJpgExtension(name: string): string {
  return name.replace(/\.[^./\\]+$/, '') + '.jpg'
}

/** Загрузить выбранный File на сервер и получить его URL. */
export async function uploadImage(file: File): Promise<UploadedImage> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Можно загружать только изображения.')
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new Error('Файл слишком большой (макс. 25 МБ).')
  }

  // По умолчанию шлём оригинал; если пережатие удалось и дало выигрыш — шлём его.
  let blob: Blob = file
  let filename = file.name
  try {
    const compressed = await compressToBlob(file)
    if (compressed && compressed.size < file.size) {
      blob = compressed
      filename = withJpgExtension(file.name)
    }
  } catch {
    /* пережатие не удалось — отправим оригинал */
  }

  const form = new FormData()
  form.append('image', blob, filename)

  // Content-Type для FormData выставляет сам браузер (с boundary) — не задаём вручную.
  const res = await fetch(`${API}/images`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  if (res.status === 401) {
    throw new Error('Сессия истекла. Войдите в админку заново.')
  }
  if (!res.ok) {
    throw new Error('Не удалось загрузить изображение на сервер.')
  }
  return (await res.json()) as UploadedImage
}

/**
 * Удалить картинку с сервера. Best-effort: ошибки молча игнорируем, т.к.
 * «осиротевший» файл в uploads безвреден. `id` — это имя файла из `UploadedImage.id`.
 */
export async function deleteImage(id: string): Promise<void> {
  try {
    await fetch(`${API}/images/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
  } catch {
    /* ignore */
  }
}
