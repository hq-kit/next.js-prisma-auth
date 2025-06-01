'use client'

import { Table, User as UserComponent } from '@/components/ui'
import type { User } from '@/lib/generated/prisma'

export default function UsersTable({ users }: { users?: User[] }) {
    return (
        <Table>
            <Table.Header>
                <Table.Column isRowHeader>Name</Table.Column>
                <Table.Column>Role</Table.Column>
            </Table.Header>
            <Table.Body>
                {users?.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.Cell>
                            <UserComponent
                                shape='square'
                                size='md'
                                name={user.name || ''}
                                src={user.image || ''}
                                alt={user.name || ''}
                                description={user.email || ''}
                            />
                        </Table.Cell>
                        <Table.Cell>{user.role}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
