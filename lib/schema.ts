import { object, string } from 'zod'

export const RegisterSchema = object({
    name: string().min(3, 'Name must be at least 3 characters long'),
    email: string().email('Invalid email'),
    password: string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: string().min(8, 'Password must be at least 8 characters long')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})

export const LoginSchema = object({
    email: string().email('Invalid email'),
    password: string().min(8, 'Password must be at least 8 characters long')
})

export const UpdatePasswordSchema = object({
    currentPassword: string().min(8, 'Password must be at least 8 characters long'),
    newPassword: string().min(8, 'Password must be at least 8 characters long'),
    newPasswordConfirm: string().min(8, 'Password must be at least 8 characters long')
}).refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: 'New password does not match',
    path: ['newPasswordConfirm']
})
