import { User } from "cello-core/core";
import { TestMemoryDB } from "../test";

describe("user IO", () => {
  let db: TestMemoryDB = TestMemoryDB.instance;

  const credential = { email: "alice@example.com", password: "password" };
  const accountId = "_42YGfwOEr8NJIkuRZh-JJoo3Og2qFytYOKOqqjG2XY";

  it("register user", () => {
    jest.spyOn(db, "registerNewUser");
    User.register(db, credential.email, credential.password);
    expect(db.registerNewUser).toBeCalledTimes(1);
  });

  it("can sign up and sign in", async () => {
    // sign up
    const id = await User.register(db, credential.email, credential.password);
    expect(id).toBe(accountId);

    const user = await db.getUser(credential.email);
    expect(user.accountId).toBe(accountId);

    // sign in
    const ok = user.login({ ...credential });
    expect(ok).toBeTruthy();
  });

  it("cannot find the user", () => {
    expect(() => db.getUser("bob@example.com")).rejects.not.toBeUndefined();
  });
});
