import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'

interface HeaderProps {
    title: string
    description: string
}

export function Header({ title, description }: HeaderProps) {
    return (
        <header className='border-b py-6 sm:py-12'>
            <Container>
                <Card.Header className='max-w-xl p-0'>
                    <Card.Title className='text-xl sm:text-2xl'>{title}</Card.Title>
                    <Card.Description className='text-sm sm:text-base'>{description}</Card.Description>
                </Card.Header>
            </Container>
        </header>
    )
}
