import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from 'hq-icons'
import Link from 'next/link'
import { Container } from './ui'

const navigation = {
    social: [
        {
            name: 'Facebook',
            href: '#',
            icon: <IconBrandFacebook />
        },
        {
            name: 'Instagram',
            href: '#',
            icon: <IconBrandInstagram />
        },
        {
            name: 'Twitter',
            href: '#',
            icon: <IconBrandTwitter />
        },
        {
            name: 'GitHub',
            href: '#',
            icon: <IconBrandGithub />
        },
        {
            name: 'YouTube',
            href: '#',
            icon: <IconBrandYoutube />
        }
    ]
}

export function Footer() {
    return (
        <footer aria-labelledby='footer-heading'>
            <h2 id='footer-heading' className='sr-only'>
                Footer
            </h2>
            <div className='mx-auto border-t pb-8'>
                <Container className='pt-8 md:flex md:items-center md:justify-between'>
                    <div className='flex space-x-6 md:order-2'>
                        {navigation.social.map((item) => (
                            <Link
                                aria-label={item.name}
                                key={item.name}
                                href={item.href}
                                className='text-muted-fg hover:text-fg [&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-[1.5]'
                            >
                                <span className='sr-only'>{item.name}</span>
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                    <p className='mt-8 text-muted-fg text-xs leading-5 md:order-1 md:mt-0'>
                        &copy; 2024 Next Starter Kit by{' '}
                        <Link target='_blank' href='https://hq-ui.vercel.app' className='font-semibold text-fg'>
                            HQ UI
                        </Link>
                        , Inc. All rights reserved.
                    </p>
                </Container>
            </div>
        </footer>
    )
}
