import validator from "validator";

import { db } from "../library/db";
import { catch404, conclude, report } from "../library/functional";
import { ApiHandler, User as ApiUser, UserCredential } from "../library/types";

export type SignInRequest = UserCredential;

export type SignInResponse = ApiUser;

const verifyEmail = (req: SignInRequest): Promise<SignInRequest> =>
  validator.isEmail(req.email) ? Promise.resolve(req) : Promise.reject({ message: "invalid email" } as Error);

const signIn = (req: SignInRequest): Promise<SignInResponse> =>
  db.getUser(req.email).then(
    async (user) =>
      (await user.login({ email: req.email, password: req.password }))
        ? { accountId: user.accountId, email: user.email, name: "" }
        : Promise.reject({ message: "sign in failed", reason: "invalid credential combination" }),
    (error) => Promise.reject({ message: "sign in failed", reason: "unregistered email" })
  );

export const run: ApiHandler<SignInResponse, SignInRequest> = (context, req) =>
  Promise.resolve(req.body).then(verifyEmail).then(signIn).catch(catch404).then(conclude, report);
