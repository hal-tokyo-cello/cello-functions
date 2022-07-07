import { Schema, model, connect } from "mongoose";

let db: typeof import("mongoose") | null = null;

const UserSchema = new Schema({ name: String, pet: String, age: Number, friend: String });

const UserModel = model("User", UserSchema, "Users");

export const init = async () => {
  if (!db) {
    db = await connect(
      "mongodb://ih4ciw4cadmin:ikZvgiIvLijUii4MfeJoXVmvfVCZZSqNtKNAkdLtCAMSjgzfKvXDGwK7T5nzIyXbZMfGanDDhchkI4twgT1xiA==@ih4ciw4cadmin.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ih4ciw4cadmin@"
    );
  }
};
export const addItem = async (doc: { name: string | undefined; pet: string | undefined; age: number | undefined }) => {
  const modelToInsert = new UserModel();
  modelToInsert["name"] = doc.name;
  modelToInsert["pet"] = doc.pet;
  modelToInsert["age"] = doc.age;

  return await modelToInsert.save();
};
export const findItemById = async (id: any) => {
  return await UserModel.findById(id);
};
export const findItems = async (query = {}) => {
  return await UserModel.find({});
};
export const deleteItemById = async (id: any) => {
  return await UserModel.findByIdAndDelete(id);
};
