import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string;
}

export function ensureAuthenticated (
    req: Request,
    res: Response,
    next: NextFunction
    ) {
    //Receive Token

    const authToken = req.headers.authorization

    if(!authToken) {
        return res.status(401).json({Message: "User Unathorized"})
    }

    const [, token ] = authToken.split(" ")
    //Or const [, token] - AuthToken.split(" ") -> gera duas strings e recupera apenas a segunda

    // ### Validate Token
    
    try {
        const { sub } = verify(
            token,
            "cd4caaf36f301a6d6d75a4b5522aefde"
        ) as IPayload   

        req.user_id = sub //Recupera o id do usuário que foi logado

        return next()

    }catch (err) {
        throw new Error("Invalid Token")
    }

}