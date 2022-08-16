import mongoose from "mongoose";
import { MONGO_URL } from "../../config/config";
import { Serializable } from "..//types";
import { DAO } from "../types";

export const URLMONGO: string = MONGO_URL;

export class MongoDAO<T extends Serializable> implements DAO<T> {
  model: mongoose.Model<any>;
  constructor(model: mongoose.Model<any>) {
    mongoose.connect(URLMONGO);
    this.model = model;
  }

  async get(id: string): Promise<T> {
    try {
      const element = await this.model.findById(id);
      if (!element) throw `The element with id ${id} doesn't exists`;
      return element.toObject();
    } catch (e) {
      throw {
        status: 404,
        message: `The element with id ${id} doesn't exists`,
      };
    }
  }

  async getBy(field: string, value: string | number): Promise<T> {
    try {
      const element = await this.model.findOne({ [field]: value });
      if (!element) throw `The element with ${field} ${value}  doesn't exists`;
      return element.toObject();
    } catch (e) {
      throw {
        status: 404,
        message: `The element with ${field} ${value}  doesn't exists`,
      };
    }
  }

  async getAll(): Promise<T[]> {
    const docs = await this.model.find({});
    return docs.map((d) => d.toObject());
  }

  async getAllBy(field: string, value: string | number): Promise<T[]> {
    const docs = await this.model.find({ [field]: value });
    return docs.map((d) => d.toObject());
  }

  async save(element: T): Promise<T> {
    const elementToSave = new this.model({
      ...element,
    });

    return await elementToSave.save();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async deleteBy(field: string, value: string | number): Promise<void> {
    await this.model.findOneAndDelete({ [field]: value });
  }

  async update(id: string, modificacion: Partial<T>): Promise<T> {
    await this.model.findByIdAndUpdate(id, modificacion);
    const p = await this.get(id);
    return p;
  }
}
