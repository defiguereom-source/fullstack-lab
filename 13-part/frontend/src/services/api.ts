import axios from 'axios'
import type { AuthResponse, LoginCredentials, Note, User } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({ baseURL: BASE_URL })

// Attach token to every request if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('session_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/login', credentials)
    return data
  },

  // DELETE /api/logout - invalidates session server-side
  logout: async (): Promise<void> => {
    await api.delete('/logout')
  },
}

export const notesService = {
  getAll: async (): Promise<Note[]> => {
    const { data } = await api.get<Note[]>('/notes')
    return data
  },

  create: async (content: string, important: boolean): Promise<Note> => {
    const { data } = await api.post<Note>('/notes', { content, important })
    return data
  },

  update: async (id: number, important: boolean): Promise<Note> => {
    const { data } = await api.put<Note>(`/notes/${id}`, { important })
    return data
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}`)
  },
}

export const usersService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users')
    return data
  },

  create: async (username: string, name: string, password: string): Promise<User> => {
    const { data } = await api.post<User>('/users', { username, name, password })
    return data
  },
}
