import { Answer, Avatar, Item, Player, Quest, User } from "cello-core/core";
import { IAccountRepository, Identifier, IQuestRepository } from "cello-core/infrastructure";

export class MemoryDatabase implements IAccountRepository, IQuestRepository {
  protected static storage?: MemoryDatabase;

  public static get instance(): MemoryDatabase {
    if (MemoryDatabase.storage == undefined) {
      MemoryDatabase.storage = new MemoryDatabase();
    }

    return MemoryDatabase.storage;
  }

  protected constructor(protected users: User[] = [], protected quests: Quest[] = []) {}

  /**
   * Look up user by his email address.
   * @param login Email
   * @returns User
   */
  getUser = (login: Identifier): Promise<User> => {
    const user = this.users.find((user) => user.email === login);

    return user != undefined ? Promise.resolve(user) : Promise.reject(`user not found with email ${login}`);
  };

  registerNewUser = (user: User): Promise<any> =>
    Promise.resolve(this.users.push(user)).then(() => console.table(this.users));

  getUserPassword = (id: Identifier): Promise<string> =>
    this.getUser(id).then((user) => user.password ?? Promise.reject("cannot find user password"));

  updateUserPassword(user: Identifier, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getPlayer(id: Identifier): Promise<Player> {
    throw new Error("Method not implemented.");
  }
  getAvatar(player: Identifier): Promise<Avatar> {
    throw new Error("Method not implemented.");
  }
  setLastLoginAttempt = (timestamp: number): Promise<void> => Promise.resolve();

  setLastLogin = (timestamp: number): Promise<void> => Promise.resolve();

  upgradeUserToPlayer(user: User, player: Player): Promise<void> {
    throw new Error("Method not implemented.");
  }
  unregisterUser(id: Identifier): Promise<void> {
    throw new Error("Method not implemented.");
  }
  unregisterPlayer(id: Identifier): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getQuest(id: Identifier): Promise<Quest> {
    throw new Error("Method not implemented.");
  }
  getAnswer(id: Identifier): Promise<Answer> {
    throw new Error("Method not implemented.");
  }
  getItem(id: Identifier): Promise<Item> {
    throw new Error("Method not implemented.");
  }
}
