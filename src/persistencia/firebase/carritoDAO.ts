import { FirebaseDAO } from "./firebaseDAO";
import { CarritoDAOI } from "../types";
import { CarritoDTO } from "../../modelo/types";

export class CarritoDAO extends FirebaseDAO<CarritoDTO> implements CarritoDAOI {
  constructor() {
    super("carritos");
  }
}
