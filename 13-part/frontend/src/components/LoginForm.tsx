import { useState, type FormEvent } from 'react'

interface Props {
  onLogin: (username: string, password: string) => Promise<boolean>
  loading: boolean
  error: string | null
  onClearError: () => void
}

export function LoginForm({ onLogin, loading, error, onClearError }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await onLogin(username, password)
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>Sign in</h2>
        <p className="auth-sub">Session-based authentication</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && (
          <div className="alert alert-error" onClick={onClearError}>
            <span>{error}</span>
            <button type="button" className="alert-close">x</button>
          </div>
        )}

        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="your_username"
            autoComplete="username"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
