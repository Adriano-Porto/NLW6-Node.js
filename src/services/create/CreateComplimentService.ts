import { getCustomRepository } from "typeorm"
import { RequestError } from "../../errors/RequestError"
import { ComplimentsRepositories } from "../../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../../repositories/UsersRepositories"

interface IComplimentRequest {
    tag_id: string
    user_sender: string
    user_receiver: string
    message: string
}

class CreateComplimentService {

    async execute({
        tag_id,
        user_sender,
        user_receiver,
        message
    }: IComplimentRequest) {
        
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories)

        if(user_sender === user_receiver) {
            throw new RequestError("Can't make compliments for yourself")
        }

        const userReceiver = await usersRepositories.findOne(user_receiver)

        if(!userReceiver) {
            throw new RequestError("Receiver User does not exists")
        }

        const complimentAlreadyExists = await complimentsRepositories.findOne({
            where: { tag_id: tag_id, user_sender: user_sender}
        })

        if(complimentAlreadyExists) {
            throw new RequestError("Compliment have already been made")
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        await complimentsRepositories.save(compliment)

        return compliment
    }

}

export { CreateComplimentService }