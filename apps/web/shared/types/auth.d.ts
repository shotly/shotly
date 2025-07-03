declare module '#auth-utils' {
  interface User {
    id: string
    name: string
    email: string
    avatarUrl?: string
    role: 'user' | 'admin'
    lastSeenAt: string
  }

  interface UserSession {
    user: User
  }

  interface SecureSessionData {

  }
}

export {}
