import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom'
import { Lock, User, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

/**
 * Admin login screen. Uses the mock auth service (demo credentials in README).
 * On success, returns the user to the page they were trying to reach, or the
 * dashboard.
 */
export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/admin'

  const [loginValue, setLoginValue] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Already signed in → skip the form.
  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = await login(loginValue, password)
    if (result.ok) {
      navigate(from, { replace: true })
    } else {
      setError(result.error ?? 'Не удалось войти')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-wood-dark px-5 py-10">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-milk/70 transition-colors hover:text-milk"
        >
          <ArrowLeft className="h-4 w-4" />
          На сайт
        </Link>

        <div className="rounded-3xl border border-white/10 bg-milk p-7 shadow-lift sm:p-9">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="font-heading text-3xl font-semibold text-wood-dark">Казарьград</span>
            <span className="text-sm text-graphite/60">Вход в панель администратора</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-wood-dark">Логин</span>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite/40" />
                <input
                  type="text"
                  autoComplete="username"
                  value={loginValue}
                  onChange={(e) => {
                    setLoginValue(e.target.value)
                    setError('')
                  }}
                  className="w-full rounded-xl border border-wood-dark/15 bg-white py-2.5 pl-10 pr-3.5 text-sm outline-none focus:border-pine focus:ring-2 focus:ring-pine/20"
                  placeholder="admin"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-wood-dark">Пароль</span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite/40" />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  className="w-full rounded-xl border border-wood-dark/15 bg-white py-2.5 pl-10 pr-3.5 text-sm outline-none focus:border-pine focus:ring-2 focus:ring-pine/20"
                  placeholder="••••••••"
                />
              </div>
            </label>

            {error && (
              <p className="rounded-xl bg-brick/10 px-4 py-2.5 text-sm font-medium text-brick">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center rounded-full bg-pine px-6 py-3 text-base font-semibold text-milk shadow-soft transition-colors hover:bg-[#34492f]"
            >
              Войти
            </button>
          </form>

          <p className="mt-5 rounded-xl bg-sand/60 px-4 py-3 text-center text-xs text-graphite/60">
            Демо-доступ: <span className="font-semibold text-wood-dark">admin</span> /{' '}
            <span className="font-semibold text-wood-dark">admin123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
