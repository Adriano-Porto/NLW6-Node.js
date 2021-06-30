import { Request, Response } from "express"
import { CreateTagService } from "../services/create/CreateTagService";

class CreateTagsController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        const createTagService = new CreateTagService()

        const tag = await createTagService.execute(name)

        return res.status(200).json(tag)
    }
}

export { CreateTagsController  }