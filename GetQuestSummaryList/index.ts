import { CombinationQuestion, MultipleChoiceQuestion, Quest } from "cello-core/core";

import { MemoryDatabase } from "../library/db/memory";
import { conclude, report } from "../library/functional";
import { ApiHandler, QuestSummary } from "../library/types";

export interface GetQuestSummaryListRequest {}

export interface GetQuestSummaryListResponse {
  quests: QuestSummary[];
}

const db = MemoryDatabase.instance;

export const quest2Genre = (quest: Quest): QuestSummary["genre"] | undefined => {
  if (quest instanceof MultipleChoiceQuestion) {
    return "MUL";
  }

  if (quest instanceof CombinationQuestion) {
    return "COM";
  }

  return undefined;
};

export const summaries = (quest: Quest): QuestSummary => ({
  experience: quest.experience,
  genre: quest2Genre(quest) ?? "COM",
  id: typeof quest.id === "number" ? quest.id.toString() : quest.id,
  title: quest.title,
});

export const run: ApiHandler<GetQuestSummaryListResponse, GetQuestSummaryListRequest> = (context, req) =>
  db
    .getQuests()
    .then((quests) => quests.map(summaries))
    .then((summaries) => ({ quests: summaries }))
    .then(conclude, report);
