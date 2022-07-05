import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { type } from 'os'

const prisma = new PrismaClient()
export class User {
    id: Number
    user_id: String
    name: String
    login: String
    password: String

    async createUser(createUserRequest: String) {
        console.log(createUserRequest)
        let createUserJson : User = JSON.parse(JSON.stringify(createUserRequest));
        // let createUserJson = createUserRequest
        const user = await prisma.user.create({
            data: {
                name: createUserJson.name.toString(),
                user_id: randomUUID(),
                login: createUserJson.login.toString(),
                password: createUserJson.password.toString()
            }
        })
        console.log("user: ", user);
        console.log("type of user: ", typeof(user));
        console.log("stringify: ", JSON.stringify(user));
        console.log("type of stringify: ", typeof(JSON.stringify(user)))
        return JSON.parse(JSON.stringify(user));
    }
}

async function getUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            user_id: userId
        }
    });
    if (user == null) { throw new Error; }
    return user;
}



// getUser(userId)
//     .catch((ex) => {
//         throw ex
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

export default User;