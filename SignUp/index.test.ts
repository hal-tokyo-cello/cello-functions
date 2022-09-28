import { Context } from "@azure/functions";
import { SignInRequest } from "cello-core/application";
import main from ".";
import { isApiError, TestMemoryDB } from "../library/test";
import { ApiRequest } from "../library/types";

it("should be succeed", async () => {
  const credential = { email: "johndoe@example.com", password: "john-doe-password" };

  const result = await main({} as Context, { body: credential } as ApiRequest<SignInRequest>);

  expect(isApiError(result)).toBeFalsy();

  const db = TestMemoryDB.instance;
  db.getUser(credential.email).then((user) => {
    user.login({ ...credential }).then((ok) => expect(ok).toBeTruthy());
  });
});
