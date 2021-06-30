import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../../repositories/ComplimentsRepositories"


class ListUserReceiveComplimentsService {
    async execute(user_receiver: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

        console.log(user_receiver)

        const compliments = await complimentsRepositories.findOne({
            where: {
                user_receiver
            },
            relations: ['userSender', 'userReceiver', 'tag'] //WHAT?????
    }) // WHERE USER_RECEIVER = USER_RECEIVER
        return compliments
    }
}

export { ListUserReceiveComplimentsService }