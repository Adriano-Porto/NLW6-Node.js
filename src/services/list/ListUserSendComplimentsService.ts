import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../../repositories/ComplimentsRepositories'

class UserSendComplimentsService { //List all the sent compliments
    async execute (user_id: string) {
        const complimentsRepositories = getCustomRepository(
            ComplimentsRepositories
        );

        const compliments = await complimentsRepositories.find({
        where: {
                user_sender: user_id,
            },
        });

        return compliments
    }
}

export { UserSendComplimentsService }