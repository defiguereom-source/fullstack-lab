import type { Note } from '../types'

interface Props {
  note: Note
  currentUserId?: number
  onToggle: (id: number, current: boolean) => void
  onDelete: (id: number) => void
}

export function NoteItem({ note, currentUserId, onToggle, onDelete }: Props) {
  const isOwner = note.userId === currentUserId || note.user !== undefined

  return (
    <div className={`note-item ${note.important ? 'note-important' : ''}`}>
      <div className="note-body">
        <p className="note-content">{note.content}</p>
        {note.user && (
          <span className="note-author">by {note.user.name}</span>
        )}
      </div>
      <div className="note-actions">
        <button
          className={`badge-btn ${note.important ? 'badge-important' : 'badge-normal'}`}
          onClick={() => onToggle(note.id, note.important)}
          title="Toggle importance"
        >
          {note.important ? '★ Important' : '☆ Normal'}
        </button>
        {isOwner && (
          <button
            className="btn-delete"
            onClick={() => onDelete(note.id)}
            title="Delete note"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
