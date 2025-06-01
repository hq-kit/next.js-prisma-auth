import { LoginSchema } from '@/lib/schema'
import { prisma } from '@/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compareSync } from 'bcrypt-ts'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            credentials: {
                email: { type: 'text' },
                password: { type: 'password' }
            },
            authorize: async (credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials)
                if (!validatedFields.success) return null

                const { email, password } = validatedFields.data

                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })

                if (!user || !user.password) {
                    throw new Error('User not found')
                }

                const passwordMatch = compareSync(password, user.password)

                if (!passwordMatch) {
                    throw new Error('Password salah')
                }

                return user
            }
        }),
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isAuthenticated = !!auth?.user

            const protectedRoutes = ['/dashboard', '/dashboard/users', '/settings']

            const adminRoutes = ['/dashboard/users']

            if (!isAuthenticated && protectedRoutes.includes(nextUrl.pathname)) {
                return Response.redirect(new URL('/login', nextUrl))
            }
            if (isAuthenticated && adminRoutes.includes(nextUrl.pathname) && auth.user.role !== 'ADMIN') {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            if (isAuthenticated && (nextUrl.pathname === '/login' || nextUrl.pathname === '/register')) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }

            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.sub
            session.user.role = token.role
            return session
        }
    }
})
