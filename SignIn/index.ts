import validator from "validator";

import { MemoryDatabase } from "../library/db/memory";
import { catch404, conclude, report } from "../library/functional";
import { ApiHandler, User as ApiUser, UserCredential } from "../library/types";

export type SignInRequest = UserCredential;

export type SignInResponse = ApiUser;

const verifyEmail = (req: SignInRequest): Promise<SignInRequest> =>
  validator.isEmail(req.email) ? Promise.resolve(req) : Promise.reject({ message: "invalid email" } as Error);

const signIn = (req: SignInRequest): Promise<SignInResponse> =>
  MemoryDatabase.instance.getUser(req.email).then(
    async (user) =>
      (await user.login({ email: req.email, password: req.password }))
        ? { accountId: user.accountId, email: user.email, name: "" }
        : Promise.reject({ message: "sign in failed", reason: "invalid credential combination" }),
    (error) => Promise.reject({ message: "sign in failed", reason: "unregistered email" })
  );

const httpTrigger: ApiHandler<SignInResponse, SignInRequest> = (context, req) =>
  Promise.resolve(req.body).then(verifyEmail).then(signIn).catch(catch404).then(conclude, report);

export default httpTrigger;
