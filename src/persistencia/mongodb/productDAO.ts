import mongoose from "mongoose";
import { MongoDAO } from "./mongoDAO";
import { ProductDTO } from "../types";

export class ProductDAO extends MongoDAO<ProductDTO> {
  private static _instance: ProductDAO | null = null;

  private constructor() {
    const schema = new mongoose.Schema({
      name: { type: String, require: true },
      description: { type: String, require: true },
      code: { type: String, require: true },
      thumbnail: { type: String, require: true },
      price: { type: Number, require: true },
      stock: { type: Number, require: true },
      category: { type: String, require: true },
    });
    const model = mongoose.model("product", schema);
    super(model);
  }

  public static getInstance(): ProductDAO {
    if (!this._instance) {
      this._instance = new ProductDAO();
    }
    return this._instance;
  }
}
