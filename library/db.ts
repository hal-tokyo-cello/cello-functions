import { Avatar, Player, User } from "cello-core/core";
import { IAccountRepository, Identifier } from "cello-core/infrastructure";
import mongoose, { Schema, model, connect } from "mongoose";

const UserSchema = new Schema({ email: String, password: String }, { timestamps: true });

const UserModel = model("User", UserSchema);

export class AccountRepository implements IAccountRepository {
  getUser(id: Identifier): Promise<User> {
    throw new Error("Method not implemented.");
  }
  registerNewUser(user: User): Promise<void> {
    mongoose.connect(
      "mongodb://ih4ciw4cadmin:ikZvgiIvLijUii4MfeJoXVmvfVCZZSqNtKNAkdLtCAMSjgzfKvXDGwK7T5nzIyXbZMfGanDDhchkI4twgT1xiA==@ih4ciw4cadmin.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ih4ciw4cadmin"
    );
    const modelToInsert = new UserModel();
    modelToInsert["email"] = user.email;
    modelToInsert["password"] = user.password;

    modelToInsert.save();
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
