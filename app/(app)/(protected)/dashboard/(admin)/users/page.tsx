import { Paginator } from '@/components/paginator'
import { Card, Container } from '@/components/ui'
import UsersTable from './users-table'

interface Props {
    searchParams: Promise<{ page: string; per_page: string }>
}

export default async function Page({ searchParams }: Props) {
    const params = await searchParams
    const page = Number(params.page || 1)
    const per_page = Number(params.per_page || 10)
    const { data: users, total } = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/users?page=${page}&per_page=${per_page}`
    ).then((res) => res.json())

    return (
        <Container className='py-6'>
            <Card className='mb-6'>
                <Card.Header>
                    <Card.Title>Users</Card.Title>
                    <Card.Description>Manage users</Card.Description>
                </Card.Header>
            </Card>
            {users && (
                <>
                    <UsersTable users={users} />
                    <Paginator current={page} per_page={per_page} total={total} />
                </>
            )}
        </Container>
    )
}
