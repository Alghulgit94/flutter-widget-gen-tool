export interface User {
  id: string
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

export interface UserWithPassword extends User {
  password_hash: string
}

export interface SessionPayload {
  userId: string
  email: string
  name: string
  iat?: number
  exp?: number
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
}
