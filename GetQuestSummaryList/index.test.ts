import { Context } from "@azure/functions";

import { CombinationQuestion, MultipleChoiceQuestion } from "cello-core/core";

import { run } from ".";
import { MemoryDatabase } from "../library/db/memory";
import { isApiError } from "../library/test";
import { ApiRequest, QuestSummary } from "../library/types";

const testMC = new MultipleChoiceQuestion(741, "multi title", [], 852, [], 0, "");
const testCQ = new CombinationQuestion(456, "combine title", [], 789, [], [], "");

it("should succeed", async () => {
  MemoryDatabase.instance.quests = [testCQ, testMC];

  const result = await run({} as Context, {} as ApiRequest);

  if (isApiError(result)) return;

  expect((result.body.quests.length = 2));
  expect(result.body.quests).toContainEqual<QuestSummary>({
    experience: 789,
    genre: "COM",
    id: "456",
    title: "combine title",
  });
  expect(result.body.quests).toContainEqual<QuestSummary>({
    experience: 852,
    genre: "MUL",
    id: "741",
    title: "multi title",
  });
});
