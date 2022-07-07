import { Avatar, Player, User } from "cello-core/core";
import { IAccountRepository, Identifier } from "cello-core/infrastructure";

export class AccountRepository implements IAccountRepository {
  getUser(id: Identifier): Promise<User> {
    throw new Error("Method not implemented.");
  }
  registerNewUser(user: unknown): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserPassword(id: Identifier): Promise<string> {
    throw new Error("Method not implemented.");
  }
  updateUserPassword(user: unknown, password: unknown): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getPlayer(id: Identifier): Promise<Player> {
    throw new Error("Method not implemented.");
  }
  getAvatar(player: Identifier): Promise<Avatar> {
    throw new Error("Method not implemented.");
  }
  setLastLoginAttempt(timestamp: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  setLastLogin(timestamp: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  upgradeUserToPlayer(user: User, player: Player): Promise<void> {
    throw new Error("Method not implemented.");
  }
  unregisterUser(id: Identifier): Promise<void> {
    throw new Error("Method not implemented.");
  }
  unregisterPlayer(id: Identifier): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
