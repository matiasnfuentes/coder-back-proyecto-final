import { Producto } from "../modelo/types";
import { FileDAO } from "./fileDAO";

const RUTAPRODUCTOS = __dirname + "./../db/productos.txt";

export class ProductoDAO extends FileDAO<Producto> {
  constructor() {
    super(RUTAPRODUCTOS);
  }

  async obtenerTodos(): Promise<Producto[]> {
    return await this.contenidoActual();
  }
}
