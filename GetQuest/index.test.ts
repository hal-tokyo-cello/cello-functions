import { Context } from "@azure/functions";

import { Answer, CombinationQuestion, CombinationSolution, MultipleChoiceQuestion } from "cello-core/core";

import { run } from ".";
import { MemoryDatabase } from "../library/db/memory";
import { isApiError, TestMemoryDB } from "../library/test";
import { ApiRequest } from "../library/types";

const id = {
  mc: "test-multiple-question",
  cq: "test-combination-question",
};

beforeEach(() => {
  TestMemoryDB.refresh();

  const options = [
    new Answer("="),
    new Answer("1"),
    new Answer("96"),
    new Answer("+"),
    new Answer("-"),
    new Answer("*"),
    new Answer("B5"),
  ];

  MemoryDatabase.instance.quests = [
    new MultipleChoiceQuestion(
      id.mc,
      "Test Multiple Question",
      [],
      123,
      [
        new Answer("Option 1", "1"),
        new Answer("Option 2", "2"),
        new Answer("Option 3", "3"),
        new Answer("Option 4", "4"),
      ],
      2,
      "Which is the correct answer"
    ),
    new CombinationQuestion(
      id.cq,
      "Test Combination Question",
      [],
      789,
      options,
      CombinationSolution.withOptionsNIndex(options, [0, 2, 6, 7, 5, 2]),
      "Sort this"
    ),
  ];
});

test("not exist quest", async () => {
  const result = await run({ bindingData: { id: 1 } } as unknown as Context, {} as ApiRequest);

  expect(isApiError(result)).toBeTruthy();
  if (!isApiError(result)) fail();

  expect(result.statusCode).toBe(404);
});

test("getting multiple choice question", async () => {
  const result = await run({ bindingData: { id: id.mc } } as unknown as Context, {} as ApiRequest);

  if (isApiError(result)) fail();

  expect(result.body.options.length).toBe(4);
  expect(result.body.id).toBe(id.mc);
});

test("getting combination question ", async () => {
  const result = await run({ bindingData: { id: id.cq } } as unknown as Context, {} as ApiRequest);

  if (isApiError(result)) fail();

  expect(result.body.options.length).toBe(7);
  expect(result.body.id).toBe(id.cq);
});
