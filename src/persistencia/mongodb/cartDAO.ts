import mongoose from "mongoose";
import { MongoDAO } from "./mongoDAO";
import { CartDTO } from "../types";

export class CartDAO extends MongoDAO<CartDTO> {
  private static _instance: CartDAO | null = null;

  private constructor() {
    const schema = new mongoose.Schema({
      products: { type: Array, require: true },
      owner: { type: String, require: true },
      deliverAddress: { type: String, require: true },
      timestamp: { type: Number, require: true },
    });
    const model = mongoose.model("cart", schema);
    super(model);
  }

  public static getInstance(): CartDAO {
    if (!this._instance) {
      this._instance = new CartDAO();
    }
    return this._instance;
  }
}
