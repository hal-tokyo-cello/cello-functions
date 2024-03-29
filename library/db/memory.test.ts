import { User } from "cello-core/core";
import { TestMemoryDB } from "../test";

const credential = { email: "alice@example.com", password: "password" };
const accountId = "_42YGfwOEr8NJIkuRZh-JJoo3Og2qFytYOKOqqjG2XY";

describe("test db related", () => {
  it("will refresh as new instance", () => {
    const db1 = TestMemoryDB.instance;
    const db2 = TestMemoryDB.refresh();

    expect(db2).not.toBe(db1); // not the same instance
  });
});

describe("user sign up", () => {
  let db: TestMemoryDB;

  beforeEach(() => {
    db = TestMemoryDB.refresh();
  });

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

describe("account management", () => {
  let db: TestMemoryDB;
  let userId: string;

  beforeEach(async () => {
    db = TestMemoryDB.refresh();
    User.register(db, credential.email, credential.password);
    userId = (await db.getUser(credential.email)).accountId;
  });

  it("should update password", () => {});
});
