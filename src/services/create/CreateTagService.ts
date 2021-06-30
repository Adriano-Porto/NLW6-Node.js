import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../../repositories/TagRepository"

class CreateTagService {
    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories)

        if(!name) {
            throw new Error("Name is required")
        }

        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        })
        
        if(tagAlreadyExists) {
            throw new Error("Tag Already Exists on the Database")
        }

        const tag = tagsRepositories.create({
            name,
        })

        await tagsRepositories.save(tag)
        return tag
    }
}

export { CreateTagService }