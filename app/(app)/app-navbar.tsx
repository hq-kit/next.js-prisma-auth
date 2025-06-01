'use client'

import { useEffect, useState } from 'react'

import {
    IconBrandCleon,
    IconChevronDown,
    IconExternalLink,
    IconHome,
    IconInfo,
    IconLink,
    IconPackage,
    IconPhone,
    IconSwatchBook
} from 'hq-icons'
import { usePathname } from 'next/navigation'

import { ThemeToggle } from '@/components/theme-toggle'
import { Link, Menu, Navbar, buttonStyle } from '@/components/ui'

export function AppNavbar({ children, ...props }: React.ComponentProps<typeof Navbar>) {
    const pathname = usePathname()

    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => setIsOpen(false), [pathname])
    return (
        <Navbar isSticky isOpen={isOpen} onOpenChange={setIsOpen} {...props}>
            <Navbar.Nav>
                <Navbar.Logo className='text-fg' href='/'>
                    <IconBrandCleon className='size-6' />
                </Navbar.Logo>
                <Navbar.Section>
                    <Navbar.Item isCurrent={pathname === '/'} href='/'>
                        <IconHome className='inline size-4 lg:hidden' />
                        Home
                    </Navbar.Item>
                    <Navbar.Item isCurrent={pathname === '/about'} href='/about'>
                        <IconInfo className='inline size-4 lg:hidden' />
                        About
                    </Navbar.Item>
                    <Navbar.Item isCurrent={pathname === '/contact'} href='/contact'>
                        <IconPhone className='inline size-4 lg:hidden' />
                        Contact
                    </Navbar.Item>
                    <Navbar.Item
                        target='_blank'
                        href='https://hq-ui.vercel.app/blocks'
                        className='text-primary hover:text-primary/90'
                    >
                        Blocks
                        <IconLink />
                    </Navbar.Item>
                    <Menu>
                        <Navbar.Item className='group'>
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
                        <Link className={buttonStyle({ variant: 'outline' })} href='/login'>
                            Login
                        </Link>
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
                        <Navbar.Item
                            className={buttonStyle({ variant: 'outline' })}
                            isCurrent={pathname === '/login'}
                            href='/login'
                        >
                            Login
                        </Navbar.Item>
                    </Navbar.Flex>
                </Navbar.Flex>
            </Navbar.Compact>
            {children}
        </Navbar>
    )
}
