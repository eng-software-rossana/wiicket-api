import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

let userId : string = ""

async function getUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            user_id: userId
        }
    })
    if (user == null) { throw new Error }
}

async function createUser(userInfo: JSON) {
    userInfo = userInfo.parse
    const user = await prisma.user.create({
        data: {
            name: userInfo["name"]
        }
    })
}

getUser(userId)
    .catch((ex) => {
        throw ex
    })
    .finally(async () => {
        await prisma.$disconnect()
    })