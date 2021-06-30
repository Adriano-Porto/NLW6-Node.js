import { Request, Response } from 'express'
import { ListUserReceiveComplimentsService } from '../services/list/ListUserReceiveComplimentsService'


class ListUserReceiveComplimentsController {
    async handle(req: Request, res: Response) {
        const { user_id } = req

        const listUserReceiverComplimentsService = new ListUserReceiveComplimentsService()

        const compliments = await listUserReceiverComplimentsService.execute(user_id)

        console.log(compliments)

        return res.json(compliments)
    }
}

export { ListUserReceiveComplimentsController }