import { Context } from "@azure/functions";
import run from ".";
import { isApiError } from "../library/test";
import { ApiRequest } from "../library/types";

it("should return static result", async () => {
  const result = await run({} as Context, {} as ApiRequest);

  if (isApiError(result)) fail("it should never be an api error");

  expect(result.body.options.length).toBe(2);
});
