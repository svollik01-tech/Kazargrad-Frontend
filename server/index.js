/**
 * Бэкенд сайта «Казарьград».
 *
 * Заменяет демо-хранилище в localStorage на серверное, общее для всех
 * посетителей. Делает ровно три вещи:
 *   1. Хранит контент сайта в одном JSON-файле (DATA_DIR/content.json).
 *   2. Принимает загрузку картинок и складывает их в UPLOADS_DIR.
 *   3. Выдаёт токен по логину/паролю и проверяет его на «пишущих» запросах.
 *
 * Раздачей собранного фронтенда (dist/) и самих картинок (/uploads/) занимается
 * nginx — см. deploy/nginx.conf. Этот сервис трогает только /api/*.
 */
import express from 'express'
import multer from 'multer'
import cors from 'cors'
import crypto from 'node:crypto'
import path from 'node:path'
import { promises as fs, mkdirSync } from 'node:fs'

// --- Конфигурация (всё переопределяется переменными окружения в docker-compose) ---
const PORT = Number(process.env.PORT) || 3001
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads')
const CONTENT_FILE = path.join(DATA_DIR, 'content.json')
const ADMIN_LOGIN = process.env.ADMIN_LOGIN || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const AUTH_SECRET = process.env.AUTH_SECRET || 'dev-insecure-secret-change-me'
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7 // токен живёт 7 дней

// Папки данных должны существовать до первого запроса.
mkdirSync(DATA_DIR, { recursive: true })
mkdirSync(UPLOADS_DIR, { recursive: true })

const app = express()
app.use(cors()) // нужно только для dev (vite на другом порту); в проде один origin через nginx
app.use(express.json({ limit: '8mb' }))

// ============================================================================
//  Авторизация — простой подписанный токен (HMAC-SHA256), без БД и сессий.
//  Формат: base64url(payload).base64url(подпись). Сервер ничего не хранит —
//  достаточно проверить подпись секретом и срок годности.
// ============================================================================
function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', AUTH_SECRET).update(body).digest('base64url')
  return `${body}.${sig}`
}

function verifyToken(token) {
  if (!token) return null
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  const expected = crypto.createHmac('sha256', AUTH_SECRET).update(body).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    if (typeof data.exp === 'number' && data.exp < Date.now()) return null
    return data
  } catch {
    return null
  }
}

/** Middleware: пускает дальше только с валидным Bearer-токеном. */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  const data = verifyToken(token)
  if (!data) return res.status(401).json({ error: 'unauthorized' })
  req.user = data
  next()
}

app.post('/api/login', (req, res) => {
  const { login, password } = req.body || {}
  if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
    const token = signToken({ login, exp: Date.now() + TOKEN_TTL_MS })
    return res.json({ token, login })
  }
  return res.status(401).json({ error: 'invalid credentials' })
})

// ============================================================================
//  Контент — один JSON-файл. GET открыт всем (его читает публичный сайт),
//  PUT защищён (его пишет только админка).
// ============================================================================
app.get('/api/content', async (_req, res) => {
  try {
    const raw = await fs.readFile(CONTENT_FILE, 'utf8')
    res.type('application/json').send(raw)
  } catch (err) {
    // Файла ещё нет (ни одного сохранения) — фронтенд подставит дефолты.
    if (err.code === 'ENOENT') return res.status(404).json({ error: 'no content yet' })
    console.error('[content] read failed', err)
    res.status(500).json({ error: 'read failed' })
  }
})

app.put('/api/content', requireAuth, async (req, res) => {
  const body = req.body
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'invalid body' })
  }
  try {
    // Атомарная запись: пишем во временный файл и переименовываем, чтобы при
    // сбое посреди записи не получить «обрезанный» content.json.
    const tmp = `${CONTENT_FILE}.tmp`
    await fs.writeFile(tmp, JSON.stringify(body))
    await fs.rename(tmp, CONTENT_FILE)
    res.json({ ok: true })
  } catch (err) {
    console.error('[content] write failed', err)
    res.status(500).json({ error: 'write failed' })
  }
})

// ============================================================================
//  Картинки — multipart-загрузка на диск. В проде их раздаёт nginx из той же
//  папки (volume ./uploads), поэтому ответ возвращает относительный путь /uploads/…
// ============================================================================
const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = ALLOWED_TYPES[file.mimetype] || 'bin'
    cb(null, `${crypto.randomUUID()}.${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // 30 МБ — запас на случай несжатого оригинала
  fileFilter: (_req, file, cb) => cb(null, Boolean(ALLOWED_TYPES[file.mimetype])),
})

app.post('/api/images', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no image or unsupported type' })
  const filename = req.file.filename
  res.json({ id: filename, src: `/uploads/${filename}`, name: req.file.originalname })
})

app.delete('/api/images/:id', requireAuth, async (req, res) => {
  const id = path.basename(req.params.id) // basename отсекает попытки выйти из папки (../)
  try {
    await fs.unlink(path.join(UPLOADS_DIR, id))
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('[images] delete failed', err)
  }
  res.json({ ok: true })
})

// Раздача загруженных картинок самим бэкендом — нужна только для dev.
// В проде этот путь перехватывает nginx раньше, чем запрос дойдёт сюда.
app.use('/uploads', express.static(UPLOADS_DIR))

app.listen(PORT, () => {
  console.log(`[kazargrad-server] listening on :${PORT}`)
  console.log(`[kazargrad-server] data:    ${CONTENT_FILE}`)
  console.log(`[kazargrad-server] uploads: ${UPLOADS_DIR}`)
})
