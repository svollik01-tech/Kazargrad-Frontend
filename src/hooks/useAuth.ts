import { useCallback, useState } from 'react'
import {
  isAuthenticated as checkAuth,
  login as doLogin,
  logout as doLogout,
  getSessionLogin,
} from '@/services/authService'

/**
 * Thin React wrapper around the mock auth service. Tracks auth state locally so
 * components re-render on login/logout. Swap `authService` for real auth later.
 */
export function useAuth() {
  const [authed, setAuthed] = useState<boolean>(() => checkAuth())

  const login = useCallback(async (loginValue: string, password: string) => {
    const result = await doLogin(loginValue, password)
    if (result.ok) setAuthed(true)
    return result
  }, [])

  const logout = useCallback(() => {
    doLogout()
    setAuthed(false)
  }, [])

  return {
    isAuthenticated: authed,
    sessionLogin: getSessionLogin(),
    login,
    logout,
  }
}
