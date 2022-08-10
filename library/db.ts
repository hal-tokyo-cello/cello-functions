import { Avatar, Player, User } from "cello-core/core";
import { IAccountRepository, Identifier } from "cello-core/infrastructure";
import mongoose, { Schema, model, connect } from "mongoose";

mongoose.connect(
  "mongodb://ih4ciw4cadmin:ikZvgiIvLijUii4MfeJoXVmvfVCZZSqNtKNAkdLtCAMSjgzfKvXDGwK7T5nzIyXbZMfGanDDhchkI4twgT1xiA==@ih4ciw4cadmin.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ih4ciw4cadmin"
);

const UserSchema = new mongoose.Schema({ email: String, password: String }, { timestamps: true });
const QuestsSchema = new Schema({
  name: String,
  category: Number,
  exp_get: Number,
});
const UserModel = mongoose.model("User", UserSchema);
const QuestsModel = mongoose.model("Quests", QuestsSchema);

const modelToInsert = new UserModel();

export class AccountRepository implements IAccountRepository {
  getUser(id: Identifier): Promise<User> {
    throw new Error("Method not implemented.");
  }
  registerNewUser(user: User): Promise<void> {
    try {
      modelToInsert["email"] = user.email;
      modelToInsert["password"] = user.password;

      modelToInsert.save();
      return Promise.resolve();
    } catch {
      return Promise.reject("理由");
    }
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
