import { Quest, MultipleChoiceQuestion, Answer, CombinationQuestion } from "cello-core/core";

import { quest2Genre, summaries } from "./quest";

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
