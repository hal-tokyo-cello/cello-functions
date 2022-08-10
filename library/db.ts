import { Answer, Avatar, Item, Player, Quest, User } from "cello-core/core";
import { IAccountRepository, Identifier, IQuestRepository } from "cello-core/infrastructure";
import mongoose, { Schema, model, connect } from "mongoose";

<<<<<<< HEAD
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
=======
// const UserSchema = new Schema({ email: String, password: String }, { timestamps: true });
const QuestSchema = new Schema({ title: String, experience: Number, genre: String, clear: Boolean});
>>>>>>> origin/feat/#15

// const UserModel = model("User", UserSchema);
const QuestModel = model("quests", QuestSchema, "Quests");
mongoose.connect(
      "mongodb://ih4ciw4cadmin:ikZvgiIvLijUii4MfeJoXVmvfVCZZSqNtKNAkdLtCAMSjgzfKvXDGwK7T5nzIyXbZMfGanDDhchkI4twgT1xiA==@ih4ciw4cadmin.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ih4ciw4cadmin"
    );
export class AccountRepository implements IAccountRepository {
  getUser(id: Identifier): Promise<User> {
    throw new Error("Method not implemented.");
  }
  registerNewUser(user: User): Promise<void> {
<<<<<<< HEAD
    try {
      modelToInsert["email"] = user.email;
      modelToInsert["password"] = user.password;

      modelToInsert.save();
      return Promise.resolve();
    } catch {
      return Promise.reject("理由");
    }
=======
    
    // const modelToInsert = new UserModel();
    // modelToInsert["email"] = user.email;
    // modelToInsert["password"] = user.password;

    // modelToInsert.save();
    throw new Error("Method not implemented.");
>>>>>>> origin/feat/#15
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

export class QuestRepository implements IQuestRepository {
  getQuest(id: Identifier): Promise<Quest> {
    throw new Error("Method not implemented.");
  }
  async getQuests(): Promise<Array<Quest>> {
    const query = new Promise<Array<Quest>>((res, rej) => {});
    return await QuestModel.find({});
  }
  getAnswer(id: Identifier): Promise<Answer> {
    throw new Error("Method not implemented.");
  }
  getItem(id: Identifier): Promise<Item> {
    throw new Error("Method not implemented.");
  }
}