import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { AccountRepo } from "../library/db";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest) {
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
  const repo = new AccountRepo();
  repo.connectDB();

  const player = await repo.getPlayer(req.body.email);
  player.login({ email: req.body.email, password: req.body.password });
  // context.res = {
  //     // status: 200, /* Defaults to 200 */
  //     body: responseMessage
  // };
  return {
    body: {
      success: false,
      error: "missing email",
    },
  };
};

export default httpTrigger;
