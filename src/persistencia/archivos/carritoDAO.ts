import { CarritoDTO } from "../../modelo/types";
import { CarritoDAOI } from "../types";
import { FileDAO } from "./fileDAO";

const RUTACARRITOS = __dirname + "/../db/carritos.txt";

export class CarritoDAO extends FileDAO<CarritoDTO> implements CarritoDAOI {
  constructor() {
    super(RUTACARRITOS);
  }
}
