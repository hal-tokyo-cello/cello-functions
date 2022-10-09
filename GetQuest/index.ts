import { db } from "../library/db";
import { catch404, conclude, report } from "../library/functional";
import { summaries } from "../library/functional/quest";
import { ApiHandler, QuestDetail } from "../library/types";

export type GetQuestRequest = {};

export type GetQuestResponse = QuestDetail;

export const run: ApiHandler<GetQuestResponse> = (context, req) =>
  Promise.resolve({ id: context.bindingData.id })
    .then(({ id }) => db.getQuest(id))
    .catch(catch404)
    .then((quest) => ({
      ...summaries(quest),
      options: quest.options.map((opt) => opt.display),
    }))
    .then(conclude, report);
