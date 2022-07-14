import { Avatar, Player, User } from "cello-core/core";
import { IAccountRepository, Identifier } from "cello-core/infrastructure";
import mongoose, { Schema, model, connect } from "mongoose";

mongoose.connect(
  "mongodb://ih4ciw4cadmin:ikZvgiIvLijUii4MfeJoXVmvfVCZZSqNtKNAkdLtCAMSjgzfKvXDGwK7T5nzIyXbZMfGanDDhchkI4twgT1xiA==@ih4ciw4cadmin.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ih4ciw4cadmin"
);

const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  create_date: Number,
  update_date: Number,
  leave_date: Number,
  last_login: Number,
  mail_verify: Boolean,
});
const QuestsSchema = new Schema({
  name: String,
  category: Number,
  exp_get: Number,
});
const AvatarSchema = new Schema({
  name: String,
  category: Number,
  exp_get: Number,
});

const UserModel = mongoose.model("User", UserSchema);
const QuestsModel = mongoose.model("Quests", QuestsSchema);
const AvatarModel = mongoose.model("Avatar", AvatarSchema);

const modelToInsert = new UserModel();
// const modelToInsert = new QuestsModel();
// const modelToInsert = new AvatarModel();

export class AccountRepository implements IAccountRepository {
  getUser(id: Identifier): Promise<User> {
    // try {
    //   return Promise.resolve("");
    // } catch {
    //   return Promise.reject("理由");
    // }
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
    try {
      return Promise.resolve("");
    } catch {
      return Promise.reject("理由");
    }
  }
  updateUserPassword(user: unknown, password: unknown): Promise<void> {
    try {
      return Promise.resolve();
    } catch {
      return Promise.reject("理由");
    }
  }
  getPlayer(id: Identifier): Promise<Player> {
    // try {
    //   return Promise.resolve();
    // } catch {
    //   return Promise.reject("理由");
    // }
    throw new Error("Method not implemented.");
  }
  getAvatar(player: Identifier): Promise<Avatar> {
    // try {
    //   return Promise.resolve();
    // } catch {
    //   return Promise.reject("理由");
    // }
    throw new Error("Method not implemented.");
  }
  setLastLoginAttempt(timestamp: number): Promise<void> {
    try {
      return Promise.resolve();
    } catch {
      return Promise.reject("理由");
    }
  }
  setLastLogin(timestamp: number): Promise<void> {
    try {
      return Promise.resolve();
    } catch {
      return Promise.reject("理由");
    }
  }
  upgradeUserToPlayer(user: User, player: Player): Promise<void> {
    try {
      return Promise.resolve();
    } catch {
      return Promise.reject("理由");
    }
  }
  unregisterUser(id: Identifier): Promise<void> {
    try {
      return Promise.resolve();
    } catch {
      return Promise.reject("理由");
    }
  }
  unregisterPlayer(id: Identifier): Promise<void> {
    try {
      return Promise.resolve();
    } catch {
      return Promise.reject("理由");
    }
    throw new Error("Method not implemented.");
  }
}
