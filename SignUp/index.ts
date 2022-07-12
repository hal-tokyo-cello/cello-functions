import { User } from "cello-core/core";
import { SignUpApi } from "../library/api/signUp";
import { AccountRepository } from "../library/db";

const httpTrigger: SignUpApi = async (context, req) => {
  let succeed = true;
  let error = "";
  try {
    const email = req.body.email;
    const password = req.body.password;

    const repo = new AccountRepository();

    User.register(repo, email, password);
  } catch (error) {
    succeed = false;
    error = error;
  }

  return {
    body: {
      succeed: succeed,
      error: error,
    },
  };
};

export default httpTrigger;
