import {
  Answer,
  Avatar,
  CombinationQuestion,
  Item,
  MultipleChoiceQuestion,
  Player,
  Quest,
  User,
} from "cello-core/core";
import { IAccountRepository, Identifier, IQuestRepository } from "cello-core/infrastructure";
import mongoose, { Schema, model, connect } from "mongoose";

mongoose.connect(
  "mongodb://ih4ciw4cadmin:ikZvgiIvLijUii4MfeJoXVmvfVCZZSqNtKNAkdLtCAMSjgzfKvXDGwK7T5nzIyXbZMfGanDDhchkI4twgT1xiA==@ih4ciw4cadmin.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ih4ciw4cadmin"
);

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    create_date: Number,
    update_date: Number,
    leave_date: Number,
    last_login: Number,
    mail_verify: Boolean,
    race: Number,
    totalExp: Number,
  },
  { timestamps: true }
);
const QuestSchema = new Schema({
  title: String,
  drops: Array,
  experience: Number,
  options: Array,
  MultipleChoiceSolution: Number,
  CombinationSolution: Array,
  problem: String,
  answer: String,
  genre: String,
  clear: Boolean,
});
const AvatarSchema = new Schema({
  name: String,
  category: Number,
  exp_get: Number,
});

const UserModel = mongoose.model("User", UserSchema);
const QuestModel = mongoose.model("Quest", QuestSchema);
const AvatarModel = mongoose.model("Avatar", AvatarSchema);

export class AccountRepository implements IAccountRepository {
  async getUser(id: Identifier): Promise<User> {
    // return query.then((data) => data).catch((err) => Promise.reject(err));
    try {
      const result = await UserModel.findById(id).exec();

      if (result == null) {
        throw "user not found";
      }

      if (result.email == undefined) {
        throw "invalid user";
      }
      return Promise.resolve(new User(this, result.id, result.email));
    } catch (error) {
      return Promise.reject(error);
    }
  }
  registerNewUser(user: User): Promise<void> {
    try {
      const UserModelToInsert = new UserModel({
        email: user.email,
        password: user.password,
      });
      UserModelToInsert.save();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getUserPassword(id: Identifier): Promise<string> {
    try {
      const result = await this.getUser(id);

      if (result == null) {
        throw "user not found";
      }

      if (result.password == undefined) {
        throw "invalid password";
      }

      return Promise.resolve(result.password);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  updateUserPassword(user: unknown, password: unknown): Promise<void> {
    try {
      UserModel.findByIdAndUpdate(user, { $set: { password: password } });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getPlayer(id: Identifier): Promise<Player> {
    try {
      //Mongodbの処理を書き入れる
      const result = await this.getUser(id);

      if (result == null) {
        throw "user not found";
      }

      if (result.email == undefined) {
        throw "invalid email";
      }
      return Promise.resolve(new Player(this, result.accountId, result.email));
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getAvatar(player: Identifier): Promise<Avatar> {
    try {
      //Mongodbの処理を書き入れる
      const result = await UserModel.findById(player).exec();

      if (result == null) {
        throw "user not found";
      }

      if (result.race == undefined) {
        throw "invalid user";
      }
      if (result.totalExp == undefined) {
        throw "invalid user";
      }

      return Promise.resolve(new Avatar(result.race, result.totalExp));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // ユーザの指定がなく更新ができない問題
  setLastLoginAttempt(timestamp: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  setLastLogin(timestamp: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  upgradeUserToPlayer(user: User, player: Player): Promise<void> {
    try {
      UserModel.findByIdAndUpdate(user.accountId, {
        $set: { race: player.avatar.race, totalExp: player.avatar.totalExp },
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  unregisterUser(id: Identifier): Promise<void> {
    try {
      UserModel.findByIdAndRemove(id).exec();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  unregisterPlayer(id: Identifier): Promise<void> {
    try {
      this.unregisterUser(id);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export class QuestRepository implements IQuestRepository {
  async getQuest(id: Identifier): Promise<Quest> {
    const result = await QuestModel.findById(id).exec();

    // DB取得のnullチェック
    if (result == null) {
      throw "Quest is not found";
    }

    // DB取得(要素)の未定義チェック
    if (result.title == undefined) {
      throw "invalid title";
    }
    if (result.experience == undefined) {
      throw "invalid experience";
    }
    if (result.MultipleChoiceSolution == undefined) {
      throw "invalid solution";
    }
    if (result.problem == undefined) {
      throw "invalid problem";
    }

    // 4択問題をリターンする
    if (result?.genre == "4択問題") {
      return Promise.resolve(
        new MultipleChoiceQuestion(
          id,
          result?.title,
          result?.drops,
          result?.experience,
          result?.options,
          result?.MultipleChoiceSolution,
          result?.problem
        )
      );
    }
    //  組み合わせ問題をリターンする
    else {
      return Promise.resolve(
        new CombinationQuestion(
          id,
          result?.title,
          result?.drops,
          result?.experience,
          result?.options,
          result?.CombinationSolution,
          result?.problem
        )
      );
    }
  }

  async getQuests(): Promise<Array<Quest>> {
    const query = new Promise<Array<Quest>>((res, rej) => {});
    return await QuestModel.find({});
  }
  async getAnswer(id: Identifier): Promise<Answer> {
    const result = await QuestModel.findById(id).exec();

    // DB取得のnullチェック
    if (result == null) {
      throw "Quest is not found";
    }

    // DB取得(要素)の未定義チェック
    if (result.answer == undefined) {
      throw "invalid answer";
    }

    return Promise.resolve(new Answer(result?.answer, result?.answer));
  }
  getItem(id: Identifier): Promise<Item> {
    throw new Error("Method not implemented.");
  }
}
