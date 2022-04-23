import { Producto } from "../../modelo/types";
import { RUTAPRODUCTOS } from "../dbConfig";
import { FileDAO } from "./fileDAO";

export class ProductoDAO extends FileDAO<Producto> {
  constructor() {
    super(RUTAPRODUCTOS);
  }
}
