import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { create } from 'domain'
import { type } from 'os'
import { response, Response } from 'express'

const prisma = new PrismaClient()
class User {
    user_id: String
    name: String
    login: String
    password: String

    async createUser(createUserRequest: String) {
        let createUserJson : User = JSON.parse(JSON.stringify(createUserRequest));
        const user = await prisma.user.create({
            data: {
                name: createUserJson.name.toString(),
                user_id: randomUUID(),
                login: createUserJson.login.toString(),
                password: createUserJson.password.toString()
            }
        })
        return JSON.parse(JSON.stringify(user.user_id));
    }

    async getUser(userIdString: String) {
        let userId : string = JSON.parse(JSON.stringify(userIdString));
        const user = await prisma.user.findFirst({
            where: {
                user_id: userId
            }
        });
        if (user == null) { throw new Error; }
        return user;
    }

    async updateUser(updateUserRequest: String) {
        let updateUserJson : User = JSON.parse(JSON.stringify(updateUserRequest));
        let foundUser = await this.getUser(updateUserJson.user_id.toString())
        const user = await prisma.user.update({
            where: {
                user_id: updateUserJson.user_id.toString()
            },
            data: {
                name: updateUserJson.name?.toString() ?? foundUser.name,
                login: updateUserJson.login?.toString() ?? foundUser.login,
                password: updateUserJson.password?.toString() ?? foundUser.password
            }
        })
        if (user === null) { throw new Error; }
        return user;
    }

    async deleteUser(deleteUserRequest: String) {
        let deleteUserJson : User = JSON.parse(JSON.stringify(deleteUserRequest));
        let foundUser = await this.getUser(deleteUserJson.user_id.toString())
        if (foundUser) {
            const user = await prisma.user.delete({
                where: {
                    user_id: foundUser.user_id
                }
            })
            return foundUser.user_id;
        }
    }
}

export default User;