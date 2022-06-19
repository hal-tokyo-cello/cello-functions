import { Context } from "@azure/functions";
import { ExampleApiRequest as Req, ExampleApiResponse as Res } from "../library/api/Example";
import EndPoint from "./index";

jest.useFakeTimers();

const name = "Alice";
const id = 1;

let context: Context;
beforeEach(() => {
  context = {
    log: jest.fn(),
    bindingData: {
      id: 1,
    },
  } as unknown as Context;
});

describe("normal request", () => {
  let res: Res;
  beforeEach(async () => {
    res = await EndPoint(context, { body: { name: name } } as Req);
  });

  it("should greets", () => {
    expect(res.body.message).toContain(name);
  });

  it("shows normal greeting message", () => {
    expect(res.body.message).toBe(
      `Hello, ${name}. This HTTP triggered function executed successfully. And route param is ${id}`
    );
  });

  it("does logging", async () => {
    expect(context.log).toHaveBeenCalledTimes(1);
    expect(context.log).toHaveBeenCalledWith(expect.stringContaining(Date.now().toString()));
  });
});

describe("individual request", () => {
  test("empty name", async () => {
    let res = await EndPoint(context, { body: {} } as Req);

    expect(res.body.message).toBe(
      "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response." +
        ` And route param is ${id}`
    );
  });
});
