import mongoose from "mongoose";
import { UserDTO } from "..//types";
import { MongoDAO } from "./mongoDAO";

export class UserDAO extends MongoDAO<UserDTO> {
  private static _instance: UserDAO | null = null;
  private constructor() {
    const schema = new mongoose.Schema({
      email: { type: String, require: true },
      password: { type: String, require: true },
      name: { type: String, require: true },
      address: { type: String, require: true },
      age: { type: Number, require: true },
      avatar: { type: String, require: true },
      phone: { type: String, require: true },
      isAdmin: { type: Boolean, require: false },
    });
    const model = mongoose.model("user", schema);
    super(model);
  }

  public static getInstance(): UserDAO {
    if (!this._instance) {
      this._instance = new UserDAO();
    }
    return this._instance;
  }
}
