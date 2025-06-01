'use client'

import { Button } from '@/components/ui'
import { IconMoon, IconSun } from 'hq-icons'
import { useTheme } from 'next-themes'

export function ThemeToggle({ variant = 'outline' }: { variant?: 'outline' | 'ghost' }) {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <Button variant={variant} icon onPress={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
            <IconSun className='dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0' />
            <IconMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        </Button>
    )
}
