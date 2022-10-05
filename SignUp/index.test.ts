import { Context } from "@azure/functions";
import main, { SignUpRequest } from ".";
import { isApiError, TestMemoryDB } from "../library/test";
import { ApiRequest } from "../library/types";

it("should be succeed", async () => {
  const credential = { email: "johndoe@example.com", password: "john-doe-password" };

  const result = await main({} as Context, { body: credential } as ApiRequest<SignUpRequest>);

  expect(isApiError(result)).toBeFalsy();

  const db = TestMemoryDB.instance;
  db.getUser(credential.email).then((user) => {
    user.login({ ...credential }).then((ok) => expect(ok).toBeTruthy());
  });
});

it("should fail for the email", async () => {
  const credential = { email: "johndoe", password: "john-doe-password" };

  const result = await main({} as Context, { body: credential } as ApiRequest<SignUpRequest>);

  expect(isApiError(result)).toBeTruthy();
  expect(result.statusCode).toBe(404);

  const db = TestMemoryDB.instance;
  expect(() => db.getUser(credential.email)).rejects.toContain(credential.email);
});

test("repeated registration", async () => {
  const credential = { email: "johndoe@example.com", password: "john-doe-password" };

  main({} as Context, { body: credential } as ApiRequest<SignUpRequest>);
  const result = await main({} as Context, { body: credential } as ApiRequest<SignUpRequest>);

  expect(isApiError(result)).toBeTruthy();
  expect(result.statusCode).toBe(404);
});
