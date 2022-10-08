import { Answer, Avatar, Item, Player, Quest, User } from "cello-core/core";
import { IAccountRepository, Identifier, IQuestRepository } from "cello-core/infrastructure";

/**
 * Predefined credentials.
 */
const preCred: { email: string; password: string }[] = [];

/**
 * Predefined quests.
 */
const preQuests: Quest[] = [];

export class MemoryDatabase implements IAccountRepository, IQuestRepository {
  public users: User[] = [];

  /**
   * Since data is stored directed into this DAO,
   * data access should be done through singleton instance instead of `this`.
   * Also, `storage` might not be instantiated, data access should be done through `instance` instead of `storage`.
   */
  protected static storage?: MemoryDatabase;

  /**
   * Singleton in memory storage.
   */
  public static get instance(): MemoryDatabase {
    if (MemoryDatabase.storage == undefined) {
      MemoryDatabase.storage = new MemoryDatabase();
    }

    return MemoryDatabase.storage;
  }

  protected constructor(public quests: Quest[] = preQuests) {
    preCred.forEach((cred) => User.register(MemoryDatabase.instance, cred.email, cred.password));
  }

  getQuests = (): Promise<Quest[]> => Promise.resolve(MemoryDatabase.instance.quests);

  /**
   * Look up user by his email address.
   * @param login Email
   * @returns User
   */
  getUser = (login: Identifier): Promise<User> => {
    const user = MemoryDatabase.instance.users.find((user) => user.email === login);

    return user != undefined ? Promise.resolve(user) : Promise.reject(`user not found with email ${login}`);
  };

  registerNewUser = (user: User): Promise<void> =>
    Promise.resolve(MemoryDatabase.instance.users.push(user)).then(() => {});

  /**
   * This might never be called, since password is stored in the User instance in memory,
   * and `getUserPassword` will only be called then User's password is undefined.
   *
   * @see {@link User}
   */
  getUserPassword = (id: Identifier): Promise<string> =>
    MemoryDatabase.instance.getUser(id).then((user) => user.password ?? Promise.reject("cannot find user password"));

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
