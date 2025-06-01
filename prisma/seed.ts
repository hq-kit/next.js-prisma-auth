import { PrismaClient } from '@/lib/generated/prisma'
import { faker } from '@faker-js/faker'
import { hashSync } from 'bcrypt-ts'
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            name: 'Administrator',
            email: 'admin@example.com',
            password: hashSync('password'),
            image: faker.image.avatar(),
            role: 'ADMIN'
        }
    })
    const users = []
    for (let i = 0; i < 10; i++) {
        users.push(
            await prisma.user.create({
                data: {
                    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                    email: faker.internet.email(),
                    password: hashSync('password'),
                    image: faker.image.avatar()
                }
            })
        )
    }
    for (const user of users) {
        for (let i = 0; i < 10; i++) {
            await prisma.post.create({
                data: {
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraphs(3),
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            })
        }
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
