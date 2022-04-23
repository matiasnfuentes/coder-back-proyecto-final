import mongoose from "mongoose";
import { MongoDAO } from "./mongoDAO";
import { CarritoDAOI } from "../types";
import { CarritoDTO } from "../../modelo/types";

export class CarritoDAO extends MongoDAO<CarritoDTO> implements CarritoDAOI {
  constructor() {
    const schema = new mongoose.Schema({
      productos: { type: Array, require: true },
    });
    const modelo = mongoose.model("carritos", schema);
    super(modelo);
  }
}
