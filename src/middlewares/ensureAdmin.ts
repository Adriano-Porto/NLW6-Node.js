import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { RequestError } from '../errors/RequestError'
import { UsersRepositories } from '../repositories/UsersRepositories'

export async function ensureAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { user_id } = req
    const usersRepositories = getCustomRepository(UsersRepositories)

    const { admin } = await usersRepositories.findOne(user_id)

    if(admin) {
        return next()
    }

    throw new RequestError("User Unathorized", 401)
}