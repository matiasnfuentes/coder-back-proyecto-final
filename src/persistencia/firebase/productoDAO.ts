import { Producto } from "../../modelo/types";
import { ProductoDAOI } from "../types";
import { FirebaseDAO } from "./firebaseDAO";

export class ProductoDAO extends FirebaseDAO<Producto> implements ProductoDAOI {
  constructor() {
    super("productos");
  }
}
