import { Context } from "@azure/functions";

import { Answer, CombinationQuestion, MultipleChoiceQuestion, Quest } from "cello-core/core";

import { default as handler, quest2Genre, summaries } from ".";
import { MemoryDatabase } from "../library/db/memory";
import { isApiError } from "../library/test";
import { ApiRequest, QuestSummary } from "../library/types";

class TestQuest extends Quest {
  constructor() {
    super(0, "", [], 0, [], new Answer("", ""), "");
  }
}

const testQ = new TestQuest();
const testMC = new MultipleChoiceQuestion(741, "multi title", [], 852, [], 0, "");
const testCQ = new CombinationQuestion(456, "combine title", [], 789, [], [], "");

test("switching genre from quest object", () => {
  [
    { quest: {} as Quest, genre: undefined },
    { quest: testQ, genre: undefined },
    { quest: testMC, genre: "MUL" },
    { quest: testCQ, genre: "COM" },
  ].forEach((c) => {
    const genre = quest2Genre(c.quest);
    expect(genre).toBe(c.genre);
  });
});

test("quest summarizing", () => {
  [
    {
      quest: new MultipleChoiceQuestion(
        "random quest id",
        "Test Quest",
        [],
        123,
        [new Answer("a", "a"), new Answer("b", "b")],
        1,
        "Question string"
      ),
      summary: {
        experience: 123,
        genre: "MUL",
        id: "random quest id",
        title: "Test Quest",
        cleared: undefined,
      },
    },
    {
      quest: { experience: 0, id: 741, title: "title" } as Quest,
      summary: {
        experience: 0,
        genre: "COM",
        id: "741",
        title: "title",
      },
    },
  ].forEach((c) => expect(summaries(c.quest)).toEqual(c.summary));
});

it("should succeed", async () => {
  MemoryDatabase.instance.quests = [testCQ, testMC];

  const result = await handler({} as Context, {} as ApiRequest);

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
