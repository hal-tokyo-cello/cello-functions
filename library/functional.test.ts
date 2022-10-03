import { catch404, catch500, conclude, report } from "./functional";
import { ApiError, Error } from "./types";

it("should catch 404 error", () => {
  const source: Error[] = [{ message: "test error", reason: "some reason" }];

  const res = Promise.reject(source).catch(catch404);
  expect(res).rejects.toEqual<ApiError>({
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

it("should catch 500 error", () => {
  const source: Error[] = [{ message: "test error", reason: "some reason" }];

  const res = Promise.reject(source).catch(catch500);
  expect(res).rejects.toEqual<ApiError>({
    body: {
      error: {
        code: 500,
        errors: source,
        message: "server error",
      },
    },
    statusCode: 500,
  });
});

it("should not rewrap error", () => {
  const source: Error[] = [{ message: "source", reason: "some" }];

  const res404 = Promise.reject(source).catch(catch404).catch(catch500);
  expect(res404).rejects.toEqual<ApiError>({
    body: {
      error: {
        code: 404,
        errors: source,
        message: "invalid request",
      },
    },
    statusCode: 404,
  });

  const res500 = Promise.reject(source).catch(catch500).catch(catch404);
  expect(res500).rejects.toEqual<ApiError>({
    body: {
      error: {
        code: 500,
        errors: source,
        message: "server error",
      },
    },
    statusCode: 500,
  });
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
