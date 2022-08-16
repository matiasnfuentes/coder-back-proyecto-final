import mongoose from "mongoose";
import { MessageDTO } from "../types";
import { MongoDAO } from "./mongoDAO";

export class MessageDAO extends MongoDAO<MessageDTO> {
  private static _instance: MessageDAO | null = null;

  private constructor() {
    const schema = new mongoose.Schema(
      {
        author: {
          id: { type: String, require: true },
          firstName: { type: String, require: true },
          lastName: { type: String, require: true },
          age: { type: String, require: true },
          alias: { type: String, require: true },
          avatar: { type: String, require: true },
        },
        text: { type: String, require: true },
        timestamp: { type: String, require: true },
      },
      { versionKey: false }
    );
    const model = mongoose.model("message", schema);
    super(model);
  }

  public static getInstance(): MessageDAO {
    if (!this._instance) {
      this._instance = new MessageDAO();
    }
    return this._instance;
  }
}
