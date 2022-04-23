import { CarritoDTO } from "../../modelo/types";
import { RUTACARRITOS } from "../dbConfig";
import { CarritoDAOI } from "../types";
import { FileDAO } from "./fileDAO";

export class CarritoDAO extends FileDAO<CarritoDTO> implements CarritoDAOI {
  constructor() {
    super(RUTACARRITOS);
  }
}
