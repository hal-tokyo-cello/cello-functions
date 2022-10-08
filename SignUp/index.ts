import validator from "validator";

import { User } from "cello-core/core";

import { db } from "../library/db";
import { catch404, catch500, conclude, report } from "../library/functional";
import { ApiHandler, Error } from "../library/types";

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {}

const signUp = ({ email, password }: SignUpRequest): SignUpResponse =>
  User.register(db, email, password).then(() => ({}));

const verifyEmail = (req: SignUpRequest): Promise<SignUpRequest> =>
  validator.isEmail(req.email) ? Promise.resolve(req) : Promise.reject({ message: "invalid email" } as Error);

const verifyDuplicate = (req: SignUpRequest): Promise<SignUpRequest> =>
  db.getUser(req.email).then(
    () => Promise.reject({ message: "denied for registration", reason: "the email address had been used" }),
    () => Promise.resolve(req)
  );

export const run: ApiHandler<SignUpResponse, SignUpRequest> = (context, req) =>
  Promise.resolve(req.body)
    .then(verifyEmail)
    .then(verifyDuplicate)
    .catch(catch404)
    .then(signUp)
    .catch(catch500)
    .then(conclude, report);
