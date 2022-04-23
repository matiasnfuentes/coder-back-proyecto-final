import mongoose from "mongoose";
import { Producto } from "../../modelo/types";
import { ProductoDAOI } from "../types";
import { MongoDAO } from "./mongoDAO";

export class ProductoDAO extends MongoDAO<Producto> implements ProductoDAOI {
  constructor() {
    const schema = new mongoose.Schema({
      nombre: { type: String, require: true },
      descripcion: { type: String, require: true },
      codigo: { type: String, require: true },
      foto: { type: String, require: true },
      precio: { type: Number, require: true },
      stock: { type: Number, require: true },
      timestamp: { type: String, require: true },
    });
    const modelo = mongoose.model("productos", schema);
    super(modelo);
  }
}
