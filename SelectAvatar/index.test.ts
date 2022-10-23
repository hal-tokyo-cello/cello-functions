import { Context } from "@azure/functions";
import { Player, User } from "cello-core/core";
import { memoryUsage } from "process";
import { run, SelectAvatarRequest } from ".";
import { MemoryDatabase } from "../library/db/memory";
import { isApiError, TestMemoryDB } from "../library/test";
import { ApiRequest } from "../library/types";

let userId: string;

beforeAll(() => {
  TestMemoryDB.refresh();

  const email = "johndoe@example.com";
  User.register(MemoryDatabase.instance, email, "password");
  MemoryDatabase.instance.getUser(email).then((user) => (userId = user.accountId));
});

it("should update user's avatar choice", async () => {
  const result = await run(
    { bindingData: { user: userId } } as unknown as Context,
    { body: { race: 0 } } as ApiRequest<SelectAvatarRequest>
  );

  expect(!isApiError(result)).toBeTruthy();
  if (isApiError(result)) fail;

  const player = await MemoryDatabase.instance.getPlayer(userId);
  expect(player instanceof Player).toBeTruthy();
  expect(player.avatar).not.toBeUndefined();
});
