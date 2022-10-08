import { Context } from "@azure/functions";

import { User } from "cello-core/core";

import { run, SignInRequest } from ".";
import { isApiError, TestMemoryDB } from "../library/test";
import { ApiRequest, User as ApiUser } from "../library/types";

let db: TestMemoryDB;

const johnDoe = { email: "johndoe@example.com", password: "john-doe-example" };

const isUser = (obj: any): obj is ApiUser => !!obj?.accountId;

beforeEach(() => {
  db = TestMemoryDB.refresh();
  User.register(db, johnDoe.email, johnDoe.password);
});

it("should be succeed", async () => {
  const result = await run({} as Context, { body: johnDoe } as ApiRequest<SignInRequest>);

  expect(isApiError(result)).toBeFalsy();
  expect(isUser(result.body)).toBeTruthy();
});

it("should fail for the email", async () => {
  const result = await run({} as Context, { body: { email: "johndoe", password: "" } } as ApiRequest<SignInRequest>);

  expect(isApiError(result)).toBeTruthy();
  if (!isApiError(result)) return;

  expect(result.statusCode).toBe(404);
});

it("should fail for the password", async () => {
  const result = await run({} as Context, { body: { ...johnDoe, password: "qwerty" } } as ApiRequest<SignInRequest>);

  expect(isApiError(result)).toBeTruthy();
  if (!isApiError(result)) return;

  expect(result.statusCode).toBe(404);
  expect(result.body.error.errors[0].reason).toContain("credential");
});

it("should fail for no register", async () => {
  const result = await run(
    {} as Context,
    { body: { email: "janedoe@example.com", password: "jane-doe-password" } } as ApiRequest<SignInRequest>
  );

  expect(isApiError(result)).toBeTruthy();
  if (!isApiError(result)) return;

  expect(result.statusCode).toBe(404);
  expect(result.body.error.errors[0].reason).toContain("unregistered");
});
