'use server'

import { AuthError } from 'next-auth'

import { auth, signIn, signOut } from '@/auth'
import { md5 } from '@/lib/utils'
import { prisma } from '@/prisma'
import { compareSync, hashSync } from 'bcrypt-ts'
import { revalidatePath } from 'next/cache'

export const register = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashSync(password),
                image: `https://www.gravatar.com/avatar/${md5(email.toLowerCase())}`
            }
        })

        await signIn('credentials', {
            email,
            password,
            redirectTo: '/dashboard'
        })
    } catch (error) {
        return { errors: { email: 'Something went wrong!' } }
    }
}

export const login = async ({ email, password }: { email: string; password: string }) => {
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: '/dashboard'
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                case 'CallbackRouteError':
                    return { errors: { email: 'Email or password is incorrect' } }
                default:
                    return { errors: { email: 'Something went wrong!' } }
            }
        }
        throw error
    }
}

export const logout = async () => {
    try {
        await signOut({
            redirectTo: '/'
        })
    } catch (error) {
        throw new Error(error as string)
    }
}

export const updatePassword = async ({
    currentPassword,
    newPassword
}: { currentPassword: string; newPassword: string }) => {
    try {
        const session = await auth()
        if (!session) {
            return { errors: { password: 'You are not logged in!' } }
        }
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id
            }
        })
        if (!user || !user.password) {
            return { errors: { password: 'You are not logged in!' } }
        }
        if (!compareSync(currentPassword, user.password)) {
            return { errors: { password: 'Current password is incorrect' } }
        }
        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                password: hashSync(newPassword)
            }
        })
    } catch (error) {
        return { errors: { password: 'Something went wrong!' } }
    }
    revalidatePath('/dashboard')
    return { success: true, message: 'Password changed successfully!' }
}
