'use client'

import { Avatar, Link, Menu, buttonStyle } from '@/components/ui'
import { IconLogOut, IconSettings } from 'hq-icons'
import type { User } from 'next-auth'
import { signOut } from 'next-auth/react'

export function UserMenu({ user }: { user?: User }) {
    return user ? (
        <Menu>
            <Menu.Trigger className='flex items-center'>
                <Avatar src={user.image || ''} alt={user.name || ''} shape='square' />
            </Menu.Trigger>
            <Menu.Content placement='bottom right' className='sm:min-w-52'>
                <Menu.Header>
                    <span className='block'>{user.name}</span>
                    <span className='font-normal text-muted-fg'>{user.email}</span>
                </Menu.Header>
                <Menu.Item href='/settings'>
                    <IconSettings />
                    Settings
                </Menu.Item>
                <Menu.Item onAction={() => signOut({ redirectTo: '/' })}>
                    <IconLogOut />
                    Log out
                </Menu.Item>
            </Menu.Content>
        </Menu>
    ) : (
        <Link href='/login' className={buttonStyle({ variant: 'outline' })}>
            Login
        </Link>
    )
}
