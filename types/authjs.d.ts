import type { DefaultSession } from 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
    interface User {
        role: string
    }
    interface Session {
        user: User & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        sub: string
        role: string
    }
}
