declare module '#auth-utils' {
  interface User {
    id: string
    name: string
    email: string
    avatarUrl: string | null
    role: 'user' | 'admin'
    lastSeenAt: string | null
  }

  interface UserSession {
    user: User
  }

  interface SecureSessionData {

  }
}

export {}
