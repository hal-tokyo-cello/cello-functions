import { ExampleApi } from "../library/api/Example";

const httpTrigger: ExampleApi = async (context, req) => {
  context.log(`Example api has been triggered at ${Date.now()} !`);
  const name = req.query?.name ?? req.body.name;
  const responseMessage =
    (name
      ? "Hello, " + name + ". This HTTP triggered function executed successfully."
      : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.") +
    ` And route param is ${context.bindingData.id}`;

  return {
    body: {
      message: responseMessage,
      echo: req.rawBody as string,
    },
  };
};

export default httpTrigger;
