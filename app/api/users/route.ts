'use server'

import { prisma } from '@/prisma'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const per_page = Number(url.searchParams.get('per_page')) || 10

    const users = await prisma.user.findMany({
        skip: (page - 1) * per_page,
        take: per_page,
        orderBy: {
            createdAt: 'desc'
        }
    })
    const total = await prisma.user.count()

    return Response.json({ success: true, data: users, total }, { status: 200 })
}
