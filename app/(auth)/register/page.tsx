import type { Metadata } from 'next'
import { RegisterForm } from './register-form'

export const metadata: Metadata = {
    title: 'Register'
}

export default function Page() {
    return <RegisterForm />
}
