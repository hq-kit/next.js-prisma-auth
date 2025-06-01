import { Card, Container } from '@/components/ui'

export default function Page() {
    return (
        <Container className='py-6'>
            <Card className='mb-6'>
                <Card.Header>
                    <Card.Title>Dashboard</Card.Title>
                    <Card.Description>Dashboard</Card.Description>
                </Card.Header>
            </Card>
        </Container>
    )
}
