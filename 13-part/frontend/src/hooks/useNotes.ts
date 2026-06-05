import { useState, useEffect, useCallback } from 'react'
import { notesService } from '../services/api'
import type { Note } from '../types'

export function useNotes(isAuthenticated: boolean) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = useCallback(async () => {
    setLoading(true)
    try {
      const data = await notesService.getAll()
      setNotes(data)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })
        ?.response?.data?.error || 'Failed to load notes'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes, isAuthenticated])

  const addNote = useCallback(async (content: string, important: boolean) => {
    const note = await notesService.create(content, important)
    setNotes(prev => [...prev, note])
    return note
  }, [])

  const toggleImportant = useCallback(async (id: number, current: boolean) => {
    const updated = await notesService.update(id, !current)
    setNotes(prev => prev.map(n => (n.id === id ? updated : n)))
  }, [])

  const removeNote = useCallback(async (id: number) => {
    await notesService.remove(id)
    setNotes(prev => prev.filter(n => n.id !== id))
  }, [])

  return { notes, loading, error, addNote, toggleImportant, removeNote, refresh: fetchNotes }
}
