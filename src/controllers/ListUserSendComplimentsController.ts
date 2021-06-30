import { Request, Response } from "express";
import { UserSendComplimentsService } from "../services/list/ListUserSendComplimentsService";

class ListUserSendComplimentsController {
    async handle (req: Request, res: Response) {
        const { user_id } = req

        console.log(user_id)
        
        const usersentComplimentsList = new UserSendComplimentsService();
        const compliments = await usersentComplimentsList.execute(user_id)

        return res.json(compliments);
    }
}

export { ListUserSendComplimentsController }