import { CarritoDTO } from "../modelo/types";
import { FileDAO } from "./fileDAO";

const RUTACARRITOS = __dirname + "./../db/carritos.txt";

export class CarritoDAO extends FileDAO<CarritoDTO> {
  constructor() {
    super(RUTACARRITOS);
  }
}
