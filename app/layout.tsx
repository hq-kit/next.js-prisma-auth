import { Providers } from '@/components/providers'
import type { Metadata } from 'next'
import { Fira_Mono, Inter } from 'next/font/google'
import './globals.css'

const fontSans = Inter({
    variable: '--font-sans',
    subsets: ['latin']
})

const fontMono = Fira_Mono({
    weight: ['400', '500', '700'],
    variable: '--font-mono',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: {
        template: '%s / HQ UI Starter Kit with Next',
        default: 'HQ UI Starter Kit with Next'
    },
    description: 'Next.js 15 Starter Kit with Tailwind CSS, TypeScript, React, React Aria Components, HQ UI Components'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning={true} className={`${fontSans.variable} ${fontMono.variable}`}>
            <body className='min-h-dvh antialiased'>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
