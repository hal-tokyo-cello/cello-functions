import { Context } from "@azure/functions";

import { AnswerQuestRequest, run } from ".";
import { isApiError } from "../library/test";
import { ApiRequest } from "../library/types";

it("should always correct", async () => {
  const inquiry = await run({} as Context, {} as ApiRequest<AnswerQuestRequest>);

  if (isApiError(inquiry)) fail("it should never be an api error");

  expect(inquiry.body.correct).toBe(true);
});
