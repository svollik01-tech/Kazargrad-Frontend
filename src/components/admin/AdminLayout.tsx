import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ExternalLink, LogOut, Menu, X } from 'lucide-react'
import { ADMIN_NAV } from '@/lib/adminNav'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

/**
 * Admin chrome: fixed sidebar with section navigation (collapsible on mobile),
 * a top bar with the "open site" link and logout, and an <Outlet/> for the
 * active section editor.
 */
export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { sessionLogin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-sand/30">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-wood-dark/10 bg-wood-dark text-milk transition-transform lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-5 py-4">
          <div className="flex flex-col">
            <span className="font-heading text-xl font-semibold text-milk">Казарьград</span>
            <span className="text-xs text-milk/60">Панель администратора</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-milk/70 hover:bg-white/10 lg:hidden"
            aria-label="Закрыть меню"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-0.5">
            {ADMIN_NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === ''}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-pine text-milk'
                        : 'text-milk/75 hover:bg-white/10 hover:text-milk',
                    )
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-3 py-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-milk/75 transition-colors hover:bg-white/10 hover:text-milk"
          >
            <ExternalLink className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            Открыть сайт
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-milk/75 transition-colors hover:bg-brick/80 hover:text-white"
          >
            <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            Выйти{sessionLogin ? ` (${sessionLogin})` : ''}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-wood-dark/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Main column */}
      <div className="lg:pl-72">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-wood-dark/10 bg-milk/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-wood-dark hover:bg-wood-dark/5"
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-heading text-lg font-semibold text-wood-dark">Казарьград</span>
          <span className="w-10" />
        </div>

        <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
