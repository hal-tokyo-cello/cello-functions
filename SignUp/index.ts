import { User } from "cello-core/core";
import { SignUpApi } from "../library/api/signUp";
import { AccountRepository } from "../library/db";

const httpTrigger: SignUpApi = async (context, req) => {
  // const email = req.query?.email ?? req.body.email;
  // const password = req.query?.password ?? req.body.password;
  const responseMessage = "200";

  const repo = new AccountRepository();

  User.register(repo, "email", "password");

  return {
    body: {
      message: responseMessage,
      echo: req.rawBody as string,
    },
  };
};

export default httpTrigger;
