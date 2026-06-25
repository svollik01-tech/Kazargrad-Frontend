/**
 * Авторизация админки против бэкенда (см. server/index.js).
 *
 * `login()` отправляет логин/пароль на `/api/login`, получает подписанный токен
 * и кладёт его в localStorage. Токен прикладывается ко всем «пишущим» запросам
 * (сохранение контента, загрузка картинок) через `authHeaders()`.
 *
 * localStorage здесь хранит ТОЛЬКО токен сессии конкретного браузера — это
 * нормально: сам контент и картинки лежат на сервере и общие для всех.
 */

const SESSION_KEY = 'kazargrad:admin:session'
const API = '/api'

interface Session {
  token: string
  login: string
}

export interface AuthResult {
  ok: boolean
  error?: string
}

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export async function login(loginValue: string, password: string): Promise<AuthResult> {
  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: loginValue.trim(), password }),
    })
    if (res.status === 401) return { ok: false, error: 'Неверный логин или пароль' }
    if (!res.ok) return { ok: false, error: 'Сервер недоступен. Попробуйте позже.' }
    const data = (await res.json()) as Session
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ token: data.token, login: data.login }))
    } catch {
      /* приватный режим без localStorage — токен просто не сохранится */
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Не удалось связаться с сервером.' }
  }
}

export function logout(): void {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

export function isAuthenticated(): boolean {
  return Boolean(readSession()?.token)
}

export function getSessionLogin(): string {
  return readSession()?.login ?? ''
}

export function getToken(): string | null {
  return readSession()?.token ?? null
}

/** Заголовок авторизации для защищённых запросов (пустой объект, если не вошли). */
export function authHeaders(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
