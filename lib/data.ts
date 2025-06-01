'use server'

import { prisma } from '@/prisma'

export const getUsers = async () => {
    return prisma.user.findMany()
}
