import { useState, useCallback } from 'react'
import { authService } from '../services/api'
import type { AuthResponse, LoginCredentials } from '../types'

const SESSION_KEY = 'session_token'
const USER_KEY = 'session_user'

export function useAuth() {
  const [user, setUser] = useState<AuthResponse | null>(() => {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? JSON.parse(stored) : null
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authService.login(credentials)
      localStorage.setItem(SESSION_KEY, data.token)
      localStorage.setItem(USER_KEY, JSON.stringify(data))
      setUser(data)
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })
        ?.response?.data?.error || 'Login failed'
      setError(msg)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
    } catch {
      // Even if server-side fails, clear local session
    } finally {
      localStorage.removeItem(SESSION_KEY)
      localStorage.removeItem(USER_KEY)
      setUser(null)
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { user, loading, error, login, logout, clearError }
}
