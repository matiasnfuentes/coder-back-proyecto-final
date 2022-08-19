import mongoose from "mongoose";
import { MessageDTO } from "../../model/messageDTO";
import { MongoDAO } from "./mongoDAO";

export class MessageDAO extends MongoDAO<MessageDTO> {
  private static _instance: MessageDAO | null = null;

  private constructor() {
    const schema = new mongoose.Schema(
      {
        email: { type: String, require: true },
        type: { type: String, require: true },
        text: { type: String, require: true },
        timestamp: { type: String, require: true },
        private: { type: Boolean, require: true },
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
