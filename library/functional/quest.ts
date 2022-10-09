import { CombinationQuestion, MultipleChoiceQuestion, Quest } from "cello-core/core";

import { QuestSummary } from "../types";

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
