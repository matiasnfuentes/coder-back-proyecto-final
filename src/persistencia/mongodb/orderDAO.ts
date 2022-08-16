import mongoose from "mongoose";
import { MongoDAO } from "./mongoDAO";
import { Order } from "../../model/orderModel";

export class OrderDAO extends MongoDAO<Order> {
  private static _instance: OrderDAO | null = null;

  private constructor() {
    const schema = new mongoose.Schema({
      client: { type: String, require: true },
      items: { type: Array, require: true },
      timestamp: { type: Number, require: true },
      number: { type: Number, require: true },
      status: { type: String, require: true },
    });
    const model = mongoose.model("order", schema);
    super(model);
  }

  public static getInstance(): OrderDAO {
    if (!this._instance) {
      this._instance = new OrderDAO();
    }
    return this._instance;
  }

  async save(element: Order): Promise<Order> {
    const orderNumber = await this.model.countDocuments({});
    return super.save({ ...element, number: orderNumber });
  }
}
