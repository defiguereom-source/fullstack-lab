import { useState, type FormEvent } from 'react'

interface Props {
  onAdd: (content: string, important: boolean) => Promise<void>
}

export function NoteForm({ onAdd }: Props) {
  const [content, setContent] = useState('')
  const [important, setImportant] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    try {
      await onAdd(content.trim(), important)
      setContent('')
      setImportant(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write a note..."
        className="note-input"
        required
      />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={important}
          onChange={e => setImportant(e.target.checked)}
        />
        <span>Important</span>
      </label>
      <button type="submit" className="btn-add" disabled={loading || !content.trim()}>
        {loading ? '...' : '+ Add'}
      </button>
    </form>
  )
}
