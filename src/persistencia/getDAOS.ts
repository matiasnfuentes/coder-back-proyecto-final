import { CarritoDAO as FirebaseCarritoDAO } from "./firebase/carritoDAO";
import { ProductoDAO as FirebaseProductoDAO } from "./firebase/productoDAO";
import { CarritoDAO as MongoCarritoDAO } from "./mongo/carritoDAO";
import { ProductoDAO as MongoProductoDAO } from "./mongo/productoDAO";
import { CarritoDAO as FileCarritoDAO } from "./archivos/carritoDAO";
import { ProductoDAO as FileProductoDAO } from "./archivos/productoDAO";
import { CarritoDAOI, ProductoDAOI } from "./types";

export const getDAOS = (): {
  carritoDAO: CarritoDAOI;
  productoDAO: ProductoDAOI;
} => {
  switch (process.env.DAO_TYPE) {
    case "file":
      return {
        carritoDAO: new FileCarritoDAO(),
        productoDAO: new FileProductoDAO(),
      };
    case "firestore":
      return {
        carritoDAO: new FirebaseCarritoDAO(),
        productoDAO: new FirebaseProductoDAO(),
      };
    default:
      return {
        carritoDAO: new MongoCarritoDAO(),
        productoDAO: new MongoProductoDAO(),
      };
  }
};
