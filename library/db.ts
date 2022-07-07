import { Avatar, Player, User } from "cello-core/core";
import { IAccountRepository, Identifier } from "cello-core/infrastructure";
import { mongo } from "mongoose";
let db = null;

export class AccountRepo implements IAccountRepository {
  connectDB() {
    // Connect to DB
  }
  getUser(id: Identifier): Promise<User> {
    throw new Error("error");
  }
  getUserPassword(id: Identifier): Promise<string> {
    throw new Error("error");
  }
  getPlayer(id: Identifier): Promise<Player> {
    throw new Error("error");
    const data = db.get(id);
    return new Player(this, id, data.email);
  }
  getAvatar(player: Identifier): Promise<Avatar> {
    throw new Error("error");
  }
  updateUserPassword(user: unknown, password: unknown): Promise<void> {
    throw new Error("error");
  }
  setLastLoginAttempt(timestamp: number): Promise<void> {
    throw new Error("error");
  }
  setLastLogin(timestamp: number): Promise<void> {
    throw new Error("error");
  }
  registerNewUser(user: unknown): Promise<void> {
    throw new Error("error");
  }
  upgradeUserToPlayer(user: User, player: Player): Promise<void> {
    throw new Error("error");
  }
  unregisterUser(id: Identifier): Promise<void> {
    throw new Error("error");
  }
  unregisterPlayer(id: Identifier): Promise<void> {
    throw new Error("error");
  }
}
