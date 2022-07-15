import { LoginOptions, User } from "cello-core/core";
import { SignInApi } from "../library/api/signIn";
import { AccountRepository } from "../library/db";

const httpTrigger: SignInApi = async (context, req) => {
  let succeed = true;
  let error = "";
  try {
    const email = req.body.email;
    const password = req.body.password;

    const repo = new AccountRepository();
    const loginOption = new LoginOptions(email, password);
    await (await repo.getUser(email)).login(loginOption);
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
