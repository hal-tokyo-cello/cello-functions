import { QuestsApi } from "../library/api/quests";
import { QuestRepository } from "../library/db/mongodb";

const httpTrigger: QuestsApi = async () => {
    // const responseMessage = 200;
    const repo = new QuestRepository();
    const Quests = await repo.getQuests();

    return {
        body: {
            quests: Quests.map(q => ({
                title: q.title,
                experience: q.experience,
                genre: "", // NO implementation
                clear: false // No implementation
            }))
        },
    };

    
}

export default httpTrigger;