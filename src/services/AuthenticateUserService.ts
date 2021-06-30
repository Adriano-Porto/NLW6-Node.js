import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
    email: string
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({ email })

        if(!user) {
            throw new Error("Email incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Password incorrect")
        }

        const token = sign({
            email: user.email,
            
        }, "cd4caaf36f301a6d6d75a4b5522aefde", {
            subject: user.id,
            expiresIn: '1d'
        })

        return token
    }
}

export { AuthenticateUserService }