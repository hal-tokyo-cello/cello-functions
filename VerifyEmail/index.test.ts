import { Context } from "@azure/functions";
import { User } from "cello-core/core";

import { run, VerifyEmailRequest } from ".";
import { db } from "../library/db";
import { isApiError, TestMemoryDB } from "../library/test";
import { ApiRequest } from "../library/types";

const email = "johndoe@example.com";

beforeEach(() => {
  TestMemoryDB.refresh();

  User.register(db, email, "password");
});

it("should fail for invalid email", async () => {
  const result = await run(
    {} as Context,
    { body: { email: "janedoe", otp: "123456" } } as ApiRequest<VerifyEmailRequest>
  );

  expect(isApiError(result)).toBeTruthy();
});

it("should fail for all unregistered emails", async () => {
  const result = await run(
    {} as Context,
    { body: { email: "janedoe@example.com", otp: "123456" } } as ApiRequest<VerifyEmailRequest>
  );

  expect(isApiError(result)).toBeTruthy();
});

it("should success for all registered emails regardless of OTP", async () => {
  const result = await run({} as Context, { body: { email: email } } as ApiRequest<VerifyEmailRequest>);

  expect(isApiError(result)).toBeFalsy();

  User.register(db, "janedoe@example.com", "password");
});
