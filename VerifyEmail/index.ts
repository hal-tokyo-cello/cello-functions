import validator from "validator";

import { db } from "../library/db";
import { catch404, conclude, report } from "../library/functional";
import { ApiHandler } from "../library/types";

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  userId: string;
}

const verifyEmail = <T extends { email: string }>(req: T) =>
  validator.isEmail(req.email) ? req : Promise.reject({ message: "invalid email" });

export const run: ApiHandler<VerifyEmailResponse, VerifyEmailRequest> = (context, req) =>
  Promise.resolve(req.body)
    .then(verifyEmail)
    .then((req) => db.getUser(req.email))
    .catch(catch404)
    .then((user) => ({
      userId: user.accountId,
    }))
    .then(conclude, report);
