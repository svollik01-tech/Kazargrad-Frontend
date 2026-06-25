import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '@/services/authService'

/**
 * Guards admin routes. Redirects unauthenticated users to the login page,
 * preserving the attempted location so we can return after login.
 *
 * (Mock auth — see authService. Replace with a real session check later.)
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation()
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }
  return <>{children}</>
}
