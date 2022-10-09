import { Context } from "@azure/functions";

import { AnswerQuestRequest, run } from ".";
import { isApiError } from "../library/test";
import { ApiRequest } from "../library/types";

it("should always correct", async () => {
  const result = await run(
    { bindingData: { quest: "1234" } } as unknown as Context,
    {} as ApiRequest<AnswerQuestRequest>
  );

  if (isApiError(result)) fail("it should never be an api error");

  expect(result.body.correct).toBe(true);
});
