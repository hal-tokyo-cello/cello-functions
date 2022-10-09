import { db } from "../library/db";
import { conclude, report } from "../library/functional";
import { summaries } from "../library/functional/quest";
import { ApiHandler, QuestSummary } from "../library/types";

export interface GetQuestSummaryListRequest {}

export interface GetQuestSummaryListResponse {
  quests: QuestSummary[];
}

export const run: ApiHandler<GetQuestSummaryListResponse, GetQuestSummaryListRequest> = (context, req) =>
  db
    .getQuests()
    .then((quests) => quests.map(summaries))
    .then((summaries) => ({ quests: summaries }))
    .then(conclude, report);
