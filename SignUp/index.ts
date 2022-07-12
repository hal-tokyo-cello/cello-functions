import { User } from "cello-core/core";
import { SignUpApi } from "../library/api/signUp";
import { AccountRepository } from "../library/db";

const httpTrigger: SignUpApi = async (context, req) => {
  const email = req.body.email;
  const password = req.body.password;
  const succeed = true;
  const error = "";

  const repo = new AccountRepository();

  User.register(repo, email, password);

  return {
    body: {
      succeed: succeed,
      error: error,
    },
  };
};

export default httpTrigger;
