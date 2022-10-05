import { catch404, catch500, conclude, ErrorBind, report } from "./functional";
import { ApiError, Error } from "./types";

const testCatcher = ErrorBind(999, "test catcher");

it("should handle polymorphism", () => {
  const inner = { message: "test error", reason: "some reason" };
  const expected = {
    body: {
      error: { code: 999, errors: [inner], message: "test catcher" },
    },
    statusCode: 999,
  };

  expect(() => testCatcher(inner)).rejects.toEqual(expected);
  expect(() => testCatcher([inner])).rejects.toEqual(expected);
});

it("should not rewrap error", () => {
  const apiErr: ApiError = {
    body: {
      error: {
        code: 999,
        errors: [{ message: "some message", reason: "no reason" }],
        message: "text catcher",
      },
    },
    statusCode: 999,
  };
  expect(() => testCatcher(apiErr)).rejects.toEqual(apiErr);
});

it("should wrap response body", () => {
  const source = { a: 1, b: { c: true, d: "e" } };

  const res = Promise.resolve(source).then(conclude, report);
  expect(res).resolves.toEqual({
    body: source,
  });
});

it("should lift error to response", () => {
  const source: Error[] = [];

  const res = Promise.reject(source).catch(catch404).then(conclude, report);
  expect(res).resolves.toEqual({
    body: {
      error: {
        code: 404,
        errors: source,
        message: "invalid request",
      },
    },
    statusCode: 404,
  });
});
