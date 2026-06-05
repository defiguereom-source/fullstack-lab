export interface User {
  id: number
  username: string
  name: string
  disabled?: boolean
}

export interface Note {
  id: number
  content: string
  important: boolean
  user?: { username: string; name: string }
  userId?: number
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  username: string
  name: string
  id: number
}

export interface ApiError {
  error: string
}
