'use client'

import { useEffect, useState } from 'react'

import {
    IconBrandCleon,
    IconChevronDown,
    IconExternalLink,
    IconGauge,
    IconHome,
    IconInfo,
    IconPackage,
    IconPhone,
    IconSwatchBook
} from 'hq-icons'
import { usePathname } from 'next/navigation'

import { ThemeToggle } from '@/components/theme-toggle'
import { Menu, Navbar } from '@/components/ui'
import type { User } from 'next-auth'
import { UserMenu } from './user-menu'

const navMenu = [
    { label: 'Home', href: '/', icon: IconHome },
    { label: 'About', href: '/about', icon: IconInfo },
    { label: 'Contact', href: '/contact', icon: IconPhone }
]

const protectedNavMenu = [{ label: 'Dashboard', href: '/dashboard', icon: IconGauge }]

export function AppNavbar({ children, user }: { children: React.ReactNode; user?: User }) {
    const pathname = usePathname()

    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => setIsOpen(false), [pathname])
    return (
        <Navbar isSticky isOpen={isOpen} onOpenChange={setIsOpen}>
            <Navbar.Nav>
                <Navbar.Logo className='text-fg' href='/'>
                    <IconBrandCleon className='size-6' />
                </Navbar.Logo>
                <Navbar.Section>
                    {navMenu.map((item) => (
                        <Navbar.Item key={item.label} isCurrent={pathname === item.href} href={item.href}>
                            <item.icon />
                            {item.label}
                        </Navbar.Item>
                    ))}
                    {user &&
                        protectedNavMenu.map((item) => (
                            <Navbar.Item key={item.label} isCurrent={pathname === item.href} href={item.href}>
                                <item.icon />
                                {item.label}
                            </Navbar.Item>
                        ))}
                    <Menu>
                        <Navbar.Item className='group'>
                            <IconBrandCleon />
                            Resources...
                            <IconChevronDown className='ml-2 size-4 duration-200 group-data-pressed:rotate-180' />
                        </Navbar.Item>
                        <Menu.Content className='sm:min-w-48'>
                            <Menu.Item target='_blank' href='https://hq-ui.vercel.app/docs/components'>
                                <IconPackage />
                                <Menu.Label>Components</Menu.Label>
                                <IconExternalLink className='absolute right-0' />
                            </Menu.Item>
                            <Menu.Item target='_blank' href='https://hq-ui.vercel.app/icons'>
                                <IconBrandCleon />
                                <Menu.Label>Icons</Menu.Label>
                                <IconExternalLink className='absolute right-0' />
                            </Menu.Item>
                            <Menu.Item target='_blank' href='https://hq-ui.vercel.app/colors'>
                                <IconSwatchBook />
                                <Menu.Label>Colors</Menu.Label>
                                <IconExternalLink className='absolute right-0' />
                            </Menu.Item>
                        </Menu.Content>
                    </Menu>
                </Navbar.Section>
                <Navbar.Section className='hidden sm:ml-auto lg:flex'>
                    <Navbar.Flex className='gap-1 md:gap-1'>
                        <ThemeToggle variant='outline' />
                        <UserMenu user={user} />
                    </Navbar.Flex>
                </Navbar.Section>
            </Navbar.Nav>
            <Navbar.Compact>
                <Navbar.Flex>
                    <Navbar.Trigger className='-ml-2' />
                </Navbar.Flex>
                <Navbar.Flex>
                    <Navbar.Flex className='gap-1'>
                        <ThemeToggle variant='outline' />
                        <UserMenu user={user} />
                    </Navbar.Flex>
                </Navbar.Flex>
            </Navbar.Compact>
            {children}
        </Navbar>
    )
}
