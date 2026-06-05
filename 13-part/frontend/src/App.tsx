import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useNotes } from './hooks/useNotes'
import { LoginForm } from './components/LoginForm'
import { NoteForm } from './components/NoteForm'
import { NoteItem } from './components/NoteItem'
import './stylesheets/App.css'

type Filter = 'all' | 'important'

function App() {
  const { user, loading: authLoading, error: authError, login, logout, clearError } = useAuth()
  const { notes, loading: notesLoading, error: notesError, addNote, toggleImportant, removeNote } =
    useNotes(!!user)
  const [filter, setFilter] = useState<Filter>('all')

  const handleLogin = async (username: string, password: string) => {
    return login({ username, password })
  }

  const handleLogout = async () => {
    await logout()
  }

  const handleAdd = async (content: string, important: boolean) => {
    try {
      await addNote(content, important)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })
        ?.response?.data?.error || 'Failed to add note'
      alert(msg)
      // If session expired, force logout
      if (msg.includes('Session expired') || msg.includes('logged out') || msg.includes('disabled')) {
        await logout()
      }
    }
  }

  const displayedNotes = filter === 'important' ? notes.filter(n => n.important) : notes

  if (!user) {
    return (
      <div className="app-shell">
        <header className="app-header">
          <div className="header-brand">
            <span className="brand-name">NotesApp</span>
          </div>
        </header>
        <main className="auth-layout">
          <LoginForm
            onLogin={handleLogin}
            loading={authLoading}
            error={authError}
            onClearError={clearError}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-name">NotesApp</span>
        </div>
        <div className="header-user">
          <span className="user-badge">
            <span className="user-dot" />
            {user.name}
          </span>
          <button className="btn-logout" onClick={handleLogout} disabled={authLoading}>
            {authLoading ? '...' : 'Sign out'}
          </button>
        </div>
      </header>

      <main className="notes-layout">
        <div className="notes-sidebar">
          <div className="session-info">
            <h4>Active Session</h4>
            <p className="session-detail">
              <span className="label">User</span>
              <span>{user.username}</span>
            </p>
            <p className="session-detail">
              <span className="label">Token</span>
              <span className="token-preview">{user.token?.slice(0, 20)}…</span>
            </p>
            <p className="session-tip">
              Signing out calls <code>DELETE /api/logout</code> and removes the session from the database.
              The token becomes invalid immediately.
            </p>
          </div>
        </div>

        <div className="notes-main">
          <div className="notes-toolbar">
            <h2>My Notes</h2>
            <div className="filter-tabs">
              <button
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({notes.length})
              </button>
              <button
                className={`filter-tab ${filter === 'important' ? 'active' : ''}`}
                onClick={() => setFilter('important')}
              >
                Important ({notes.filter(n => n.important).length})
              </button>
            </div>
          </div>

          <NoteForm onAdd={handleAdd} />

          {notesError && (
            <div className="alert alert-error">⚠ {notesError}</div>
          )}

          {notesLoading ? (
            <div className="loading-state">Loading notes…</div>
          ) : displayedNotes.length === 0 ? (
            <div className="empty-state">
              <span>No notes yet.</span>
            </div>
          ) : (
            <div className="notes-list">
              {displayedNotes.map(note => (
                <NoteItem
                  key={note.id}
                  note={note}
                  currentUserId={user.id}
                  onToggle={toggleImportant}
                  onDelete={removeNote}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
